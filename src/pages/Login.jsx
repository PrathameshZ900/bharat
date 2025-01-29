import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Input, Button, Heading, VStack, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", formData);
            const token = response.data.access_token;
            localStorage.setItem("token", token);

            const profileResponse = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast({ title: `Welcome, ${profileResponse.data.name}!`, status: "success", duration: 3000, isClosable: true });
            navigate("/");
        } catch (error) {
            toast({ title: "Login Failed", description: "Invalid email or password", status: "error", duration: 3000, isClosable: true });
        }

        setLoading(false);
    };

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.800"> {/* Dark background for consistency */}
            <Box
                bg="gray.900"
                p={8}
                boxShadow="xl"
                borderRadius="lg"
                w="400px"
                textAlign="center"
                borderWidth={1}
                borderColor="gray.700"
                bgGradient="linear(to-r, #1a202c, #4a5568)" // Dark gradient that fits dark mode theme
                color="white"
            >
                <Heading mb={6} fontSize="3xl" fontWeight="bold" color="white">Login</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={6}>
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm">Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                bg="gray.700"
                                borderColor="gray.600"
                                _focus={{ borderColor: "blue.500" }}
                                _hover={{ borderColor: "blue.400" }}
                                _placeholder={{ color: "gray.400" }}
                                borderRadius="md"
                                boxShadow="sm"
                                color="white"
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm">Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                bg="gray.700"
                                borderColor="gray.600"
                                _focus={{ borderColor: "blue.500" }}
                                _hover={{ borderColor: "blue.400" }}
                                _placeholder={{ color: "gray.400" }}
                                borderRadius="md"
                                boxShadow="sm"
                                color="white"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="blue"
                            width="full"
                            isLoading={loading}
                            _hover={{ transform: "scale(1.05)" }}
                            borderRadius="md"
                            boxShadow="md"
                            _active={{ transform: "scale(0.98)" }}
                        >
                            Login
                        </Button>
                    </VStack>
                </form>
                <Button
                    variant="link"
                    color="white"
                    onClick={() => navigate("/signup")}
                    mt={4}
                    _hover={{ textDecoration: "underline", color: "blue.100" }}
                    fontSize="sm"
                >
                    Don't have an account? Sign Up
                </Button>
            </Box>
        </Flex>
    );
}

export default Login;
