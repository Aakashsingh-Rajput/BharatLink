"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  Bell,
  Calendar,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Filter,
  Search,
  X,
} from "lucide-react";
import { DashboardStats } from "@/components/employer/DashboardStats";
import { JobPostForm, JobFormData } from "@/components/employer/JobPostForm";
import { ApplicantList } from "@/components/employer/ApplicantList";
import employerData from "@/data/employerData.json";
import { useTranslation } from "@/contexts/translation-context";

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

interface JobPost {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  skillsRequired: string[];
  experience: string;
  postedDate: string;
  status: string;
  applicantCount: number;
  trustScore: number;
}

export default function EmployerDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [jobPosts, setJobPosts] = useState<JobPost[]>(employerData.jobPosts);
  const [applicants, setApplicants] = useState<Applicant[]>(employerData.applicants);
  const [editingJob, setEditingJob] = useState<JobPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showJobActions, setShowJobActions] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setShowJobActions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCreateJob = (jobData: JobFormData) => {
    const newJob: JobPost = {
      id: `job-${Date.now()}`,
      ...jobData,
      postedDate: new Date().toISOString().split('T')[0],
      applicantCount: 0,
      trustScore: 85,
    };
    setJobPosts(prev => [newJob, ...prev]);
    setIsCreatingJob(false);
  };

  const handleEditJob = (job: JobPost) => {
    setEditingJob(job);
    setIsCreatingJob(true);
  };

  const handleUpdateJob = (jobData: JobFormData) => {
    if (editingJob) {
      setJobPosts(prev => 
        prev.map(job => 
          job.id === editingJob.id 
            ? { ...job, ...jobData, postedDate: job.postedDate }
            : job
        )
      );
      setEditingJob(null);
      setIsCreatingJob(false);
    }
  };

  const handleDeleteJob = (jobId: string) => {
    setJobPosts(prev => prev.filter(job => job.id !== jobId));
    setShowJobActions(null);
  };

  const handleToggleJobStatus = (jobId: string) => {
    setJobPosts(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, status: job.status === 'Active' ? 'Paused' : 'Active' }
          : job
      )
    );
    setShowJobActions(null);
  };

  const filteredJobs = jobPosts.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (applicantId: string, newStatus: string) => {
    setApplicants(prev =>
      prev.map(applicant =>
        applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
      )
    );
  };

  const handleViewProfile = (applicantId: string) => {
    // Navigate to applicant profile or open modal
    console.log("Viewing profile for applicant:", applicantId);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">
            {t('employer.dashboard_title')}
          </h1>
          <p className="text-muted-foreground">
            {t('employer.welcome_message', { company: employerData.employer.company })}
          </p>
        </div>
        <Button onClick={() => setIsCreatingJob(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          {t('employer.post_new_job')}
        </Button>
      </div>

      <DashboardStats stats={employerData.dashboardStats} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t('employer.overview')}</TabsTrigger>
          <TabsTrigger value="jobs">{t('employer.job_posts')}</TabsTrigger>
          <TabsTrigger value="applicants">{t('employer.applicants')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('employer.analytics')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    {t('employer.recent_job_posts')}
                  </CardTitle>
                  <CardDescription>
                    {t('employer.recent_job_posts_desc')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobPosts.slice(0, 3).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{job.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{job.location}</span>
                          <span>{job.type}</span>
                          <span>{job.applicantCount} {t('employer.applicants')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                        <Badge variant="outline">
                          {job.trustScore}% match
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Recent Applications
                  </CardTitle>
                  <CardDescription>
                    Latest applications from talented artisans
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applicants.slice(0, 3).map((applicant) => (
                    <div key={applicant.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {applicant.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{applicant.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Applied {new Date(applicant.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-1">
                          {applicant.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Badge className={applicant.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}>
                        {applicant.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {employerData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                      <div className="space-y-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Rate</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg. Response Time</span>
                    <span className="font-semibold">2.3 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hiring Success Rate</span>
                    <span className="font-semibold">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Positions</span>
                    <span className="font-semibold">{jobPosts.filter(job => job.status === 'Active').length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          {isCreatingJob ? (
            <JobPostForm
              onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
              initialData={editingJob}
              isLoading={false}
            />
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Job Posts ({filteredJobs.length})</CardTitle>
                    <CardDescription>
                      Manage your job postings and track their performance
                    </CardDescription>
                  </div>
                  <Button onClick={() => {
                    setEditingJob(null);
                    setIsCreatingJob(true);
                  }} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Job
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search jobs by title or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                {filteredJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-6 border rounded-lg hover:bg-muted/50 transition-colors group">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.experience}</span>
                            {job.salary && (
                              <>
                                <span>•</span>
                                <span className="font-semibold text-green-600">{job.salary}</span>
                              </>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.skillsRequired.slice(0, 4).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skillsRequired.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skillsRequired.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="text-lg font-semibold">{job.applicantCount}</div>
                            <div className="text-sm text-muted-foreground">applicants</div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge variant={job.status === 'Active' ? 'default' : job.status === 'Draft' ? 'secondary' : 'outline'}>
                              {job.status}
                            </Badge>
                            <Badge variant="outline">
                              {job.trustScore}% match
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Menu */}
                    <div className="relative" ref={actionMenuRef}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowJobActions(showJobActions === job.id ? null : job.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      
                      {showJobActions === job.id && (
                        <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-lg z-10 min-w-[160px]">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                handleEditJob(job);
                                setShowJobActions(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                            >
                              <Edit className="h-4 w-4" />
                              Edit Job
                            </button>
                            <button
                              onClick={() => {
                                // Navigate to job details or open modal
                                setShowJobActions(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                handleToggleJobStatus(job.id);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                            >
                              {job.status === 'Active' ? 'Pause' : 'Activate'} Job
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this job posting?')) {
                                  handleDeleteJob(job.id);
                                }
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-muted text-red-600 flex items-center gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete Job
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="applicants" className="space-y-4">
          <ApplicantList
            applicants={applicants}
            onStatusChange={handleStatusChange}
            onViewProfile={handleViewProfile}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>
                  Track application volume over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Chart visualization would go here
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Skills in Demand</CardTitle>
                <CardDescription>
                  Most requested skills from your job posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Block Printing', 'Textile Design', 'Natural Dyes', 'Handicraft Marketing'].map((skill, index) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm">{skill}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${85 - index * 15}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">
                          {85 - index * 15}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

