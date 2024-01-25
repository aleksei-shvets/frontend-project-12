const isAutorize = () => {
  return localStorage.getItem('userToken');
};

export default isAutorize;
