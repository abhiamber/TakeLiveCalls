import { Box, Heading, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const EventLists = ({ events }) => {
  // console.log(events)
  return (
    <>
      <Box
        textAlign={"center"}
        display={"grid"}
        gridTemplateColumns={[
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
        gap={"20px"}
        w="90%"
        m="auto"
      >
        {events &&
          events.length >= 0 &&
          events.map(({ _id, start, maxPlayer, name, eventExpired }) => (
            <Box
              key={_id}
              boxShadow="rgba(0, 0, 0, 0.35) 0px 1px 3px"
              padding={"20px 10px"}
              borderRadius={"10px"}
            >
              {eventExpired && (
                <Text
                  textAlign={"center"}
                  bg="black"
                  p="5px"
                  color={"goldenrod"}
                  variant={"outline"}
                >
                  Event Expired
                </Text>
              )}
              <Heading fontSize={"22px"}>{name}</Heading>
              <Text>
                Start Date & Time: {start.slice(0, 10)}, {start.slice(11, 19)}
              </Text>

              <Text>Player Limit: {maxPlayer}</Text>
              <Link to={`/${_id}`}>
                <Button color={"red"}>More Details</Button>
              </Link>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default EventLists;
