import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MessageSquareMore,
  Star,
  WalletCards,
} from 'lucide-react';
import { skipToken } from '@reduxjs/toolkit/query';

import { useProviderDashboardTopCardQuery } from '@/features/gig/gigApi';
import { useAppSelector } from '@/hooks/useAppDispatchSelector';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function ProviderDashboardTopStats() {
  const providerId = useAppSelector((state) => state.auth.user?._id);

  const { data, isLoading, isFetching } = useProviderDashboardTopCardQuery(
    providerId ? providerId : skipToken,
  );

  const stats = data?.data;

  const cards = [
    {
      title: 'Total Gigs',
      value: stats?.totalGigs ?? 0,
      description: 'Published service listings',
      icon: BriefcaseBusiness,
    },
    {
      title: 'Active Orders',
      value: stats?.activeOrders ?? 0,
      description: 'Orders currently in progress',
      icon: Clock3,
    },
    {
      title: 'Completed Orders',
      value: stats?.completedOrders ?? 0,
      description: 'Successfully delivered work',
      icon: CheckCircle2,
    },
    {
      title: 'Unread Messages',
      value: stats?.unreadMessages ?? 0,
      description: 'Conversations waiting for your reply',
      icon: MessageSquareMore,
    },
    {
      title: 'Average Rating',
      value: typeof stats?.averageRating === 'number' ? stats.averageRating.toFixed(1) : '0.0',
      description: 'Your current public rating',
      icon: Star,
    },
    {
      title: 'Total Earnings',
      value:
        typeof stats?.totalEarnings === 'number'
          ? `Rs ${stats.totalEarnings.toLocaleString()}`
          : 'Rs 0',
      description: 'Lifetime earnings from completed orders',
      icon: WalletCards,
    },
  ];

  if (isLoading && !data) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="h-7 w-52 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-muted/70" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-40 border-border/60 bg-card/60 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard overview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor gigs, orders, earnings, and communication in one place.
          </p>
        </div>

        {isFetching && (
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300">
            <span className="size-2 rounded-full bg-orange-400 animate-pulse" />
            Refreshing
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.title}
              className="group relative overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* top accent line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-linear-to-r from-orange-500/80 via-orange-400/40 to-transparent" />

              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="space-y-1">
                  <CardDescription className="text-sm text-muted-foreground">
                    {card.title}
                  </CardDescription>
                  <CardTitle className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    {card.value}
                  </CardTitle>
                </div>

                <div className="flex size-11 items-center justify-center rounded-2xl border border-orange-500/15 bg-orange-500/10 text-orange-400">
                  <Icon className="size-5" />
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm leading-6 text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default ProviderDashboardTopStats;
