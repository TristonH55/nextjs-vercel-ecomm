// const Shop = () => {
//     return (
//       <div>
//         <h1>Woo Store</h1>
//         <p>woocommerce store coming soon bitches.</p>
//       </div>
//     );
//   };
  
//   export default Shop;


// code 2 \\\\\\\\\\\\\\\\\\\\\\\\\ WORKING ONE //////////////////////

// import { useWooCommerceProducts } from 'wooserver';
// const Shop = () => {
//     const { products, isLoading, isError } = useWooCommerceProducts();
  
//     if (isLoading) return <div>Loading...</div>;
//     if (isError) return <div>Error loading products</div>;
  
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {products.map((product) => (
//             <div key={product.id} className="card w-full bg-base-100 shadow-xl">
//               <figure>
//                 <img src={product.images[0].src} alt={product.name} />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title">{product.name}</h2>
//                 {/* Render HTML content using dangerouslySetInnerHTML */}
//                 <div dangerouslySetInnerHTML={{ __html: product.description }} />
//                 <p>Price: {product.price}</p>
//                 {/* You can add more details or buttons here */}
//                 <div className="card-actions justify-end">
//                   <button className="btn btn-primary">Buy Now</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     };
  
//   export default Shop;



// code 3 axios
// Your component file
// import React, { useEffect, useState } from 'react';
// import { fetchWooCommerceProducts } from 'wooserver';

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchWooCommerceProducts();
//         setProducts(data);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error loading products</div>;

//   return (
//     <div>
//       <h1>Shop</h1>
//       <p>This is the shop page content.</p>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>{product.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Shop;


// Code 4 
// Tesing a GrapgQl GET
import { useQuery, gql } from '@apollo/client';
import client from 'apollo-client.js'; // adjust the path
import { useRouter } from 'next/router';


const GET_PRODUCTS = gql`
  {
    products {
      nodes {
        id
        sku
        shortDescription
        slug
        description
        image {
          uri
          title
          srcSet
          sourceUrl
        }
        onSale
        ... on SimpleProduct {
          id
          name
          price
          regularPrice
          salePrice
        }
      }
    }
  }
`;

const Shop = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_PRODUCTS, { client });

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <div>Error loading products</div>;
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {data.products.nodes.map((product) => (
        <div
          key={product.id}
          className="card w-96 bg-base-100 shadow-xl"
          onClick={() => {
            console.log('Product Slug:', product.slug);
            router.push({ pathname: '/products/[slug]', query: { slug: product.slug } });
          }}
        >
          {product.image && (
            <figure>
              <img src={product.image.sourceUrl} alt={product.name} className="card-img-top" />
            </figure>
          )}
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;