"use client";

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  UserCircle,
  Briefcase,
  Map,
  Handshake,
  Bell,
  Settings,
  Building2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { currentUser } from "@/lib/data";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "My Profile", icon: UserCircle },
  { href: "/opportunities", label: "Opportunities", icon: Briefcase },
  { href: "/map", label: "Skill Map", icon: Map },
  { href: "/collaboration", label: "Collaboration Hub", icon: Handshake },
  { href: "/employer", label: "Employer Dashboard", icon: Building2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Use authenticated user data or fallback to currentUser for demo purposes
  const displayUser = user || currentUser;

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="BharatLink Logo" width={32} height={32} />
            <span className="font-headline text-xl font-semibold">BharatLink</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
              <Avatar>
                  <AvatarImage src={displayUser.avatarUrl} alt={displayUser.name} />
                  <AvatarFallback>{displayUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold truncate">{displayUser.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{displayUser.location}</span>
              </div>
          </div>
      </SidebarFooter>
    </>
  );
}
