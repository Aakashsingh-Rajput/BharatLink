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
            {/* India Map with SVG */}
            <div className="relative w-full h-full">
              <svg
                viewBox="0 0 450 500"
                className="w-full h-full"
                fill="hsl(var(--secondary))"
                stroke="hsl(var(--border))"
                strokeWidth="0.5"
              >
                {/* India outline */}
                <path d="M125.1 1.5 L121.5 12.3 L103.8 10.2 L101.4 15 L91.8 17.7 L93.6 22.8 L90.3 27.6 L88.5 35.4 L93 42.6 L86.1 48.3 L83.1 55.5 L78.6 57.3 L70.5 54.9 L61.2 59.4 L54 57.3 L42.9 63.3 L40.5 69.3 L27 72 L18.6 77.4 L13.5 83.7 L13.5 89.1 L17.1 93.3 L12.3 98.7 L14.7 106.8 L20.4 111 L21.3 120 L27.6 125.1 L41.1 129.3 L39.3 134.4 L46.8 141.6 L56.1 144.9 L60.3 151.2 L57.6 156.6 L61.2 165.6 L72.6 170.1 L83.1 171.3 L92.4 179.4 L96 189.6 L108 193.5 L119.7 186.9 L126.9 189 L134.1 184.8 L137.4 187.8 L143.7 186.6 L150.3 190.8 L154.5 204 L150.3 213.6 L156.9 220.5 L164.7 219.6 L174 220.5 L178.5 229.8 L180.6 242.4 L187.2 250.8 L192.6 250.2 L201.3 256.5 L204.9 266.4 L216.6 270 L220.5 284.4 L220.2 295.5 L226.5 304.8 L235.8 308.7 L238.5 316.2 L246.3 322.8 L246.3 329.4 L240 334.8 L241.5 344.1 L249.9 350.4 L251.7 358.5 L258.9 363.3 L258.9 369.3 L265.5 375.6 L267.3 385.5 L276.9 392.4 L276.3 398.7 L285 404.1 L286.2 411.3 L293.4 417.3 L293.4 425.4 L298.5 431.1 L303.6 443.4 L309.9 446.7 L315.9 456 L320.1 465.3 L327 470.1 L333.6 476.1 L341.1 476.7 L347.1 482.4 L357.3 483.9 L363.3 489.6 L369 499.2 L378.1 493.5 L382.6 484.2 L379.6 477.3 L383.5 471.9 L380.2 465 L375.1 459 L370.6 453.9 L362.8 450.9 L358.3 441.9 L351.4 436.5 L346.9 426 L342.1 418.8 L332.2 414.9 L329.2 405.3 L320.4 399.3 L317.8 387.6 L311.2 381.3 L313.3 371.1 L319.3 365.1 L320.5 354 L327.1 349.5 L333.7 341.1 L331.3 332.7 L336.1 326.4 L339.1 316.2 L348.1 310.2 L354.1 312 L363.4 308.7 L370.9 300.9 L378.1 300.9 L384.4 294 L390.1 296.4 L396.1 292.2 L402.4 294.9 L409.3 290.7 L414.4 294.6 L421.3 290.4 L429.1 294 L437.2 288 L440.8 279 L436.9 271.8 L440.2 263.1 L434.8 259.2 L430.3 251.7 L421.3 251.7 L415.9 243.6 L410.5 243.6 L405.1 236.4 L408.1 228 L402.4 222.6 L406 216 L402.7 207.3 L396.4 204.6 L390.1 200.7 L390.7 192 L385.3 186.9 L376.9 189 L370.9 184.2 L364.6 186.3 L358.3 181.8 L348.1 183.3 L340.3 179.4 L334.6 171.6 L328.6 174.6 L322.9 169.5 L316.3 171.9 L308.8 165.6 L302.5 167.7 L296.2 162 L290.2 165 L283.3 161.4 L278.2 153.9 L283.3 147.3 L280.6 138 L285.4 131.7 L278.5 125.7 L272.8 127.8 L269.8 123.3 L261.7 125.1 L253.3 120.6 L250.9 111.6 L244 113.1 L238.2 107.4 L244.3 100.2 L238.2 92.4 L229.2 96 L222.9 91.5 L217.2 95.1 L210.6 89.7 L204.3 93.3 L199.2 88.5 L190.5 92.4 L183.1 87.9 L185.2 78.3 L178.2 73.5 L170.1 78.3 L164.1 73.8 L159.9 77.7 L150.9 74.4 L152.1 66.9 L145.2 60.9 L137.7 66 L130.2 60.3 L125.1 63.6 L125.1 1.5 Z" />
              </svg>
              
              {/* Skill Markers positioned on actual coordinates */}
              {filteredSkills.map((skill) => 
                skill.regions.map((region, regionIndex) => {
                  // Convert lat/lng to SVG coordinates (approximate mapping for India)
                  const x = ((region.coordinates.lng + 68) / 37) * 450; // India spans roughly 37 degrees longitude
                  const y = ((region.coordinates.lat - 6) / 37) * 500; // India spans roughly 37 degrees latitude
                  
                  return (
                    <div
                      key={`${skill.id}-${regionIndex}`}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `${Math.max(0, Math.min(100, (x / 450) * 100))}%`,
                        top: `${Math.max(0, Math.min(100, (y / 500) * 100))}%`,
                      }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => handleSkillClick(skill)}
                    >
                      <div className="relative">
                        <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs transition-transform hover:scale-110 ${
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
                  );
                })
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
