import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  EditablePreview,
  EditableInput,
  Editable,
  EditableTextarea,
} from "@chakra-ui/react";
import { useReducer, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { registerUser } from "../Redux_store/Auth/Authaction";
import { REGISTER_SUCCESS } from "../Redux_store/Auth/Authaction.type";

const initialState = {
  name: "",
  email: "",
  password: "",
  mobile: "0",
  username: "dipak",
  description: "hellow",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "name": {
      return {
        ...state,
        name: action.payload,
      };
    }
    case "email": {
      return {
        ...state,
        email: action.payload,
      };
    }
    case "password": {
      return {
        ...state,
        password: action.payload,
      };
    }
    case "mobile": {
      return {
        ...state,
        mobile: action.payload,
      };
    }
    case "username": {
      return {
        ...state,
        username: action.payload,
      };
    }
    case "description": {
      return {
        ...state,
        description: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    dispatch(registerUser(state)).then((r) => {
      if (r === REGISTER_SUCCESS) {
        navigate("/login", { replace: true });
      }
    });
  };

  console.log(state);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            SignUp
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="Name" isRequired>
                  <FormLabel> Name</FormLabel>
                  <Input
                    type="name"
                    value={state.name}
                    onChange={(e) =>
                      setState({ type: "name", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="Userame" isRequired>
                  <FormLabel> Username</FormLabel>
                  <Input
                    type="username"
                    value={state.username}
                    onChange={(e) =>
                      setState({ type: "username", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={state.email}
                onChange={(e) =>
                  setState({ type: "email", payload: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={state.password}
                  onChange={(e) =>
                    setState({ type: "password", payload: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    value={state.password}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="mobile" isRequired>
              <FormLabel>Mobile</FormLabel>
              <Input
                type="number"
                value={state.mobile}
                onChange={(e) =>
                  setState({ type: "number", payload: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="mobile" isRequired>
              <Editable defaultValue="Discription">
                <EditablePreview />
                <EditableTextarea
                  value={state.description}
                  onChange={(e) =>
                    setState({ type: "description", payload: e.target.value })
                  }
                />
              </Editable>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <ReactLink to="/login" color={"blue.400"}>
                  Login
                </ReactLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
