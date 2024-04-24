import { selectMessagesByChannelId, baseMessagesSelectors } from './messagesSlice.js';

import { baseChannelsSelectors, currentChannelIdSelector } from './channelsSlice.js';

export const messageSelectors = {
  ...baseMessagesSelectors,
  filtredMessages: selectMessagesByChannelId,
};

export const channelSelectors = {
  ...baseChannelsSelectors,
  currentChannelIdSelector,
};
