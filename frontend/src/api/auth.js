import axios from 'axios';

const axios = require('axios');

axios.get('https://serenityhub.up.railway.app:5173')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });

  axios.put('https://serenityhub.up.railway.app:5173', data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });

export async function registerUser(data) {
  return await axios.post(`https://serenityhub.up.railway.app:5173/register`, data);
}

export async function login(email, password) {
  return await axios.post(`https://serenityhub.up.railway.app:5173/login`, {
    email,
    password,
  });
}

export async function logout() {
  const token = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};

  return await axios
    .post(`${import.meta.env.VITE_HOST_API}/logout`, null, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      localStorage.removeItem('auth');
      return response;
    });
}
