
import { motion } from 'framer-motion';
import { CalendarDays, Code2, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CreateJobFormInput, CreateJobFormValues } from '@/schemas/jobSchema';



interface JobPreviewProps {
  values: CreateJobFormInput;
}

const formatPKR = (amount: number) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

export default function JobPreview({ values }: JobPreviewProps) {
  const skills = values.skills
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="sticky top-6 overflow-hidden rounded-2xl border-border/70 shadow-sm">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Live preview
            </p>
            <Badge variant="secondary">Draft</Badge>
          </div>

          <CardTitle className="pt-2 text-xl leading-snug">
            {values.title || 'Your job title goes here'}
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            {values.category || 'Job category'}
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="rounded-xl bg-muted/60 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Wallet className="size-4" />
              {values.budgetType === 'fixed'
                ? 'Fixed budget'
                : 'Estimated budget'}
            </div>

            <p className="text-2xl font-semibold tracking-tight">
              {formatPKR(Number(values.budgetMin))}
              {values.budgetType === 'range' &&
                ` – ${formatPKR(Number(values.budgetMax))}`}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Description</h3>
            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
              {values.description ||
                'Describe the work, requirements, and expected outcome.'}
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Code2 className="size-4 text-muted-foreground" />
              Required skills
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <Badge
                    key={`${skill}-${index}`}
                    variant="outline"
                    className="rounded-lg px-2.5 py-1"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  Your skills will appear here.
                </span>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <CalendarDays className="mt-0.5 size-4 shrink-0" />
            <span>
              Deadline:{' '}
              {values.deadline
                ? new Date(
                    `${values.deadline}T12:00:00`,
                  ).toLocaleDateString()
                : 'Not selected'}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}