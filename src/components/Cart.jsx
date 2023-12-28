import React from 'react';
import { addToCart, calculatePrice, decreament, deleteCartItem, setTotalzero } from '../Redux/cartSlice';
import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  Button,
  HStack,
  VStack,
  Image
} from '@chakra-ui/react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const CartItem = ({ name, id, price, image, quantity }) => {
  const dispatch = useDispatch();
  // document.body.style = ' color:black;' 

  return (
    <Flex key={id} justify="space-between" mb={3} p={3} borderRadius={'10px'} color={'black'} bg={'white'} border={'1px'}>
      <HStack flexDirection={{ base: 'column', md: 'row' }}>
        <Image src={image} width={'200px'} height={'9rem'} objectFit={'contain'} />
        <Text>{name}</Text>
        <Text alignSelf={'flex-end'} fontWeight={'bold'}>₹{price}</Text>
      </HStack>
      <HStack>
        <IconButton
          aria-label="Increase"
          icon={<FaPlus />}
          colorScheme='teal'
          color={'black'}
          variant={'ghost'}
          border={'1px'}
          onClick={() => {
            dispatch(addToCart({ id }))
            dispatch(calculatePrice())
          }}
        />
        <Text fontWeight={'bold'}>{quantity}</Text>
        <IconButton
          aria-label="Decrease"
          colorScheme='teal'
          variant={'ghost'}
          border={'1px'}
          color={'black'}
          icon={<FaMinus />}
          onClick={() => {
            dispatch(decreament({ id }))
            dispatch(calculatePrice())

          }}
        />
        <Button marginLeft={'.5rem'} colorScheme="red"
          onClick={() => {
            dispatch(deleteCartItem(id))
            dispatch(calculatePrice());
            dispatch(setTotalzero());
          }}>
          <FaTrash />
        </Button>
      </HStack>
    </Flex>
  )
};

const Cart = () => {
  // const [cartItems, setCartItems] = useState([
  //   { id: 1, name: 'Product 1', price: 100, quantity: 1 },
  // ]);
  const { cartItems, subTotal, shipping, tax, total } = useSelector(state => state.cart);



  return (
    <Flex direction={{ base: 'column', md: 'row' }} width="100%" p={5} >
      {/* product */}
      <Box flex={{ base: 1, md: 2 }} overflowY={'auto'} css={{
        '::-webkit-scrollbar': {
          display: "none"
        }

      }} height={'80vh'}>

        {cartItems.length > 0 ? cartItems.map((item, index) => (
          <CartItem
            image={item.image}
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        )) : <Heading textAlign={'center'}>No Items there </Heading>}
      </Box>
      <Box flex={{ base: 1, md: 0.8 }} ml={{ base: 0, md: 4 }} h={'80vh'} w={'100%'} borderRadius={'80px 0 0 80px'} boxShadow={'-10px 0 10px rgba(0,0,0,0.182)'}>
        <VStack p={'4'} justifyContent={'center'} alignItems={'flex-start'} spacing={3} marginLeft={'5'} h={'100%'} >
          <Heading mb={1}>Total</Heading>
          <Text>Subtotal: ₹{subTotal}</Text>
          <Text>Shipping Charge: ₹{shipping}</Text>
          <Text>Tax: ₹{tax}</Text>
          <Text fontSize="xl" fontWeight="bold">
            Total: ₹{total}
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Cart;
