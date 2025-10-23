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
import { X, Plus } from "lucide-react";

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

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !formData.skillsRequired.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skill]
      }));
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Job Post</CardTitle>
        <CardDescription>
          Fill in the details to create a new job posting for artisans and craftspeople.
        </CardDescription>
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Mumbai, Maharashtra"
                required
              />
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
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="type">Job Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level *</Label>
              <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                <SelectTrigger>
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Job Post"}
            </Button>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

