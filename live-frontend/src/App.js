import { Box } from "@chakra-ui/react";
import Navbar from "./component/Navbar";
import AllRoutes from "./AllRoutes";
// import Footer from "./Components/Footer";

function App() {
  return (
    <Box>
      <Navbar id="top" />
      <AllRoutes />
    </Box>
  );
}

export default App;
