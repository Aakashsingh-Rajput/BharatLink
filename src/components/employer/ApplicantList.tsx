"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  MessageSquare,
  Calendar,
  Star,
  MapPin,
  Mail,
  ExternalLink,
  MoreHorizontal,
  Filter,
  Search,
} from "lucide-react";

interface Applicant {
  id: string;
  name: string;
  email: string;
  location: string;
  skills: string[];
  experience: string;
  education: string;
  avatarUrl: string;
  appliedDate: string;
  status: string;
  jobId: string;
  portfolio: string;
  rating: number;
  endorsements: number;
}

interface ApplicantListProps {
  applicants: Applicant[];
  onStatusChange: (applicantId: string, newStatus: string) => void;
  onViewProfile: (applicantId: string) => void;
}

const statusOptions = [
  "Under Review",
  "Interview Scheduled",
  "Interviewed",
  "Shortlisted",
  "Hired",
  "Rejected",
];

const statusColors = {
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Interview Scheduled": "bg-blue-100 text-blue-800",
  "Interviewed": "bg-purple-100 text-purple-800",
  "Shortlisted": "bg-green-100 text-green-800",
  "Hired": "bg-emerald-100 text-emerald-800",
  "Rejected": "bg-red-100 text-red-800",
};

export function ApplicantList({ applicants, onStatusChange, onViewProfile }: ApplicantListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("appliedDate");

  const filteredApplicants = applicants
    .filter(applicant => {
      const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === "all" || applicant.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "endorsements":
          return b.endorsements - a.endorsements;
        case "appliedDate":
          return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime();
        default:
          return 0;
      }
    });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Applicants ({filteredApplicants.length})</CardTitle>
            <CardDescription>
              Manage and review job applications from talented artisans and craftspeople.
            </CardDescription>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="appliedDate">Date Applied</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="endorsements">Endorsements</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredApplicants.map((applicant) => (
            <div
              key={applicant.id}
              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={applicant.avatarUrl} alt={applicant.name} />
                <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{applicant.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {applicant.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {applicant.rating} ({applicant.endorsements} endorsements)
                      </div>
                      <div>{applicant.experience} experience</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[applicant.status as keyof typeof statusColors]}>
                      {applicant.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewProfile(applicant.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Interview
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {applicant.skills.slice(0, 5).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {applicant.skills.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{applicant.skills.length - 5} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {applicant.email}
                  </div>
                  <div>{applicant.education}</div>
                  <div className="flex items-center gap-1">
                    Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
                  </div>
                  {applicant.portfolio && (
                    <a
                      href={applicant.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Portfolio
                    </a>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Select
                    value={applicant.status}
                    onValueChange={(newStatus) => onStatusChange(applicant.id, newStatus)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredApplicants.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No applicants found matching your criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
