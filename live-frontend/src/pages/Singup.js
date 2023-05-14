import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../API";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const initialState = {
  name: "",
  password: "",
};

const Signup = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    let { name, password } = formData;
    e.preventDefault();
    if (name === "" || password === "") {
      toast({
        title: `Please Fill * required Field`,
        status: "info",
        isClosable: true,
      });
      return;
    }

    try {
      let res = await fetch(`${API}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      res = await res.json();
      if (res) {
        if (res.msg === "Registered Successfully") {
          toast({
            title: `${res.msg}`,
            status: "success",
            isClosable: true,
          });
          navigate("/login");
        } else if (res.msg === "Registation failed") {
          toast({
            title: `${res.msg}`,
            status: "error",
            isClosable: true,
          });
        } else if (res.data === "InvalidCredentials") {
          toast({
            title: `${res.data}`,
            status: "error",
            isClosable: true,
          });
        }
      }

      setFormData({
        name: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const { name, password } = formData;
  return (
    <Box textAlign={"center"} mt={["120px", "60px", "40px", "30px"]}>
      <Heading mb="10px" fontSize={["22px", "22px", "26px"]}>
        Sign up
      </Heading>

      <form onSubmit={onSubmit}>
        <Box className="input-icons">
          <Input
            className="input-field"
            w={["80%", "60%", "30%"]}
            type={"text"}
            placeholder="Enter Username"
            value={name}
            m="10px"
            name="name"
            onChange={handleChange}
          />
        </Box>
        <Box
          className="input-icons"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          m="10px"
        >
          <InputGroup size="md" w={["80%", "60%", "30%"]}>
            <Input
              className="input-field"
              value={password}
              name="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={handleChange}
              color="pink.700"
            />
            <InputRightElement width="4.5rem">
              <Button
                variant={"outline"}
                h="1.75rem"
                size="sm"
                onClick={handleClick}
                color="pink.700"
              >
                {show ? <VscEyeClosed /> : <VscEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Input
          w={["80%", "60%", "30%"]}
          cursor={"pointer"}
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px",
          }}
          type={"submit"}
          value="Sign up"
        />
      </form>

      <Text mt="20px">
        already have an account?{" "}
        <Link style={{ textDecoration: "none", color: "green" }} to={"/login"}>
          Login
        </Link>
      </Text>
    </Box>
  );
};

export default Signup;
