import React from "react";
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Link, Divider } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box
            bgGradient="linear(to-r,rgb(28, 33, 41),rgb(38, 56, 94),rgb(28, 32, 45))" // Bluish gradient for a cool dark theme
            color="white"
            py={12}
            textAlign="center"
            boxShadow="xl"
            borderTop="2px solid rgba(255, 255, 255, 0.2)"
        >
            <Container maxW="7xl">
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
                    
                    {/* 🏢 Company Info */}
                    <VStack spacing={4}>
                        <Heading size="lg" fontWeight="bold" letterSpacing="wider">ShopEase</Heading>
                        <Text fontSize="md" opacity={0.8} maxW="300px">
                            Your one-stop online shopping destination, delivering happiness.
                        </Text>
                    </VStack>

                    {/* 🔗 Quick Links */}
                    <VStack spacing={4}>
                        <Heading size="md" fontWeight="bold" textTransform="uppercase">Quick Links</Heading>
                        <Link href="/about" _hover={{ color: "yellow.300", textDecoration: "none", transform: "scale(1.05)" }} transition="0.3s">
                            About Us
                        </Link>
                        <Link href="/contact" _hover={{ color: "yellow.300", textDecoration: "none", transform: "scale(1.05)" }} transition="0.3s">
                            Contact
                        </Link>
                        <Link href="/privacy" _hover={{ color: "yellow.300", textDecoration: "none", transform: "scale(1.05)" }} transition="0.3s">
                            Privacy Policy
                        </Link>
                    </VStack>

                    {/* 🌍 Social Media */}
                    <VStack spacing={4}>
                        <Heading size="md" fontWeight="bold" textTransform="uppercase">Follow Us</Heading>
                        <HStack spacing={6}>
                            <Link href="https://facebook.com" target="_blank" _hover={{ transform: "scale(1.15)" }} transition="0.3s">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="38" />
                            </Link>
                            <Link href="https://twitter.com" target="_blank" _hover={{ transform: "scale(1.15)" }} transition="0.3s">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="38" />
                            </Link>
                            <Link href="https://instagram.com" target="_blank" _hover={{ transform: "scale(1.15)" }} transition="0.3s">
                                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="38" />
                            </Link>
                            <Link href="https://linkedin.com" target="_blank" _hover={{ transform: "scale(1.15)" }} transition="0.3s">
                                <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" width="38" />
                            </Link>
                        </HStack>
                    </VStack>
                </SimpleGrid>
                
                <Divider my={8} borderColor="rgba(255, 255, 255, 0.3)" />

                {/* Copyright */}
                <Text fontSize="sm" opacity={0.7} letterSpacing="wide">
                    © {new Date().getFullYear()} <b>ShopEase</b>. All rights reserved.
                </Text>
            </Container>
        </Box>
    );
};

export default Footer;
