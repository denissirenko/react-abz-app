import { useEffect, useState } from 'react';

const useFetch = () => {
  const [token, setToken] = useState('');
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setToken(data.token);
      })
      .catch(function (error) {
        console.log(error);
      });

    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setPositions(data.positions);
      });
  }, []);

  return { token, positions };
};

export default useFetch;
