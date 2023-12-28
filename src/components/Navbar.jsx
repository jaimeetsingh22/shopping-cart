// Navbar.js

import React from 'react';
import { Box, IconButton, Badge, VStack, HStack, Heading } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { cartItems } = useSelector(state => state.cart)
  return (
    <Box p={4} bg="teal.500" color="white" width={'full'} >
      <HStack justifyContent={'space-between'} w={'95%'} h={'10vh'}>
        <Heading marginLeft={'3'} cursor={'pointer'} as={Link} to={'/'}>
          Shoping site
        </Heading>
        <VStack spacing={3} pos={{ base: 'unset', md: 'fixed' }} top={'4'}
          right={'4'} zIndex={'overlay'}  >
          <Badge variant="solid" borderRadius={'50%'} fontWeight={'bold'} fontSize={'large'} >{cartItems.length}</Badge>
          <IconButton border={'1px'}
            as={Link} to="/cart" aria-label="Go to Cart" aria icon={<FaShoppingCart size={20} />} variant="ghost" _hover={{ bg: "gray.700", color: "yellow.300" }} />
        </VStack>
      </HStack>

    </Box>
  );
};

export default Navbar;
