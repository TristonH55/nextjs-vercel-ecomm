// woofetchDataScript.js
// import { fetchWooCommerceProducts } from './woocommerceService.js';
// import fs from 'fs';

// const fetchData = async () => {
//   try {
//     const data = await fetchWooCommerceProducts();
//     fs.writeFileSync('./data/woocommerceData.json', JSON.stringify(data));
//     console.log('Data saved successfully.');
//   } catch (error) {
//     console.error('Error fetching or saving data:', error);
//   }
// };

// fetchData();


import axios from 'axios';
import fs from 'fs';

const fetchWooCommerceProducts = async () => {
  const url = 'http://localhost/wordpress-scooter-site/wp-json/wc/v3/products';
  const key = 'ck_a23c12c93780c33eb3ef5d49626278b097465413';
  const secret = 'cs_50a2caab996093c3af19fb6ddd44177fc277a9b1';

  const response = await axios.get(url, {
    auth: {
      username: key,
      password: secret,
    },
  });

  return response.data;
};

const saveDataToFile = (data) => {
  fs.writeFileSync('.woocommerceProductsData.json', JSON.stringify(data));
  console.log('Data saved successfully.');
};

const fetchDataAndSave = async () => {
  try {
    const data = await fetchWooCommerceProducts();
    saveDataToFile(data);
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
};

fetchDataAndSave();