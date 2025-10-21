import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Mic, Users, Zap, Briefcase, Handshake } from 'lucide-react';
import { FarmingIcon, PotteryIcon, WeavingIcon } from '@/components/icons';

const features = [
  {
    icon: <MapPin className="h-8 w-8 text-accent" />,
    title: 'Skill Cluster Mapping',
    description: 'Discover regional skill hotspots, from Channapatna toys to Assam handloom.',
  },
  {
    icon: <Mic className="h-8 w-8 text-accent" />,
    title: 'Voice-First Access',
    description: 'Register and manage your profile using your local language with simple voice commands.',
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: 'AI + Trust Verification',
    description: 'Build your credibility with peer endorsements, turning word-of-mouth into digital trust.',
  },
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    title: 'Smart Matchmaking',
    description: 'Get connected to verified jobs and projects that match your skills, location, and trust score.',
  },
  {
    icon: <Handshake className="h-8 w-8 text-accent" />,
    title: 'Collaboration Hub',
    description: 'A space for urban businesses to connect with and hire authentic rural talent directly.',
  },
  {
    icon: <Briefcase className="h-8 w-8 text-accent" />,
    title: 'Verified Opportunities',
    description: 'Access a curated list of jobs from verified companies, reducing fraud and uncertainty.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="BharatLink Logo" width={32} height={32} data-ai-hint="logo" />
            <h1 className="text-2xl font-headline font-bold text-foreground">BharatLink</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Button asChild>
            <Link href="/dashboard">Launch App <ArrowRight className="ml-2 h-4 w-4" /></Link>
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
                For a Self-Reliant India (Atmanirbhar Bharat)
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
              Connecting India’s Grassroots Talent to Digital Opportunities.
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
              BharatLink is a digital bridge designed to connect rural skills to urban opportunities, creating a sustainable skill-to-work ecosystem for India.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Explore Opportunities <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
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
                        <h3 className="text-white text-3xl font-headline font-bold">From the heart of Bharat to the edge of innovation.</h3>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" className="py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-headline font-bold">A Platform for a Digital India</h2>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                Empowering every skilled individual with the tools they need to thrive in the digital economy.
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

        <section id="about" className="bg-secondary/50 py-24 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-headline font-bold">Empowering the Unseen Workforce</h2>
                    <p className="mt-4 text-muted-foreground">
                        Millions of skilled artisans, craftsmen, and workers in rural India have the talent but lack the digital visibility to connect with opportunities. 
                        BharatLink solves this by providing an accessible, voice-first platform that makes their skills discoverable.
                    </p>
                    <p className="mt-4 text-muted-foreground">
                        We're not just a job portal; we're a movement to build a verified, trusted, and inclusive economic network that honors and uplifts India's traditional skills.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 bg-card rounded-lg shadow-md">
                        <PotteryIcon className="h-12 w-12 text-accent"/>
                        <span className="mt-2 font-semibold">Pottery</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-card rounded-lg shadow-md">
                        <WeavingIcon className="h-12 w-12 text-accent"/>
                        <span className="mt-2 font-semibold">Weaving</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-card rounded-lg shadow-md">
                        <FarmingIcon className="h-12 w-12 text-accent"/>
                        <span className="mt-2 font-semibold">Agriculture</span>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} BharatLink. All rights reserved.</p>
          <p className="text-sm text-muted-foreground font-headline">A proud *Innovinkers* project.</p>
        </div>
      </footer>
    </div>
  );
}
