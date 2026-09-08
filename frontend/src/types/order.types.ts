import type { IGig, IProvider } from './gig.types';

export interface IOrder {
  gig: IGig;
  provider: IProvider;
  client: string;
  status: 'pending' | 'in_progress' | 'delivered' | 'completed' | 'cancelled' | 'revision';
  price: number;
  deadline?: Date;
  deliveryDate?: Date;
  requirements?: string;
  createdAt: Date;
  updatedAt: Date;
}
