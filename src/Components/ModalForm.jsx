import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import Form from "./Form";
import UsestateForm from "./UsestateForm";

function ModalForm() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Add New Task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        {overlay}
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {/* using usswe reducer */}
            {/* <Form /> */}

            {/* using useState */}
            <UsestateForm />
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalForm;
