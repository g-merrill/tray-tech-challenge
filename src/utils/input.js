const BASE_URL = '/api/v1/input';

const getInputAPICall = () => {
  return fetch(BASE_URL).then(res => res.json());
};

export {
  getInputAPICall
};
