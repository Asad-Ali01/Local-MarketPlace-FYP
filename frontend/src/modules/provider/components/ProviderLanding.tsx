import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";

function ProviderLanding() {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">

      {/* Welcome Section */}
      <div className="space-y-3 text-center">
        <h1 className="text-4xl font-semibold">
          Welcome{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            {user?.name}
          </span>
        </h1>

        <p className="text-muted-foreground">
          You’re almost ready to start earning. Create your first gig to get discovered by customers.
        </p>
      </div>

      {/* Main CTA Card */}
      <Card className="border-dashed">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Create your first gig
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground text-center max-w-md">
            A gig is your service listing. Add your skills, pricing, and start getting orders from clients worldwide.
          </p>

          <Button
            onClick={() => navigate("/provider/gigs/create")}
            className="gap-2"
          >
            <Plus size={16} />
            Create Gig
          </Button>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="font-medium">🌍 Reach local clients</p>
            <p className="text-sm text-muted-foreground">
              Get discovered by customers worldwide.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="font-medium">⚡ Fast onboarding</p>
            <p className="text-sm text-muted-foreground">
              Create and publish your gig in minutes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="font-medium">📈 Grow reputation</p>
            <p className="text-sm text-muted-foreground">
              Build reviews and boost visibility.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="font-medium">💰 Start earning</p>
            <p className="text-sm text-muted-foreground">
              Turn your skills into income.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProviderLanding;