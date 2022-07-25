import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../Redux_store/Todo/Todoaction";
import { ADD_TASK_SUCCESS } from "../Redux_store/Todo/Todoaction.type";
const initialState = {
  title: "",
  subtask: [],
  description: "",
  task_status: "",
  tags: [],
  subtaskTitle:"",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "title": {
      return {
        ...state,
        title: action.payload,
      };
    }

    case "subtaskTitle": {
      /* let params = {
      //   subtaskTitle: action.payload,
      //   status: false,
      // };*/
      return {
        ...state,
         subtaskTitle:action.payload,
        subtask :[
          ...state.subtask,
          {
          subtaskTitle:action.payload,
           status:false
          }
          
        ]
      };
    }
    case "description": {
      return {
        ...state,
        description: action.payload,
      };
    }
    case "status": {
      return {
        ...state,
        task_status: action.payload,
      };
    }
    case "tags": {
      return {
        ...state,
        tags: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
export default function Form() {
  const [state, setState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subtaskTitle , setSubTaskTitle]= useState("");

//  console.log(state);

  const handleAddTask = () => {
    dispatch(addTask(state)).then((r) => {
      console.log(r)
      if (r === ADD_TASK_SUCCESS) {
        navigate("/", { replace: true });
      }
    });
  };
  return (
    <Flex minH={"60vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={6} maxW={"lg"} py={6} px={6} align={"center"}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"} textAlign={"center"}>
            Add Task
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.600")}
          boxShadow={"lg"}
          p={7}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="task" isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    type="text"
                    value={state.title}
                    onChange={(e) =>
                      setState({ type: "title", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="subtast" isRequired>
                  <FormLabel>subTask</FormLabel>
                  <Input
                    type="text"
                    value={state.subtaskTitle}
                    
                    onChange={(e) =>
                      setSubTaskTitle({ type: "subtaskTitle", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="discription" isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={state.description}
                onChange={(e) =>
                  setState({ type: "description", payload: e.target.value })
                }
              />
            </FormControl>

            <Box mt="1rem">
              <RadioGroup
                onChange={(value) => {
                  setState({ type: "status", payload: value });
                }}
              >
                <Stack spacing={4} direction="column">
                  <Radio value="todo">Todo</Radio>
                  <Radio value="in-progress">In-Progress</Radio>
                  <Radio value="done">Done</Radio>
                </Stack>
              </RadioGroup>
            </Box>

            <Box mt="1rem">
              <Text>Tags</Text>
              <CheckboxGroup
                colorScheme="green"
                onChange={(value) => {
                  setState({ type: "tags", payload: value });
                }}
              >
                <Stack spacing={[1]} direction={["column"]}>
                  <Checkbox value="personal">Personal</Checkbox>
                  <Checkbox value="official">Official</Checkbox>
                  <Checkbox value="other">Others</Checkbox>
                </Stack>
              </CheckboxGroup>
            </Box>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Adding..."
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleAddTask}
              >
                ADD
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
