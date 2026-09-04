import { useGigDetailsByGigIdQuery } from "@/features/gig/gigApi";
import { useParams } from "react-router";
import GigHeader from "./gigdetails/GigHeader";
import GigGallery from "./gigdetails/GigGallery";
import AboutGig from "./gigdetails/AboutGig";
import GigInformation from "./gigdetails/GigInformation";
import LocationCard from "./gigdetails/LocationCard";
import ReviewsSection from "./gigdetails/ReviewSection";
import LocationSection from "./gigdetails/map/LocationSection";



export default function ViewGigDetailsById() {
  const { gigId } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useGigDetailsByGigIdQuery(gigId!, {
    skip: !gigId,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-10">
        Loading...
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="mx-auto max-w-7xl p-10">
        Gig not found.
      </div>
    );
  }

  const gig = data.data;
  return (
    <main className="bg-slate-50 min-h-screen">

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8">

        <GigHeader gig={gig} />

        <GigGallery images={gig.images} />

        <AboutGig description={gig.description} />

   

        <GigInformation gig={gig} />

        <LocationCard location={gig.location} />
        <LocationSection providerLocation={gig.location} providerName={gig.provider.name} gigTitle={gig.title}/>
      <ReviewsSection/>
      </div>

    </main>
  );
}