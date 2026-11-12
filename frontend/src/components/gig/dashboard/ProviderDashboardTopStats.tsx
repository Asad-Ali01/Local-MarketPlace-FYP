
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MessageSquareMore,
  Star,
  WalletCards,
} from "lucide-react";
import { skipToken } from "@reduxjs/toolkit/query";
import { Skeleton, Statistic, Tooltip } from "antd";

import { useProviderDashboardTopCardQuery } from "@/features/gig/gigApi";
import { useAppSelector } from "@/hooks/useAppDispatchSelector";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ProviderDashboardTopStats() {
  const providerId = useAppSelector(
    (state) => state.auth.user?._id
  );

  const { data, isLoading, isFetching } =
    useProviderDashboardTopCardQuery(
      providerId ? providerId : skipToken
    );

  const stats = data?.data;

  const cards = [
    {
      title: "Total Gigs",
      value: stats?.totalGigs ?? 0,
      description: "Published service listings",
      icon: BriefcaseBusiness,
      color: "text-blue-500",
      background: "bg-blue-500/10",
    },
    {
      title: "Active Orders",
      value: stats?.activeOrders ?? 0,
      description: "Orders currently in progress",
      icon: Clock3,
      color: "text-orange-500",
      background: "bg-orange-500/10",
    },
    {
      title: "Completed Orders",
      value: stats?.completedOrders ?? 0,
      description: "Successfully delivered work",
      icon: CheckCircle2,
      color: "text-emerald-500",
      background: "bg-emerald-500/10",
    },
    {
      title: "Unread Messages",
      value: stats?.unreadMessages ?? 0,
      description: "Conversations waiting for your reply",
      icon: MessageSquareMore,
      color: "text-violet-500",
      background: "bg-violet-500/10",
    },
    {
      title: "Average Rating",
      value:
        typeof stats?.averageRating === "number"
          ? stats.averageRating.toFixed(1)
          : "0.0",
      description: "Your current public rating",
      icon: Star,
      color: "text-amber-500",
      background: "bg-amber-500/10",
    },
    {
      title: "Total Earnings",
      value:
        typeof stats?.totalEarnings === "number"
          ? stats.totalEarnings
          : 0,
      description: "Lifetime earnings from completed orders",
      icon: WalletCards,
      color: "text-teal-500",
      background: "bg-teal-500/10",
      prefix: "Rs ",
      formatter: (value: number | string) =>
        Number(value).toLocaleString("en-PK"),
    },
  ];

  if (isLoading && !data) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <Skeleton.Input active size="large" />
          <Skeleton.Input active size="small" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="h-[165px] border-border/70"
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton active title={{ width: 110 }} paragraph={false} />
                <Skeleton.Avatar active size={44} shape="square" />
              </CardHeader>
              <CardContent>
                <Skeleton active title={false} paragraph={{ rows: 1, width: "65%" }} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Dashboard overview
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor your gigs, orders, earnings, and communication in one place.
          </p>
        </div>

        {isFetching && (
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            Refreshing data
          </div>
        )}
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.title}
              className="group relative overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardDescription className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardDescription>

                  <Tooltip title={card.description}>
                    <CardTitle className="text-3xl font-semibold tracking-tight">
                      {card.title === "Total Earnings" ? (
                        <Statistic
                          value={card.value}
                          prefix={card.prefix}
                          formatter={(value) =>
                            Number(value).toLocaleString("en-PK")
                          }
                          valueStyle={{
                            fontSize: "30px",
                            fontWeight: 600,
                            lineHeight: 1.3,
                            color: "inherit",
                          }}
                        />
                      ) : (
                        <Statistic
                          value={card.value}
                          valueStyle={{
                            fontSize: "30px",
                            fontWeight: 600,
                            lineHeight: 1.3,
                            color: "inherit",
                          }}
                        />
                      )}
                    </CardTitle>
                  </Tooltip>
                </div>

                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${card.background} ${card.color} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                <p className="text-sm leading-5 text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default ProviderDashboardTopStats;
