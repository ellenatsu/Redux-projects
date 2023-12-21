import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { fetchPosts } from "./features/posts/postsSlice";
import { fetchUsers } from "./features/users/usersSlice";

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

// Get the root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
