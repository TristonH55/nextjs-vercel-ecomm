// woocommerceService.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/wordpress-scooter-site',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('ck_a23c12c93780c33eb3ef5d49626278b097465413:cs_50a2caab996093c3af19fb6ddd44177fc277a9b1'),
  },
});

export async function fetchWooCommerceProducts() {
  try {
    const response = await api.get('/wp-json/wc/v3/products');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error);
  }
}
