import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
} from "@chakra-ui/react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/');
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bg="gray.100"
        >
            <Box
                bg="white"
                p={8}
                borderRadius="md"
                boxShadow="lg"
                width="sm"
            >
                <Heading as="h1" size="lg" mb={6} textAlign="center">
                    Login
                </Heading>
                <VStack spacing={4} as="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        colorScheme="blue"
                        width="full"
                        type="submit"
                    >
                        Login
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}

export default Login;