const apiPath = '/api/v1';

export default {
  dataPath: () => [apiPath, 'data'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  updateChannelPath: (id) => [apiPath, 'channels', id].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
};
