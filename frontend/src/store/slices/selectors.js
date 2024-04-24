import { selectMessagesByChannelId, baseMessagesSelectors } from './messagesSlice.js';

import { baseChannelsSelectors, currentChannelIdSelector } from './channelsSlice.js';

import {
  isShownSelector, getModalTypeSelector, getUpdatedChannelId,
} from './modalSlice.js';

export const messageSelectors = {
  ...baseMessagesSelectors,
  filtredMessages: selectMessagesByChannelId,
};

export const channelSelectors = {
  ...baseChannelsSelectors,
  currentChannelIdSelector,
};

export const modalSelectors = {
  isShownSelector, getModalTypeSelector, getUpdatedChannelId,
};
