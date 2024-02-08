"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import {revalidatePath} from "next/cache";

export async function createTodo({title, description}) {
  const supabase = await createSupabaseServerClient()

  const result = await supabase.from('crud-demo').insert({title, description}).single()

  console.log("createTODO함수 내부: ", result)


  return JSON.stringify(result)
}

export async function readTodo() {

  const supabase = await createSupabaseServerClient()
  const {data} = await supabase.auth.getUser()
  console.log("--- --- --- --- ---")
  console.log("유저데이터 출력해버림;;",data)
  console.log("--- --- --- --- ---")

  return supabase.from('crud-demo').select('*')
}

export async function deleteTodoById(id: string) {
  const supabase = await createSupabaseServerClient()

  const result =  supabase.from('crud-demo').delete().eq("id", id)
  revalidatePath("/todo")

  return result
}

export async function updateTodoById(id: string, completed: boolean) {
  const supabase = await createSupabaseServerClient()

  const result =  supabase.from('crud-demo').update({completed}).eq("id", id)
  revalidatePath("/todo")

  return result


}
