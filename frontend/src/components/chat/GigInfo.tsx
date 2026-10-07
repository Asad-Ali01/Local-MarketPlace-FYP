import type { INewConversation } from "@/types/chat.types";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

interface GigInfoProps {
  gig?: {
    startingPrice?: number;
    title: string;
    _id: string;
  };
  newConversationGig?:INewConversation["gig"]
}

function GigInfo({ gig,newConversationGig }: GigInfoProps) {
  // if (!gig) {
  //   return null;
  // }
  console.log("GIGINFO CALLED");
  const navigate = useNavigate();
  const handleGigClick = (gigId:string | undefined) => {
    if(gigId)
    {

      navigate(`/gig/details/${gigId}`)
    }
   
  }
  return (
    <div className="border-b bg-gray-50 p-4">
      <div className="rounded-lg border bg-white p-4 flex justify-between items-center">
        <div>

        <p className="text-xs font-medium uppercase text-gray-500">Discussing this gig</p>

        <h3 className="mt-1 font-semibold">{gig?.title || newConversationGig?.title}</h3>

        <p className="mt-1 text-sm text-gray-500">Starting from {gig?.startingPrice || newConversationGig?.startingPrice || 0} PKR</p>
        </div>
      <Button onClick={() => handleGigClick(gig?._id || newConversationGig?._id)}>Open gig</Button>

      </div>
    </div>
  );
}

export default GigInfo;
