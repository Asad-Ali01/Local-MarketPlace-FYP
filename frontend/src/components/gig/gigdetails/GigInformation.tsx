import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FolderTree,
  FolderOpen,
  Wallet,
  Star,
  ShoppingBag,
  MessageSquare,
  Tags,
} from "lucide-react";
import type { IGig } from "@/types/gig.types";


type GigInformationProps = {
  gig: IGig;
};

export default function GigInformation({
  gig,
}: GigInformationProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4 sm:p-6">
        <h2 className="mb-5 text-xl font-bold sm:mb-6 sm:text-2xl">
          Gig Information
        </h2>

        <div className="divide-y rounded-lg border">
          {/* Starting Price */}
          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium sm:text-base">
              <Wallet className="h-4 w-4 shrink-0" />
              <span>Starting Price</span>
            </div>

            <div className="break-words text-sm sm:text-right sm:text-base">
              {gig.startingPrice
                ? `PKR ${gig.startingPrice.toLocaleString()}`
                : "Contact Provider"}
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium sm:text-base">
              <FolderTree className="h-4 w-4 shrink-0" />
              <span>Category</span>
            </div>

            <Badge variant="secondary" className="w-fit">
              {gig.category.name}
            </Badge>
          </div>

          {/* Subcategory */}
          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium sm:text-base">
              <FolderOpen className="h-4 w-4 shrink-0" />
              <span>Subcategory</span>
            </div>

            <Badge variant="outline" className="w-fit">
              {gig.subCategory.name}
            </Badge>
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium sm:text-base">
              <Star className="h-4 w-4 shrink-0" />
              <span>Rating</span>
            </div>

            <span className="text-sm sm:text-base">
              ⭐ {gig.rating.toFixed(1)}
            </span>
          </div>

          {/* Reviews */}
          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium sm:text-base">
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span>Reviews</span>
            </div>

            <span className="text-sm sm:text-base">
              {gig.totalReviews}
            </span>
          </div>

          {/* Orders */}
          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium sm:text-base">
              <ShoppingBag className="h-4 w-4 shrink-0" />
              <span>Orders</span>
            </div>

            <span className="text-sm sm:text-base">
              {gig.totalOrders}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium sm:text-base">
              <Tags className="h-4 w-4 shrink-0" />
              <span>Tags</span>
            </div>

            <div className="flex flex-wrap gap-2 sm:max-w-[70%] sm:justify-end">
              {gig.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}