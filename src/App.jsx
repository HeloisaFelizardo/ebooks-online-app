import AppRouter from "./routes/AppRouter.jsx";
import {Box} from "@chakra-ui/react";

const App = () => {
  return (
    <Box  minHeight="100vh">
      <AppRouter />
    </Box>
  );
};

export default App;
