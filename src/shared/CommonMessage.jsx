/* eslint-disable react-refresh/only-export-components */
import { message } from "antd";
import React, { createContext, useContext } from "react";
const MessageContext = createContext(null);

export const CommonMessageProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  // Hàm success dùng chung
  const alertSuccess = (title) => {
    messageApi.open({
      type: "success",
      content: title,
      duration: 3,
    });
  };

  // Hàm error dùng chung
  const alertError = (title) => {
    messageApi.open({
      type: "error",
      content: title,
      duration: 3,
    });
  };

  // Hàm info dùng chung
  const alertInfo = (title) => {
    messageApi.open({
      type: "info",
      content: title,
      duration: 3,
    });
  };

  // Hàm warning dùng chung
  const alertWarning = (title) => {
    messageApi.open({
      type: "warning",
      content: title,
      duration: 3,
    });
  };

  return (
    <MessageContext.Provider
      value={{ messageApi, alertSuccess, alertError, alertInfo, alertWarning }}
    >
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

// Hook dùng chung để gọi message ở bất kỳ đâu
export const useCommonMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("Đã xảy ra lỗi!");
  }
  return context;
};
