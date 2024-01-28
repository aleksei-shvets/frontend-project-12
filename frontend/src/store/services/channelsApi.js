import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import fetchRoutes from '../../api/route.js';
// import getAuthHeader from '../../utils/getAuthHeader.js';

// const token = getAuthHeader();

const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({ baseUrl: fetchRoutes.channelsPath() }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: (token) => ({
        url: '',
        method: 'GET',
        headers: token,
      }),
    }),
    editChannel: builder.mutation({
      query: (token, id, editedChannel) => ({
        url: id,
        method: 'PATCH',
        headers: token,
        body: editedChannel,
      }),
    }),
    addChannel: builder.mutation({
      query: (token, addedChannel) => ({
        url: '',
        method: 'POST',
        headers: token,
        body: addedChannel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (token, id) => ({
        url: id,
        method: 'DELETE',
        headers: token,
      }),
    }),
  }),
});

export const {
  useAddChannelMutation,
  useRemoveChannelMutation,
  useGetChannelsQuery,
  useEditChannelMutation,
} = channelsApi;
export default channelsApi;
