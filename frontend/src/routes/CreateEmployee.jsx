import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createemployee } from '../api/endpoints';

const CreateEmployee = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    department: '',
    position: '',
    phone_number: '',
    salary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createemployee(employee);
      toast({
        title: 'Success',
        description: 'Employee created successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/employeelist'); // Redirect to the employee list after creation
    } catch (error) {
      console.error('Error creating employee:', error);
      toast({
        title: 'Error',
        description: 'Failed to create employee.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="md" boxShadow="lg">
      <Heading as="h1" size="lg" mb={5} textAlign="center">
        Create Employee
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="first_name" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              name="first_name"
              value={employee.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </FormControl>
          <FormControl id="last_name" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="last_name"
              value={employee.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="Enter email"
              type="email"
            />
          </FormControl>
          <FormControl id="department" isRequired>
            <FormLabel>Department</FormLabel>
            <Input
              name="department"
              value={employee.department}
              onChange={handleChange}
              placeholder="Enter department"
            />
          </FormControl>
          <FormControl id="position" isRequired>
            <FormLabel>Position</FormLabel>
            <Input
              name="position"
              value={employee.position}
              onChange={handleChange}
              placeholder="Enter position"
            />
          </FormControl>
          <FormControl id="phone_number" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phone_number"
              value={employee.phone_number}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </FormControl>
          <FormControl id="salary" isRequired>
            <FormLabel>Salary</FormLabel>
            <Input
              name="salary"
              value={employee.salary}
              onChange={handleChange}
              placeholder="Enter salary"
              type="number"
            />
          </FormControl>
          <Button colorScheme="blue" type="submit" width="full">
            Create Employee
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateEmployee;