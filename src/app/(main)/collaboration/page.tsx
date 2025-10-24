"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ArtisanCard from "@/components/collaboration/artisan-card";
import { EnhancedSearch } from "@/components/ui/enhanced-search";
import { useSearch } from "@/hooks/use-search";
import { artisans } from "@/lib/data";

export default function CollaborationPage() {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems: filteredArtisans,
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
    items: artisans,
    initialSortBy: 'rating',
    initialSortOrder: 'desc'
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Urban-Rural Collaboration Hub
        </h1>
        <p className="text-muted-foreground">
          Source authentic crafts or hire skilled individuals for your next
          project.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find Artisans</CardTitle>
          <CardDescription>
            Discover skilled artisans and craftspeople for your projects
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
            placeholder="Search for artisans by skill, name, or location..."
            showAdvancedFilters={true}
            showSortOptions={true}
            showStats={true}
          />
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">
          {searchQuery ? `Search Results (${filteredArtisans.length} artisans found)` : "Featured Artisans"}
        </h2>
        {filteredArtisans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No artisans found matching your search.</p>
            <p className="text-sm text-muted-foreground mt-2">Try searching for different skills like "Pottery", "Weaving", "Wood Carving", "Madhubani", "Bandhani", etc.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["Pottery", "Weaving", "Wood Carving", "Madhubani", "Bandhani", "Embroidery"].map((skill) => (
                <button
                  key={skill}
                  onClick={() => setSearchQuery(skill)}
                  className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
