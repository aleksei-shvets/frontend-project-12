const apiPath = '/api/v1';

export default {
  dataPath: () => [apiPath, 'data'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
};
