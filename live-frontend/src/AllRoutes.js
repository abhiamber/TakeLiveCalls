import { Box } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDeatils";
import Signup from "./pages/Singup";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Overview from "./pages/OverView";
import AcceptedUsers from "./pages/UserAccepted";
import RejectedUsers from "./pages/UserRejected";

const AllRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:event_id" element={<EventDetails />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/overview" element={<Overview />}></Route>
        <Route
          path="/overview/accept/:event_id/:index"
          element={<AcceptedUsers />}
        ></Route>
        <Route
          path="/overview/reject/:event_id/:index"
          element={<RejectedUsers />}
        ></Route>
      </Routes>
    </Box>
  );
};

export default AllRoutes;
