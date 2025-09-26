"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();
const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer></ToastContainer>
    </QueryClientProvider>
  );
};

export default QueryProvider;
