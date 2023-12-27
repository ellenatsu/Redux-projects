import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//any mutation result would get cached by default, have to invalidate the previous cache to show the updated data
export const apiSlice = createApi({
  reducerPath: "api", // Unique key for reducer
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      transformResponse: res => res.sort((a, b) => b.id - a.id), //sort the data by id in descending order
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo ,
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { 
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
 } = apiSlice;
