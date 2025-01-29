import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
    Box, Flex, HStack, Button, useDisclosure, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Avatar, Text, Spinner, useColorMode, Icon 
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { colorMode, toggleColorMode } = useColorMode(); // Hook to toggle color mode

    // Function to fetch user details
    const fetchUserDetails = () => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("https://api.escuelajs.co/api/v1/auth/profile", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setIsLoggedIn(true);
                setLoading(false);
            })
            .catch(() => {
                setIsLoggedIn(false);
                setLoading(false);
            });
        } else {
            setIsLoggedIn(false);
            setUser(null);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();

        // Listen for login/logout changes
        const handleStorageChange = () => {
            fetchUserDetails();
        };

        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <Box bg="blue.800" px={6} py={4} color="white" boxShadow="md">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Box fontSize="3xl" fontWeight="extrabold" color="yellow.400">
                    <RouterLink to="/">ShopEase</RouterLink>
                </Box>

                <HStack spacing={8} display={{ base: "none", md: "flex" }} alignItems="center">
                    <Button as={RouterLink} to="/" variant="link" color="white" fontSize="lg" _hover={{ textDecoration: "underline", color: "yellow.400" }}>Home</Button>
                    <Button as={RouterLink} to="/products" variant="link" color="white" fontSize="lg" _hover={{ textDecoration: "underline", color: "yellow.400" }}>Products</Button>
                    <Button as={RouterLink} to="/cart" variant="link" color="white" fontSize="lg" _hover={{ textDecoration: "underline", color: "yellow.400" }}>Cart</Button>

                    {loading ? (
                        <Spinner color="yellow.400" size="sm" />
                    ) : !isLoggedIn ? (
                        <>
                            <Button as={RouterLink} to="/login" variant="link" color="white" fontSize="lg" _hover={{ textDecoration: "underline", color: "yellow.400" }}>Login</Button>
                            <Button as={RouterLink} to="/signup" variant="link" color="white" fontSize="lg" _hover={{ textDecoration: "underline", color: "yellow.400" }}>Signup</Button>
                        </>
                    ) : (
                        <HStack spacing={4}>
                            <Avatar size="sm" src={user?.avatar} />
                            <Text fontSize="lg" fontWeight="bold">{user?.name}</Text>
                            <Button onClick={handleLogout} colorScheme="red" variant="solid" size="lg">Logout</Button>
                        </HStack>
                    )}

                    {/* Dark Mode Toggle Button */}
                    <IconButton
                        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        aria-label="Toggle Dark Mode"
                        onClick={toggleColorMode}
                        color="white"
                        variant="ghost"
                        _hover={{ bg: "blue.600" }}
                    />
                </HStack>

                <IconButton size="md" icon={<HamburgerIcon />} aria-label="Open Menu" display={{ base: "flex", md: "none" }} onClick={onOpen} color="white" _hover={{ bg: "blue.600" }} />
            </Flex>

            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent bg="blue.800" color="white">
                        <DrawerCloseButton />
                        <VStack spacing={6} p={6} mt={10} align="flex-start">
                            <Button as={RouterLink} to="/" variant="ghost" color="white" _hover={{ bg: "blue.600", textDecoration: "underline" }} onClick={onClose}>Home</Button>
                            <Button as={RouterLink} to="/products" variant="ghost" color="white" _hover={{ bg: "blue.600", textDecoration: "underline" }} onClick={onClose}>Products</Button>
                            <Button as={RouterLink} to="/cart" variant="ghost" color="white" _hover={{ bg: "blue.600", textDecoration: "underline" }} onClick={onClose}>Cart</Button>

                            {loading ? (
                                <Spinner color="yellow.400" size="sm" />
                            ) : !isLoggedIn ? (
                                <>
                                    <Button as={RouterLink} to="/login" variant="ghost" color="white" _hover={{ bg: "blue.600", textDecoration: "underline" }} onClick={onClose}>Login</Button>
                                    <Button as={RouterLink} to="/signup" variant="ghost" color="white" _hover={{ bg: "blue.600", textDecoration: "underline" }} onClick={onClose}>Signup</Button>
                                </>
                            ) : (
                                <VStack spacing={4} align="flex-start">
                                    <HStack>
                                        <Avatar size="sm" src={user?.avatar} />
                                        <Text fontSize="lg" fontWeight="bold">{user?.name}</Text>
                                    </HStack>
                                    <Button onClick={() => { handleLogout(); onClose(); }} colorScheme="red" variant="solid" size="lg">Logout</Button>
                                </VStack>
                            )}

                            {/* Dark Mode Toggle Button in Drawer */}
                            <IconButton
                                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                                aria-label="Toggle Dark Mode"
                                onClick={toggleColorMode}
                                color="white"
                                variant="ghost"
                                _hover={{ bg: "blue.600" }}
                            />
                        </VStack>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </Box>
    );
}

export default Navbar;

