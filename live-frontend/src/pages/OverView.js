import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API } from "../API";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Button,
  Box,
  Alert,
  AlertIcon,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { BiLoaderCircle } from "react-icons/bi";
import EventLists from "../component/EventList";

const Overview = () => {
  const [data, setData] = useState([]);
  const [gameDataStatus, setGameStatusData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const getRequests = async () => {
    try {
      setIsLoading(true);
      let res = await fetch(`${API}/admin/getadminevents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      res = await res.json();
      if (res.status === "NO") {
        setIsError(true);
        setIsLoading(false);
      } else {
        setData(res.messg);
        // console.log(res.messg);
        setIsLoading(false);
        setIsError(false);
      }
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      let res = await fetch(`${API}/admin/status`, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      res = await res.json();
      // console.log(res);

      if (res.msg === "Sorry😒 Game Start Already! You Can't Accept Now") {
        return;
      } else {
        setGameStatusData(res.allGames);
      }
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleUpdateStatus();
  }, []);
  useEffect(() => {
    getRequests();
  }, []);

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }
  return (
    <Box>
      {isLoading && (
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          {" "}
          <BiLoaderCircle fontSize={"34px"} />{" "}
        </Box>
      )}
      {isError && (
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          <Alert status="error" w="300px">
            <AlertIcon />
            {`Something went Wrong 😒`}
          </Alert>
        </Box>
      )}
      <TableContainer w="95%" m="auto" mt={["15%", "15%", "0%"]}>
        <Table size="sm" variant={"striped"}>
          <Thead>
            <Tr>
              <Th>Event Name</Th>
              <Th>Player Limit</Th>
              <Th>Start Time</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {gameDataStatus &&
              gameDataStatus.map((ele, index) => (
                <Tr key={index}>
                  <Td>{ele.name}</Td>
                  <Td>{ele.player}</Td>
                  <Td>
                    {ele.start.slice(0, 10)}, {ele.start.slice(11, 19)}{" "}
                  </Td>
                  <Td
                    color={
                      ele.status === "Accepted"
                        ? "green"
                        : ele.status === "Rejetced"
                        ? "red"
                        : ele.status === "pending"
                        ? "grey"
                        : "yellow"
                    }
                    fontSize={"20px"}
                  >
                    {ele.status}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <hr />
      <Heading
        textAlign={"center"}
        bg="black"
        color="red"
        mt="15px"
        mb="15px"
        size="md"
        p="5px"
      >
        {" "}
        Product Craeted by user{" "}
      </Heading>
      <Box>
        <EventLists events={data} />
      </Box>
    </Box>
  );
};

export default Overview;
