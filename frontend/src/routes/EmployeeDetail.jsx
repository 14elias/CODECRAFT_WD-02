// src/pages/EmployeeDetail.js
import React, { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Text, Card, CardBody } from '@chakra-ui/react';
import { employeedetail } from '../api/endpoints';
import { useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchemployee = async () =>{
            try{
                const response = await employeedetail(id);
                setEmployee(response)
            }catch(error){
                console.error('error fetching employee information')   
            }finally{
                setLoading(false)
            }
            
        }
        fetchemployee()
  }, [id]);

  if (loading) return <Spinner size="xl" />;

  if (!employee) return <Text>Employee not found</Text>;

  return (
    <Box p={6}>
      <Heading mb={4}>Employee Detail</Heading>
      <Card maxW="md" mx="auto">
        <CardBody>
          <Text fontSize="xl" fontWeight="bold">{employee.username}</Text>
          <Text>Email: {employee.email}</Text>
          <Text>Role: {employee.role}</Text>
          <Text>Status: {employee.is_active ? 'Active' : 'Inactive'}</Text>
        </CardBody>
      </Card>
    </Box>
  );
};

export default EmployeeDetail;
