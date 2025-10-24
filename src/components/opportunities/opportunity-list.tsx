"use client";

import { useState, useEffect, useMemo } from "react";
import {
  suggestRelevantOpportunities,
  type RelevantOpportunitiesOutput,
} from "@/ai/flows/suggest-relevant-opportunities";
import { currentUser } from "@/lib/data";
import OpportunityCard from "./opportunity-card";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type OpportunityListProps = {
  searchQuery?: string;
  filters?: string[];
};

export default function OpportunityList({ searchQuery = "", filters = [] }: OpportunityListProps) {
  const [allOpportunities, setAllOpportunities] =
    useState<RelevantOpportunitiesOutput["opportunities"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter opportunities based on search query and filters
  const filteredOpportunities = useMemo(() => {
    if (!allOpportunities) return null;

    let filtered = allOpportunities;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(opportunity =>
        opportunity.title.toLowerCase().includes(query) ||
        opportunity.description.toLowerCase().includes(query) ||
        opportunity.skillsRequired.some(skill => 
          skill.toLowerCase().includes(query)
        ) ||
        opportunity.company.toLowerCase().includes(query) ||
        opportunity.location.toLowerCase().includes(query)
      );
    }

    // Apply type filters
    if (filters.length > 0) {
      filtered = filtered.filter(opportunity => {
        // This is a simplified filter - in a real app, you'd have job type data
        return true; // For now, we'll show all opportunities
      });
    }

    return filtered;
  }, [allOpportunities, searchQuery, filters]);

  useEffect(() => {
    async function fetchOpportunities() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await suggestRelevantOpportunities({
          skills: currentUser.skills,
          location: currentUser.location,
          endorsements: currentUser.endorsements.length,
          jobTypes: ["full-time", "contract", "part-time"],
          industry: "Handicrafts",
        });
        setAllOpportunities(result.opportunities);
      } catch (e) {
        setError("Failed to load opportunities. Please try again later.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOpportunities();
  }, []);

  if (isLoading) {
    return <OpportunityListSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!filteredOpportunities || filteredOpportunities.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed rounded-lg">
        <h3 className="text-xl font-semibold font-headline">
          {searchQuery || filters.length > 0 ? "No Matching Opportunities Found" : "No Opportunities Found"}
        </h3>
        <p className="text-muted-foreground mt-2">
          {searchQuery || filters.length > 0 
            ? "Try adjusting your search criteria or filters."
            : "We couldn't find any opportunities matching your profile right now."
          }
        </p>
        {searchQuery && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Search results for: "{searchQuery}"</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {searchQuery && (
        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredOpportunities.length} result{filteredOpportunities.length !== 1 ? 's' : ''} for "{searchQuery}"
        </div>
      )}
      {filteredOpportunities.map((opp, index) => (
        <OpportunityCard key={index} opportunity={opp} />
      ))}
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
