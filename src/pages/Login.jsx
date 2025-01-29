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
        <Flex minH="100vh" align="center" justify="center" bg="gray.100">
            <Box bg="white" p={8} boxShadow="lg" borderRadius="md" w="400px">
                <Heading mb={4} textAlign="center" color="blue.600">Login</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
                            Login
                        </Button>
                    </VStack>
                </form>
                <Button variant="link" color="blue.500" onClick={() => navigate("/signup")} mt={4}>Don't have an account? Sign Up</Button>
            </Box>
        </Flex>
    );
}

export default Login;



