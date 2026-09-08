import { useAppSelector } from '@/hooks/useAppDispatchSelector';
import { Loader2 } from 'lucide-react';

type QueryLikeState = {
  endpointName?: string;
  status?: string;
};

const EXCLUDED_QUERY_ENDPOINTS = [
  'providerDashboardTopCard',
  'getLocationSuggestions',
  // future dashboard widgets can go here:
  // "providerRevenueChart",
  // "providerRecentOrders",
  // "providerUnreadMessages",
];

const EXCLUDED_MUTATION_ENDPOINTS: string[] = [];

function hasPendingRequest(
  requests: Record<string, QueryLikeState | undefined>,
  excludedEndpoints: string[] = [],
) {
  return Object.values(requests || {}).some((request) => {
    if (!request || request.status !== 'pending') return false;

    const endpointName = request.endpointName;
    if (!endpointName) return true;

    return !excludedEndpoints.includes(endpointName);
  });
}

export const GlobalLoader = () => {
  const authQueries = useAppSelector((state) => state.authApi.queries);
  const authMutations = useAppSelector((state) => state.authApi.mutations);

  const gigQueries = useAppSelector((state) => state.gigApi.queries);
  const gigMutations = useAppSelector((state) => state.gigApi.mutations);

  const otpQueries = useAppSelector((state) => state.otpApi.queries);
  const otpMutations = useAppSelector((state) => state.otpApi.mutations);

  const adminQueries = useAppSelector((state) => state.adminApi.queries);
  const adminMutations = useAppSelector((state) => state.adminApi.mutations);

  const isFetching =
    hasPendingRequest(authQueries) ||
    hasPendingRequest(authMutations) ||
    hasPendingRequest(gigQueries, EXCLUDED_QUERY_ENDPOINTS) ||
    hasPendingRequest(gigMutations, EXCLUDED_MUTATION_ENDPOINTS) ||
    hasPendingRequest(otpQueries) ||
    hasPendingRequest(otpMutations) ||
    hasPendingRequest(adminQueries) ||
    hasPendingRequest(adminMutations);

  if (!isFetching) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-background/70 backdrop-blur-sm">
      <div className="grid h-full place-items-center">
        <div className="flex min-w-[220px] items-center gap-3 rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-xl">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Loader2 className="size-5 animate-spin" />
          </div>

          <div className="space-y-0.5">
            <p className="text-sm font-medium text-foreground">Loading</p>
            <p className="text-xs text-muted-foreground">Please wait while we prepare your data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
