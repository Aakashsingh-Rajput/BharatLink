"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OpportunityList from "@/components/opportunities/opportunity-list";
import { EnhancedSearch } from "@/components/ui/enhanced-search";
import { useSearch } from "@/hooks/use-search";
import { opportunities } from "@/lib/data";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function OpportunitiesPage() {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems,
    searchStats,
    availableSkills,
    availableLocations,
    availableTypes,
    availableStatuses,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    clearFilters,
  } = useSearch({
    items: opportunities,
    initialSortBy: 'trustScore',
    initialSortOrder: 'desc'
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Find Your Next Opportunity
        </h1>
        <p className="text-muted-foreground">
          Browse jobs, projects, and collaboration requests tailored for you.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Opportunities</CardTitle>
          <CardDescription>
            Find the perfect opportunity that matches your skills and interests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EnhancedSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            availableSkills={availableSkills}
            availableLocations={availableLocations}
            availableTypes={availableTypes}
            availableStatuses={availableStatuses}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            searchStats={searchStats}
            onClearFilters={clearFilters}
            placeholder="Search by title, skill, company, or location..."
            showAdvancedFilters={true}
            showSortOptions={true}
            showStats={true}
          />
        </CardContent>
      </Card>

      <Suspense fallback={<OpportunityListSkeleton />}>
        <OpportunityList 
          searchQuery={searchQuery} 
          filters={filters.type || []} 
          opportunities={filteredItems}
        />
      </Suspense>
    </div>
  );
}

function OpportunityListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
            <CardHeader>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-9 w-24" />
            </CardFooter>
        </Card>
      ))}
    </div>
  )
}
