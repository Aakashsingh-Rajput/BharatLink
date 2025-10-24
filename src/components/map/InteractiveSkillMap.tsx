"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Users, TrendingUp, Info, Star, LocateIcon, Search, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import skillsData from "@/data/skills.json";

interface SkillLocation {
  id: string;
  name: string;
  description: string;
  regions: Array<{
    state: string;
    cities: string[];
    coordinates: { lat: number; lng: number };
  }>;
  demand: string;
  averageSalary: string;
  artisanCount: number;
}

interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  skills: SkillLocation[];
}

interface InteractiveSkillMapProps {
  selectedCategory?: string;
  searchTerm?: string;
  onSkillSelect?: (skill: SkillLocation) => void;
}

// Utility function to ensure proper rupee symbol display
const formatRupeeAmount = (amount: string) => {
  return `₹${amount.replace('₹', '')}`;
};

// Component for displaying rupee amounts with proper styling
const RupeeAmount = ({ amount }: { amount: string }) => (
  <span className="font-mono rupee-symbol">{formatRupeeAmount(amount)}</span>
);


export function InteractiveSkillMap({ 
  selectedCategory = "all", 
  searchTerm = "", 
  onSkillSelect 
}: InteractiveSkillMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillLocation | null>(null);
  const [mapSearchTerm, setMapSearchTerm] = useState("");
  const [hoveredSkill, setHoveredSkill] = useState<SkillLocation | null>(null);

  const categories = skillsData.skillCategories as SkillCategory[];
  const allSkills = categories.flatMap(category => category.skills);

  const filteredSkills = allSkills.filter(skill => {
    const matchesCategory = selectedCategory === "all" || 
      categories.find(cat => cat.id === selectedCategory)?.skills.includes(skill);
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSkillClick = (skill: SkillLocation) => {
    setSelectedSkill(skill);
    onSkillSelect?.(skill);
  };

  const handleMapSearch = (term: string) => {
    setMapSearchTerm(term);
  };

  const resetMapView = () => {
    setMapSearchTerm("");
  };

  if (!isClient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Skill Map
          </CardTitle>
          <CardDescription>
            Loading interactive map...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] bg-muted/50 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Skill Map
          </CardTitle>
          <CardDescription>
            Click on skill markers to explore detailed information. Interactive visualization of traditional skills across India.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Map Controls */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills, locations, or states..."
                value={mapSearchTerm}
                onChange={(e) => handleMapSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={resetMapView}>
                <RotateCcw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
          
          <div className="h-[500px] rounded-lg overflow-hidden border relative bg-gradient-to-br from-blue-50 to-green-50">
            {/* Interactive Skill Visualization */}
            <div className="relative w-full h-full">
              {/* India Map Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">Interactive Skill Map</h3>
                    <p className="text-muted-foreground">
                      Explore traditional crafts across India
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Skill Markers */}
              {filteredSkills.map((skill, index) => 
                skill.regions.map((region, regionIndex) => (
                  <div
                    key={`${skill.id}-${regionIndex}`}
                    className="absolute cursor-pointer group"
                    style={{
                      top: `${20 + (index * 12 + regionIndex * 8) % 70}%`,
                      left: `${15 + (index * 18 + regionIndex * 12) % 75}%`,
                    }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => handleSkillClick(skill)}
                  >
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm transition-transform hover:scale-110 ${
                        skill.demand === 'high' ? 'bg-red-500' : 
                        skill.demand === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}>
                        {skill.artisanCount > 1000 ? 'H' : skill.artisanCount > 500 ? 'M' : 'L'}
                      </div>
                      {hoveredSkill?.id === skill.id && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-white rounded-lg shadow-lg border z-10">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-sm">{skill.name}</h4>
                            <Badge 
                              variant={skill.demand === 'high' ? 'default' : skill.demand === 'medium' ? 'secondary' : 'outline'}
                              className="text-xs"
                            >
                              {skill.demand} demand
                            </Badge>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-3">{skill.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs">
                              <LocateIcon className="h-3 w-3 text-muted-foreground" />
                              <span className="font-medium">{region.state}</span>
                              <span className="text-muted-foreground">• {region.cities.join(", ")}</span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3 text-muted-foreground" />
                                <span className="font-medium">{skill.artisanCount.toLocaleString()}</span>
                                <span className="text-muted-foreground">artisans</span>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                                <span className="font-medium">
                                  <RupeeAmount amount={skill.averageSalary} />
                                </span>
                              </div>
                            </div>
                            
                            <Button 
                              size="sm" 
                              className="w-full mt-2 text-xs"
                              onClick={() => handleSkillClick(skill)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Map Legend */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border z-10">
              <h4 className="font-semibold text-sm mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>High Demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Medium Demand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Low Demand</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">H</div>
                  <span>1000+ artisans</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">M</div>
                  <span>500-999 artisans</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">L</div>
                  <span>&lt;500 artisans</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Skill Details */}
      {selectedSkill && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              {selectedSkill.name} - Details
            </CardTitle>
            <CardDescription>
              Comprehensive information about this traditional skill
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedSkill.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Locations</h4>
                <div className="space-y-1">
                  {selectedSkill.regions.map((region, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <LocateIcon className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{region.state}</span>
                      <span className="text-muted-foreground">• {region.cities.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">{selectedSkill.artisanCount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Artisans</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold">
                    <RupeeAmount amount={selectedSkill.averageSalary} />
                  </div>
                  <div className="text-xs text-muted-foreground">Average Salary</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge 
                  variant={selectedSkill.demand === 'high' ? 'default' : selectedSkill.demand === 'medium' ? 'secondary' : 'outline'}
                >
                  {selectedSkill.demand} demand
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Market demand level
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
