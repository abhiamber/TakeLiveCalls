import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import React from "react";
import { API } from "../API";

const RequestCameForJoin = ({ data, handleIsAccepted }) => {
  //   console.log(data);
  const toast = useToast();
  // ****************request accepted function*************
  const handleAceptedUserJOinreq = async (id) => {
    try {
      let res = await fetch(`${API}/admin/accept`, {
        method: "PATCH",
        body: JSON.stringify({ userId: id, event_id: data._id }),
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      console.log(res);
      if (res.msg === "Successfully update Status") {
        toast({
          title: `${res.msg}`,
          status: "success",
          isClosable: true,
        });
        handleIsAccepted();
      } else {
        toast({
          title: `${res.msg}`,
          status: "warning",
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ****************request rejected function*************
  const handleRejectedUserJOinreq = async (id) => {
    try {
      let res = await fetch(`${API}/admin/reject`, {
        method: "PATCH",
        body: JSON.stringify({ userId: id, event_id: data._id }),
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      console.log(res);
      if (res.msg === "Successfully update Status") {
        toast({
          title: `${res.msg}`,
          status: "success",
          isClosable: true,
        });
        handleIsAccepted();
      } else {
        toast({
          title: `${res.msg}`,
          status: "warning",
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      {data &&
        data.requestToJoin?.map((elem, index) => {
          return (
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              h="auto"
              m="auto"
              flexWrap={"wrap"}
              key={index}
            >
              <Heading size="md"> userName : {elem.name} </Heading>
              <Button
                bg="green"
                onClick={() => handleAceptedUserJOinreq(elem.id)}
              >
                Accept
              </Button>
              <Button
                bg="red"
                onClick={() => handleRejectedUserJOinreq(elem.id)}
              >
                Reject
              </Button>
              <hr />
            </Box>
          );
        })}
    </Box>
  );
};

export default RequestCameForJoin;
