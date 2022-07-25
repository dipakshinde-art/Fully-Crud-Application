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
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../Redux_store/Todo/Todoaction";
import { ADD_TASK_SUCCESS } from "../Redux_store/Todo/Todoaction.type";

export default function UsestateForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subtaskTitle, setSubTaskTitle] = useState("");
  const [subTask, setSubTask] = useState([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [discriptions, setDiscriptions] = useState("");
  const [status, setStatus] = useState([]);
  //  console.log(state);

  const handleSubTaskDelete = (Title) => {
    let data = subTask.filter((item) => item.subtaskTitle !== Title);
    setSubTask(data);
    //deleting subtask if not wnat during creation
    //  console.log(data);
  };


  // function to add multiple subtask for any task

  const handleAddSubTask = (e) => {
    e.preventDefault();

    if (subtaskTitle) {
      const newSubTask = [
        ...subTask,
        { subtaskTitle: subtaskTitle, status: false },
      ];
      setSubTask(newSubTask);
      setSubTaskTitle(" ");
    }
  };

  // creating objec replica by storing all value of state
  let ADD = {
    title: title,
    subtask: subTask,
    description: discriptions,
    task_status: tags,
    tags: status,
  };

  const handleAddTask = () => {
    dispatch(addTask(ADD)).then((r) => {
      console.log(r);
      if (r === ADD_TASK_SUCCESS) {
        navigate("/");
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

        <Flex justifyContent="space-between">
          <Box p="5px">
            <Box>
              <FormControl id="task" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </Box>

            <FormControl id="discription" isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={discriptions}
                onChange={(e) => setDiscriptions(e.target.value)}
              />
            </FormControl>

            <Box mt="1rem">
              <RadioGroup
                onChange={(value) => {
                  setTags(value);
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
                  setStatus(value);
                }}
              >
                <Stack spacing={[1]} direction={["column"]}>
                  <Checkbox value="personal">Personal</Checkbox>
                  <Checkbox value="official">Official</Checkbox>
                  <Checkbox value="other">Others</Checkbox>
                </Stack>
              </CheckboxGroup>
            </Box>
          </Box>

          <Box p="5px">
            <Box>
              <FormControl id="subtast" isRequired>
                <FormLabel>subTask</FormLabel>
                <Input
                  type="text"
                  value={subtaskTitle}
                  onChange={(e) => setSubTaskTitle(e.target.value)}
                />
              </FormControl>
              <Button  mt="1rem" ml="3rem" textAlign="center" onClick={handleAddSubTask}>Add Sub Task</Button>

              {/* added subtaskvalues */}

              <Flex direction="column" p="1rem" gap="1rem">
                <CheckboxGroup>
                  {subTask.map((item, index) => (
                    <Flex justifyContent="space-between">
                      <Checkbox key={index} value={item.subtaskTitle}>
                        {item.subtaskTitle}
                      </Checkbox>
                      <DeleteIcon
                        cursor={"pointer"}
                        onClick={() => handleSubTaskDelete(item.subtaskTitle)}
                      />
                    </Flex>
                  ))}
                </CheckboxGroup>
              </Flex>
            </Box>
          </Box>
        </Flex>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.600")}
          boxShadow={"lg"}
        >
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
        </Box>
      </Stack>
    </Flex>
  );
}
