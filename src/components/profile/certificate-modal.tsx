'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MicroCertificate } from "@/lib/data";
import { Calendar, Award, ExternalLink, Shield, QrCode, Copy, Check } from "lucide-react";
import { QRCodeDisplay } from "@/components/ui/qr-code";
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface CertificateModalProps {
  certificate: MicroCertificate | null;
  isOpen: boolean;
  onClose: () => void;
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

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  const { toast } = useToast();

  if (!certificate) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = certificate.expiryDate && new Date(certificate.expiryDate) < new Date();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: `${type} has been copied to your clipboard.`,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const copyHash = () => {
    if (certificate.blockchainHash) {
      copyToClipboard(certificate.blockchainHash, 'Blockchain hash');
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span className="text-3xl">{levelIcons[certificate.level]}</span>
            <div>
              <div className="font-headline">{certificate.skill}</div>
              <div className="text-sm font-normal text-muted-foreground">
                {certificate.issuer}
              </div>
            </div>
            <Badge 
              variant="secondary" 
              className={`${levelColors[certificate.level]} border-0 ml-auto`}
            >
              {certificate.level}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Certificate Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{certificate.description}</p>
          </div>

          {/* Certificate Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Issue Date
              </h3>
              <p className="text-muted-foreground">{formatDate(certificate.issuedDate)}</p>
            </div>

            {certificate.expiryDate && (
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Expiry Date
                </h3>
                <p className={`${isExpired ? 'text-red-600' : 'text-muted-foreground'}`}>
                  {formatDate(certificate.expiryDate)}
                  {isExpired && ' (Expired)'}
                </p>
              </div>
            )}
          </div>

          {/* Certificate ID */}
          <div className="space-y-2">
            <h3 className="font-semibold">Certificate ID</h3>
            <div className="bg-muted/50 p-3 rounded-lg">
              <code className="text-sm font-mono">{certificate.id}</code>
            </div>
          </div>

          {/* Blockchain Verification */}
          {certificate.blockchainHash && (
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                Blockchain Verification
              </h3>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono break-all">
                    {certificate.blockchainHash}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyHash}
                    className="ml-2 flex-shrink-0"
                  >
                    {copiedHash ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                This certificate is verified on the blockchain and cannot be tampered with.
              </p>
            </div>
          )}

          {/* QR Code Section */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Verification QR Code
            </h3>
            <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
              <div className="text-center">
                <QRCodeDisplay 
                  value={certificate.qrCodeData}
                  size={200}
                  className="mx-auto"
                />
                <p className="text-sm text-muted-foreground mt-3">
                  Scan this QR code to verify the certificate authenticity
                </p>
              </div>
            </div>
          </div>

          {/* Verification URL */}
          <div className="space-y-2">
            <h3 className="font-semibold">Verification URL</h3>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-muted/50 p-2 rounded text-sm break-all">
                {certificate.verificationUrl}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(certificate.verificationUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={() => window.open(certificate.verificationUrl, '_blank')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Verify Online
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
