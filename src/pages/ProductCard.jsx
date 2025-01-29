import { useState } from "react";
import {
  Card, CardBody, CardFooter, Image, Stack, Heading, Text,
  Button, ButtonGroup, Divider, Box, Badge, useColorModeValue, useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();  // Hook for navigation

    const toggleDescription = () => setIsExpanded(!isExpanded);

    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.700", "gray.300");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        toast({
            title: "Added to Cart",
            description: `${product.title} has been added to your cart.`,
            status: "success",
            duration: 2000,
            isClosable: true,
        });
    };

    const handleViewDetails = () => {
        navigate(`/product/${product.id}`);  // Redirect to the product detail page
    };

    return (
        <Card maxW="sm" m={4} boxShadow="xl" borderRadius="lg" border="1px solid" borderColor={borderColor} overflow="hidden" bg={bgColor}>
            <Box position="relative">
                <Image src={product.images[0]} alt={product.title} borderRadius="lg" boxSize="100%" objectFit="cover" />
                <Badge position="absolute" top="10px" left="10px" bg="red.500" color="white" px={3} py={1} borderRadius="md" fontSize="sm" fontWeight="bold">{`$${product.price}`}</Badge>
            </Box>
            <CardBody>
                <Stack mt="4" spacing="3">
                    <Heading size="md" color={textColor}>{product.title}</Heading>
                    <Text fontSize="sm" color="gray.500">
                        {isExpanded ? product.description : `${product.description.substring(0, 60)}...`}
                    </Text>
                    <Button variant="link" colorScheme="blue" fontSize="sm" onClick={toggleDescription}>
                        {isExpanded ? "Read Less" : "Read More"}
                    </Button>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter display="flex" justifyContent="space-between">
                <ButtonGroup spacing="3">
                    <Button colorScheme="blue" size="sm" onClick={handleAddToCart} isDisabled={isAdded}>{isAdded ? "Added" : "Add to Cart"}</Button>
                    <Button variant="outline" colorScheme="blue" size="sm" onClick={handleViewDetails}>View Details</Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

export default ProductCard;
