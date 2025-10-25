'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Shield, Calendar, Award, CheckCircle } from "lucide-react";
import { MicroCertificate } from "@/lib/data";

interface MicroCertificatesProps {
  certificates: MicroCertificate[];
}

export default function MicroCertificates({ certificates }: MicroCertificatesProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleVerifyCertificate = (verificationUrl: string) => {
    window.open(verificationUrl, '_blank');
  };

  if (certificates.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            Micro-Certificates (0)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Award className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground">No micro-certificates yet</p>
              <p className="text-sm text-muted-foreground">
                Complete skill assessments to earn blockchain-verified certificates
              </p>
            </div>
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg max-w-md">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                How Skill Verification Works
              </h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• <strong>Blockchain Technology:</strong> All certificates are stored on a secure blockchain network</p>
                <p>• <strong>Skill Assessments:</strong> Complete practical tests and peer reviews to demonstrate your expertise</p>
                <p>• <strong>Verification:</strong> Each certificate includes a unique hash for instant verification</p>
                <p>• <strong>Trust Building:</strong> Verified skills increase your trust score and job opportunities</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Award className="h-5 w-5 text-accent" />
          Micro-Certificates ({certificates.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{certificate.title}</h3>
                <p className="text-sm text-muted-foreground">{certificate.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-600">Verified</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Award className="h-3 w-3" />
                {certificate.skill}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(certificate.dateEarned)}
              </div>
              <div className="text-sm text-muted-foreground">
                Issued by: <span className="font-medium">{certificate.issuer}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Blockchain Hash: {certificate.blockchainHash.slice(0, 16)}...</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleVerifyCertificate(certificate.verificationUrl)}
                className="flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />
                Verify
              </Button>
            </div>
          </div>
        ))}

        <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-accent" />
            How Skill Verification Works
          </h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• <strong>Blockchain Technology:</strong> All certificates are stored on a secure blockchain network</p>
            <p>• <strong>Skill Assessments:</strong> Complete practical tests and peer reviews to demonstrate your expertise</p>
            <p>• <strong>Verification:</strong> Each certificate includes a unique hash for instant verification</p>
            <p>• <strong>Trust Building:</strong> Verified skills increase your trust score and job opportunities</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
