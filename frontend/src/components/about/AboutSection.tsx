
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Handshake,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { Link } from 'react-router';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const features = [
  {
    icon: Users,
    title: 'Built Around People',
    description:
      'Connect clients with skilled professionals and discover the right person for your needs.',
  },
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    description:
      'Discuss your requirements directly with service providers before getting started.',
  },
  {
    icon: MapPin,
    title: 'Local & Relevant',
    description:
      'Discover services and professionals based on the type of work and location you need.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust Matters',
    description:
      'Make better decisions with provider profiles, ratings, reviews, and transparent information.',
  },
];

function AboutSection() {
  return (
    <section
      id="about-us"
      className="relative overflow-hidden bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Main About Content */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              About our marketplace
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Making it easier to find the right{' '}
              <span className="text-purple-600">professional.</span>
            </h2>

            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Our marketplace brings clients and skilled service providers
              together in one simple platform. Instead of searching through
              scattered options, users can discover relevant services, compare
              providers, and communicate directly.
            </p>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              We are focused on making local service discovery more convenient,
              transparent, and accessible for everyone.
            </p>

            {/* Small trust points */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                  <BadgeCheck className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Discover verified-looking profiles
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    View provider information, ratings, reviews, and services
                    before making a decision.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                  <Handshake className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Built for meaningful connections
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Talk directly with professionals and discuss your
                    requirements before moving forward.
                  </p>
                </div>
              </div>
            </div>

            <Link
            
              to="/#services"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700"
            >
              Explore the marketplace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Right - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full rounded-2xl border bg-background shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <CardHeader>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                        <Icon className="h-5 w-5" />
                      </div>

                      <CardTitle className="pt-2 text-base">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Mission Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-16 overflow-hidden rounded-3xl bg-purple-600 px-6 py-10 text-white shadow-lg shadow-purple-500/10 sm:px-10 lg:mt-20 lg:px-14"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-sm font-medium text-purple-100">
                <Handshake className="h-4 w-4" />
                Our mission
              </div>

              <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Better connections. Better services. Better experiences.
              </h3>

              <p className="mt-3 text-sm leading-6 text-purple-100 sm:text-base">
                We want to make finding and offering local services simpler,
                more transparent, and more accessible.
              </p>
            </div>

            <Link
              to="/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
            >
              Join the marketplace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;

