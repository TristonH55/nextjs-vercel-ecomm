// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// const consumerKey = process.env.WOOCOMMERCE_KEY;
// const consumerSecret = process.env.WOOCOMMERCE_SECRET;

// if (!consumerKey || !consumerSecret) {
//   throw new Error("WooCommerce API keys are not provided.");
// }

// const WooCommerceAPI = require('woocommerce-api');
// // initialise the WooCommerceRestApi //
// const api = new WooCommerceRestApi({
//     url: "http://localhost/wordpress-scooter-site",
//     consumerKey,
//     consumerSecret,
//     wpAPI: true,
//     version: "wc/v3",
//   });

// // fetch all products from WooCommerce //
// export async function fetchWooCommerceProducts() {
//   try {
//     const response = await api.get("products");
//     return response;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// wooserver.get( '/getProducts', ( req, res ) => {
//     WooCommerce.get("products")
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error.response.data);
//   });
    
// })

//code 2

// woocommerce.js SWR SETUP
import useSWR from 'swr';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

console.log('WOOCOMMERCE_KEY:', process.env.WOOCOMMERCE_KEY);
console.log('WOOCOMMERCE_SECRET:', process.env.WOOCOMMERCE_SECRET);


const api = new WooCommerceRestApi({
  url: 'http://localhost/wordpress-scooter-site',
  consumerKey: 'ck_a23c12c93780c33eb3ef5d49626278b097465413',
  consumerSecret: 'cs_50a2caab996093c3af19fb6ddd44177fc277a9b1',
  version: 'wc/v3',
  queryStringAuth: true,
});

export function useWooCommerceProducts() {
  const fetcher = async () => {
    try {
      const { data } = await api.get('products');
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error(error);
    }
  };

  const { data, error } = useSWR('products', fetcher);

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function fetchWooCommerceProducts() {
    try {
      const response = await api.get("products");
      return response.data; // Assuming WooCommerce response has a 'data' property
    } catch (error) {
      throw new Error(error);
    }
  }

////////////////////////////////////

// code 3 
//wooserver.js
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost/wordpress-scooter-site',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: 'Basic ' + btoa('ck_a23c12c93780c33eb3ef5d49626278b097465413:cs_50a2caab996093c3af19fb6ddd44177fc277a9b1'),
//   },
// });

// export async function fetchWooCommerceProducts() {
//   try {
//     const response = await api.get('/wp-json/wc/v3/products');
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     console.log('Request Config:', error.config);
//   console.log('Request Object:', error.request);
//     throw new Error(error);
//   }
// }


// code 4
