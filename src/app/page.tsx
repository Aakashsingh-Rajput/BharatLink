"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Mic, Users, Zap, Briefcase, Handshake, Building2, Search, Star, TrendingUp, Globe, Target } from 'lucide-react';
import { FarmingIcon, PotteryIcon, WeavingIcon } from '@/components/icons';
import { useTranslation } from '@/contexts/translation-context';
import { LanguageSelector } from '@/components/layout/language-selector';

const getFeatures = (t: (key: string) => string) => [
  {
    icon: <MapPin className="h-8 w-8 text-accent" />,
    title: t('features.skill_mapping.title'),
    description: t('features.skill_mapping.desc'),
  },
  {
    icon: <Mic className="h-8 w-8 text-accent" />,
    title: t('features.voice.title'),
    description: t('features.voice.desc'),
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: t('features.trust.title'),
    description: t('features.trust.desc'),
  },
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: t('features.matchmaking.title'),
    description: t('features.matchmaking.desc'),
  },
  {
    icon: <Handshake className="h-8 w-8 text-accent" />,
    title: t('features.collaboration.title'),
    description: t('features.collaboration.desc'),
  },
  {
    icon: <Briefcase className="h-8 w-8 text-accent" />,
    title: t('features.opportunities.title'),
    description: t('features.opportunities.desc'),
  },
];

const getEmployerFeatures = (t: (key: string) => string) => [
  {
    icon: <Search className="h-8 w-8 text-accent" />,
    title: t('employers.discovery.title'),
    description: t('employers.discovery.desc'),
  },
  {
    icon: <Building2 className="h-8 w-8 text-accent" />,
    title: t('employers.hiring.title'),
    description: t('employers.hiring.desc'),
  },
  {
    icon: <Star className="h-8 w-8 text-accent" />,
    title: t('employers.quality.title'),
    description: t('employers.quality.desc'),
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-accent" />,
    title: t('employers.scale.title'),
    description: t('employers.scale.desc'),
  },
];

const skillClusters = [
  { name: 'Channapatna Toys', region: 'Karnataka', artisans: 2500, skills: ['Wood Carving', 'Lacquer Work', 'Painting'] },
  { name: 'Assam Handloom', region: 'Assam', artisans: 1800, skills: ['Weaving', 'Dyeing', 'Design'] },
  { name: 'Moradabad Brass', region: 'Uttar Pradesh', artisans: 3200, skills: ['Metal Work', 'Engraving', 'Polishing'] },
  { name: 'Kutch Embroidery', region: 'Gujarat', artisans: 2100, skills: ['Embroidery', 'Mirror Work', 'Design'] },
  { name: 'Kashmir Carpets', region: 'Jammu & Kashmir', artisans: 1500, skills: ['Carpet Weaving', 'Design', 'Dyeing'] },
  { name: 'Tamil Nadu Bronze', region: 'Tamil Nadu', artisans: 2800, skills: ['Bronze Casting', 'Sculpting', 'Finishing'] },
];

export default function LandingPage() {
  const { t } = useTranslation();
  const features = getFeatures(t);
  const employerFeatures = getEmployerFeatures(t);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="BharatLink Logo" width={32} height={32} data-ai-hint="logo" />
            <h1 className="text-2xl font-headline font-bold text-foreground">BharatLink</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.features')}
          </Link>
          <Link href="#employers" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.employers')}
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.about')}
          </Link>
          <LanguageSelector />
          <Button variant="ghost" asChild>
            <Link href="/auth/signin">{t('nav.signin')}</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">{t('nav.signup')}</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="relative py-24 md:py-32">
            <div 
                className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_10%,transparent)] dark:bg-grid-slate-700/40">
            </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {t('hero.badge')}
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
              {t('hero.title')}
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              {t('hero.description')}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">{t('hero.explore')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">{t('hero.learn')}</Link>
              </Button>
            </div>
          </div>
        </section>
        
        <section className="relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-2xl shadow-2xl overflow-hidden">
                    <Image
                        src="https://picsum.photos/seed/bharat/1200/600"
                        alt="A collage of Indian artisans at work"
                        width={1200}
                        height={600}
                        className="w-full h-full object-cover"
                        data-ai-hint="indian artisans"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                        <h3 className="text-white text-3xl font-headline font-bold">{t('hero.subtitle')}</h3>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" className="py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-headline font-bold">{t('features.title')}</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                {t('features.subtitle')}
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card/70 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="employers" className="bg-gradient-to-br from-primary/5 to-accent/5 py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-headline font-bold">{t('employers.title')}</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                {t('employers.subtitle')}
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {employerFeatures.map((feature) => (
                <Card key={feature.title} className="bg-card/70 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all hover:scale-105">
                  <CardHeader className="flex flex-col items-center text-center">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/employer">{t('employers.post_job')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/map">{t('employers.explore_map')} <Globe className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="skill-clusters" className="py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-headline font-bold">{t('clusters.title')}</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                {t('clusters.subtitle')}
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skillClusters.map((cluster, index) => (
                <Card key={cluster.name} className="bg-card/70 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all hover:scale-105 group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-headline text-xl">{cluster.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {cluster.region}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-accent">
                      <Users className="h-4 w-4" />
                      {cluster.artisans.toLocaleString()} {t('clusters.artisans')}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">{t('clusters.skills')}</h4>
                        <div className="flex flex-wrap gap-1">
                          {cluster.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Target className="mr-2 h-3 w-3" />
                        {t('clusters.view_details')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/map">{t('clusters.explore')} <MapPin className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="bg-secondary/50 py-24 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-headline font-bold">{t('about.title')}</h2>
                    <p className="mt-4 text-muted-foreground">
                        {t('about.desc1')}
                    </p>
                    <p className="mt-4 text-muted-foreground">
                        {t('about.desc2')}
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 bg-card rounded-lg shadow-md">
                        <PotteryIcon className="h-12 w-12 text-accent"/>
                        <span className="mt-2 font-semibold">{t('about.pottery')}</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-card rounded-lg shadow-md">
                        <WeavingIcon className="h-12 w-12 text-accent"/>
                        <span className="mt-2 font-semibold">{t('about.weaving')}</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-card rounded-lg shadow-md">
                        <FarmingIcon className="h-12 w-12 text-accent"/>
                        <span className="mt-2 font-semibold">{t('about.agriculture')}</span>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} BharatLink. {t('footer.copyright')}</p>
          <p className="text-sm text-muted-foreground font-headline">{t('footer.project')}</p>
        </div>
      </footer>
    </div>
  );
}
