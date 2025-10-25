import { Opportunity } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, MapPin, Building } from "lucide-react";
import { useState } from "react";
import OpportunityDetailsModal from "./opportunity-details-modal";

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-headline">{opportunity.title}</CardTitle>
          <CardDescription className="flex items-center gap-4 pt-1">
            <span className="flex items-center gap-1.5"><Building className="h-3.5 w-3.5" /> {opportunity.company}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {opportunity.location}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {opportunity.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {opportunity.skillsRequired.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm">
            Trust Score:{" "}
            <span className="font-bold text-primary">{opportunity.trustScore}%</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleViewDetails}>
            View Details <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>

      {showDetails && (
        <OpportunityDetailsModal 
          opportunity={opportunity} 
          isOpen={showDetails} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
}
