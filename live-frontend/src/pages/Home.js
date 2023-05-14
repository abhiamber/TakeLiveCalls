import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import { BiLoaderCircle } from "react-icons/bi";
import EventLists from "../component/EventList";
import { getEventsFunc } from "../redux/Game.action";
let page = 1;
const Home = () => {
  const { loading, error, events } = useSelector((store) => store.GameDeatails);
  const dispatch = useDispatch();
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    dispatch(getEventsFunc(page, eventName, ""));
  }, [eventName]);

  return (
    <Box>
      {loading && (
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          {" "}
          <BiLoaderCircle fontSize={"34px"} />{" "}
        </Box>
      )}
      {error && (
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          <Alert status="error" w="300px">
            <AlertIcon />
            {`Something went Wrong 😒`}
          </Alert>
        </Box>
      )}

      {/* Filter By Event Name */}
      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        m={{
          base: "10% 0",
          sm: "10% 0",
          md: "3% 0",
          xl: "3% 0",
          "2xl": "3% 0",
        }}
      >
        <select
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          style={{ border: "1px solid black" }}
        >
          <option value={""}>Filter By Event Name</option>
          <option value={"Football"}>Football</option>
          <option value={"Cricket"}>Cricket</option>
          <option value={"Badminton"}>Badminton</option>
        </select>
      </Box>

      {/* EventLists */}
      <EventLists events={events} />
    </Box>
  );
};

export default Home;
