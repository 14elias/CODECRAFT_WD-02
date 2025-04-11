import { Box, Heading } from "@chakra-ui/react";

function Home() {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgGradient="linear(to-r, teal.400, blue.500)"
            color="white"
        >
            <Heading as="h1" size="2xl" textAlign="center">
                Hello Everyone
            </Heading>
        </Box>
    );
}

export default Home;