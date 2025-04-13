import React, { useState, useEffect } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, useToast } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeedetail, editemployee } from '../api/endpoints';

const EditEmployee = () => {
  const { id } = useParams(); // Get the employee ID from the URL
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await employeedetail(id);
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch employee details.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: name === "salary" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editemployee(id, employee);
      toast({
        title: 'Success',
        description: 'Employee details updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/employeelist'); // Redirect to the employee list after editing
    } catch (error) {
      console.error('Error updating employee details:', error);
      toast({
        title: 'Error',
        description: 'Failed to update employee details.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Box textAlign="center" mt={10}>Loading...</Box>;
  }

  return (
    <Box maxW="600px" mx="auto" mt={10} p={5} borderWidth="1px" borderRadius="md" boxShadow="lg">
      <Heading as="h1" size="lg" mb={5} textAlign="center">
        Edit Employee
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
            Save Changes
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditEmployee;