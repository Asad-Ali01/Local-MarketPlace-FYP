import { baseQueryWithReauth } from '@/api/baseQuery';
import type {
  IConversation,
  IConversationContext,
  ICreateConversation,
  IGetAllCoversations,
  IMessages,
} from '@/types/chat.types';
import { createApi } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createConversationApi: builder.mutation<
      ICreateConversation,
      { providerId: string; gigId: string }
    >({
      query: ({ providerId, gigId }) => ({
        url: '/chats/conversations',
        method: 'POST',
        body: {
          providerId,
          gigId,
        },
      }),
    }),
    getAllConversationApi: builder.query<IGetAllCoversations, void>({
      query: () => ({
        url: '/chats/conversations',
        method: 'GET',
      }),
    }),
    getAllMessagesByConversationId: builder.query<IMessages, string>({
      query: (conversationId) => ({
        url: `/chats/${conversationId}/messages`,
        method: 'GET',
      }),
    }),
    getConversationContext: builder.query<
      IConversationContext | null,
      { providerId: string; gigId: string }
    >({
      query: ({ providerId, gigId }) => ({
        url: `/chats/conversations/context?providerId=${providerId}&gigId=${gigId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateConversationApiMutation,
  useGetAllConversationApiQuery,
  useGetAllMessagesByConversationIdQuery,
  useGetConversationContextQuery,
} = chatApi;
