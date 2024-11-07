import AppRouter from "./routes/AppRouter.jsx";
import {Box, useColorModeValue} from "@chakra-ui/react";

const App = () => {
  // Define o background dinâmico baseado no modo claro ou escuro
  const bg = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box bg={bg} minHeight="100vh">
      <AppRouter />
    </Box>
  );
};

export default App;
