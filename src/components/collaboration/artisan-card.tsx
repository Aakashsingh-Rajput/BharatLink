import { Artisan } from "@/lib/data";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { MapPin, Star, Users, Award, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import ArtisanProfile from "./artisan-profile";

type ArtisanCardProps = {
  artisan: Artisan;
};

export default function ArtisanCard({ artisan }: ArtisanCardProps) {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  return (
    <>
      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative">
          <Image
            src={artisan.profileImageUrl}
            alt={`Artisan ${artisan.name}`}
            width={400}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
            data-ai-hint={artisan.imageHint}
            onClick={handleProfileClick}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-lg font-bold font-headline text-white">{artisan.name}</h3>
              <p className="text-sm text-primary">{artisan.craft}</p>
          </div>
          {/* Rating overlay */}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="text-xs font-semibold">{artisan.rating}</span>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {artisan.location}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{artisan.reviewCount} reviews</span>
                </div>
            </div>
            
            {/* Stats row */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                <span>{artisan.completedProjects} projects</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{artisan.yearsOfExperience} years</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleProfileClick}
            >
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {showProfile && (
        <ArtisanProfile 
          artisan={artisan} 
          isOpen={showProfile} 
          onClose={() => setShowProfile(false)} 
        />
      )}
    </>
  );
}
