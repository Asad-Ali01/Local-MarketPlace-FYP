import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

type AboutGigProps = {
  description: string;
};

export default function AboutGig({
  description,
}: AboutGigProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              About this Gig
            </h2>

            <p className="text-sm text-muted-foreground">
              Learn more about the service being offered.
            </p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <p className="whitespace-pre-line wrap-break-word leading-8 text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}