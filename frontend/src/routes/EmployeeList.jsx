// src/pages/EmployeeList.js
import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Spinner, Text, Card, CardBody } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { listemployees } from '../api/endpoints';
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchemployee = async () =>{
        try{
            const response = await listemployees();
            setEmployees(response)
        }catch(error){
            console.error('error fetching employee information')   
        }finally{
            setLoading(false)
        }
        
    }
    fetchemployee()
  }, []);

  if (loading) return <Spinner size="xl" />;

  return (
    <Box p={6}>
      <Heading mb={4}>All Employees</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {employees.map(employee => (
          <Card key={employee.id} onClick={() => navigate(`/employee/${employee.id}`)} _hover={{ cursor: 'pointer', bg: 'gray.50' }}>
            <CardBody>
              <Text fontWeight="bold">{employee.username}</Text>
              <Text>{employee.first_name} {employee.last_name}</Text>
              <Text fontSize="sm" color="gray.500">{employee.role}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default EmployeeList;
