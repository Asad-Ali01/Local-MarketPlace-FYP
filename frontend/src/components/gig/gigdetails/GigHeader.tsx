import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCreateConversationApiMutation } from '@/features/chat/chatApi';
import type { IGig } from '@/types/gig.types';
import { Breadcrumb, Image, Rate } from 'antd';
import { BadgeCheck, Mail, MapPin, User } from 'lucide-react';
import { useNavigate } from 'react-router';

type GigHeaderProps = {
  gig: IGig;
};

export default function GigHeader({ gig }: GigHeaderProps) {
  const [createConversationApi] = useCreateConversationApiMutation();
  const createConversation = async () => {
    // const data = {
    //   providerId:gig.provider._id,
    //   gigId:gig._id
    // }
    const providerId = gig.provider._id;
    const gigId = gig._id;
    //  const conversation =  await  createConversationApi(data).unwrap()
    // navigate(`/client/messages/${conversation.data._id}`)
    navigate(`/client/messages/new?providerId=${providerId}&gigId=${gigId}`);
  };
  const navigate = useNavigate();
  return (
    <section className="space-y-6">
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          {
            title: gig.category.name,
          },
          {
            title: gig.subCategory.name,
          },
        ]}
      />

      <h1 className="max-w-5xl text-3xl font-bold leading-tight md:text-5xl">{gig.title}</h1>

      <div className="flex flex-col gap-6 rounded-2xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        {/* Left */}

        <div className="flex items-center gap-4">
          {gig.avatar?.url ? (
            <div className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full">
              <Image
                src={gig.avatar?.url}
                alt={gig.provider.name}
                preview={{
                  toolbarRender: () => null,
                }}
                width={88}
                height={88}
                className="block h-full w-full object-cover"
              />
            </div>
          ) : (
            <Avatar>
              <AvatarFallback className="text-2xl font-bold">
                {gig.provider.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-semibold">{gig.provider.name}</h2>

              <Badge className="gap-1">
                <BadgeCheck className="h-4 w-4" />
                Verified
              </Badge>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Rate
                  disabled
                  allowHalf
                  value={gig.rating}
                  style={{
                    fontSize: 16,
                  }}
                />

                <span className="font-semibold text-black">{gig.rating.toFixed(1)}</span>

                <span>({gig.totalReviews} Reviews)</span>
              </div>

              <span>•</span>

              <span>{gig.totalOrders} Orders</span>

              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />

                {gig.location.city}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">
          <Button onClick={createConversation}>
            <Mail className="mr-2 h-4 w-4" />
            Contact Provider
          </Button>

          <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            View Profile
          </Button>
        </div>
      </div>
    </section>
  );
}
