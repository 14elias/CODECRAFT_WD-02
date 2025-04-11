import { Box, Flex, Link, Spacer, Button, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

function NavBar() {

    const navigate = useNavigate()

    const handleLogout = async () =>{
        const response = await logout();
        navigate('/login')
        return response.message
    }
    return (
        <Box bg="blue.500" px={4} py={3} color="white">
            <Flex alignItems="center">
                {/* Logo or Title */}
                <Heading as="h1" size="md">
                    Company Portal
                </Heading>

                <Spacer />

                {/* Navigation Links */}
                <Flex gap={4}>
                    <Link as={RouterLink} to="/employee" fontWeight="bold" _hover={{ textDecoration: "underline" }}>
                        Employee
                    </Link>
                    <Link as={RouterLink} to="/admin" fontWeight="bold" _hover={{ textDecoration: "underline" }}>
                        Admin
                    </Link>
                </Flex>

                <Spacer />

                {/* Logout Button */}
                <Button colorScheme="red" size="sm" onClick={handleLogout}>
                    Logout
                </Button>
            </Flex>
        </Box>
    );
}

export default NavBar;