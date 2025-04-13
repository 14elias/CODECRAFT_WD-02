import Login from "./routes/login"
import Home from "./routes/home"
import ProtectedRoute from "./components/protectedroute";
import { Routes,Route } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react";
import EmployeeList from "./routes/employeeList";
import EmployeeDetail from "./routes/EmployeeDetail";
import EditEmployee from "./routes/EditEmployee";
import CreateEmployee from "./routes/CreateEmployee";
function App() {

  return (
    <ChakraProvider>
      <Routes>
        <Route path="login/" element={<Login/>}/>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/employeelist" element={<EmployeeList/>}/>
        <Route path="/employee/:id" element={<EmployeeDetail />} />
        <Route path="/employee/edit/:id" element={<EditEmployee />} />
        <Route path="/employee/create" element={<CreateEmployee />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App
