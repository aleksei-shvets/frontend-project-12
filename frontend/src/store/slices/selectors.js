import { filtredMessages, baseMessagesSelectors, getMessageErrors } from './messagesSlice.js';

import {
  baseChannelsSelectors, currentChannelIdSelector, currentChannel, getChannelErrors,
} from './channelsSlice.js';

import {
  isShownSelector, getModalTypeSelector, getUpdatedChannelId,
} from './modalSlice.js';

export const messageSelectors = {
  ...baseMessagesSelectors,
  filtredMessages,
  getMessageErrors,
};

export const channelSelectors = {
  ...baseChannelsSelectors,
  currentChannelIdSelector,
  currentChannel,
  getChannelErrors,
};

export const modalSelectors = {
  isShownSelector, getModalTypeSelector, getUpdatedChannelId,
};
