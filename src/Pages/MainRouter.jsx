import { Stack } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import ReqAuth from "../Hoc/ReqAuth";
import HomePage from "./HomePage";
import Login from "./Login";
import SignUp from "./SignUp";
import EditPage from "./EditPage";
const MainRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ReqAuth>
            <Stack direction="row">
              <Sidebar />
              <HomePage />
            </Stack>
          </ReqAuth>
        }
      />
      <Route
        path="/"
        element={
          <Stack direction="row">
            <Sidebar />
            <HomePage />
          </Stack>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="*" element={<div>Page Not Found</div>} />
      <Route
        path="/task/:id"
        element={
          <ReqAuth>
            <Stack direction="row">
              <Sidebar />
              <EditPage />
            </Stack>
          </ReqAuth>
        }
      />
    </Routes>
  );
};

export default MainRouter;
