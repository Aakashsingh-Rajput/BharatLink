'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MicroCertificate } from "@/lib/data";
import { Calendar, Award, ExternalLink, Shield, QrCode } from "lucide-react";
import { QRCodeDisplay } from "@/components/ui/qr-code";
import { useState } from 'react';

interface MicroCertificateCardProps {
  certificate: MicroCertificate;
  onViewDetails: (certificate: MicroCertificate) => void;
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-blue-100 text-blue-800',
  advanced: 'bg-purple-100 text-purple-800',
  expert: 'bg-gold-100 text-gold-800'
};

const levelIcons = {
  beginner: '🌱',
  intermediate: '📚',
  advanced: '⭐',
  expert: '🏆'
};

export function MicroCertificateCard({ certificate, onViewDetails }: MicroCertificateCardProps) {
  const [showQR, setShowQR] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = certificate.expiryDate && new Date(certificate.expiryDate) < new Date();

  return (
    <Card className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${isExpired ? 'opacity-75' : ''}`}>
      {/* Blockchain verification indicator */}
      <div className="absolute top-2 right-2">
        <Shield className="h-4 w-4 text-green-600" />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <span className="text-2xl">{levelIcons[certificate.level]}</span>
              {certificate.skill}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{certificate.issuer}</p>
          </div>
          <Badge 
            variant="secondary" 
            className={`${levelColors[certificate.level]} border-0`}
          >
            {certificate.level}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Certificate Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {certificate.description}
        </p>

        {/* Issue and Expiry Dates */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Issued: {formatDate(certificate.issuedDate)}</span>
          </div>
          {certificate.expiryDate && (
            <div className={`flex items-center gap-1 ${isExpired ? 'text-red-600' : ''}`}>
              <Calendar className="h-3 w-3" />
              <span>Expires: {formatDate(certificate.expiryDate)}</span>
            </div>
          )}
        </div>

        {/* QR Code Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowQR(!showQR)}
            className="text-xs"
          >
            <QrCode className="h-3 w-3 mr-1" />
            {showQR ? 'Hide' : 'Show'} QR Code
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(certificate)}
            className="text-xs"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View Details
          </Button>
        </div>

        {/* QR Code Display */}
        {showQR && (
          <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <QRCodeDisplay 
                value={certificate.qrCodeData}
                size={120}
                className="mx-auto"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Scan to verify certificate
              </p>
            </div>
          </div>
        )}

        {/* Blockchain Hash (truncated) */}
        {certificate.blockchainHash && (
          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
            <span className="font-mono">
              Hash: {certificate.blockchainHash.slice(0, 20)}...
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
