"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import OpportunityList from "@/components/opportunities/opportunity-list";
import { ListFilter, Mic, Search } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/contexts/translation-context";

export default function OpportunitiesPage() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">
          {t('opportunities.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('opportunities.subtitle')}
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('opportunities.search_placeholder')}
                className="pl-8"
              />
              <Mic className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ListFilter className="mr-2 h-4 w-4" />
                    {t('opportunities.filter')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t('opportunities.filter_by')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    {t('opportunities.full_time')}
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>{t('opportunities.part_time')}</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>{t('opportunities.contract')}</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<OpportunityListSkeleton />}>
            <OpportunityList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function OpportunityListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
            <CardHeader>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-9 w-24" />
            </CardFooter>
        </Card>
      ))}
    </div>
  )
}
