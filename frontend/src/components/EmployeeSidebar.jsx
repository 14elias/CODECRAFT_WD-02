import React from 'react';
import { Box, Flex, Link, Text, Spacer,Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const EmployeeNavbar = () => {
  return (
    <Box bg="gray.800" color="white" px={5} py={3}>
      <Flex alignItems="center">
        {/* Logo or Title */}
        <Text fontSize="2xl" fontWeight="bold">
          Home Page
        </Text>

        <Spacer />

        <Flex gap={5}>
          <Link as={RouterLink} to="/myprofile" color="teal.200" _hover={{ textDecoration: 'underline' }}>
            Myprofile
          </Link>
          <Link as={RouterLink} to="/employeelist" color="teal.200" _hover={{ textDecoration: 'underline' }}>
            employeeList
          </Link>
          <Link as={RouterLink} to="/settings" color="teal.200" _hover={{ textDecoration: 'underline' }}>
            Settings
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default EmployeeNavbar;