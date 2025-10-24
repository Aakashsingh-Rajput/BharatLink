# Enhanced Search and Filtering System

This document describes the comprehensive search and filtering system implemented across the BharatLink application.

## Overview

The search system provides powerful, real-time search and filtering capabilities across all major components of the application, including:

- **Opportunities Page**: Search and filter job opportunities
- **Collaboration Page**: Find artisans by skills, location, and other criteria
- **Employer Dashboard**: Filter and manage job applicants
- **Skill Map**: Explore skills and locations with advanced filtering

## Key Features

### 1. Universal Search
- **Text Search**: Search across multiple fields (name, title, description, skills, location, company)
- **Fuzzy Matching**: Intelligent search that finds results even with typos
- **Real-time Suggestions**: Auto-complete suggestions for skills and locations
- **Highlighted Results**: Search terms are highlighted in results

### 2. Advanced Filtering
- **Skills Filter**: Filter by specific skills or skill categories
- **Location Filter**: Filter by state, city, or region
- **Type Filter**: Filter by job type (Full-time, Part-time, Contract)
- **Status Filter**: Filter by application or job status
- **Rating Filter**: Filter by minimum rating threshold
- **Experience Filter**: Filter by years of experience
- **Salary Range**: Filter by salary range (for opportunities)

### 3. Sorting Options
- **Rating**: Sort by user/artisan rating
- **Name/Title**: Alphabetical sorting
- **Location**: Geographic sorting
- **Experience**: Sort by years of experience
- **Date**: Sort by application/posted date
- **Ascending/Descending**: Toggle sort order

### 4. Search Statistics
- **Result Count**: Shows filtered vs total results
- **Percentage**: Displays percentage of total results shown
- **Real-time Updates**: Statistics update as filters change

## Technical Implementation

### Core Components

#### 1. Search Utilities (`src/lib/search-utils.ts`)
```typescript
// Generic search function
export function searchItems<T extends SearchableItem>(
  items: T[],
  filters: SearchFilters
): T[]

// Sorting function
export function sortItems<T extends SearchableItem>(
  items: T[],
  sortBy: string,
  sortOrder: 'asc' | 'desc'
): T[]

// Fuzzy search
export function fuzzySearch<T extends SearchableItem>(
  items: T[],
  query: string,
  threshold: number = 0.6
): T[]
```

#### 2. Search Hook (`src/hooks/use-search.ts`)
```typescript
export function useSearch<T extends SearchableItem>({
  items,
  initialFilters = {},
  initialSortBy = 'rating',
  initialSortOrder = 'desc'
}: UseSearchOptions<T>): UseSearchReturn<T>
```

#### 3. Enhanced Search Component (`src/components/ui/enhanced-search.tsx`)
```typescript
interface EnhancedSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: SearchFilters;
  onFiltersChange: (filters: Partial<SearchFilters>) => void;
  // ... other props
}
```

### Data Structure

#### SearchableItem Interface
```typescript
interface SearchableItem {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  skills?: string[];
  skillsRequired?: string[];
  location?: string;
  type?: string;
  status?: string;
  rating?: number;
  experience?: string;
  salary?: string;
  craft?: string;
  company?: string;
}
```

#### SearchFilters Interface
```typescript
interface SearchFilters {
  query?: string;
  skills?: string[];
  location?: string;
  type?: string[];
  status?: string[];
  rating?: number;
  experience?: string;
  salaryRange?: { min: number; max: number };
}
```

## Usage Examples

### Basic Search Implementation
```typescript
import { useSearch } from '@/hooks/use-search';
import { EnhancedSearch } from '@/components/ui/enhanced-search';

function MyComponent() {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems,
    searchStats,
    availableSkills,
    availableLocations,
    clearFilters,
  } = useSearch({
    items: myData,
    initialSortBy: 'rating',
    initialSortOrder: 'desc'
  });

  return (
    <EnhancedSearch
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      filters={filters}
      onFiltersChange={setFilters}
      availableSkills={availableSkills}
      availableLocations={availableLocations}
      searchStats={searchStats}
      onClearFilters={clearFilters}
      placeholder="Search..."
    />
  );
}
```

