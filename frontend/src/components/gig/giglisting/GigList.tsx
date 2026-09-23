import type { IGig } from "@/types/gig.types";
import GigCard from "./GigCard";

interface GigListProps {
  gigs: IGig[];
}

function GigList({ gigs }: GigListProps) {
  return (
    <ul className="space-y-5">
      {gigs.map((gig, index) => (
        <GigCard
          key={gig._id}
          gig={gig}
          index={index}
        />
      ))}
    </ul>
  );
}

export default GigList;