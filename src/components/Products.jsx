import React, { useEffect, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { addToCart, calculatePrice } from '../Redux/cartSlice';

import {
  Center,
  Box,
  Image,
  Text,
  Badge,
  HStack,
  Button,
  Flex,
  VStack,
  Container,
  Heading,
  IconButton,
  Tooltip,
  Spacer,
  SimpleGrid,
  Stack,
  Spinner
} from '@chakra-ui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(false)

  // api taken from :
  // https://fakestoreapi.com/products

  useEffect(() => {

    const fetchdata = async () => {
      try {
        const { data } = await axios.get('https://fakestoreapi.com/products');
        console.log("Data", data);
        setProducts(data);
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    };
    fetchdata();
  }, []);


  if (Error) return <ErrorComponent />;

  return (
    <>
      <Container maxW="container.xl" mt={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8} >

          {
            loading ? <Loading /> :
              products.map((i) => (
                <ProductCard key={i.id} name={i.title} price={i.price} image={i.image} badge={i.category} id={i.id} />
              ))
          }
        </SimpleGrid>
      </Container>
    </>
  )
}


// ProductCard.js



const ProductCard = ({ id, name, image, price, badge }) => {

  const dispatch = useDispatch();

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" background={'blackAlpha.800'} color={'white'} css={{

      '&:hover': {
        transform: 'scale(1.02)',
        cursor: 'pointer'
      }
    }}
      transition={'0.3s'}
    >
      <VStack>

        <Image mt={'3'} src={image} alt={name} height="200px" objectFit="contain" />
      </VStack>

      <Box p="6">
        <Stack spacing={1}>
          <Box>
            <Badge borderRadius="full" px="2" colorScheme="teal">
              {badge}
            </Badge>
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {name}
          </Box>
          {/* <Text mt="2" color="gray.600">
            {description}
          </Text> */}
          <Text mt="2" fontWeight="semibold" fontSize="lg">
            ₹{price}
          </Text>
        </Stack>

        <Flex mt="4">
          <Spacer />
          <Tooltip label="Add to cart" placement="left">
            <IconButton
              aria-label="Add to cart"
              icon={<MdShoppingCart size={30} color='black' />}
              colorScheme="teal"
              onClick={() => {
                dispatch(addToCart({ id, name, image, price, quantity: 1 }))
                dispatch(calculatePrice())
                toast.success("Added to Cart");
              }}
            />
          </Tooltip>
        </Flex>
      </Box>
    </Box>
  );
};

const ErrorComponent = () => {
  return (
    <Center h="50vh">
      <Heading color={'red'}>Error While fetching the products</Heading>
    </Center>
  )
}


const Loading = () => {
  return (
    <Box pos={'absolute'} top={'200%'} left={'50%'} transform={'translate:(-50%,-50%);'} >
      <Box transform={'scale(3)'}>
        <Spinner thickness='2px' size={'xl'} speed='0.4s' emptyColor='gray.200' color='blue.800' />
      </Box>
    </Box>
  )
}


export default Products;