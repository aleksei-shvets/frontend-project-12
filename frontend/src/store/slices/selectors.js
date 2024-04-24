import { selectMessagesByChannelId, messagesSelectors } from './messagesSlice.js';
import {
  channelsSelector, currentChannelIdSelector,
} from './channelsSlice.js';

export const msgSelectors = {
  ...messagesSelectors,
  filtredMessages: selectMessagesByChannelId,
};

export const cnSelectors = {
  ...channelsSelector,
  currentChannelIdSelector,
};
