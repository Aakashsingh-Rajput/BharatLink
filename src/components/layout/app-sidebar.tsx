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
import { currentUser } from "@/lib/data";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "My Profile", icon: UserCircle },
  { href: "/opportunities", label: "Opportunities", icon: Briefcase },
  { href: "/map", label: "Skill Map", icon: Map },
  { href: "/collaboration", label: "Collaboration Hub", icon: Handshake },
  { href: "/employer", label: "Employer Dashboard", icon: Building2 },
];

export function AppSidebar() {
  const pathname = usePathname();

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
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold truncate">{currentUser.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{currentUser.location}</span>
              </div>
          </div>
      </SidebarFooter>
    </>
  );
}
