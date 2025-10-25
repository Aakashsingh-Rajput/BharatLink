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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Save, Eye, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobPostFormProps {
  onSubmit: (jobData: JobFormData) => void;
  initialData?: Partial<JobFormData>;
  isLoading?: boolean;
}

export interface JobFormData {
  title: string;
  description: string;
  location: string;
  type: string;
  salary: string;
  skillsRequired: string[];
  experience: string;
  status: string;
}

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
const experienceLevels = ["0-1 years", "1-3 years", "3-5 years", "5+ years"];
const jobStatuses = ["Draft", "Active", "Paused", "Closed"];

const commonSkills = [
  "Block Printing",
  "Natural Dyes",
  "Textile Design",
  "Handicraft Marketing",
  "Pottery",
  "Ceramics",
  "Wood Carving",
  "Embroidery",
  "Weaving",
  "Adobe Creative Suite",
  "Quality Control",
  "Supply Chain Management",
  "Communication",
  "Teaching",
  "Event Management",
];

export function JobPostForm({ onSubmit, initialData, isLoading }: JobPostFormProps) {
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    type: initialData?.type || "",
    salary: initialData?.salary || "",
    skillsRequired: initialData?.skillsRequired || [],
    experience: initialData?.experience || "",
    status: initialData?.status || "Draft",
  });

  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !formData.skillsRequired.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skill]
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!formData.type) {
      newErrors.type = "Job type is required";
    }
    if (!formData.experience) {
      newErrors.experience = "Experience level is required";
    }
    if (formData.skillsRequired.length === 0) {
      newErrors.skillsRequired = "At least one skill is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      toast({
        title: "Job Posted Successfully",
        description: "Your job posting has been published and is now visible to candidates.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
    }
  };

  const handleSaveDraft = () => {
    setIsDraft(true);
    const draftData = { ...formData, status: "Draft" };
    onSubmit(draftData);
    toast({
      title: "Draft Saved",
      description: "Your job posting has been saved as a draft.",
    });
  };

  const handlePreview = () => {
    if (validateForm()) {
      setIsPreviewMode(!isPreviewMode);
    } else {
      toast({
        variant: "destructive",
        title: "Cannot Preview",
        description: "Please fill in all required fields to preview the job posting.",
      });
    }
  };

  if (isPreviewMode) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Job Post Preview</CardTitle>
            <CardDescription>
              This is how your job posting will appear to candidates
            </CardDescription>
          </div>
          <Button variant="outline" onClick={() => setIsPreviewMode(false)}>
            <X className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border rounded-lg p-6 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-primary">{formData.title}</h2>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{formData.location}</span>
                  <span>•</span>
                  <span>{formData.type}</span>
                  <span>•</span>
                  <span>{formData.experience}</span>
                  {formData.salary && (
                    <>
                      <span>•</span>
                      <span className="font-semibold text-green-600">{formData.salary}</span>
                    </>
                  )}
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {formData.status}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{formData.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skillsRequired.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1">
              <CheckCircle className="h-4 w-4 mr-2" />
              Publish Job
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Create New Job Post</CardTitle>
          <CardDescription>
            Fill in the details to create a new job posting for artisans and craftspeople.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Senior Textile Designer"
                className={errors.title ? "border-red-500" : ""}
                required
              />
              {errors.title && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.title}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Mumbai, Maharashtra"
                className={errors.location ? "border-red-500" : ""}
                required
              />
              {errors.location && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.location}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              rows={4}
              className={errors.description ? "border-red-500" : ""}
              required
            />
            {errors.description && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                {errors.description}
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="type">Job Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.type}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level *</Label>
              <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                <SelectTrigger className={errors.experience ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.experience && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  {errors.experience}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                placeholder="e.g., ₹6,00,000 - ₹10,00,000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Required Skills *</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skillsRequired.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
            {errors.skillsRequired && (
              <div className="flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3 w-3" />
                {errors.skillsRequired}
              </div>
            )}
            <div className="flex gap-2">
              <Select value={newSkill} onValueChange={setNewSkill}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select or add skill" />
                </SelectTrigger>
                <SelectContent>
                  {commonSkills
                    .filter(skill => !formData.skillsRequired.includes(skill))
                    .map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleAddSkill(newSkill)}
                disabled={!newSkill}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {jobStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Creating..." : "Publish Job"}
            </Button>
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button type="button" variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

