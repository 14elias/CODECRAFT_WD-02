import Login from "./routes/login"
import Home from "./routes/home"
import ProtectedRoute from "./components/protectedroute";
import { Routes,Route } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react";
import EmployeeList from "./routes/employeeList";
import EmployeeDetail from "./routes/EmployeeDetail";
function App() {

  return (
    <ChakraProvider>
      <Routes>
        <Route path="login/" element={<Login/>}/>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/employeelist" element={<EmployeeList/>}/>
        <Route path="/employee/:id" element={<EmployeeDetail />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App
