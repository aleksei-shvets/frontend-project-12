const apiPath = '/api/v1';

export const fetchRoutes = {
  dataPath: () => [apiPath, 'data'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  updateChannelPath: (id) => [apiPath, 'channels', id].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
};

export const ROUTES = {
  login: '/login',
  signup: '/signup',
  home: '/',
  notFound: '*',
};
