"use client";
import React, { useState } from 'react';
import { TodoItem } from "./todo-item";
import { TodoForm } from "./todo-form";
import { Todo } from "@/types/custom";
import { useOptimistic } from "react";

export type Action = "delete" | "update" | "create";

function getDate() {
  const today = new Date();
  const weekDays= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weekday = weekDays[today.getDay()];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  const date = today.getDate();
  return `${weekday}, ${date} ${month} `;
}

export function todoReducer(
  state: Array<Todo>,
  { action, todo }: { action: Action; todo: Todo }
) {
  switch (action) {
    case "delete":
      return state.filter(({ id }) => id !== todo.id);
    case "update":
      return state.map((t) => (t.id === todo.id ? todo : t));
    case "create":
      return todo.is_complete ? [...state, todo] : [todo, ...state];
    default:
      return state;
  }
}

export type TodoOptimisticUpdate = (action: {
  action: Action;
  todo: Todo;
}) => void;

export function TodoList({ todos }: { todos: Array<Todo> }) {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [optimisticTodos, optimisticTodosUpdate] = useOptimistic(
    todos,
    todoReducer
  );
  return (
    <>
    <h1 className="text-5xl mb-20">{currentDate}</h1>
      <TodoForm optimisticUpdate={optimisticTodosUpdate} />
      <div className="flex flex-col gap-4 h-screen">
        {optimisticTodos?.map((todo) => {
          return (
            <TodoItem
              optimisticUpdate={optimisticTodosUpdate}
              todo={todo}
              key={todo.id}
            />
          );
        })}
      </div>
    </>
  );
}
