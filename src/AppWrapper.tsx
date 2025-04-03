
import React from "react";
import { Outlet } from "react-router-dom";
import FloatingAIAssistant from "./components/ai-assistant/FloatingAIAssistant";

const AppWrapper: React.FC = () => {
  return (
    <>
      <Outlet />
      <FloatingAIAssistant />
    </>
  );
};

export default AppWrapper;
