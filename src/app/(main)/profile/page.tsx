'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Mail, MapPin, Quote, Share2, Mic, Award } from "lucide-react";
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
            <div className="mt-4 flex gap-2">
              <Button size="sm">
                <Mail className="h-4 w-4 mr-2" /> {t('profile.contact')}
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="h-4 w-4 mr-2" /> {t('profile.share')}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline">{t('profile.about')}</CardTitle>
            <div className="flex items-center gap-1">
              {isEditingBio ? (
                 <Button onClick={handleSaveBio} size="sm">{t('common.save')}</Button>
              ) : (
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditingBio(true)}>
                  <Edit className="h-4 w-4"/>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleMicClick('bio')}>
                {isRecording === 'bio' ? <ChakraLoader className="h-4 w-4 text-primary" /> : <Mic className="h-4 w-4"/>}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditingBio ? (
              <Textarea value={bioText} onChange={(e) => setBioText(e.target.value)} className="min-h-[100px]" />
            ) : (
              <p className="text-sm text-muted-foreground">{currentUser.bio}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-headline">{t('profile.skills')}</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleMicClick('skills')}>
                {isRecording === 'skills' ? <ChakraLoader className="h-4 w-4" /> : <Mic className="h-4 w-4 mr-2"/>}
                {t('profile.add_skills_voice')}
            </Button>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {currentUser.skills?.map((skill) => (
              <Badge key={skill} variant="default" className="text-sm px-3 py-1 bg-primary/20 text-primary-foreground hover:bg-primary/30">
                {skill}
              </Badge>
            )) || (
              <p className="text-sm text-muted-foreground">{t('profile.no_skills_yet')}</p>
            )}
          </CardContent>
        </Card>
        
        <EndorsementSummary endorsements={currentUser.endorsements || []} />

        {/* Micro-Certificates Section */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Micro-Certificates ({currentUser.microCertificates?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentUser.microCertificates && currentUser.microCertificates.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {currentUser.microCertificates.map((certificate) => (
                  <MicroCertificateCard
                    key={certificate.id}
                    certificate={certificate}
                    onViewDetails={handleViewCertificate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">No micro-certificates yet</p>
                <p className="text-xs mt-1">Complete skill assessments to earn blockchain-verified certificates</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">{t('profile.endorsements')} ({currentUser.endorsements?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentUser.endorsements?.map((endorsement, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                <Quote className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                <p className="text-sm text-muted-foreground italic">"{endorsement}"</p>
              </div>
            )) || (
              <p className="text-sm text-muted-foreground">{t('profile.no_endorsements_yet')}</p>
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
