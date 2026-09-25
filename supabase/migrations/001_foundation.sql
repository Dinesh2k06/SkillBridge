-- ==============================================================================
-- SkillBridge Foundation Migration: 001_foundation.sql
-- ==============================================================================

-- 1. Create Organizations Table
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('university', 'organization', 'institution')),
    logo_url TEXT,
    description TEXT,
    domain TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    department TEXT,
    year_of_study TEXT,
    section TEXT,
    interests TEXT[] DEFAULT '{}',
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    onboarding_completed BOOLEAN DEFAULT false,
    network_preference TEXT DEFAULT 'organization' CHECK (network_preference IN ('organization', 'selected', 'open')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Organization Members Table
CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'STUDENT' CHECK (role IN ('STUDENT', 'MENTOR', 'ORGANIZATION_ADMIN', 'SUPER_ADMIN')),
    joined_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unique_user_organization UNIQUE (user_id, organization_id)
);

-- 4. Create Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unique_skill_name_category UNIQUE (name, category)
);

-- 5. Create User Skills Table
CREATE TABLE IF NOT EXISTS public.user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    skill_type TEXT NOT NULL CHECK (skill_type IN ('CAN_TEACH', 'WANT_TO_LEARN')),
    created_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unique_user_skill_type UNIQUE (user_id, skill_id, skill_type)
);

-- 6. Create Organization Networks Table
CREATE TABLE IF NOT EXISTS public.organization_networks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    target_org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT unique_source_target_org UNIQUE (source_org_id, target_org_id)
);

-- ==============================================================================
-- Indexes
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_organization_id ON public.profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_members_user_id ON public.organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_organization_members_organization_id ON public.organization_members(organization_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_user_id ON public.user_skills(user_id);
CREATE INDEX IF NOT EXISTS idx_user_skills_skill_id ON public.user_skills(skill_id);
CREATE INDEX IF NOT EXISTS idx_organization_networks_source_org_id ON public.organization_networks(source_org_id);
CREATE INDEX IF NOT EXISTS idx_organization_networks_target_org_id ON public.organization_networks(target_org_id);

-- ==============================================================================
-- Row Level Security (RLS)
-- ==============================================================================
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_networks ENABLE ROW LEVEL SECURITY;

-- Helper functions for RLS to prevent recursion on organization_members
CREATE OR REPLACE FUNCTION public.is_org_member(check_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = check_org_id AND user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.is_org_admin(check_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = check_org_id 
      AND user_id = auth.uid() 
      AND role IN ('ORGANIZATION_ADMIN', 'SUPER_ADMIN')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE user_id = auth.uid() 
      AND role = 'SUPER_ADMIN'
  );
$$;

-- ------------------------------------------------------------------------------
-- Policies: organizations
-- ------------------------------------------------------------------------------
-- Authenticated users can SELECT verified orgs
CREATE POLICY "Authenticated users can select verified orgs"
  ON public.organizations
  FOR SELECT
  TO authenticated
  USING (verified = true);

-- Members can SELECT their own org (even if not verified)
CREATE POLICY "Members can select their own org"
  ON public.organizations
  FOR SELECT
  TO authenticated
  USING (public.is_org_member(id));

-- Org admins can UPDATE their own org
CREATE POLICY "Org admins can update their own org"
  ON public.organizations
  FOR UPDATE
  TO authenticated
  USING (public.is_org_admin(id))
  WITH CHECK (public.is_org_admin(id));

-- ------------------------------------------------------------------------------
-- Policies: profiles
-- ------------------------------------------------------------------------------
-- Users can SELECT own profile
CREATE POLICY "Users can select own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Users can INSERT own profile (id = auth.uid())
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- Users can UPDATE own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Org members can SELECT profiles of users in same org
CREATE POLICY "Org members can select profiles in same org"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    (organization_id IS NOT NULL AND public.is_org_member(organization_id))
    OR EXISTS (
      SELECT 1 FROM public.organization_members om1
      JOIN public.organization_members om2 ON om1.organization_id = om2.organization_id
      WHERE om1.user_id = auth.uid() AND om2.user_id = profiles.id
    )
  );

-- ------------------------------------------------------------------------------
-- Policies: organization_members
-- ------------------------------------------------------------------------------
-- Users can SELECT own memberships
CREATE POLICY "Users can select own memberships"
  ON public.organization_members
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Org members can SELECT members of their org
CREATE POLICY "Org members can select members of their org"
  ON public.organization_members
  FOR SELECT
  TO authenticated
  USING (public.is_org_member(organization_id));

-- Users can INSERT own membership (user_id = auth.uid())
CREATE POLICY "Users can insert own membership"
  ON public.organization_members
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Org admins can UPDATE members in their org
CREATE POLICY "Org admins can update members in their org"
  ON public.organization_members
  FOR UPDATE
  TO authenticated
  USING (public.is_org_admin(organization_id))
  WITH CHECK (public.is_org_admin(organization_id));

-- Org admins can DELETE members in their org
CREATE POLICY "Org admins can delete members in their org"
  ON public.organization_members
  FOR DELETE
  TO authenticated
  USING (public.is_org_admin(organization_id));

-- ------------------------------------------------------------------------------
-- Policies: skills
-- ------------------------------------------------------------------------------
-- All authenticated can SELECT
CREATE POLICY "Authenticated users can select skills"
  ON public.skills
  FOR SELECT
  TO authenticated
  USING (true);

-- Super admins can INSERT/UPDATE/DELETE skills
CREATE POLICY "Super admins can insert skills"
  ON public.skills
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can update skills"
  ON public.skills
  FOR UPDATE
  TO authenticated
  USING (public.is_super_admin())
  WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can delete skills"
  ON public.skills
  FOR DELETE
  TO authenticated
  USING (public.is_super_admin());

-- ------------------------------------------------------------------------------
-- Policies: user_skills
-- ------------------------------------------------------------------------------
-- Users can SELECT own
CREATE POLICY "Users can select own user_skills"
  ON public.user_skills
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can INSERT own (user_id = auth.uid())
CREATE POLICY "Users can insert own user_skills"
  ON public.user_skills
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can UPDATE own
CREATE POLICY "Users can update own user_skills"
  ON public.user_skills
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can DELETE own
CREATE POLICY "Users can delete own user_skills"
  ON public.user_skills
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Org members can SELECT user_skills of users in same org
CREATE POLICY "Org members can select user_skills in same org"
  ON public.user_skills
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = user_skills.user_id
        AND p.organization_id IS NOT NULL
        AND public.is_org_member(p.organization_id)
    )
  );

