// pages/products/[slug].js
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import client from 'apollo-client.js';

const isEmpty = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && Object.keys(value).length === 0) return true;
    return false;
  };

export const GET_PRODUCT = gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      productId: databaseId
      averageRating
      slug
      description
      galleryImages {
        nodes {
          id
          title
          altText
          mediaItemUrl
        }
      }
      image {
        id
        uri
        title
        srcSet
        sourceUrl
      }
      name
      ... on SimpleProduct {
        price
        id
        regularPrice
      }
      ... on VariableProduct {
        price
        id
        regularPrice
      }
    }
  }
`;

const ProductPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    client,
    variables: { slug },
  });

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <div>Error loading product</div>;
  }

  const product = data.product;

  return (
    <div className="container mx-auto my-32 px-4 xl:px-0">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="product-images">
          {!isEmpty(product?.galleryImages?.nodes) ? (
            <img
              src={product?.galleryImages?.nodes[0]?.mediaItemUrl}
              alt="Product Image"
              width="100%"
              height="auto"
            />
          ) : !isEmpty(product.image) ? (
            <img
              src={product?.image?.sourceUrl}
              alt="Product Image"
              width="100%"
              height="auto"
            />
          ) : null}
        </div>
        <div className="product-info">
          <h4 className="text-2xl uppercase">{product.name}</h4>
          <div
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
            className="mb-5"
          />
          <p>Price: {product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;