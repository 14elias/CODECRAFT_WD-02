import Login from "./routes/login"
import Home from "./routes/home"
import { Routes,Route } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react";

function App() {

  return (
    <ChakraProvider>
      <Routes>
        <Route path="login/" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </ChakraProvider>
  )
}

export default App
