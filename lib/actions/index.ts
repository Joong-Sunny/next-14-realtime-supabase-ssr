import createSupabaseServerClient from "@/lib/supabase/server";

export default async function readUserSession(){
  // page protection (유저 세션정보 기반으로...)

  const supabase = await createSupabaseServerClient();

  return supabase.auth.getSession();

}