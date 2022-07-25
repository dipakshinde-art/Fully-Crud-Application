import React, { useEffect, useState } from "react";
import { Stack, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux_store/Auth/Authaction";
import ModalForm from "./ModalForm";
const Sidebar = () => {
  const { isAuth, data } = useSelector((state) => state.Auth);
  const { tasks } = useSelector((state) => state.Task);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const PersonalTasks = tasks.filter((item) => item.tags.includes("personal"));
  const OfficialTasks = tasks.filter((item) => item.tags.includes("official"));
  const OthersTasks = tasks.filter((item) => item.tags.includes("other"));
  let [searchParams, setSearchParams] = useSearchParams();

  //to add and make const url whne user click on something
  const [selectedTag, setSelectedTag] = useState(
    searchParams.getAll("tags") || []
  );
  //filter for tag adding to url serach
  const handleTagChange = (tag) => {
    let newSelectedTag = [...selectedTag];
    //if tag select then remove or not then add
    if (selectedTag.includes(tag)) {
      newSelectedTag.splice(newSelectedTag.indexOf(tag), 1);
    } else {
      newSelectedTag.push(tag);
    }
    setSelectedTag(newSelectedTag);
  };

  useEffect(() => {
    if (selectedTag) {
      setSearchParams({ tags: selectedTag });
    }
  }, [selectedTag, setSearchParams]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

 // console.log(data);
  return (
    <Box width="250px" height="100vh">
      <Stack direction="column">
        <Box height="15vh" border="1px solid red">
          {/* profile */}
          <Text>UserName :{data.username} </Text>
          <Text>Name :{data.name} </Text>
          <Text>Email :{data.email} </Text>
        </Box>

        <Box height="70vh" border="1px solid blue">
          <Flex direction="column">
            <Box
              border="1px solid green"
              margin={"5px"}
              onClick={() => handleTagChange("All")}
              backgroundColor={
                selectedTag.includes("All") ? "blue.400" : "blue.100"
              }
              cursor="pointer"
            >
              <Flex padding="0 10px" margin={"5px"}>
                <Text>All</Text>
                <Text marginLeft={"auto"}>{tasks.length}</Text>
              </Flex>
            </Box>

            <Box
              border="1px solid green"
              margin={"5px"}
              backgroundColor={
                selectedTag.includes("personal") ? "yellow.400" : "yellow.100"
              }
              cursor="pointer"
            >
              <Flex
                padding="0 10px"
                margin={"5px"}
                onClick={() => handleTagChange("personal")}
              >
                <Text>Personal</Text>
                <Text marginLeft={"auto"}>{PersonalTasks.length}</Text>
              </Flex>
            </Box>

            <Box
              border="1px solid green"
              margin={"5px"}
              backgroundColor={
                selectedTag.includes("official") ? "green.400" : "green.100"
              }
              cursor="pointer"
            >
              <Flex
                padding="0 10px"
                margin={"5px"}
                onClick={() => handleTagChange("official")}
                cursor="pointer"
              >
                <Text>Official</Text>
                <Text marginLeft={"auto"}>{OfficialTasks.length}</Text>
              </Flex>
            </Box>

            <Box
              border="1px solid green"
              margin={"5px"}
              backgroundColor={
                selectedTag.includes("other") ? "orange.400" : "orange.100"
              }
              cursor="pointer"
            >
              <Flex
                padding="0 10px"
                margin={"5px"}
                onClick={() => handleTagChange("other")}
              >
                <Text>Others</Text>
                <Text marginLeft={"auto"}>{OthersTasks.length}</Text>
              </Flex>
            </Box>

{/* add new task from */}
            <Box border="1px solid green" width="220px" mt="10px">
              <Text align="center" width="200px">
                <ModalForm />
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box height="10vh" border="1px solid red">
          <Button width="90%" margin="15px 0px 0px 10px" onClick={handleLogout}>
            {isAuth ? "Logout" : "Login"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
