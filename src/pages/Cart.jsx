import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Text, VStack, HStack, Spinner, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const fetchCartItems = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            fetch("https://api.escuelajs.co/api/v1/carts", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setCartItems(data);
                        calculateTotal(data);
                    } else {
                        throw new Error("Invalid cart data format");
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    toast({
                        title: "Error fetching cart items",
                        description: error.message || "There was an issue fetching your cart items.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                    setLoading(false);
                });
        } else {
            setIsLoggedIn(false);
            setLoading(false);
        }
    };

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalPrice(total);
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast({
                title: "Cart is empty",
                description: "You cannot proceed with an empty cart.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Proceeding to Checkout",
                description: "You will be redirected to the checkout page.",
                status: "info",
                duration: 3000,
                isClosable: true,
            });
            navigate("/checkout");
        }
    };

    if (loading) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Spinner size="xl" color="blue.500" />
            </Flex>
        );
    }

    if (!isLoggedIn) {
        return (
            <Flex justify="center" align="center" h="100vh">
                <Box p={8} boxShadow="lg" bg="white" borderRadius="md" textAlign="center">
                    <Heading mb={4}>You need to log in to view your cart</Heading>
                    <Button colorScheme="blue" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                </Box>
            </Flex>
        );
    }

    return (
        <Box p={8}>
            <Heading mb={6}>Your Cart</Heading>
            {cartItems.length === 0 ? (
                <Text>Your cart is empty. Add some products!</Text>
            ) : (
                <VStack spacing={6}>
                    {cartItems.map((item) => (
                        <Box
                            key={item.id}
                            p={4}
                            borderWidth={1}
                            borderRadius="md"
                            boxShadow="sm"
                            width="full"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <HStack spacing={4}>
                                <Box>
                                    <Text fontWeight="bold">{item.name}</Text>
                                    <Text color="gray.500">${item.price}</Text>
                                </Box>
                                <Box>
                                    <Text>Quantity: {item.quantity}</Text>
                                </Box>
                            </HStack>
                            <Text fontWeight="bold" color="blue.600">${item.price * item.quantity}</Text>
                        </Box>
                    ))}
                    <Box width="full" p={4} borderWidth={1} borderRadius="md" boxShadow="md" mt={6}>
                        <Text fontSize="xl" fontWeight="bold">Total: ${totalPrice}</Text>
                    </Box>
                    <Button
                        mt={6}
                        colorScheme="blue"
                        onClick={handleCheckout}
                        width="full"
                        isDisabled={cartItems.length === 0}
                    >
                        Proceed to Checkout
                    </Button>
                </VStack>
            )}
        </Box>
    );
}

export default CartPage;
