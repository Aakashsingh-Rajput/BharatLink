"use client";

import { Input } from "@/components/ui/input";
import { Mic, Search } from "lucide-react";
import ArtisanCard from "@/components/collaboration/artisan-card";
import { artisans, Artisan } from "@/lib/data";
import { useState, useMemo } from "react";

export default function CollaborationPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtisans = useMemo(() => {
    if (!searchQuery.trim()) {
      return artisans;
    }

    const query = searchQuery.toLowerCase().trim();
    return artisans.filter((artisan) => 
      artisan.craft.toLowerCase().includes(query) ||
      artisan.name.toLowerCase().includes(query) ||
      artisan.location.toLowerCase().includes(query)
    ).sort((a, b) => {
      // Sort by rating (highest first) and then by review count
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviewCount - a.reviewCount;
    });
  }, [searchQuery]);

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

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for artisans by skill (e.g., 'Pottery', 'Weaving')..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Mic className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
      </div>

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
