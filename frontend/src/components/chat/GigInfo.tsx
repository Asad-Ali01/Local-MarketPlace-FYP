interface GigInfoProps {
  gig?: {
    startingPrice?: number;
    title: string;
    _id: string;
  };
}

function GigInfo({ gig }: GigInfoProps) {
  if (!gig) {
    return null;
  }
  return (
    <div className="border-b bg-gray-50 p-4">
      <div className="rounded-lg border bg-white p-4">
        <p className="text-xs font-medium uppercase text-gray-500">Discussing this gig</p>

        <h3 className="mt-1 font-semibold">{gig.title}</h3>

        <p className="mt-1 text-sm text-gray-500">Starting from {gig.startingPrice ?? 0} PKR</p>
      </div>
    </div>
  );
}

export default GigInfo;
