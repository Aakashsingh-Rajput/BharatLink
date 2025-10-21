import { Input } from "@/components/ui/input";
import { Mic, Search } from "lucide-react";
import ArtisanCard from "@/components/collaboration/artisan-card";
import { artisans } from "@/lib/data";

export default function CollaborationPage() {
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
        />
        <Mic className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">
          Featured Artisans
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </div>
    </div>
  );
}
