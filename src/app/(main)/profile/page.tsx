'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Mail, MapPin, Quote, Share2, Mic, Award, Plus, X, Star, TrendingUp, Phone, MessageCircle, Copy, Check, Upload, FileText } from "lucide-react";
import EndorsementSummary from "@/components/profile/endorsement-summary";
import { MicroCertificateCard } from "@/components/profile/micro-certificate-card";
import { CertificateModal } from "@/components/profile/certificate-modal";
import { useState, useRef, useEffect } from 'react';
import { speechToText } from "@/ai/flows/speech-to-text";
import { ChakraLoader } from "@/components/ui/loader";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth-context";
import { UserInfoSync } from "@/components/profile/user-info-sync";
import { useTranslation } from "@/contexts/translation-context";
import { MicroCertificate } from "@/lib/data";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user, login } = useAuth();
  const [currentUser, setCurrentUser] = useState(user || {
    name: 'User',
    email: '',
    location: '',
    bio: '',
    avatarUrl: '/placeholder-avatar.jpg',
    userType: 'artisan' as const,
    skills: [],
    endorsements: []
  });
  const [isRecording, setIsRecording] = useState<string | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(currentUser.bio || '');
  const [selectedCertificate, setSelectedCertificate] = useState<MicroCertificate | null>(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [skillLevels, setSkillLevels] = useState<Record<string, 'beginner' | 'intermediate' | 'advanced'>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [isUploadingCertificate, setIsUploadingCertificate] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  // Sync with auth context when user data changes
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      setBioText(user.bio || '');
    }
  }, [user]);

  const handleMicClick = async (field: 'bio' | 'skills') => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(null);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          try {
            const prompt = field === 'bio' 
              ? "Transcribe the following audio to update a user's professional bio."
              : "Transcribe the following audio which lists user skills. The result should be a comma-separated list of skills.";
            
            const result = await speechToText({
              audio: base64Audio,
              prompt: prompt,
            });

            if (field === 'bio') {
              setBioText(result.text);
              setIsEditingBio(true); // Keep editing mode open to allow saving
            } else if (field === 'skills') {
              const newSkills = result.text.split(',').map(s => s.trim()).filter(Boolean);
              setCurrentUser(prev => ({ 
                ...prev, 
                skills: [...new Set([...(prev.skills || []), ...newSkills])] 
              }));
              toast({
                title: "Skills Updated",
                description: "New skills have been added to your profile.",
              })
            }
          } catch (error) {
            console.error("Error transcribing audio:", error);
            toast({
              variant: "destructive",
              title: "Transcription Failed",
              description: "Could not process your voice input. Please try again.",
            })
          } finally {
            setIsRecording(null);
          }
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(field);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        variant: "destructive",
        title: "Microphone Error",
        description: "Could not access your microphone. Please check permissions.",
      })
    }
  };

  const handleSaveBio = () => {
    const updatedUser = {...currentUser, bio: bioText};
    setCurrentUser(updatedUser);
    login(updatedUser); // Update auth context
    setIsEditingBio(false);
    toast({
      title: "Bio Updated",
      description: "Your bio has been successfully saved.",
    });
  }

  const handleViewCertificate = (certificate: MicroCertificate) => {
    setSelectedCertificate(certificate);
    setIsCertificateModalOpen(true);
  };

  const handleCloseCertificateModal = () => {
    setIsCertificateModalOpen(false);
    setSelectedCertificate(null);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !currentUser.skills?.includes(newSkill.trim())) {
      const skill = newSkill.trim();
      setCurrentUser(prev => ({ 
        ...prev, 
        skills: [...(prev.skills || []), skill] 
      }));
      setSkillLevels(prev => ({ ...prev, [skill]: 'beginner' }));
      setNewSkill('');
      setIsAddingSkill(false);
      toast({
        title: "Skill Added",
        description: `${skill} has been added to your profile.`,
      });
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setCurrentUser(prev => ({ 
      ...prev, 
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || [] 
    }));
    setSkillLevels(prev => {
      const updated = { ...prev };
      delete updated[skillToRemove];
      return updated;
    });
    toast({
      title: "Skill Removed",
      description: `${skillToRemove} has been removed from your profile.`,
    });
  };

  const handleUpdateSkillLevel = (skill: string, level: 'beginner' | 'intermediate' | 'advanced') => {
    setSkillLevels(prev => ({ ...prev, [skill]: level }));
    toast({
      title: "Skill Level Updated",
      description: `${skill} level updated to ${level}.`,
    });
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleShareProfile = async () => {
    const profileUrl = `${window.location.origin}/profile/${currentUser.name}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${currentUser.name}'s Profile`,
          text: `Check out ${currentUser.name}'s profile on BharatLink`,
          url: profileUrl,
        });
      } else {
        await navigator.clipboard.writeText(profileUrl);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        toast({
          title: "Link Copied",
          description: "Profile link has been copied to clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing profile:', error);
    }
  };

  const handleContactUser = (method: 'email' | 'phone' | 'message') => {
    switch (method) {
      case 'email':
        window.open(`mailto:${currentUser.email}`);
        break;
      case 'phone':
        // In a real app, you'd have phone number
        toast({
          title: "Contact Info",
          description: "Phone number not available. Please use email.",
        });
        break;
      case 'message':
        // In a real app, you'd open a messaging interface
        toast({
          title: "Messaging",
          description: "Messaging feature coming soon!",
        });
        break;
    }
    setShowContactOptions(false);
  };

  const handleCertificateUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingCertificate(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you'd upload to a server and get back certificate data
      const mockCertificate = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        skill: "General",
        issuer: "User Uploaded",
        dateEarned: new Date().toISOString(),
        verificationUrl: "#",
        qrCodeData: `https://verify.artisanplatform.com/${Date.now()}`,
        description: `Certificate uploaded from ${file.name}`,
        level: "intermediate" as const
      };

      setCurrentUser(prev => ({
        ...prev,
        microCertificates: [...(prev.microCertificates || []), mockCertificate as any]
      }));

      toast({
        title: "Certificate Uploaded",
        description: "Your certificate has been added to your profile.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Could not upload certificate. Please try again.",
      });
    } finally {
      setIsUploadingCertificate(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1 space-y-8">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold font-headline">{currentUser.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {currentUser.location}
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => setShowContactOptions(!showContactOptions)}
                >
                  <Mail className="h-4 w-4 mr-2" /> {t('profile.contact')}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleShareProfile}
                >
                  {copiedLink ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                  {copiedLink ? 'Copied!' : t('profile.share')}
                </Button>
              </div>
              
              {showContactOptions && (
                <div className="flex flex-col gap-1 bg-secondary/50 rounded-lg p-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => handleContactUser('email')}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => handleContactUser('phone')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => handleContactUser('message')}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline flex items-center gap-2">
              <Quote className="h-5 w-5 text-primary" />
              {t('profile.about')}
            </CardTitle>
            <div className="flex items-center gap-1">
              {isEditingBio ? (
                <div className="flex items-center gap-2">
                  <Button onClick={handleSaveBio} size="sm" className="bg-primary text-primary-foreground">
                    <Check className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setIsEditingBio(false);
                      setBioText(currentUser.bio || '');
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditingBio(true)}>
                    <Edit className="h-4 w-4"/>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleMicClick('bio')}>
                    {isRecording === 'bio' ? <ChakraLoader className="h-4 w-4 text-primary" /> : <Mic className="h-4 w-4"/>}
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isEditingBio ? (
              <div className="space-y-3">
                <Textarea 
                  value={bioText} 
                  onChange={(e) => setBioText(e.target.value)} 
                  className="min-h-[120px] resize-none"
                  placeholder="Tell us about yourself, your skills, experience, and what makes you unique..."
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mic className="h-3 w-3" />
                  <span>Use voice input for faster writing</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {currentUser.bio ? (
                  <p className="text-sm leading-relaxed">{currentUser.bio}</p>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Quote className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No bio added yet</p>
                    <p className="text-xs mt-1">Click edit to add your story</p>
                  </div>
                )}
                {isRecording === 'bio' && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <ChakraLoader className="h-4 w-4" />
                    <span>Listening... Speak now</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              {t('profile.skills')} ({currentUser.skills?.length || 0})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => handleMicClick('skills')}>
                {isRecording === 'skills' ? <ChakraLoader className="h-4 w-4" /> : <Mic className="h-4 w-4 mr-2"/>}
                Voice
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsAddingSkill(true)}>
                <Plus className="h-4 w-4 mr-2"/>
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAddingSkill && (
              <div className="flex gap-2 p-3 bg-secondary/50 rounded-lg">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Enter skill name..."
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button size="sm" onClick={handleAddSkill} disabled={!newSkill.trim()}>
                  Add
                </Button>
                <Button size="sm" variant="outline" onClick={() => {
                  setIsAddingSkill(false);
                  setNewSkill('');
                }}>
                  Cancel
                </Button>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {currentUser.skills?.map((skill) => (
                <div key={skill} className="flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1 group">
                  <span className="text-sm font-medium">{skill}</span>
                  <div className="flex items-center gap-1">
                    <select
                      value={skillLevels[skill] || 'beginner'}
                      onChange={(e) => handleUpdateSkillLevel(skill, e.target.value as any)}
                      className={`text-xs px-2 py-1 rounded-full border-0 ${getSkillLevelColor(skillLevels[skill] || 'beginner')}`}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )) || (
                <div className="text-center py-8 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">{t('profile.no_skills_yet')}</p>
                  <p className="text-xs mt-1">Add skills manually or use voice input</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <EndorsementSummary endorsements={currentUser.endorsements || []} />

        {/* Micro-Certificates Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Micro-Certificates ({currentUser.microCertificates?.length || 0})
            </CardTitle>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="certificate-upload"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleCertificateUpload}
                className="hidden"
                disabled={isUploadingCertificate}
              />
              <label htmlFor="certificate-upload">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="cursor-pointer"
                  disabled={isUploadingCertificate}
                >
                  {isUploadingCertificate ? (
                    <ChakraLoader className="h-4 w-4 mr-2" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  {isUploadingCertificate ? 'Uploading...' : 'Upload'}
                </Button>
              </label>
            </div>
          </CardHeader>
          <CardContent>
            {currentUser.microCertificates && currentUser.microCertificates.length > 0 ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {currentUser.microCertificates.map((certificate) => (
                    <MicroCertificateCard
                      key={certificate.id}
                      certificate={certificate as any}
                      onViewDetails={handleViewCertificate}
                    />
                  ))}
                </div>
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Upload more certificates to showcase your achievements
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No micro-certificates yet</p>
                <p className="text-xs mt-1 mb-4">Complete skill assessments or upload certificates to showcase your achievements</p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Take Assessment
                  </Button>
                  <label htmlFor="certificate-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Certificate
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline flex items-center gap-2">
              <Quote className="h-5 w-5 text-primary" />
              {t('profile.endorsements')} ({currentUser.endorsements?.length || 0})
            </CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Request
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentUser.endorsements && currentUser.endorsements.length > 0 ? (
              <div className="space-y-3">
                {currentUser.endorsements.map((endorsement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-secondary/50 rounded-lg border border-primary/10">
                    <Quote className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground italic mb-2">"{endorsement}"</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>• Verified endorsement</span>
                        <span>• From colleague</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">
                    Endorsements help build your professional credibility
                  </p>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Request More Endorsements
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Quote className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm mb-2">No endorsements yet</p>
                <p className="text-xs mb-4">Request endorsements from colleagues to build your professional credibility</p>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Request Endorsements
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Data Sync Demonstration */}
        <UserInfoSync />
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isCertificateModalOpen}
        onClose={handleCloseCertificateModal}
      />
    </div>
  );
}