-- ------------------------------------------------------------------------------
-- Policies: organization_networks
-- ------------------------------------------------------------------------------
-- Org admins can manage networks for their org
CREATE POLICY "Org admins can manage networks for their org"
  ON public.organization_networks
  FOR ALL
  TO authenticated
  USING (public.is_org_admin(source_org_id) OR public.is_org_admin(target_org_id))
  WITH CHECK (public.is_org_admin(source_org_id) OR public.is_org_admin(target_org_id));

-- Members can SELECT networks involving their org
CREATE POLICY "Members can select networks involving their org"
  ON public.organization_networks
  FOR SELECT
  TO authenticated
  USING (public.is_org_member(source_org_id) OR public.is_org_member(target_org_id));

-- ==============================================================================
-- Triggers
-- ==============================================================================

-- 1. Auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 2 & 3. Auto-update updated_at triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_organizations_updated_at ON public.organizations;
CREATE TRIGGER set_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_organization_networks_updated_at ON public.organization_networks;
CREATE TRIGGER set_organization_networks_updated_at
  BEFORE UPDATE ON public.organization_networks
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- Seed Skills
-- ==============================================================================
INSERT INTO public.skills (name, category, description) VALUES
-- Programming Languages
('Python', 'Programming Languages', 'General-purpose programming language known for readability, versatility, data science, and web development.'),
('JavaScript', 'Programming Languages', 'Dynamic scripting language that powers interactive web pages and client/server applications.'),
('TypeScript', 'Programming Languages', 'Typed superset of JavaScript that compiles to plain JavaScript and adds static type definitions.'),
('Java', 'Programming Languages', 'Object-oriented, cross-platform programming language widely used in enterprise and Android development.'),
('C++', 'Programming Languages', 'High-performance compiled language supporting procedural, object-oriented, and generic paradigms.'),
('C', 'Programming Languages', 'Foundational systems programming language known for low-level memory control and maximum execution speed.'),
('Rust', 'Programming Languages', 'Modern systems programming language designed for memory safety, concurrency, and zero-cost abstractions.'),
('Go', 'Programming Languages', 'Fast, statically typed, compiled programming language designed by Google for scalable web services and cloud infrastructure.'),
('Ruby', 'Programming Languages', 'Dynamic, open source programming language with a focus on simplicity and productivity.'),
('Swift', 'Programming Languages', 'Powerful and intuitive programming language created by Apple for building iOS, macOS, and watchOS apps.'),
('Kotlin', 'Programming Languages', 'Modern cross-platform, statically typed language interoperable with Java and standard for Android development.'),

