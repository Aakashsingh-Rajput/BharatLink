"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Handshake, Map, Star, UserCircle } from "lucide-react";
import Link from "next/link";
import { currentUser, opportunities } from "@/lib/data";
import OpportunityCard from "@/components/opportunities/opportunity-card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { skill: "Printing", endorsements: 12, fill: "var(--color-printing)" },
  { skill: "Dyes", endorsements: 8, fill: "var(--color-dyes)" },
  { skill: "Design", endorsements: 5, fill: "var(--color-design)" },
  { skill: "Marketing", endorsements: 7, fill: "var(--color-marketing)" },
];

const chartConfig = {
  endorsements: {
    label: "Endorsements",
  },
  printing: {
    label: "Block Printing",
    color: "hsl(var(--chart-1))",
  },
  dyes: {
    label: "Natural Dyes",
    color: "hsl(var(--chart-2))",
  },
  design: {
    label: "Textile Design",
    color: "hsl(var(--chart-3))",
  },
  marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          Welcome back, {currentUser.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's your gateway to new opportunities and collaborations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Strength
            </CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Strong</div>
            <p className="text-xs text-muted-foreground">
              Based on your skills and endorsements
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Endorsements</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.endorsements.length}</div>
            <p className="text-xs text-muted-foreground">From peers and employers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Hotspot</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jaipur</div>
            <p className="text-xs text-muted-foreground">Top region for your skills</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Collaboration Requests
            </CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              New inquiries this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Recommended Opportunities</CardTitle>
              <CardDescription>
                AI-powered matches based on your profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {opportunities.slice(0, 2).map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/opportunities">View All Opportunities</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Skill Endorsements</CardTitle>
              <CardDescription>
                A visual breakdown of your endorsements by skill.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="skill"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) =>
                      chartConfig[value as keyof typeof chartConfig]?.label
                    }
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar
                    dataKey="endorsements"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
