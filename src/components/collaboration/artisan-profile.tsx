import { Artisan } from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { 
  Star, 
  MapPin, 
  Users, 
  Award, 
  Calendar, 
  Phone, 
  Mail, 
  MessageCircle,
  X,
  Shield,
  Heart
} from "lucide-react";

type ArtisanProfileProps = {
  artisan: Artisan;
  isOpen: boolean;
  onClose: () => void;
};

export default function ArtisanProfile({ artisan, isOpen, onClose }: ArtisanProfileProps) {
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

  const sampleReviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "Exceptional work! The quality and attention to detail is outstanding. Highly recommended.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 4,
      comment: "Great craftsmanship and timely delivery. Will definitely work with again.",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Anita Patel",
      rating: 5,
      comment: "Beautiful work! The traditional techniques are preserved perfectly.",
      date: "2 months ago"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold">{artisan.name}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Section */}
          <div className="relative">
            <Image
              src={artisan.profileImageUrl}
              alt={`Artisan ${artisan.name}`}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <h2 className="text-xl font-bold">{artisan.craft}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {artisan.location}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-bold">{artisan.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground">Rating</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="font-bold">{artisan.reviewCount}</span>
              </div>
              <p className="text-sm text-muted-foreground">Reviews</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="h-4 w-4 text-green-500" />
                <span className="font-bold">{artisan.completedProjects}</span>
              </div>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="h-4 w-4 text-purple-500" />
                <span className="font-bold">{artisan.yearsOfExperience}</span>
              </div>
              <p className="text-sm text-muted-foreground">Years</p>
            </div>
          </div>

          {/* Trust Score */}
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800">
              Trust Score: {artisan.trustScore}%
            </span>
            <Badge variant="secondary" className="ml-auto">
              Verified Artisan
            </Badge>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About {artisan.name}</h3>
            <p className="text-muted-foreground leading-relaxed">
              A skilled {artisan.craft.toLowerCase()} artisan with {artisan.yearsOfExperience} years of experience. 
              Specializing in traditional techniques passed down through generations, {artisan.name} has completed 
              {artisan.completedProjects} projects with a {artisan.rating}-star rating. Based in {artisan.location}, 
              they bring authentic craftsmanship to every piece.
            </p>
          </div>

          {/* Skills & Specializations */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Skills & Specializations</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{artisan.craft}</Badge>
              <Badge variant="outline">Traditional Techniques</Badge>
              <Badge variant="outline">Quality Craftsmanship</Badge>
              <Badge variant="outline">Custom Orders</Badge>
              <Badge variant="outline">Bulk Production</Badge>
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Recent Reviews</h3>
            <div className="space-y-4">
              {sampleReviews.map((review) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{review.name}</span>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Artisan
            </Button>
            <Button variant="outline" className="flex-1">
              <Heart className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
            <Button variant="outline">
              <Phone className="h-4 w-4" />
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