import { baseQueryWithReauth } from '@/api/baseQuery';
import type {
  IConversation,
  IConversationContext,
  ICreateConversation,
  IGetAllCoversations,
  IGetMessagesByConversation,
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
    getMessagesByConversation:builder.infiniteQuery<
    IGetMessagesByConversation,
    {conversationId:string;cursor?:string;limit?:number},
    string | null
    >({
      infiniteQueryOptions:{
        initialPageParam:null,
        getNextPageParam:(lastPage) => {
          console.log("Last page: ",lastPage)
          if(!lastPage.data.hasMore)
          {
            return; 
          }
          return lastPage.data.nextCursor;
        }


      },
      query:({queryArg,pageParam}) => ({
        url:`/chats/conversations/messages/${queryArg.conversationId}`,
        method:"GET",
        params:{
          limit:queryArg.limit ?? 50,
          ...(pageParam ? {cursor:pageParam} : {})
        }
      })
    })
    // getMessagesByConversation:builder.query<IGetMessagesByConversation,{conversationId:string;cursor?:string;limit?:number}>({
    //   query:({conversationId,cursor,limit = 50}) => ({
    //     url:`/chats/messages/conversations/${conversationId}?cursor=${cursor}&limit=${limit}`,
    //     method:"GET"
    //   })
    // })
  }),
});

export const {
  useCreateConversationApiMutation,
  useGetAllConversationApiQuery,
  useGetAllMessagesByConversationIdQuery,
  useLazyGetConversationContextQuery,
  useGetConversationContextQuery,
  useGetMessagesByConversationInfiniteQuery
} = chatApi;
