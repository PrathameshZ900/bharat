import { useState, useEffect } from "react";
import { Box, Button, Text, Flex, VStack, Spinner, useToast, HStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Get the logged-in user's ID from localStorage

  const fetchCartItems = () => {
    if (!userId) {
      toast({
        title: "Not Logged In",
        description: "Please log in to view your cart.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
      return;
    }

    // Debugging: Log userId and cart data
    console.log("User ID from localStorage:", userId);
    const cart = JSON.parse(localStorage.getItem(`cart-${userId}`)) || [];
    console.log("Cart items:", cart);  // Debug: Check if cart is loaded correctly

    setCartItems(cart);
    calculateTotal(cart);
    setLoading(false);
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem(`cart-${userId}`, JSON.stringify(updatedCart));
    calculateTotal(updatedCart);

    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "You can't proceed to checkout with an empty cart.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (cartItems.length === 0) {
    return <Text>Your cart is empty. Add items to the cart!</Text>;
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Your Cart</Heading>
      <VStack spacing={6}>
        {cartItems.map((item) => (
          <Box key={item.id} p={4} borderWidth={1} borderRadius="md" boxShadow="sm" width="full">
            <HStack justify="space-between">
              <Text>{item.title}</Text>
              <Text>${item.price} x {item.quantity}</Text>
              <Button colorScheme="red" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
            </HStack>
          </Box>
        ))}
        <Box width="full" p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="xl" fontWeight="bold">Total: ${totalPrice}</Text>
        </Box>
        <Button onClick={handleCheckout} colorScheme="blue" width="full" mt={6}>
          Proceed to Checkout
        </Button>
      </VStack>
    </Box>
  );
}

export default CartPage;
