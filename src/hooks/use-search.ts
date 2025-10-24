import { useState, useMemo, useCallback } from 'react';
import { SearchFilters, searchItems, sortItems, getUniqueValues, SearchableItem } from '@/lib/search-utils';

interface UseSearchOptions<T extends SearchableItem> {
  items: T[];
  initialFilters?: Partial<SearchFilters>;
  initialSortBy?: string;
  initialSortOrder?: 'asc' | 'desc';
}

interface UseSearchReturn<T extends SearchableItem> {
  // State
  searchQuery: string;
  filters: SearchFilters;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  
  // Computed
  filteredItems: T[];
  searchStats: {
    total: number;
    filtered: number;
    percentage: number;
  };
  
  // Available filter options
  availableSkills: string[];
  availableLocations: string[];
  availableTypes: string[];
  availableStatuses: string[];
  
  // Actions
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  clearFilters: () => void;
  resetSearch: () => void;
  
  // Utility functions
  addSkillFilter: (skill: string) => void;
  removeSkillFilter: (skill: string) => void;
  toggleSkillFilter: (skill: string) => void;
  addTypeFilter: (type: string) => void;
  removeTypeFilter: (type: string) => void;
  toggleTypeFilter: (type: string) => void;
  addStatusFilter: (status: string) => void;
  removeStatusFilter: (status: string) => void;
  toggleStatusFilter: (status: string) => void;
}

export function useSearch<T extends SearchableItem>({
  items,
  initialFilters = {},
  initialSortBy = 'rating',
  initialSortOrder = 'desc'
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [searchQuery, setSearchQuery] = useState(initialFilters.query || '');
  const [filters, setFiltersState] = useState<SearchFilters>({
    ...initialFilters,
    query: searchQuery
  });
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);

  // Update filters and sync with search query
  const setFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters
    }));
    
    // Sync search query with filters
    if (newFilters.query !== undefined) {
      setSearchQuery(newFilters.query);
    }
  }, []);

  // Update search query and sync with filters
  const handleSetSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    setFiltersState(prev => ({
      ...prev,
      query
    }));
  }, []);

  // Get available filter options
  const availableSkills = useMemo(() => {
    const allSkills = items.flatMap(item => [
      ...(item.skills || []),
      ...(item.skillsRequired || [])
    ]);
    return getUniqueValues(items, 'skills').concat(
      getUniqueValues(items, 'skillsRequired')
    ).filter((skill, index, arr) => 
      skill.trim() !== '' && arr.indexOf(skill) === index
    );
  }, [items]);

  const availableLocations = useMemo(() => 
    getUniqueValues(items, 'location').filter(location => location.trim() !== ''), [items]
  );

  const availableTypes = useMemo(() => 
    getUniqueValues(items, 'type').filter(type => type.trim() !== ''), [items]
  );

  const availableStatuses = useMemo(() => 
    getUniqueValues(items, 'status').filter(status => status.trim() !== ''), [items]
  );

  // Filter and sort items
  const filteredItems = useMemo(() => {
    const currentFilters = {
      ...filters,
      query: searchQuery
    };
    
    const filtered = searchItems(items, currentFilters);
    return sortItems(filtered, sortBy, sortOrder);
  }, [items, filters, searchQuery, sortBy, sortOrder]);

  // Search statistics
  const searchStats = useMemo(() => ({
    total: items.length,
    filtered: filteredItems.length,
    percentage: items.length > 0 ? Math.round((filteredItems.length / items.length) * 100) : 0
  }), [items.length, filteredItems.length]);

  // Filter management functions
  const addSkillFilter = useCallback((skill: string) => {
    setFilters({
      skills: [...(filters.skills || []), skill]
    });
  }, [filters.skills, setFilters]);

  const removeSkillFilter = useCallback((skill: string) => {
    setFilters({
      skills: (filters.skills || []).filter(s => s !== skill)
    });
  }, [filters.skills, setFilters]);

  const toggleSkillFilter = useCallback((skill: string) => {
    if (filters.skills?.includes(skill)) {
      removeSkillFilter(skill);
    } else {
      addSkillFilter(skill);
    }
  }, [filters.skills, addSkillFilter, removeSkillFilter]);

  const addTypeFilter = useCallback((type: string) => {
    setFilters({
      type: [...(filters.type || []), type]
    });
  }, [filters.type, setFilters]);

  const removeTypeFilter = useCallback((type: string) => {
    setFilters({
      type: (filters.type || []).filter(t => t !== type)
    });
  }, [filters.type, setFilters]);

  const toggleTypeFilter = useCallback((type: string) => {
    if (filters.type?.includes(type)) {
      removeTypeFilter(type);
    } else {
      addTypeFilter(type);
    }
  }, [filters.type, addTypeFilter, removeTypeFilter]);

  const addStatusFilter = useCallback((status: string) => {
    setFilters({
      status: [...(filters.status || []), status]
    });
  }, [filters.status, setFilters]);

  const removeStatusFilter = useCallback((status: string) => {
    setFilters({
      status: (filters.status || []).filter(s => s !== status)
    });
  }, [filters.status, setFilters]);

  const toggleStatusFilter = useCallback((status: string) => {
    if (filters.status?.includes(status)) {
      removeStatusFilter(status);
    } else {
      addStatusFilter(status);
    }
  }, [filters.status, addStatusFilter, removeStatusFilter]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      query: '',
      skills: [],
      location: '',
      type: [],
      status: [],
      rating: undefined,
      experience: undefined,
      salaryRange: undefined
    });
    setSearchQuery('');
  }, [setFilters]);

  // Reset to initial state
  const resetSearch = useCallback(() => {
    setSearchQuery(initialFilters.query || '');
    setFiltersState(initialFilters);
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
  }, [initialFilters, initialSortBy, initialSortOrder]);

  return {
    // State
    searchQuery,
    filters,
    sortBy,
    sortOrder,
    
    // Computed
    filteredItems,
    searchStats,
    
    // Available filter options
    availableSkills,
    availableLocations,
    availableTypes,
    availableStatuses,
    
    // Actions
    setSearchQuery: handleSetSearchQuery,
    setFilters,
    setSortBy,
    setSortOrder,
    clearFilters,
    resetSearch,
    
    // Utility functions
    addSkillFilter,
    removeSkillFilter,
    toggleSkillFilter,
    addTypeFilter,
    removeTypeFilter,
    toggleTypeFilter,
    addStatusFilter,
    removeStatusFilter,
    toggleStatusFilter
  };
}
