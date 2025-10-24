import { Opportunity } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Building, 
  Users, 
  Star, 
  Clock, 
  X,
  Shield,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";

type OpportunityDetailsModalProps = {
  opportunity: Opportunity;
  isOpen: boolean;
  onClose: () => void;
};

export default function OpportunityDetailsModal({ 
  opportunity, 
  isOpen, 
  onClose 
}: OpportunityDetailsModalProps) {
  // Mock artisan data for this opportunity
  const relatedArtisans = [
    {
      id: "art-1",
      name: "Sita Devi",
      craft: "Block Printing",
      location: "Jaipur, Rajasthan",
      rating: 4.8,
      reviewCount: 127,
      trustScore: 95,
      completedProjects: 89,
      yearsOfExperience: 15,
      profileImageUrl: "https://picsum.photos/seed/artisan1/200/200",
      bio: "Master artisan specializing in traditional Bagru and Sanganeri block printing techniques.",
      skills: ["Block Printing", "Natural Dyes", "Textile Design", "Pattern Making"],
      availability: "Available for projects",
      responseTime: "Usually responds within 2 hours"
    },
    {
      id: "art-2", 
      name: "Arjun Singh",
      craft: "Natural Dyes",
      location: "Ahmedabad, Gujarat",
      rating: 4.6,
      reviewCount: 94,
      trustScore: 92,
      completedProjects: 67,
      yearsOfExperience: 12,
      profileImageUrl: "https://picsum.photos/seed/artisan2/200/200",
      bio: "Expert in traditional natural dyeing techniques with deep knowledge of plant-based colors.",
      skills: ["Natural Dyes", "Color Theory", "Fabric Treatment", "Quality Control"],
      availability: "Available for projects",
      responseTime: "Usually responds within 4 hours"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-500 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold">{opportunity.title}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company & Location Info */}
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span className="font-medium">{opportunity.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span className="font-medium text-green-600">Trust Score: {opportunity.trustScore}%</span>
            </div>
          </div>

          <Separator />

          {/* Job Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Job Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {opportunity.description}
            </p>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {opportunity.skillsRequired.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Related Artisans */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recommended Artisans</h3>
            <p className="text-sm text-muted-foreground mb-4">
              These artisans have the skills and experience relevant to this opportunity:
            </p>
            
            <div className="space-y-4">
              {relatedArtisans.map((artisan) => (
                <div key={artisan.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <img
                      src={artisan.profileImageUrl}
                      alt={artisan.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{artisan.name}</h4>
                        <div className="flex items-center gap-1">
                          {renderStars(artisan.rating)}
                          <span className="text-sm text-muted-foreground ml-1">
                            ({artisan.reviewCount})
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{artisan.bio}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {artisan.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {artisan.completedProjects} projects
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {artisan.yearsOfExperience} years exp
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {artisan.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {artisan.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{artisan.skills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">{artisan.availability}</span>
                          <span className="text-muted-foreground ml-2">• {artisan.responseTime}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                          <Button size="sm">
                            <ArrowRight className="h-4 w-4 mr-1" />
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Apply for this Opportunity
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Contact Company
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
