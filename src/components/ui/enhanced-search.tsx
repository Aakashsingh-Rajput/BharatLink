"use client";

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Filter,
  X,
  Mic,
  SortAsc,
  SortDesc,
  MapPin,
  Star,
  Clock,
  DollarSign,
} from 'lucide-react';
import { SearchFilters } from '@/lib/search-utils';

interface EnhancedSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: SearchFilters;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  availableSkills: string[];
  availableLocations: string[];
  availableTypes: string[];
  availableStatuses: string[];
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  searchStats: {
    total: number;
    filtered: number;
    percentage: number;
  };
  onClearFilters: () => void;
  placeholder?: string;
  showAdvancedFilters?: boolean;
  showSortOptions?: boolean;
  showStats?: boolean;
}

export function EnhancedSearch({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  availableSkills,
  availableLocations,
  availableTypes,
  availableStatuses,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  searchStats,
  onClearFilters,
  placeholder = "Search...",
  showAdvancedFilters = true,
  showSortOptions = true,
  showStats = true,
}: EnhancedSearchProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Generate skill suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const suggestions = availableSkills
        .filter(skill => skill.toLowerCase().includes(query))
        .slice(0, 5);
      setSkillSuggestions(suggestions);
      setShowSkillSuggestions(true);
    } else {
      setShowSkillSuggestions(false);
    }
  }, [searchQuery, availableSkills]);

  // Generate location suggestions
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const suggestions = availableLocations
        .filter(location => location.toLowerCase().includes(query))
        .slice(0, 5);
      setLocationSuggestions(suggestions);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  }, [searchQuery, availableLocations]);

  const handleSkillToggle = (skill: string) => {
    const currentSkills = filters.skills || [];
    if (currentSkills.includes(skill)) {
      onFiltersChange({
        skills: currentSkills.filter(s => s !== skill)
      });
    } else {
      onFiltersChange({
        skills: [...currentSkills, skill]
      });
    }
  };

  const handleTypeToggle = (type: string) => {
    const currentTypes = filters.type || [];
    if (currentTypes.includes(type)) {
      onFiltersChange({
        type: currentTypes.filter(t => t !== type)
      });
    } else {
      onFiltersChange({
        type: [...currentTypes, type]
      });
    }
  };

  const handleStatusToggle = (status: string) => {
    const currentStatuses = filters.status || [];
    if (currentStatuses.includes(status)) {
      onFiltersChange({
        status: currentStatuses.filter(s => s !== status)
      });
    } else {
      onFiltersChange({
        status: [...currentStatuses, status]
      });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSkillSuggestions(false);
    setShowLocationSuggestions(false);
  };

  const hasActiveFilters = 
    (filters.skills && filters.skills.length > 0) ||
    (filters.type && filters.type.length > 0) ||
    (filters.status && filters.status.length > 0) ||
    filters.location ||
    filters.rating ||
    filters.experience;

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={searchInputRef}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-20"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          <Mic className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {(showSkillSuggestions || showLocationSuggestions) && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-md shadow-lg">
            {showSkillSuggestions && skillSuggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground mb-1">Skills</div>
                {skillSuggestions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSuggestionClick(skill)}
                    className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            )}
            {showLocationSuggestions && locationSuggestions.length > 0 && (
              <div className="p-2 border-t">
                <div className="text-xs font-medium text-muted-foreground mb-1">Locations</div>
                {locationSuggestions.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleSuggestionClick(location)}
                    className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded"
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        {showAdvancedFilters && (
          <>
            {/* Skills Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Skills
                  {filters.skills && filters.skills.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {filters.skills.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>Filter by Skills</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableSkills.filter(skill => skill && skill.trim() !== '').map((skill) => (
                  <DropdownMenuCheckboxItem
                    key={skill}
                    checked={filters.skills?.includes(skill) || false}
                    onCheckedChange={() => handleSkillToggle(skill)}
                  >
                    {skill}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Type Filter */}
            {availableTypes.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Type
                    {filters.type && filters.type.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {filters.type.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {availableTypes.filter(type => type && type.trim() !== '').map((type) => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={filters.type?.includes(type) || false}
                      onCheckedChange={() => handleTypeToggle(type)}
                    >
                      {type}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Status Filter */}
            {availableStatuses.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Status
                    {filters.status && filters.status.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {filters.status.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {availableStatuses.filter(status => status && status.trim() !== '').map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={filters.status?.includes(status) || false}
                      onCheckedChange={() => handleStatusToggle(status)}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Location Filter */}
            <Select
              value={filters.location || 'all'}
              onValueChange={(value) => onFiltersChange({ location: value === 'all' ? undefined : value })}
            >
              <SelectTrigger className="w-48">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {availableLocations.filter(location => location && location.trim() !== '').map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            <Select
              value={filters.rating?.toString() || 'any'}
              onValueChange={(value) => onFiltersChange({ 
                rating: value === 'any' ? undefined : parseFloat(value)
              })}
            >
              <SelectTrigger className="w-32">
                <Star className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Rating</SelectItem>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.0">4.0+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
                <SelectItem value="3.0">3.0+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}

        {/* Sort Options */}
        {showSortOptions && (
          <div className="flex items-center gap-2 ml-auto">
            <Select value={sortBy || 'rating'} onValueChange={onSortChange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="location">Location</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="date">Date</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.skills?.map((skill) => (
            <Badge key={skill} variant="secondary" className="gap-1">
              {skill}
              <button
                onClick={() => handleSkillToggle(skill)}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.type?.map((type) => (
            <Badge key={type} variant="secondary" className="gap-1">
              {type}
              <button
                onClick={() => handleTypeToggle(type)}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.status?.map((status) => (
            <Badge key={status} variant="secondary" className="gap-1">
              {status}
              <button
                onClick={() => handleStatusToggle(status)}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.location && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" />
              {filters.location}
              <button
                onClick={() => onFiltersChange({ location: undefined })}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.rating && (
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3" />
              {filters.rating}+ Stars
              <button
                onClick={() => onFiltersChange({ rating: undefined })}
                className="ml-1 hover:bg-muted rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Search Stats */}
      {showStats && (
        <div className="text-sm text-muted-foreground">
          Showing {searchStats.filtered} of {searchStats.total} results
          {searchStats.percentage < 100 && ` (${searchStats.percentage}% of total)`}
        </div>
      )}
    </div>
  );
}
