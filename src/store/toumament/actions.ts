import { createAsyncThunk } from "@reduxjs/toolkit";

export const toumament = createAsyncThunk("auth/login", async (data: any) => {
  try {
    //const response = await loginAPI(data);
    return "";
  } catch (error: any) {
    return console.log(error);
  }
});

export const logoutUser = async () => {
  localStorage.removeItem("userInfo");
  document.location.href = '/';
  return true;
};
