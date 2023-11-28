// components/AddToCart.tsx
import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import CartContext from '../../pages/products/CartContext';

const ADD_TO_CART = gql`
  mutation ATC($input: AddToCartInput!) {
    addToCart(input: $input) {
      cart {
        // Include necessary fields in the response
      }
    }
  }
`;

const AddToCart: React.FC<{ product: any }> = ({ product }) => {
  const [addToCartMutation] = useMutation(ADD_TO_CART);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = async () => {
    try {
      const { data } = await addToCartMutation({
        variables: { input: { productId: product.databaseId, quantity: 1, clientMutationId: '123' } },
      });

      // Save locally
      addToCart(product);

      // Handle response as needed
      console.log('Add to Cart Response:', data);
    } catch (error) {
      console.error('Add to Cart Error:', error);
    }
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCart;
