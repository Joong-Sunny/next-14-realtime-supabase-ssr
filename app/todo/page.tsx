import React from "react";
import CreateForm from "./components/CreateForm";
import Logout from "./components/SignOut";
import readUserSession from "@/lib/actions";
import {redirect} from "next/navigation";
import Todos from "@/app/todo/components/Todos";

export default async function Page() {
	const  {data} = await readUserSession()
	if (!data.session){
		return redirect("/auth-server-action")
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="w-96 space-y-5">
				<Logout/>
				<CreateForm />
				<Todos/>
			</div>
		</div>
	);
}
