
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Handshake,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Handshake,
    title: 'Trusted Professionals',
    description: 'Connect with skilled people who can help with your needs.',
  },
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    description: 'Discuss your requirements directly before getting started.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Reliable',
    description: 'Make better decisions with profiles, ratings, and reviews.',
  },
];

function HomeHeroSection() {
  return (
    <section className="
        relative overflow-hidden bg-background
        bg-[radial-gradient(ellipse_600px_400px_at_50%_30%,rgba(168,85,247,0.18),transparent_30%)]
        px-4 py-20
        sm:px-8
        lg:py-28
      ">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-900/10" />
      </div>
   
      <div className="relative mx-auto max-w-5xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-purple-600" />

          <span className="text-muted-foreground">
            Your local service marketplace
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mx-auto mt-7 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Find trusted professionals
          <span className="block text-purple-600">
            for your next project.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
        >
          Connect with skilled professionals for web development, design,
          repairs, and other local services. Find the right person, discuss
          your requirements, and get your work done with confidence.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <Link to="/register" >
            <Button
              size="lg"
              className="h-11 w-full rounded-xl bg-purple-600 px-6 text-white shadow-sm hover:bg-purple-700 sm:w-auto"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link to="/#services">
            <Button
              size="lg"
              variant="outline"
              className="h-11 w-full rounded-xl px-6 sm:w-auto"
            >
              Explore Services
            </Button>
          </Link>
        </motion.div>

        {/* Features */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-4 border-t pt-10 sm:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  duration: 0.5,
                }}
                className="rounded-2xl p-5 transition-colors hover:bg-muted/50"
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/20">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomeHeroSection;

