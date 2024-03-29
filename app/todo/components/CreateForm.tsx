"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import {createTodo} from "@/app/todo/actions";


const FormSchema = z.object({
	title: z.string().min(1, {
		message: "Title is required.",
	}),
	description: z.string().min(1, {
		message: "Description is required.",
	}),
});

export default function CreateForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {

		startTransition(async () => {
			const result = await createTodo(data)

			console.log("실행된거 맞음....?:", result)

			const {error} = JSON.parse(result)
			if(!error?.message){
				toast({
					title: "You are successfully create todo.",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{data.title} is created</code>
				</pre>
					),
				});
				form.reset();
			}
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									placeholder="todo title"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />

						</FormItem>

					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									placeholder="about todo"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full flex gap-2">
					Create
					<AiOutlineLoading3Quarters className={cn("animate-spin", {hidden: !isPending})} />
				</Button>
			</form>
		</Form>
	);
}
