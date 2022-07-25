import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import ModalForm from "../Components/ModalForm";
import {
  getTaskData,
  updateTask,
  addSubTask,
  deleteSubTask,
} from "../Redux_store/Todo/Todoaction";
const EditPage = () => {
  const { tasks } = useSelector((state) => state.Task);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [radioTaskStatus, setRadiotaskStatus] = useState("");
  const [currentSubTask, setCurrentSubTask] = useState("");
  const [taskTag, setTaskTag] = useState([]);
  const [subtask, setSubTask] = useState([]);
  const [checkbox, setCheckbox] = useState([]);

  // to get previous data using param
  useEffect(() => {
    if (tasks) {
      const currentTask = tasks.find((item) => item.id === Number(id));

      /* console.log(currentTask, tasks, id);*/
      if (currentTask) {
        setTaskTitle(currentTask.title);
        setTaskDescription(currentTask.description);
        setRadiotaskStatus(currentTask.task_status);
        setTaskTag(currentTask.tags);
        setSubTask(currentTask.subtask);

        let data = currentTask.subtask
          .filter((item) => {
            return item.status && item.subtaskTitle;
          })
          .map((item) => item.subtaskTitle); //subtask check box data

        setCheckbox(data);
      }
    }
  }, [id, tasks]);

  useEffect(() => {
    //user reffresh page then also get data by these and param id
    if (tasks.length === 0) {
      dispatch(getTaskData());
    }
  }, [tasks.length]);

  // updating task
  const updateHandler = (type, value) => {
    if (type === "textAndDescription") {
      dispatch(
        updateTask(id, {
          title: taskTitle,
          description: taskDescription,
        })
      ).then(dispatch(getTaskData()));
    } else if (type === "taskStatus") {
      dispatch(
        updateTask(id, {
          task_status: value,
        })
      ).then(dispatch(getTaskData()));
    } else if (type === "taskTag") {
      dispatch(
        updateTask(id, {
          tags: value,
        })
      ).then(dispatch(getTaskData()));
    }
  };

  const updateSubTaskHandler = (checkBoxValue) => {
    const newSubtaskTag = subtask.map((item) => {
      if (checkBoxValue.includes(item.subtaskTitle)) {
        return {
          ...item,
          status: true,
        };
      }

      return { ...item, status: false };
    });

    dispatch(addSubTask(id, { subtask: newSubtaskTag })).then(
      dispatch(getTaskData())
    );
  };

  const addSubTaskHandler = (e) => {
    e.preventDefault();

    if (currentSubTask) {
      const newSubtask = [
        ...subtask,
        { subtaskTitle: currentSubTask, status: false },
      ];
      // subtask : its indise main array
      dispatch(addSubTask(id, { subtask: newSubtask }))
        .then(dispatch(getTaskData()))
        .then(() => {
          setCurrentSubTask("");
        });
    }
  };

  const handleSubTaskDelete = (Title) => {
    let data = subtask.filter((item) => item.subtaskTitle !== Title);
    dispatch(deleteSubTask(id, { subtask: data })).then(
      dispatch(getTaskData())
    );
    console.log(data);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box border="1px solid black" width="100%" mt="3vh">
      <Flex height="90vh" margin="5px" justifyContent="space-around">
        {/* task title */}
        <Box border="1px solid red" padding="10px" width="250px">
          <Stack>
            <Input
              key={id}
              value={taskTitle}
              placeholder="Title"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <Editable value={taskDescription}>
              <EditablePreview />
              <EditableTextarea
                key={id}
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </Editable>
            <Button
              onClick={() => {
                updateHandler("textAndDescription");
              }}
            >
              Update
            </Button>
          </Stack>

          <Box mt="1rem">
            <RadioGroup
              onChange={(value) => {
                setRadiotaskStatus(value);
                updateHandler("taskStatus", value);
              }}
              value={radioTaskStatus}
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
                setTaskTag(value);
                updateHandler("taskTag", value);
              }}
              value={taskTag}
            >
              <Stack spacing={[1]} direction={["column"]}>
                <Checkbox value="personal">Personal</Checkbox>
                <Checkbox value="official">Official</Checkbox>
                <Checkbox value="other">Others</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </Box>

        {/* subtask */}
        <Box border="1px solid yellow" padding="10px" width="330px">
          <form onSubmit={addSubTaskHandler}>
            <Flex>
              <Input
                placeholder="Add new SubTask.!"
                value={currentSubTask}
                onChange={(e) => {
                  setCurrentSubTask(e.target.value);
                }}
              />
              <Button ml="0.5rem" type="submit">
                Add
              </Button>
            </Flex>
          </form>

          <Flex direction="column" p="1rem" gap="1rem">
            <CheckboxGroup
              colorScheme="green"
              value={checkbox}
              onChange={(value) => {
                setCheckbox(value);
                updateSubTaskHandler(value);
              }}
            >
              {subtask &&
                subtask.map((item, index) => (
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

        {/* cretae new */}
        <Box border="1px solid green" padding="10px" width="250px">
          <Flex direction="column" justifyContent="center">
            <Text align="center" width="250px">
              <ModalForm />
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default EditPage;
