import { Box, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEventFunc } from "../redux/Game.action";

const initialState = {
  name: "",
  desc: "",
  start: "",
  end: "",
  maxPlayer: "",
};
const EventForm = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { desc, start, end, maxPlayer, name } = formData;

    if (!desc || !start || !end || !maxPlayer || !name) {
      return alert("Please fill all the required details");
    }
    dispatch(addEventFunc(formData));
    setFormData({
      desc: "",
      start: "",
      end: "",
      maxPlayer: "",
      name: "",
    });
  };

  const { desc, start, end, maxPlayer, name } = formData;
  return (
    <Box mt={["20%", "8%", "5%"]}>
      <Heading
        mb={["5%", "5%", "2%"]}
        fontSize={["22px", "22px", "24px"]}
        textAlign={"center"}
      >
        Create a new Sports Event
      </Heading>
      <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
        <Box mb={["1.5%", "1.5%", "0.3%"]}>
          <Select
            cursor="pointer"
            w={["80%", "60%", "30%"]}
            m="auto"
            mt="2rem"
            type={"text"}
            name="name"
            onChange={handleChange}
          >
            <option value={name}>Filter By Event Name</option>
            <option value={"Football"}>Football</option>
            <option value={"Cricket"}>Cricket</option>
            <option value={"Badminton"}>Badminton</option>
          </Select>
        </Box>
        <Box>
          <Input
            w={["80%", "60%", "30%"]}
            type={"text"}
            placeholder="Description"
            value={desc}
            name="desc"
            onChange={handleChange}
          />
        </Box>
        <br />
        <label>Start Date: </label>
        <Box>
          <Input
            w={["80%", "60%", "30%"]}
            type={"datetime-local"}
            value={start}
            name="start"
            placeholder="Start Date"
            onChange={handleChange}
          />
        </Box>
        <br />
        <label>End Date: </label>
        <Box mb={["1.5%", "1.5%", "0.3%"]}>
          <Input
            w={["80%", "60%", "30%"]}
            type={"datetime-local"}
            value={end}
            name="end"
            placeholder="End Date"
            onChange={handleChange}
          />
        </Box>
        <Box mb={["1.5%", "1.5%", "0.3%"]}>
          <Input
            w={["80%", "60%", "30%"]}
            type={"number"}
            value={maxPlayer}
            name="maxPlayer"
            placeholder="Player Limit"
            onChange={handleChange}
          />
        </Box>
        <Input
          cursor={"pointer"}
          mb="1%"
          w={["80%", "60%", "30%"]}
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px",
          }}
          type={"submit"}
          value="Create Event"
        />
      </form>
    </Box>
  );
};

export default EventForm;
