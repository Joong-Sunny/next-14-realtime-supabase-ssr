"use client"

import React, {useEffect, useState} from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {deleteTodoById, readTodo, updateTodoById} from "@/app/todo/actions";
import {supabase} from "@/lib/supabase/client";

export default function Todos() {
  const [todos, setTodos] = useState<unknown[]>([])

  useEffect(() => {
    fetchTodos()

    const subscription = supabase.channel('table-db-changes').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'crud-demo',
    },(payload) => {
      updateTodosBasedOnPayload(payload)
    }).subscribe()

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [])


const fetchTodos = async () => {

  console.log("저는 딱 한번만 호출되어야 하는 TODO fetch 입니다");
  const {data:fetchedTodo} = await readTodo()
  if (fetchedTodo)
  setTodos(fetchedTodo)
}
  const updateTodosBasedOnPayload = (payload) => {
    // payload를 분석하여 상태 업데이트 로직 구현
    console.log("방금바뀐정보는....", payload)

    if (payload.eventType === 'INSERT') {
      setTodos((prevTodos) => [...prevTodos, payload.new]);
    }

    else if (payload.eventType === 'UPDATE') {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === payload.new.id ? payload.new : todo))
      );
    }

    else if (payload.eventType === 'DELETE') {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== payload.old.id));
    }
  };


  return (
    <>
        {todos?.map((todo, index) => {
          const deleteTodo = deleteTodoById.bind(null, todo.id)
          const updateTodo = updateTodoById.bind(null, todo.id, !todo.completed)

          return (
            <div key={index} className="flex items-center gap-6">
              <h1
                className={cn({
                  "line-through": todo.completed,
                })}
              >
                {todo.title}
              </h1>

              <form action={deleteTodo}>
                <Button>delete</Button>
              </form>

              <form action={updateTodo}>
                <Button>Update</Button>
              </form>
            </div>
          );
        })}
    </>
  );
}

