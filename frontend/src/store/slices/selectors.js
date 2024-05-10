import { filtredMessages, baseMessagesSelectors } from './messagesSlice.js';

import {
  baseChannelsSelectors, currentChannelIdSelector, currentChannel, getErrors,
} from './channelsSlice.js';

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
  getErrors,
};

export const modalSelectors = {
  isShownSelector, getModalTypeSelector, getUpdatedChannelId,
};
