// Mock Supabase client for Frontend-Only Demo Mode
const chainableMock: any = {
  select: () => chainableMock,
  order: () => chainableMock,
  eq: () => chainableMock,
  neq: () => chainableMock,
  in: () => chainableMock,
  single: async () => ({ data: null, error: null }),
  then: (resolve: any) => resolve({ data: [], error: null }),
  insert: () => chainableMock,
  update: () => chainableMock,
  delete: () => chainableMock,
  upsert: () => chainableMock,
};

export const supabase: any = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: async () => ({ error: null }),
    signUp: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
  },
  from: () => chainableMock,
};

