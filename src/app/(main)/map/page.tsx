import { IndiaMap } from "@/components/map/india-map";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { skillClusters } from "@/lib/data";

export default function MapPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Skill Cluster Map</h1>
        <p className="text-muted-foreground">
          Explore India's diverse craft heritage and discover regional skill hotspots.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative w-full max-w-4xl mx-auto aspect-[4/3.5]">
            <IndiaMap clusters={skillClusters} />
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Featured Clusters</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skillClusters.slice(0,3).map((cluster) => (
                <Card key={cluster.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                        <CardTitle className="font-headline">{cluster.name}</CardTitle>
                        <CardDescription>{cluster.description}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
