import { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Image, Spinner, useToast, Flex, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get product ID from URL
  const toast = useToast();

  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const bgColor = useColorModeValue("white", "gray.800");
  const buttonColor = useColorModeValue("blue.600", "blue.400");
  const buttonHoverColor = useColorModeValue("blue.500", "blue.300");

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        toast({
          title: "Error fetching product details",
          description: error.message || "There was an issue fetching product details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId"); // Get the logged-in user's ID from localStorage
    if (!userId) {
      toast({
        title: "You need to log in",
        description: "Please log in to add items to your cart.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
    const productIndex = existingCart.findIndex((item) => item.id === product.id);

    if (productIndex >= 0) {
      existingCart[productIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(`cart-${userId}`, JSON.stringify(existingCart));

    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!product) {
    return <Text>No product found</Text>;
  }

  return (
    <Box p={8}>
      <Flex direction={flexDirection} justify="center" align="center">
        <Box flex="1">
          <Image src={product.images[0]} alt={product.title} />
        </Box>
        <Box flex="2" p={6}>
          <Heading as="h1" size="xl">{product.title}</Heading>
          <Text>{product.description}</Text>
          <Text fontWeight="bold">${product.price}</Text>
          <Button onClick={handleAddToCart} colorScheme="blue">Add to Cart</Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default ProductDetailPage;
