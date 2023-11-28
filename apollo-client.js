import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost/wordpress-scooter-site/graphql', // replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;



// import { ApolloClient, InMemoryCache } from '@apollo/client';
// import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// const client = new ApolloClient({
//   uri: 'http://localhost/wordpress-scooter-site/graphql', // replace with your GraphQL endpoint
//   cache: new InMemoryCache(),
// });

// // WooCommerce API Client
// const wooCommerceClient = new WooCommerceRestApi({
//     url: 'http://localhost/wordpress-scooter-site', // replace with your WooCommerce site URL
//     consumerKey: 'your-consumer-key',
//     consumerSecret: 'your-consumer-secret',
//     version: 'wc/v3',
//     queryStringAuth: true,
//   });

// export default { client, wooCommerceClient };


