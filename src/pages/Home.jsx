import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Heading, Text, SimpleGrid, Image, useColorModeValue, Container, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import { FaBoltLightning } from "react-icons/fa6";
import { IoPaperPlane } from "react-icons/io5";
import { BiSolidMoon } from "react-icons/bi";

function Home() {
    const [bannerImage, setBannerImage] = useState("");
    const [products, setProducts] = useState([]);
    const [tab, setTab] = useState(1);
    const tabsRef = useRef(null);
    const bgColor = useColorModeValue("gray.100", "gray.900");

    useEffect(() => {
        // Fetch a random banner image
        const fetchRandomImage = async () => {
            try {
                const response = await fetch("https://api.unsplash.com/photos/random?client_id=YOUR_ACCESS_KEY");
                const data = await response.json();
                setBannerImage(data.urls.regular);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        // Fetch random products
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://api.escuelajs.co/api/v1/products");
                const data = await response.json();
                const shuffledProducts = data.sort(() => 0.5 - Math.random()).slice(0, 3);
                setProducts(shuffledProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchRandomImage();
        fetchProducts();
        const intervalId = setInterval(fetchProducts, 5000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <Box bg={bgColor} minHeight="100vh" py={8}>
            <Container maxW="7xl" px={4}>
                {/* Hero Section */}
                <Box
                    textAlign="center"
                    mb={12}
                    position="relative"
                    backgroundImage={`url(${bannerImage})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    height="400px"
                    borderRadius="md"
                    boxShadow="lg"
                >
                    <Box position="absolute" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)" borderRadius="md"></Box>
                    <Box position="relative" zIndex="1" color="white" py={16}>
                        <Heading as="h1" size="2xl" mb={4}>
                            Welcome to ShopEase!
                        </Heading>
                        <Text fontSize="lg" mb={6}>
                            Discover amazing products at the best prices. Start shopping now!
                        </Text>
                        <Button mt={6} colorScheme="blue" size="lg" _hover={{ transform: "scale(1.05)" }}>
                            <Link to="/products">Shop Now</Link>
                        </Button>
                    </Box>
                </Box>

                {/* Featured Products Section */}
                <Box textAlign="center" mb={12}>
                    <Heading as="h2" size="lg" mb={8}>
                        Featured Products
                    </Heading>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Box
                                    key={product.id}
                                    p={4}
                                    borderWidth={1}
                                    borderRadius="md"
                                    boxShadow="lg"
                                    _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
                                >
                                    <Image src={product.images[0]} alt={product.title} mb={4} />
                                    <Heading size="md" mb={2}>{product.title}</Heading>
                                    <Text fontSize="lg" color="gray.500" mb={4}>
                                        ${product.price}
                                    </Text>
                                    <Button colorScheme="blue" size="sm">
                                        View Product
                                    </Button>
                                </Box>
                            ))
                        ) : (
                            <Text>Loading products...</Text>
                        )}
                    </SimpleGrid>
                </Box>

                {/* Features and Tab Content Section */}
                <Box textAlign="center" mb={12}>
                    <Heading as="h2" size="lg" mb={8}>
                        Explore the Solutions
                    </Heading>
                    <Text fontSize="xl" color="gray.500" mb={6}>
                        Discover our powerful suite of tools to enhance your shopping experience.
                    </Text>

                    <HStack spacing={12} align="start" justify="center">
                        {/* Features Tab */}
                        <VStack spacing={6} w="50%">
                            {[ 
                                { id: 1, title: "Simple Shopping Ecosystem", icon: <FaBoltLightning />, description: "Seamlessly browse, add to cart, and checkout with ease." },
                                { id: 2, title: "Fast & Secure Transactions", icon: <IoPaperPlane />, description: "Enjoy a smooth and secure payment experience." },
                                { id: 3, title: "Dark Mode Support", icon: <BiSolidMoon />, description: "Shop comfortably with our beautiful dark mode." }
                            ].map((item) => (
                                <Button
                                    key={item.id}
                                    onClick={() => setTab(item.id)}
                                    colorScheme={tab === item.id ? "blue" : "gray"}
                                    size="lg"
                                    width="100%"
                                    leftIcon={item.icon}
                                    textAlign="left"
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </VStack>

                        {/* Tab Content */}
                        <Box w="50%" p={6} borderWidth={1} borderRadius="md" boxShadow="lg">
                            {tab === 1 && (
                                <Box>
                                    <Heading as="h3" size="md" mb={4}>Simple Shopping Ecosystem</Heading>
                                    <Text fontSize="lg" mb={4}>
                                        Our platform offers a seamless shopping experience. Whether you are browsing or checking out, 
                                        everything is designed to be easy to use. Add items to your cart, checkout with ease, and track your 
                                        orders all from one place.
                                    </Text>
                                    <Text fontSize="lg">
                                        You can enjoy the simplicity of the shopping process without worrying about complicated steps 
                                        or procedures. From product discovery to final purchase, every interaction is designed to be smooth.
                                    </Text>
                                </Box>
                            )}
                            {tab === 2 && (
                                <Box>
                                    <Heading as="h3" size="md" mb={4}>Fast & Secure Transactions</Heading>
                                    <Text fontSize="lg" mb={4}>
                                        We prioritize your security and speed when it comes to transactions. Our platform uses the latest 
                                        encryption technologies to ensure your payment information remains secure.
                                    </Text>
                                    <Text fontSize="lg">
                                        Not only is our payment system fast, but it also supports multiple payment methods for your convenience. 
                                        You can make transactions confidently, knowing your data is safe.
                                    </Text>
                                </Box>
                            )}
                            {tab === 3 && (
                                <Box>
                                    <Heading as="h3" size="md" mb={4}>Dark Mode Support</Heading>
                                    <Text fontSize="lg" mb={4}>
                                        With dark mode support, you can shop comfortably even in low-light environments. We’ve designed 
                                        our interface to switch seamlessly between light and dark themes, ensuring that your browsing experience 
                                        is always pleasant.
                                    </Text>
                                    <Text fontSize="lg">
                                        Dark mode helps reduce eye strain and saves battery life on OLED screens, making it the perfect mode for 
                                        extended shopping sessions or nighttime browsing.
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </HStack>
                </Box>
            </Container>
        </Box>
    );
}

export default Home;
