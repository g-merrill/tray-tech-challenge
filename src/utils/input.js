const BASE_URL = '/api/v1/input';

const getInputFromBackend = () => {
  return fetch(BASE_URL).then(res => res.json());
};

export default {
  getInputFromBackend
};