### Custom Search Implementation
```typescript
import { searchItems, sortItems } from '@/lib/search-utils';

const filteredItems = searchItems(myData, {
  query: 'pottery',
  skills: ['Ceramics', 'Glazing'],
  location: 'Rajasthan',
  rating: 4.0
});

const sortedItems = sortItems(filteredItems, 'rating', 'desc');
```

## Performance Optimizations

### 1. Memoization
- All search and filter operations are memoized using `useMemo`
- Prevents unnecessary recalculations on re-renders

### 2. Debounced Search
- Search input is debounced to prevent excessive API calls
- Configurable debounce delay (default: 300ms)

### 3. Efficient Filtering
- Filters are applied in order of selectivity
- Early termination for expensive operations
- Indexed search for common queries

### 4. Lazy Loading
- Large datasets are paginated
- Virtual scrolling for very large lists
- Progressive loading of suggestions

## Accessibility Features

### 1. Keyboard Navigation
- Full keyboard support for all search controls
- Tab navigation through filter options
- Enter key to apply filters

### 2. Screen Reader Support
- Proper ARIA labels and descriptions
- Announcements for search results
- Clear focus management

### 3. Visual Indicators
- Clear active filter indicators
- Loading states for search operations
- Error states with helpful messages

## Customization Options

### 1. Search Configuration
```typescript
const searchConfig = {
  debounceDelay: 300,
  minQueryLength: 2,
  maxSuggestions: 10,
  fuzzyThreshold: 0.6,
  highlightMatches: true
};
```

### 2. Filter Customization
```typescript
const customFilters = {
  showAdvancedFilters: true,
  showSortOptions: true,
  showStats: true,
  availableFilterTypes: ['skills', 'location', 'rating'],
  customFilterComponents: {
    'custom-filter': CustomFilterComponent
  }
};
```

### 3. Styling Options
```typescript
const searchStyles = {
  theme: 'default' | 'minimal' | 'compact',
  size: 'sm' | 'md' | 'lg',
  variant: 'outline' | 'filled' | 'ghost'
};
```

## Testing

### Unit Tests
- Search utility functions
- Filter logic
- Sort operations
- Hook behavior

### Integration Tests
- Component interactions
- Search flow end-to-end
- Performance benchmarks

### User Testing
- Search accuracy
- Filter usability
- Performance on large datasets

## Future Enhancements

### 1. Advanced Features
- **Saved Searches**: Save and reuse search configurations
- **Search History**: Track and display recent searches
- **Smart Suggestions**: AI-powered search suggestions
- **Geographic Search**: Map-based location filtering

### 2. Performance Improvements
- **Search Indexing**: Pre-built search indexes
- **Caching**: Redis-based search result caching
- **CDN Integration**: Static search data on CDN

### 3. Analytics
- **Search Analytics**: Track search patterns and success rates
- **A/B Testing**: Test different search configurations
- **User Behavior**: Analyze how users interact with search

## Troubleshooting

### Common Issues

1. **Slow Search Performance**
   - Check dataset size
   - Verify memoization is working
   - Consider implementing pagination

2. **Missing Search Results**
   - Verify search query format
   - Check filter logic
   - Ensure data structure matches SearchableItem interface

3. **Filter Not Working**
   - Check filter value format
   - Verify data contains expected values
   - Test filter logic independently

### Debug Mode
Enable debug mode to see detailed search logs:
```typescript
const { debug } = useSearch({
  items: myData,
  debug: true
});
```

## Contributing

When adding new search features:

1. Update the `SearchableItem` interface if needed
2. Add new filter types to `SearchFilters`
3. Implement filter logic in `searchItems`
4. Add UI controls in `EnhancedSearch`
5. Update tests and documentation
6. Test with various data types and sizes

## Support

For questions or issues with the search system:

1. Check this documentation
2. Review the code examples
3. Test with the provided sample data
4. Create an issue with detailed reproduction steps
