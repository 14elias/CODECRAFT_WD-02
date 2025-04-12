import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import EmployeeSidebar from '../components/EmployeeSidebar';

const Home = () => {
  return (
    <Box>
      {/* Top Navigation Bar */}
      <EmployeeSidebar />

      {/* Main Content */}
      <Box p={5} bgGradient="linear(to-r, teal.400, blue.500)" color="white" minH="100vh">
        <Text fontSize="2xl" fontWeight="bold" mb={5}>
          Welcome Employee
        </Text>
        <VStack spacing={4} align="start">
          <Text fontSize="lg">This is the home page for employees.</Text>
          <Text fontSize="lg">Use the navigation bar above to access different sections.</Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;