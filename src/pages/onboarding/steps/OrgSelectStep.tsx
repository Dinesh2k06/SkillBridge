import { useState, useEffect } from 'react';
import { Search, Building2, Plus, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
// Assuming you have a service for this
// import { searchOrganizations } from '@/services/organization.service';

interface OrgSelectStepProps {
  orgType: string;
  selectedOrgId: string | null;
  orgName: string;
  onChange: (orgId: string | null, orgName: string) => void;
}

export default function OrgSelectStep({ orgType, selectedOrgId, orgName, onChange }: OrgSelectStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');

  // Mock search for now
  useEffect(() => {
    if (!searchQuery || isCreating) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        // const res = await searchOrganizations(searchQuery, orgType);
        // setResults(res);
        // Mock data
        setResults([
          { id: '1', name: 'University of Technology', type: 'college' },
          { id: '2', name: 'Tech Innovators Org', type: 'organization' },
        ].filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase())));
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, orgType, isCreating]);

  const handleSelectOrg = (id: string, name: string) => {
    onChange(id, name);
    setIsCreating(false);
  };

  const handleCreateOrg = () => {
    if (newOrgName.trim()) {
      onChange(null, newOrgName);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Find your organization
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Search for your {orgType === 'college' ? 'college/university' : 'organization'} to connect with peers.
        </p>
      </div>

      {!isCreating ? (
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name..."
              className="pl-10 h-12 text-base"
            />
          </div>

          <div className="space-y-3 min-h-[200px]">
            {isSearching ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              </div>
            ) : results.length > 0 ? (
              results.map((org) => (
                <div
                  key={org.id}
                  onClick={() => handleSelectOrg(org.id, org.name)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors",
                    selectedOrgId === org.id
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50"
                  )}
                >
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">{org.name}</span>
                </div>
              ))
            ) : searchQuery ? (
              <div className="text-center py-8 text-gray-500">
                No organizations found matching "{searchQuery}"
              </div>
            ) : null}
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button
              variant="ghost"
              className="w-full text-primary hover:text-primary/90 hover:bg-primary/5"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Can't find your organization? Create one
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Organization Name
              </label>
              <Input
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                placeholder="e.g. Stanford University"
                className="h-12"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreateOrg}
                disabled={!newOrgName.trim()}
              >
                Use this name
              </Button>
            </div>
          </div>
        </div>
      )}

      {orgName && !selectedOrgId && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-900/50 flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          <span>New organization: <strong>{orgName}</strong></span>
        </div>
      )}
    </div>
  );
}
