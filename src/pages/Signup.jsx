import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Input, Button, Heading, VStack, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import axios from "axios";

function Signup() {
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState({ name: "", email: "", password: "", avatar: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post("https://api.escuelajs.co/api/v1/users/", formData);
            toast({ title: "Signup Successful!", status: "success", duration: 3000, isClosable: true });
            navigate("/login");
        } catch (error) {
            toast({ title: "Error", description: error.response?.data?.message || "Something went wrong", status: "error", duration: 3000, isClosable: true });
        }

        setLoading(false);
    };

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.100">
            <Box bg="white" p={8} boxShadow="lg" borderRadius="md" w="400px">
                <Heading mb={4} textAlign="center" color="blue.600">Sign Up</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input name="name" placeholder="Enter your name" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Avatar URL</FormLabel>
                            <Input name="avatar" placeholder="Profile image URL (optional)" onChange={handleChange} />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
                            Sign Up
                        </Button>
                    </VStack>
                </form>
                <Button variant="link" color="blue.500" onClick={() => navigate("/login")} mt={4}>Already have an account? Login</Button>
            </Box>
        </Flex>
    );
}

export default Signup;
