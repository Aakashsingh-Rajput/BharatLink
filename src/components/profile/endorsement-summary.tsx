"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Bot } from "lucide-react";
import { generateEndorsementSummary } from "@/ai/flows/generate-endorsement-summary";
import { ChakraLoader } from "../ui/loader";

type EndorsementSummaryProps = {
  endorsements: string[];
};

export default function EndorsementSummary({ endorsements }: EndorsementSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError(null);
    setSummary(null);
    try {
      const result = await generateEndorsementSummary({ endorsements });
      setSummary(result.summary);
    } catch (e) {
      setError("Failed to generate summary. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-background">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">AI Endorsement Summary</CardTitle>
        </div>
        <CardDescription>
          A concise summary of your skills and strengths based on endorsements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {summary && <p className="text-sm text-foreground">{summary}</p>}
        {!summary && !isLoading && !error && (
            <div className="text-center p-4 border border-dashed rounded-lg">
                <p className="text-muted-foreground text-sm">Click the button to generate your AI-powered summary.</p>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateSummary} disabled={isLoading}>
          {isLoading ? (
            <>
              <ChakraLoader className="mr-2 h-4 w-4" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Summary
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
