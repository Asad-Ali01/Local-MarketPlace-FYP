import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

type LocationCardProps = {
  location: {
    city: string;
    locationName: string;
  };
};

export default function LocationCard({
  location,
}: LocationCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">

        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-3">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Location
            </h2>

            <p className="text-sm text-muted-foreground">
              Provider service location
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-slate-50 p-5">

          <div className="flex items-start gap-3">

            <Navigation className="mt-1 h-5 w-5 text-blue-600" />

            <div>

              <h3 className="text-lg font-semibold">
                {location.city}
              </h3>

              <p className="mt-2 leading-7 text-muted-foreground">
                {location.locationName}
              </p>

            </div>

          </div>

        </div>

      </CardContent>
    </Card>
  );
}