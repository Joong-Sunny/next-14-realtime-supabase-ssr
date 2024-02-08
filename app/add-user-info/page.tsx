import React from "react";;
import readUserSession from "@/lib/actions";
import {redirect} from "next/navigation";
import Info from "@/app/add-user-info/components/Info";

export default async function Page() {
  const  {data} = await readUserSession()
  if (!data.session){
    return redirect("/auth-server-action")
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 space-y-5">
      <Info/>
      </div>
    </div>
  );
}
