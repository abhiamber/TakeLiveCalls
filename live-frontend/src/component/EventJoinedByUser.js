import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";

const EventJoinedByUser = ({ data }) => {
  // console.log(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box textAlign={"center"} m="10px">
      <Button onClick={onOpen}>See All Joined User</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Joined user listed here</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data &&
              data.acceptedUser.map((elem, index) => {
                return <Text key={index}>UserName : {elem && elem.name}</Text>;
              })}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EventJoinedByUser;
