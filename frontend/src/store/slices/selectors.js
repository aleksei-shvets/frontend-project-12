import { filtredMessages, baseMessagesSelectors } from './messagesSlice.js';

import { baseChannelsSelectors, currentChannelIdSelector, currentChannel } from './channelsSlice.js';

import {
  isShownSelector, getModalTypeSelector, getUpdatedChannelId,
} from './modalSlice.js';

export const messageSelectors = {
  ...baseMessagesSelectors,
  filtredMessages,
};

export const channelSelectors = {
  ...baseChannelsSelectors,
  currentChannelIdSelector,
  currentChannel,
};

export const modalSelectors = {
  isShownSelector, getModalTypeSelector, getUpdatedChannelId,
};
