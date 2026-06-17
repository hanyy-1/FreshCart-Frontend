import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5143/api/v1'
});

export default API;