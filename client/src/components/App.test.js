/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllItems,
  addItem,
  clearCart,
} from "../services/products";

import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("../services/products.js");

import products from "../../mockData/data"

afterEach(() => {
  jest.clearAllMocks();
});

test("get products is called when the component renders", async () => {
  getAllProducts.mockResolvedValueOnce(products);

  render(<App />);
  await waitFor(() => expect(getAllProducts).toHaveBeenCalledTimes(1));
});

// test("it shows h2 when the data is fetched", async () => {
//   getAllProducts.mockResolvedValueOnce(products);

//   render(<App />);
//   // const heading = await screen.findByRole("heading", { level: 2 });
//   await waitFor(() => expect(getAllProducts).toHaveBeenCalledTimes(1));
//   expect(heading).toBeinTheDocument();
// });
