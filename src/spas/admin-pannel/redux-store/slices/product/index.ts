import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import * as selectors from "./product.selectors";
import { ProductState } from "./product.interfaces";
import * as sagas from "./product.sagas";
import * as extraActions from "../../extra-actions";

const initialState: ProductState = {
  list: [],
};

export const productStore = createSlice({
  name: "product",
  initialState,
  reducers: {
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (product) => product._id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(extraActions.postProducts.success, (state, action) => {
      state.list = [...state.list, action.payload.data.product];
    });
  },
});

export { selectors, sagas };
