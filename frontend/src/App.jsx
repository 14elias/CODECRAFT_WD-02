import Login from "./routes/login"
import Home from "./routes/home"
import ProtectedRoute from "./components/protectedroute";
import { Routes,Route } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react";
import Employee from "./routes/employee";
import Admin from "./routes/admin";

function App() {

  return (
    <ChakraProvider>
      <Routes>
        <Route path="login/" element={<Login/>}/>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="admin/" element={<Admin/>}/>
        <Route path="employee/" element={<Employee/>}/>
      </Routes>
    </ChakraProvider>
  )
}

export default App
