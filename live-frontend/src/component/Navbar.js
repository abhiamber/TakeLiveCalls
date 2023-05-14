import {
  Box,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [eventName, setEventName] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box mb={["150px", "120px", "10%"]}>
      <Box
        bg={useColorModeValue("teal", "gray.900")}
        px={4}
        position={"fixed"}
        top={"0.1px"}
        w="100%"
        zIndex={"100"}
      >
        <Flex
          // h={auto}

          // mb="30px"
          p="10px"
          flexWrap={"wrap"}
          alignItems={"center"}
          gap="10px"
          justifyContent={"space-between"}
        >
          <Link to="/" cursor="Pointer">
            {" "}
            <Image
              className="icon"
              w={"20%"}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThDJYvQ6lqk9UJCl2i9dRUdZHQPrOB3RsjHw&usqp=CAU"
              alt="logo"
            />{" "}
          </Link>

          <Text display={["none", "none", "block"]}>
            <Link className="icon" to="/">
              Home
            </Link>
          </Text>
          <Text fontSize={["12px", "12px", "18px"]}>
            <Link className="icon" to="/overview">
              UserLibrary
            </Link>
          </Text>

          <Text fontSize={["12px", "12px", "18px"]}>
            <Link className="icon" to="/admin">
              CreateEvent
            </Link>
          </Text>

          {localStorage.getItem("token") ? (
            <Text fontSize={["12px", "12px", "18px"]}>
              <Button onClick={handleLogout} bg="black" color={"red"}>
                Logout
              </Button>
            </Text>
          ) : (
            <Text fontSize={["12px", "12px", "18px"]}>
              <Link to="/login" className="Link">
                Login
              </Link>
            </Text>
          )}

          <Button className="icon" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;
