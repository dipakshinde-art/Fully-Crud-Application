import {
  Box,
  Stack,
  Text,
  Badge,
  Flex,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
const TaskCard = ({
  id,
  description,
  title,
  task_status,
  tags,
  subtask,
  colorScheme,
}) => {
  const [checkbox, setCheckbox] = useState(() => {
    //for checkbox value
    let data = subtask
      .filter((item) => {
        return item.status && item.subtaskTitle;
      })
      .map((item) => item.subtaskTitle);
    return data;
  });

  // console.log(checkbox);
  return (
    <Box
      border="1px solid red"
      width={"230px"}
      margin={"auto"}
      padding={"5px"}
      mt="10px"
    >
      <Flex justifyContent={"space-between"}>
        <Text>{title}</Text>
        <Link to={`/task/${id}`}>
          <EditIcon cursor="pointer" />
        </Link>
      </Flex>

      <Box marginTop={"5px"}>
        <Stack>
          {tags.length &&
            tags.map((item, index) => {
              return (
                <Badge key={index} colorScheme={colorScheme}>
                  {item}
                </Badge>
              );
            })}
        </Stack>
      </Box>
      <Text>{description}</Text>
      <Box>
        {/* check the value and place on checkbox */}
        <Flex direction="column" p="10px">
          {" "}
          <CheckboxGroup colorScheme="green" value={checkbox}>
            {subtask.length &&
              subtask.map((item, index) => (
                <Checkbox key={index} value={item.subtaskTitle} p="4px">
                  {item.subtaskTitle}
                </Checkbox>
              ))}
          </CheckboxGroup>
        </Flex>
      </Box>
    </Box>
  );
};

export default TaskCard;

{
  /* 
// { */
}
//     "id": 1,
//     "title": "task 1",
//     "description": "description for task 1",
//     "task_status": "todo",
//     "tags": [
//       "personal",
//       "official"
//     ],
//     "subtask": [
//       {
//         "subtaskTitle": "task1:subtask 1",
//         "status": true
//       },
//       {
//         "subtaskTitle": "task1:subtask 2",
//         "status": true
//       }
//     ]
//   },
