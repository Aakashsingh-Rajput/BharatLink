"use client";

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, FileText } from 'lucide-react';

export function UserInfoSync() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Please sign in to view your profile information.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information Sync
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Name:</span>
            </div>
            <p className="text-sm">{user.name || 'Not set'}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Email:</span>
            </div>
            <p className="text-sm">{user.email || 'Not set'}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Phone:</span>
            </div>
            <p className="text-sm">{user.phone || 'Not set'}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Location:</span>
            </div>
            <p className="text-sm">{user.location || 'Not set'}</p>
          </div>
        </div>

        {user.bio && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Bio:</span>
            </div>
            <p className="text-sm bg-muted p-3 rounded-md">{user.bio}</p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="font-medium">Account Type:</span>
          <Badge variant={user.userType === 'artisan' ? 'default' : 'secondary'}>
            {user.userType === 'artisan' ? 'Artisan/Skilled Worker' : 'Employer/Business'}
          </Badge>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            This information is synced across all pages. Changes in Settings will reflect here immediately.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
