import { motion } from 'framer-motion';
import { Mail, MapPin, MessageCircle, Send } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  contactSchema,
  type contactSchemaType,
} from '../../schemas/contactSchema';

function ContactSection() {
  const form = useForm<contactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const handleContact = async (data: contactSchemaType) => {
    try {
      console.log(data);

      // Replace with API call later
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Message sent successfully!');
      form.reset();
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="contact-us"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-muted/30 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Same background decoration as About */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <MessageCircle className="h-3.5 w-3.5 text-purple-600" />
            Get in touch
          </div>

          <h2
            id="contact-heading"
            className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            We'd love to hear from{' '}
            <span className="text-purple-600">you.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Have a question, feedback, or need help finding the right
            service? Send us a message and we'll be happy to help.
          </p>
        </motion.header>

        {/* Main Content */}
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Contact Information */}
          <motion.aside
            aria-label="Contact information"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <header>
              <h3 className="text-2xl font-bold tracking-tight">
                Let's talk
              </h3>

              <p className="mt-3 max-w-md text-base leading-7 text-muted-foreground">
                Whether you're looking for a service, need assistance, or
                simply want to share your feedback, we're here for you.
              </p>
            </header>

            <address className="mt-8 not-italic">
              <ul className="space-y-4">
                <li>
                  <Card className="rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <CardContent className="flex gap-4 p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                        <Mail className="h-5 w-5" />
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          Email
                        </h4>

                        <a
                          href="mailto:support@localmarketplace.com"
                          className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-purple-600"
                        >
                          support@localmarketplace.com
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </li>

                <li>
                  <Card className="rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <CardContent className="flex gap-4 p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                        <MapPin className="h-5 w-5" />
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          Local Services
                        </h4>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Discover professionals near your location.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </li>

                <li>
                  <Card className="rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <CardContent className="flex gap-4 p-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30">
                        <MessageCircle className="h-5 w-5" />
                      </div>

                      <div>
                        <h4 className="font-semibold">
                          Direct Communication
                        </h4>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Connect and discuss your requirements directly.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              </ul>
            </address>
          </motion.aside>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="rounded-2xl border bg-background shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  Send us a message
                </CardTitle>

                <p className="text-sm leading-6 text-muted-foreground">
                  Fill out the form below and we'll get back to you.
                </p>
              </CardHeader>

              <CardContent>
                <form
                  onSubmit={form.handleSubmit(handleContact)}
                  className="space-y-5"
                >
                  <fieldset
                    disabled={form.formState.isSubmitting}
                    className="space-y-5"
                  >
                    <legend className="sr-only">
                      Contact form
                    </legend>

                    {/* Name + Email */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">
                          Name
                        </Label>

                        <Input
                          id="contact-name"
                          placeholder="Your name"
                          {...form.register('name')}
                        />

                        {form.formState.errors.name && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-email">
                          Email
                        </Label>

                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="you@example.com"
                          {...form.register('email')}
                        />

                        {form.formState.errors.email && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="contact-subject">
                        Subject
                      </Label>

                      <Input
                        id="contact-subject"
                        placeholder="What can we help you with?"
                        {...form.register('subject')}
                      />

                      {form.formState.errors.subject && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">
                        Message
                      </Label>

                      <Textarea
                        id="contact-message"
                        rows={6}
                        placeholder="Write your message..."
                        className="resize-none"
                        {...form.register('message')}
                      />

                      {form.formState.errors.message && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="gap-2"
                    >
                      {form.formState.isSubmitting
                        ? 'Sending...'
                        : 'Send Message'}

                      {!form.formState.isSubmitting && (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </fieldset>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;