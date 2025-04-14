import React from 'react';
import { Box, Flex, Link, Text, Spacer, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../api/endpoints';
import { useNavigate } from 'react-router-dom';
const EmployeeNavbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logout();
    navigate('/login');
    return response.data;
  };

  return (
    <Box bg="gray.800" color="white" px={5} py={3}>
      <Flex alignItems="center">
        {/* Logo or Title */}
        <Text fontSize="2xl" fontWeight="bold">
          Admin Panel
        </Text>

        <Spacer />

        {/* Navigation Links */}
        <Flex gap={5}>
          <Link as={RouterLink} to="/employeelist" color="teal.200" _hover={{ textDecoration: 'underline' }}>
            Employee List
          </Link>
          <Link as={RouterLink} to="/employee/create" color="teal.200" _hover={{ textDecoration: 'underline' }}>
            Create Employee
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
};

export default EmployeeNavbar;