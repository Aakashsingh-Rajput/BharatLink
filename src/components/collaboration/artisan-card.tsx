import { Artisan } from "@/lib/data";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { MapPin, Star, Users, Award, Calendar } from "lucide-react";
import { Button } from "../ui/button";

type ArtisanCardProps = {
  artisan: Artisan;
};

export default function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <Image
          src={artisan.profileImageUrl}
          alt={`Artisan ${artisan.name}`}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={artisan.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
            <h3 className="text-lg font-bold font-headline text-white">{artisan.name}</h3>
            <p className="text-sm text-primary">{artisan.craft}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold">{artisan.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({artisan.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Award className="h-3 w-3" />
              <span>{artisan.trustScore}%</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{artisan.completedProjects} projects</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{artisan.yearsOfExperience}y exp</span>
            </div>
          </div>

          {/* Location and Profile Button */}
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {artisan.location}
            </p>
            <Button variant="outline" size="sm">Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
