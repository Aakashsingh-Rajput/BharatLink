"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, Search, Star, Users, Award } from "lucide-react";
import ArtisanCard from "@/components/collaboration/artisan-card";
import { artisans, Artisan } from "@/lib/data";
import { useState, useMemo } from "react";

type SortOption = "rating" | "reviews" | "trust" | "projects" | "experience";

export default function CollaborationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");

  const filteredAndSortedArtisans = useMemo(() => {
    let filtered = artisans;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = artisans.filter(artisan =>
        artisan.craft.toLowerCase().includes(query) ||
        artisan.name.toLowerCase().includes(query) ||
        artisan.location.toLowerCase().includes(query) ||
        // Add more flexible search terms
        (query.includes('pottery') && artisan.craft.toLowerCase().includes('pottery')) ||
        (query.includes('weaving') && artisan.craft.toLowerCase().includes('weaving')) ||
        (query.includes('painting') && artisan.craft.toLowerCase().includes('painting')) ||
        (query.includes('carving') && artisan.craft.toLowerCase().includes('carving')) ||
        (query.includes('embroidery') && artisan.craft.toLowerCase().includes('embroidery')) ||
        (query.includes('toys') && artisan.craft.toLowerCase().includes('toys')) ||
        (query.includes('tie') && artisan.craft.toLowerCase().includes('bandhani')) ||
        (query.includes('dye') && artisan.craft.toLowerCase().includes('bandhani')) ||
        (query.includes('handloom') && artisan.craft.toLowerCase().includes('handloom')) ||
        (query.includes('blue') && artisan.craft.toLowerCase().includes('blue'))
      );
    }

    // Sort by selected criteria
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviewCount - a.reviewCount;
        case "trust":
          return b.trustScore - a.trustScore;
        case "projects":
          return b.completedProjects - a.completedProjects;
        case "experience":
          return b.yearsOfExperience - a.yearsOfExperience;
        default:
          return 0;
      }
    });

    // Ensure minimum 8 profiles are shown, if search results are less than 8, add top-rated artisans
    if (searchQuery.trim() && sorted.length < 8) {
      const remainingArtisans = artisans
        .filter(artisan => !sorted.some(sortedArtisan => sortedArtisan.id === artisan.id))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8 - sorted.length);
      
      return [...sorted, ...remainingArtisans];
    }

    return sorted;
  }, [searchQuery, sortBy]);

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

      <div className="flex flex-col gap-4">
         <div className="flex items-center justify-between">
           <h2 className="text-2xl font-bold font-headline">
             {searchQuery ? `Search Results (${filteredAndSortedArtisans.length})` : `Featured Artisans (${filteredAndSortedArtisans.length})`}
           </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Rating
                  </div>
                </SelectItem>
                <SelectItem value="reviews">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Reviews
                  </div>
                </SelectItem>
                <SelectItem value="trust">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Trust Score
                  </div>
                </SelectItem>
                <SelectItem value="projects">Projects</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

         {filteredAndSortedArtisans.length === 0 ? (
           <div className="text-center py-12">
             <p className="text-muted-foreground">No artisans found matching your search.</p>
           </div>
         ) : (
           <div className="space-y-4">
             {searchQuery && filteredAndSortedArtisans.length >= 8 && (
               <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                 <p className="text-sm text-blue-700">
                   <strong>Showing {filteredAndSortedArtisans.length} artisans</strong> - Results sorted by {sortBy === 'rating' ? 'rating' : sortBy === 'reviews' ? 'review count' : sortBy === 'trust' ? 'trust score' : sortBy === 'projects' ? 'completed projects' : 'years of experience'}
                 </p>
               </div>
             )}
             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {filteredAndSortedArtisans.map((artisan) => (
                 <ArtisanCard key={artisan.id} artisan={artisan} />
               ))}
             </div>
           </div>
         )}
      </div>
    </div>
  );
}
