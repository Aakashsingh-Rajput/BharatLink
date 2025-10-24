"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  MapPin,
  Users,
  TrendingUp,
  Filter,
  Search,
  Info,
  Star,
  LocateIcon,
} from "lucide-react";
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const chartConfig = {
  artisanCount: {
    label: "Artisan Count",
  },
  averageSalary: {
    label: "Average Salary",
  },
} satisfies ChartConfig;

export function EnhancedSkillMap() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"map" | "charts" | "list">("map");
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

  // Prepare chart data
  const barChartData = filteredSkills.map(skill => ({
    name: skill.name,
    artisans: skill.artisanCount,
    salary: parseInt(skill.averageSalary.split(' - ')[1].replace('₹', '').replace(',', '')),
  }));

  const pieChartData = categories.map((category, index) => ({
    name: category.name,
    value: category.skills.reduce((sum, skill) => sum + skill.artisanCount, 0),
    color: COLORS[index % COLORS.length],
  }));

  const demandData = filteredSkills.map(skill => ({
    name: skill.name,
    demand: skill.demand === 'high' ? 3 : skill.demand === 'medium' ? 2 : 1,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Skill Map & Analytics</h1>
          <p className="text-muted-foreground">
            Explore traditional crafts across India with detailed location data and analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Users className="h-3 w-3" />
            {skillsData.statistics.totalArtisans.toLocaleString()} artisans
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Star className="h-3 w-3" />
            {skillsData.statistics.totalSkills} skills
          </Badge>
        </div>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search skills or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as typeof viewMode)}>
              <TabsList>
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="charts">Analytics</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
      </Card>

      {viewMode === "map" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Interactive Skill Map
                </CardTitle>
                <CardDescription>
                  Click on skill clusters to explore detailed information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold">Interactive Map Coming Soon</h3>
                      <p className="text-muted-foreground">
                        This will integrate with a mapping service like Mapbox or Google Maps
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Features: Precise location markers, clustering, heat maps, and detailed artisan information
                      </p>
                    </div>
                  </div>
                  
                  {/* Skill clusters overlay */}
                  {filteredSkills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="absolute cursor-pointer group"
                      style={{
                        top: `${20 + (index * 15) % 60}%`,
                        left: `${15 + (index * 25) % 70}%`,
                      }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm ${
                          skill.demand === 'high' ? 'bg-red-500' : 
                          skill.demand === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}>
                          {skill.artisanCount > 1000 ? 'H' : skill.artisanCount > 500 ? 'M' : 'L'}
                        </div>
                        {hoveredSkill?.id === skill.id && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-white rounded-lg shadow-lg border z-10">
                            <h4 className="font-semibold text-sm">{skill.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{skill.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {skill.artisanCount} artisans
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                {skill.averageSalary}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skillsData.statistics.topRegions.map((region, index) => (
                    <div key={region.state} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{region.state}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{region.artisanCount.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{region.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">{skillsData.statistics.totalArtisans.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total Artisans</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">{skillsData.statistics.totalSkills}</div>
                    <div className="text-xs text-muted-foreground">Skill Categories</div>
                  </div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <div className="text-lg font-bold">{skillsData.statistics.averageSalary}</div>
                  <div className="text-xs text-muted-foreground">Average Salary</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {viewMode === "charts" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Artisan Distribution by Category</CardTitle>
              <CardDescription>Breakdown of artisans across different craft categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Artisan Count by Skill</CardTitle>
              <CardDescription>Number of artisans for each traditional skill</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="artisans" fill="#8884d8" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Demand Levels</CardTitle>
              <CardDescription>Market demand for different traditional skills</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis domain={[0, 3]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="demand" fill="#82ca9d" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Salary Comparison</CardTitle>
              <CardDescription>Average salary ranges across different skills</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="salary" fill="#ffc658" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {viewMode === "list" && (
        <Card>
          <CardHeader>
            <CardTitle>All Skills & Locations</CardTitle>
            <CardDescription>
              Detailed list of all traditional skills with their locations and statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSkills.map((skill) => (
                <div key={skill.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{skill.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {skill.regions.map((region, index) => (
                          <Badge key={index} variant="outline" className="gap-1">
                            <LocateIcon className="h-3 w-3" />
                            {region.state}: {region.cities.join(", ")}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {skill.artisanCount} artisans
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          {skill.averageSalary}
                        </div>
                        <Badge variant={skill.demand === 'high' ? 'default' : skill.demand === 'medium' ? 'secondary' : 'outline'}>
                          {skill.demand} demand
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

