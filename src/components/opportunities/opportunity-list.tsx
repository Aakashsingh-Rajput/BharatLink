"use client";

import { useState, useEffect } from "react";
import {
  suggestRelevantOpportunities,
  type RelevantOpportunitiesOutput,
} from "@/ai/flows/suggest-relevant-opportunities";
import { currentUser, Opportunity } from "@/lib/data";
import OpportunityCard from "./opportunity-card";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

type OpportunityListProps = {
  searchQuery?: string;
  filters?: string[];
  opportunities?: Opportunity[];
};

export default function OpportunityList({ 
  searchQuery = "", 
  filters = [], 
  opportunities: providedOpportunities 
}: OpportunityListProps) {
  const [aiOpportunities, setAiOpportunities] = useState<RelevantOpportunitiesOutput["opportunities"] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use provided opportunities or fetch from AI
  const allOpportunities = providedOpportunities || aiOpportunities;

  useEffect(() => {
    if (!providedOpportunities) {
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
          setAiOpportunities(result.opportunities);
        } catch (e) {
          setError("Failed to load opportunities. Please try again later.");
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      }

      fetchOpportunities();
    }
  }, [providedOpportunities]);

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

  if (!allOpportunities || allOpportunities.length === 0) {
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
          Showing {allOpportunities.length} result{allOpportunities.length !== 1 ? 's' : ''} for "{searchQuery}"
        </div>
      )}
      {allOpportunities.map((opp, index) => (
        <OpportunityCard key={opp.id || index} opportunity={opp} />
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
