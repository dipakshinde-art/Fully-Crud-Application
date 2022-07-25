import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import TaskCard from "../Components/TaskCard";
import { getTaskData } from "../Redux_store/Todo/Todoaction";
import { loginUserInformation } from "../Redux_store/Auth/Authaction";
const HomePage = () => {
  const { tasks } = useSelector((state) => state.Task);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  let Username = localStorage.getItem("username");
  let Token = localStorage.getItem("token");

  const getTaskListHandler = () => {
    dispatch(getTaskData());

    dispatch(loginUserInformation(Username, Token));
  };

  useEffect(() => {
    if (tasks.length === 0) {
      getTaskListHandler();
    }
  }, [tasks.length]);

  //filetr ticket according to their task value
  const filterByParamTags = (task) => {
    const paramsTags = searchParams.getAll("tags");
    if (paramsTags.includes("All") || paramsTags.length === 0) {
      return task;
    }

    const data = task.tags.filter((tag) => {
      if (paramsTags.includes(tag)) {
        return true;
      }
      return false;
    });
    if (data.length) {
      return task;
    }
    return false;
  };

  // console.log(tasks);
  return (
    <Box width="100%">
      <Flex justifyContent="space-around">
        {/* todo */}
        <Box border="1px solid black" width="250px" height="95vh">
          <Box border="1px solid black" padding="10px" margin="5px">
            <Text textAlign="center">Todo</Text>
          </Box>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "todo")
              .filter(filterByParamTags)
              .map((item) => {
                return (
                  <TaskCard key={item.id} {...item} colorScheme="yellow" />
                );
              })}
        </Box>

        {/* in -prog ress */}
        <Box border="1px solid black" width="250px" height="95vh">
          <Box border="1px solid black" padding="10px" margin="5px">
            <Text textAlign="center">In-Pogress</Text>
          </Box>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "in-progress")
              .filter(filterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="blue" />;
              })}
        </Box>

        {/* done */}
        <Box border="1px solid black" width="250px" height="95vh">
          <Box border="1px solid black" padding="10px" margin="5px">
            <Text textAlign="center">Done</Text>
          </Box>
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "done")
              .filter(filterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="green" />;
              })}
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
