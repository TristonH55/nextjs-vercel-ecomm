// pages/products/[slug].js
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import client from 'apollo-client.js';

const GET_PRODUCT = gql`
query GetProduct($slug: String!) {
    product(id: $slug, idType: SLUG) {
      id
      productId
      name
      description
      ... on SimpleProduct {
        price
        image {
          sourceUrl
        }
      }
      slug
      }
    }
  }
`;

const ProductPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log('Slug:', slug);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    client,
    variables: { slug },
  });

  console.log('Query Data:', data); // Log the query data to the console


  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <div>Error loading product</div>;
  }

  const product = data.GetProduct.nodes[0];

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      {/* Add other product details or components */}
    </div>
  );
};

export default ProductPage;