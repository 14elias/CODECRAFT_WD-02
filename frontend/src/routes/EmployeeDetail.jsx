import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Spinner,
  Text,
  Card,
  CardBody,
  Avatar,
  VStack,
  Center,
  HStack,
  Button,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { employeedetail, deleteemployee } from '../api/endpoints';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  // Chakra UI's useDisclosure for managing the modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = async () => {
    try {
      await deleteemployee(id);
      toast({
        title: 'Employee Deleted',
        description: 'The employee has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close the modal after deletion
      navigate('/employeelist'); // Redirect to the employee list
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the employee. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchemployee = async () => {
      try {
        const response = await employeedetail(id);
        setEmployee(response);
      } catch (error) {
        console.error('Error fetching employee information');
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
    fetchemployee();
  }, [id, toast]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!employee) {
    return (
      <Center h="100vh">
        <Text fontSize="xl" color="red.500">Employee not found</Text>
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={6} textAlign="center">Employee Detail</Heading>
      <Card maxW="md" mx="auto" boxShadow="lg" borderRadius="md" overflow="hidden">
        <CardBody>
          <Center mb={4}>
            <VStack>
              <Avatar
                size="xl"
                name={`${employee.first_name} ${employee.last_name}`}
                src={employee.profile_picture || ''} // Replace with the actual profile picture URL if available
              />
              <HStack>
                <Button onClick={() => navigate(`/employee/edit/${id}`)}>Edit</Button>
                <Button colorScheme="red" onClick={onOpen}>Delete</Button>
              </HStack>
            </VStack>
          </Center>
          <VStack spacing={3} align="start">
            <Text fontSize="xl" fontWeight="bold">{employee.username}</Text>
            <Text><strong>First Name:</strong> {employee.first_name}</Text>
            <Text><strong>Last Name:</strong> {employee.last_name}</Text>
            <Text><strong>Email:</strong> {employee.email}</Text>
            <Text><strong>Department:</strong> {employee.department}</Text>
            <Text><strong>Status:</strong> {employee.is_active ? 'Active' : 'Inactive'}</Text>
            <Text><strong>Position:</strong> {employee.position}</Text>
            <Text><strong>Salary:</strong> {employee.salary}</Text>
            <Text><strong>Phone Number:</strong> {employee.phone_number}</Text>
            <Text><strong>Created By:</strong> {employee.created_by}</Text>
            <Text><strong>Date Hired:</strong> {employee.date_hired}</Text>
          </VStack>
        </CardBody>
      </Card>

      {/* Delete Confirmation Modal */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Employee
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this employee? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default EmployeeDetail;