"use server";

import createSupabaseServerClient from "@/lib/supabase/server";


export async function addUserInfo({name, sex, description}) {

  const supabase = await createSupabaseServerClient()
  const {data} = await supabase.auth.getUser()
  const userId = data.user?.id

  const result = await supabase.from('user').insert({userId, name,sex, description}).single()

  return JSON.stringify(result)
}

