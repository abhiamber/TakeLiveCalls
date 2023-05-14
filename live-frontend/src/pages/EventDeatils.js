import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../API";
import { useSelector } from "react-redux";
import { BiLoaderCircle } from "react-icons/bi";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import EventJoinedByUser from "../component/EventJoinedByUser";
import RequestCameForJoin from "../component/RequestCameForJoin";

const EventDetails = () => {
  const { loading, error } = useSelector((store) => store);
  const [data, setData] = useState(null);
  const [joned, setJoined] = useState(false);
  const [isAccepted, setAccepted] = useState(false);
  const params = useParams();
  const toast = useToast();
  // console.log(data, params.event_id);

  const getEventById = async (id) => {
    let res = await fetch(`${API}/events/${id}`, {
      headers: { token: localStorage.getItem("token") },
    });

    try {
      let data = await res.json();
      setData(data.event);
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleIsAccepted = () => {
    setAccepted(!isAccepted);
    // console.log("acepted");
  };

  const handleJoinRequest = async (event_id) => {
    // console.log(event_id);
    try {
      let res = await fetch(`${API}/admin/joinreq`, {
        method: "POST",
        body: JSON.stringify({ event_id }),
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      console.log(res);
      if (res.msg === "Send Request") {
        toast({
          title: `${res.msg}`,
          status: "success",
          isClosable: true,
        });
        // setAdminName(res.adminName);
      } else {
        toast({
          title: `${res.msg}`,
          status: "warning",
          isClosable: true,
        });
        // setAdminName(res.adminName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEventById(params.event_id);
  }, [isAccepted]);

  useEffect(() => {
    data &&
      data.acceptedUser.forEach((elem) => {
        if (elem.id === localStorage.getItem("user_id")) {
          setJoined(true);
          return;
        }
      });
  }, [data]);

  // //////////////contionally****************
  if (data == null) {
    return (
      <h1 style={{ textAlign: "center", fontSize: "23px" }}>Loading....</h1>
    );
  }
  // console.log(data);
  return (
    <Box mt={["180px", "50px", "30px"]}>
      <Container
        w="95%"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 1px 2px"
        padding={"10px"}
        borderRadius={"10px"}
        mt={["15%", "15%", "5%"]}
      >
        {(loading || data == null) && (
          <Box display={"flex"} justifyContent="center" alignItems={"center"}>
            {" "}
            <BiLoaderCircle fontSize={"34px"} />{" "}
          </Box>
        )}
        {error && (
          <Box display={"flex"} justifyContent="center" alignItems={"center"}>
            <Alert status="error" w="300px">
              <AlertIcon />
              {`Something went Wrong`}
            </Alert>
          </Box>
        )}

        <Box display={"flex"} justifyContent={"space-between"}>
          {data.eventExpired && (
            <Text
              textAlign={"center"}
              bg="black"
              color={"goldenrod"}
              variant={"outline"}
            >
              Event Expired
            </Text>
          )}
          <Text>Event Name: {data.name}</Text>
        </Box>
        <Text w="300px">Description: {data.desc}</Text>
        <Text>
          Start Date: {data.start.slice(0, 10)}, {data.start.slice(11, 19)}
        </Text>

        <Text>
          End Date: {data.end.slice(0, 10)}, {data.end.slice(11, 19)}
        </Text>
        <Text>Player Limit: {data.maxPlayer}</Text>

        <Box display={"flex"} justifyContent={"space-evenly"}>
          <Link
            style={{
              textDecoration: "none",
              color: "red",
              background: "black",
              padding: "8px",
              borderRadius: "10px",
            }}
            to="/"
          >
            Go Back
          </Link>

          {localStorage.getItem("token") && !data.eventExpired && (
            <Button
              bg="black"
              color={"goldenrod"}
              variant={"outline"}
              isDisabled={
                joned || Number(data.maxPlayer) <= data.acceptedUser.length
              }
              onClick={() => handleJoinRequest(data._id)}
            >
              Join Event
            </Button>
          )}
        </Box>
        {localStorage.getItem("user_id") === data.adminid && (
          <Box>
            {" "}
            <EventJoinedByUser data={data} />
            <RequestCameForJoin
              data={data}
              handleIsAccepted={handleIsAccepted}
            />
          </Box>
        )}
        <Box>
          {localStorage.getItem("token") && joned && (
            <EventJoinedByUser data={data} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default EventDetails;
