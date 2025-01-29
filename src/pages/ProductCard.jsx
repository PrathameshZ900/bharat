import { useState } from "react";
import { 
  Card, CardBody, CardFooter, Image, Stack, Heading, Text, 
  Button, ButtonGroup, Divider, Box, Badge, useColorModeValue 
} from "@chakra-ui/react";

function ProductCard({ product }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleDescription = () => setIsExpanded(!isExpanded);

    // Dynamic color mode for dark & light theme compatibility
    const bgColor = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.700", "gray.300");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    return (
        <Card 
            maxW="sm" 
            m={4} 
            boxShadow="xl" 
            borderRadius="lg"
            border="1px solid" 
            borderColor={borderColor} 
            overflow="hidden"
            bg={bgColor}
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }} 
        >
            {/* Product Image */}
            <Box position="relative">
                <Image
                    src={product.images[0]} 
                    alt={product.title}
                    borderRadius="lg"
                    boxSize="100%"
                    objectFit="cover"
                    transition="opacity 0.3s ease"
                    _hover={{ opacity: 0.9 }}
                />
                
                {/* Price Badge */}
                <Badge 
                    position="absolute" 
                    top="10px" 
                    left="10px" 
                    bg="red.500" 
                    color="white" 
                    px={3} 
                    py={1} 
                    borderRadius="md"
                    fontSize="sm"
                    fontWeight="bold"
                    boxShadow="lg"
                >
                    ${product.price}
                </Badge>
            </Box>

            {/* Card Body */}
            <CardBody>
                <Stack mt="4" spacing="3">
                    <Heading size="md" color={textColor}>{product.title}</Heading>
                    
                    {/* Read More / Read Less Description */}
                    <Text fontSize="sm" color="gray.500">
                        {isExpanded 
                            ? product.description 
                            : `${product.description.substring(0, 60)}...`}
                    </Text>

                    <Button 
                        variant="link" 
                        colorScheme="blue" 
                        fontSize="sm"
                        onClick={toggleDescription}
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </Button>
                </Stack>
            </CardBody>

            <Divider />

         
            <CardFooter display="flex" justifyContent="space-between">
                <ButtonGroup spacing="3">
                    <Button 
                        colorScheme="blue" 
                        size="sm" 
                        fontWeight="bold"
                        _hover={{ bg: "blue.600", transform: "scale(1.1)" }}
                    >
                        Buy Now
                    </Button>
                    <Button 
                        variant="outline" 
                        colorScheme="blue" 
                        size="sm"
                        _hover={{ bg: "blue.50" }}
                    >
                        Add to Cart
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

export default ProductCard;

