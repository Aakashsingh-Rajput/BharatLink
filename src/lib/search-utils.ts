// Search and filtering utilities for the application

export interface SearchFilters {
  query?: string;
  skills?: string[];
  location?: string;
  type?: string[];
  status?: string[];
  rating?: number;
  experience?: string;
  salaryRange?: { min: number; max: number };
}

export interface SearchableItem {
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

// Generic search function that works with any searchable item
export function searchItems<T extends SearchableItem>(
  items: T[],
  filters: SearchFilters
): T[] {
  return items.filter(item => {
    // Text search across multiple fields
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchableText = [
        item.name,
        item.title,
        item.description,
        item.craft,
        item.company,
        ...(item.skills || []),
        ...(item.skillsRequired || [])
      ].filter(Boolean).join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      const itemSkills = item.skills || item.skillsRequired || [];
      const hasMatchingSkill = filters.skills.some(skill =>
        itemSkills.some(itemSkill =>
          itemSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasMatchingSkill) {
        return false;
      }
    }

    // Location filter
    if (filters.location) {
      const location = filters.location.toLowerCase();
      if (!item.location?.toLowerCase().includes(location)) {
        return false;
      }
    }

    // Type filter (for job types)
    if (filters.type && filters.type.length > 0) {
      if (!item.type || !filters.type.includes(item.type.toLowerCase())) {
        return false;
      }
    }

    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!item.status || !filters.status.includes(item.status)) {
        return false;
      }
    }

    // Rating filter
    if (filters.rating && item.rating) {
      if (item.rating < filters.rating) {
        return false;
      }
    }

    // Experience filter
    if (filters.experience && item.experience) {
      const itemExp = parseInt(item.experience);
      const filterExp = parseInt(filters.experience);
      if (isNaN(itemExp) || itemExp < filterExp) {
        return false;
      }
    }

    // Salary range filter
    if (filters.salaryRange && item.salary) {
      const salaryMatch = item.salary.match(/₹([\d,]+)\s*-\s*₹([\d,]+)/);
      if (salaryMatch) {
        const minSalary = parseInt(salaryMatch[1].replace(/,/g, ''));
        const maxSalary = parseInt(salaryMatch[2].replace(/,/g, ''));
        if (minSalary < filters.salaryRange.min || maxSalary > filters.salaryRange.max) {
          return false;
        }
      }
    }

    return true;
  });
}

// Sort items by various criteria
export function sortItems<T extends SearchableItem>(
  items: T[],
  sortBy: string,
  sortOrder: 'asc' | 'desc' = 'desc'
): T[] {
  return [...items].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case 'rating':
        aValue = a.rating || 0;
        bValue = b.rating || 0;
        break;
      case 'name':
      case 'title':
        aValue = (a.name || a.title || '').toLowerCase();
        bValue = (b.name || b.title || '').toLowerCase();
        break;
      case 'location':
        aValue = (a.location || '').toLowerCase();
        bValue = (b.location || '').toLowerCase();
        break;
      case 'experience':
        aValue = parseInt((a.experience || '0').replace(/\D/g, '')) || 0;
        bValue = parseInt((b.experience || '0').replace(/\D/g, '')) || 0;
        break;
      case 'date':
        // For items with appliedDate or postedDate
        aValue = new Date((a as any).appliedDate || (a as any).postedDate || 0).getTime();
        bValue = new Date((b as any).appliedDate || (b as any).postedDate || 0).getTime();
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
}

// Get unique values for filter options
export function getUniqueValues<T extends SearchableItem>(
  items: T[],
  field: keyof SearchableItem
): string[] {
  const values = new Set<string>();
  
  items.forEach(item => {
    const value = item[field];
    if (typeof value === 'string' && value.trim() !== '') {
      values.add(value);
    } else if (Array.isArray(value)) {
      value.forEach(v => {
        if (typeof v === 'string' && v.trim() !== '') {
          values.add(v);
        }
      });
    }
  });

  return Array.from(values).sort();
}

// Get skill suggestions based on search query
export function getSkillSuggestions(
  allSkills: string[],
  query: string,
  limit: number = 5
): string[] {
  if (!query.trim()) return [];
  
  const queryLower = query.toLowerCase();
  return allSkills
    .filter(skill => skill.toLowerCase().includes(queryLower))
    .slice(0, limit);
}

// Get location suggestions
export function getLocationSuggestions(
  allLocations: string[],
  query: string,
  limit: number = 5
): string[] {
  if (!query.trim()) return [];
  
  const queryLower = query.toLowerCase();
  return allLocations
    .filter(location => location.toLowerCase().includes(queryLower))
    .slice(0, limit);
}

// Advanced search with fuzzy matching
export function fuzzySearch<T extends SearchableItem>(
  items: T[],
  query: string,
  threshold: number = 0.6
): T[] {
  if (!query.trim()) return items;

  const queryLower = query.toLowerCase();
  
  return items.filter(item => {
    const searchableText = [
      item.name,
      item.title,
      item.description,
      item.craft,
      item.company,
      ...(item.skills || []),
      ...(item.skillsRequired || [])
    ].filter(Boolean).join(' ').toLowerCase();

    // Simple fuzzy matching based on character similarity
    const similarity = calculateSimilarity(queryLower, searchableText);
    return similarity >= threshold;
  });
}

// Calculate similarity between two strings (simple implementation)
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Levenshtein distance calculation
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Search with highlighting
export function highlightSearchTerm(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// Get search statistics
export function getSearchStats<T extends SearchableItem>(
  items: T[],
  filteredItems: T[]
): {
  total: number;
  filtered: number;
  percentage: number;
} {
  return {
    total: items.length,
    filtered: filteredItems.length,
    percentage: items.length > 0 ? Math.round((filteredItems.length / items.length) * 100) : 0
  };
}
