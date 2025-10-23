"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Briefcase,
  Calendar,
  TrendingUp,
  Clock,
  Star,
  UserCheck,
  FileText,
} from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalJobPosts: number;
    activeJobPosts: number;
    totalApplicants: number;
    newApplicants: number;
    interviewScheduled: number;
    hired: number;
    averageRating: number;
    responseTime: string;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Active Job Posts",
      value: stats.activeJobPosts,
      total: stats.totalJobPosts,
      icon: Briefcase,
      description: "Currently hiring positions",
      trend: "+2 this month",
    },
    {
      title: "Total Applicants",
      value: stats.totalApplicants,
      icon: Users,
      description: "Across all positions",
      trend: "+8 new this week",
    },
    {
      title: "New Applications",
      value: stats.newApplicants,
      icon: FileText,
      description: "Pending review",
      trend: "This week",
    },
    {
      title: "Interviews Scheduled",
      value: stats.interviewScheduled,
      icon: Calendar,
      description: "Upcoming interviews",
      trend: "This week",
    },
    {
      title: "Successfully Hired",
      value: stats.hired,
      icon: UserCheck,
      description: "This month",
      trend: "+100% from last month",
    },
    {
      title: "Average Rating",
      value: stats.averageRating.toFixed(1),
      icon: Star,
      description: "Employer rating",
      trend: "From candidates",
    },
    {
      title: "Response Time",
      value: stats.responseTime,
      icon: Clock,
      description: "Average response time",
      trend: "Improved by 1.2 days",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.total && (
                <Badge variant="secondary" className="text-xs">
                  /{stat.total}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-600">{stat.trend}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