-- Web Development
('React', 'Web Development', 'Popular open-source JavaScript library for building responsive and modular user interfaces.'),
('Angular', 'Web Development', 'TypeScript-based open-source web application platform for building robust enterprise single-page applications.'),
('Vue.js', 'Web Development', 'Approachable, performant, and versatile framework for building modern user interfaces on the web.'),
('Next.js', 'Web Development', 'Production-grade React framework providing server-side rendering, static site generation, and full-stack capabilities.'),
('Node.js', 'Web Development', 'Asynchronous event-driven JavaScript runtime built on Chrome''s V8 engine for building scalable server-side applications.'),
('Express.js', 'Web Development', 'Fast, unopinionated, minimalist web framework for building REST APIs and web servers with Node.js.'),
('HTML/CSS', 'Web Development', 'Foundational markup and styling languages for creating structured, responsive web documents.'),
('Tailwind CSS', 'Web Development', 'Utility-first CSS framework packed with classes for creating modern, bespoke user interfaces without leaving your HTML.'),

-- Data Science
('Machine Learning', 'Data Science', 'Field of artificial intelligence focused on building algorithms that learn patterns and make predictions from data.'),
('Data Analysis', 'Data Science', 'Process of inspecting, cleansing, transforming, and modeling data to discover useful insights and support decision-making.'),
('Deep Learning', 'Data Science', 'Subset of machine learning based on artificial neural networks with representation learning for complex tasks.'),
('NLP', 'Data Science', 'Natural Language Processing techniques enabling computers to understand, interpret, and generate human languages.'),
('Computer Vision', 'Data Science', 'Field of computer science enabling computers to derive meaningful information from digital images and videos.'),
('Statistics', 'Data Science', 'Mathematical discipline dealing with the collection, analysis, interpretation, and presentation of quantitative data.'),
('R Programming', 'Data Science', 'Programming language and free software environment for statistical computing, graphics, and data mining.'),

-- Design
('UI/UX Design', 'Design', 'Process of enhancing user satisfaction through designing intuitive, accessible, and enjoyable product interfaces.'),
('Figma', 'Design', 'Collaborative browser-based design and prototyping tool for digital interfaces, wireframes, and design systems.'),
('Adobe Photoshop', 'Design', 'Industry-standard graphics editing software for photo retouching, compositing, and visual artwork creation.'),
('Graphic Design', 'Design', 'Art and practice of planning and projecting ideas and experiences with visual and textual content.'),
('Motion Design', 'Design', 'Discipline applying graphic design principles to filmmaking and video production through animation and visual effects.'),

-- DevOps
('Docker', 'DevOps', 'Platform for developing, shipping, and running applications within standardized, lightweight containers.'),
('Kubernetes', 'DevOps', 'Open-source container orchestration system for automating application deployment, scaling, and management.'),
('AWS', 'DevOps', 'Comprehensive cloud computing platform offering compute, storage, networking, database, and DevOps managed services.'),
('CI/CD', 'DevOps', 'Continuous Integration and Continuous Delivery automation practices to frequently and safely deliver code changes.'),
('Linux', 'DevOps', 'Open-source Unix-like operating system family widely used for servers, cloud infrastructure, and DevOps environments.'),
('Git', 'DevOps', 'Distributed version control system for tracking changes in source code during software development and collaboration.'),

-- Mobile
('React Native', 'Mobile', 'Framework for building native mobile applications using React and JavaScript across iOS and Android.'),
('Flutter', 'Mobile', 'Google''s open-source UI software development kit for building natively compiled multi-platform applications from a single codebase.'),
('iOS Development', 'Mobile', 'Developing native mobile applications for Apple iOS devices using Swift, SwiftUI, and UIKit.'),
('Android Development', 'Mobile', 'Building native applications for the Android operating system using Kotlin, Java, and Android Jetpack.'),

-- Database
('SQL', 'Database', 'Standardized domain-specific language used for managing and querying data held in relational database systems.'),
('PostgreSQL', 'Database', 'Powerful, open-source object-relational database system with a strong reputation for reliability, feature robustness, and performance.'),
('MongoDB', 'Database', 'Source-available, cross-platform document-oriented database classified as a NoSQL database program.'),
('Redis', 'Database', 'Open-source, in-memory data structure store used as a distributed, in-memory key-value database, cache, and message broker.'),
('Firebase', 'Database', 'Platform developed by Google for creating mobile and web applications with real-time NoSQL databases and authentication.'),

-- Soft Skills
('Public Speaking', 'Soft Skills', 'The act or skill of delivering speeches or presentations effectively before a live or virtual audience.'),
('Technical Writing', 'Soft Skills', 'Writing and documenting complex technical concepts, processes, architecture, and API specifications clearly.'),
('Project Management', 'Soft Skills', 'Practice of leading the work of a team to achieve all project goals within given constraints of time and budget.'),
('Leadership', 'Soft Skills', 'Ability of an individual or organization to guide, motivate, and influence others toward shared vision and success.'),
('Communication', 'Soft Skills', 'Process of conveying intended meanings from one entity or group to another through clear speech, listening, and writing.')
ON CONFLICT (name, category) DO NOTHING;
