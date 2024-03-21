/** @format */

// aboutUsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphqlClient } from "./graphqlClient";


// Define the async thunk for fetching the about us content
export const fetchAboutUs = createAsyncThunk(
  "aboutUs/fetchAboutUs",
  async () => {
    const response = await graphqlClient.request(`
    query {
      aboutUs {
        content
      }
    }
  `);
    return response.aboutUs.content;
  }
);

// Create the aboutUs slice
export const aboutUsSlice = createSlice({
  name: "aboutUs",
  initialState: {
    loading: false,
    content: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutUs.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
