import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { IAvatar } from '@/types/gig.types';
type NewConversationItemProps = {
  provider: {
    _id: string;
    name: string;
    avatar: IAvatar;
  };
  gig: {
    _id: string;
    title: string;
    startingPrice: number | null;
  };
  isSelected: boolean;
};
function NewConversationItem({ provider, gig, isSelected }: NewConversationItemProps) {
  return (
    <button
      className={`flex w-full items-center gap-3 border-b p-4 text-left ${
        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
    >
      <Avatar className="h-12 w-12 shrink-0">
        <AvatarImage src={provider.avatar?.url} alt={provider.name} />

        <AvatarFallback>{provider.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{provider.name}</p>

        <p className="truncate text-sm text-gray-500">{gig.title}</p>
      </div>

      <span className="text-xs text-blue-500">New</span>
    </button>
  );
}
export default NewConversationItem;
