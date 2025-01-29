import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { 
    Box, Flex, HStack, Button, useDisclosure, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Text 
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    return (
        <Box bg="blue.800" px={6} py={4} color="white" boxShadow="md">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                
                
                <Box fontSize="3xl" fontWeight="extrabold" color="yellow.400">
                    <RouterLink to="/">ShopEase</RouterLink>
                </Box>

                
                <HStack spacing={8} display={{ base: "none", md: "flex" }} alignItems="center">
                    <Button 
                        as={RouterLink} 
                        to="/" 
                        variant="link" 
                        color="white" 
                        fontSize="lg" 
                        _hover={{ textDecoration: "underline", color: "yellow.400" }}
                    >
                        Home
                    </Button>
                    <Button 
                        as={RouterLink} 
                        to="/products" 
                        variant="link" 
                        color="white" 
                        fontSize="lg" 
                        _hover={{ textDecoration: "underline", color: "yellow.400" }}
                    >
                        Products
                    </Button>
                    {!isLoggedIn ? (
                        <>
                            <Button 
                                as={RouterLink} 
                                to="/login" 
                                variant="link" 
                                color="white" 
                                fontSize="lg" 
                                _hover={{ textDecoration: "underline", color: "yellow.400" }}
                            >
                                Login
                            </Button>
                            <Button 
                                as={RouterLink} 
                                to="/signup" 
                                variant="link" 
                                color="white" 
                                fontSize="lg" 
                                _hover={{ textDecoration: "underline", color: "yellow.400" }}
                            >
                                Signup
                            </Button>
                        </>
                    ) : (
                        <Button 
                            onClick={() => setIsLoggedIn(false)} 
                            colorScheme="red" 
                            variant="solid" 
                            size="lg"
                            fontWeight="bold"
                        >
                            Logout
                        </Button>
                    )}
                </HStack>

                
                <IconButton 
                    size="md" 
                    icon={<HamburgerIcon />} 
                    aria-label="Open Menu" 
                    display={{ base: "flex", md: "none" }} 
                    onClick={onOpen} 
                    color="white"
                    _hover={{ bg: "blue.600" }}
                />
            </Flex>

            
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay>
                    <DrawerContent bg="blue.800" color="white">
                        <DrawerCloseButton />
                        <VStack spacing={6} p={6} mt={10} align="flex-start">
                            <Button 
                                as={RouterLink} 
                                to="/" 
                                variant="ghost" 
                                color="white" 
                                _hover={{ bg: "blue.600", textDecoration: "underline" }} 
                                onClick={onClose}
                            >
                                Home
                            </Button>
                            <Button 
                                as={RouterLink} 
                                to="/products" 
                                variant="ghost" 
                                color="white" 
                                _hover={{ bg: "blue.600", textDecoration: "underline" }} 
                                onClick={onClose}
                            >
                                Products
                            </Button>
                            {!isLoggedIn ? (
                                <>
                                    <Button 
                                        as={RouterLink} 
                                        to="/login" 
                                        variant="ghost" 
                                        color="white" 
                                        _hover={{ bg: "blue.600", textDecoration: "underline" }} 
                                        onClick={onClose}
                                    >
                                        Login
                                    </Button>
                                    <Button 
                                        as={RouterLink} 
                                        to="/signup" 
                                        variant="ghost" 
                                        color="white" 
                                        _hover={{ bg: "blue.600", textDecoration: "underline" }} 
                                        onClick={onClose}
                                    >
                                        Signup
                                    </Button>
                                </>
                            ) : (
                                <Button 
                                    onClick={() => { setIsLoggedIn(false); onClose(); }} 
                                    colorScheme="red"
                                    variant="solid" 
                                    size="lg" 
                                    fontWeight="bold"
                                >
                                    Logout
                                </Button>
                            )}
                        </VStack>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </Box>
    );
}

export default Navbar;
