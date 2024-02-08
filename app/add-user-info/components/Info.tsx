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
import {addUserInfo} from "@/app/add-user-info/actions";


const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Description is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  sex: z.string().refine(val => val === "남자" || val === "여자", { message: "성별을 선택해주세요." }),
});

export default function Info() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "홍킬동",
      sex: "남자",
      description: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {

    startTransition(async () => {
      const result = await addUserInfo(data)

      console.log(result)
      const {error} = JSON.parse(result)
      if(!error?.message){
        toast({
          title: "유저정보가 성공적으로 저장되었습니다",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{data.sex}인 {data.name} 님의 정보가 유저테이블에 저장되었습니다</code>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input
                  placeholder="본인의 실명"
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
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>성별</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="form-select w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={field.onChange}
                >
                  <option value="">성별 선택</option>
                  <option value="남자">남자</option>
                  <option value="여자">여자</option>
                </select>
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
              <FormLabel>자기소개</FormLabel>
              <FormControl>
                <Input
                  placeholder="동에번쩍 서에번쩍"
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
