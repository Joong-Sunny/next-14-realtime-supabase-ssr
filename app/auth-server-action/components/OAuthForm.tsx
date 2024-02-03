'use client'

import { createBrowserClient } from '@supabase/ssr'
import { Button } from "@/components/ui/button";
import React from "react";

export const supabase = createBrowserClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function OAuthForm() {
	const loginWithGithub = () => {
		console.log(`${location.origin}/auth-server-action/callback`)

		supabase.auth.signInWithOAuth({
			provider: 'github',
			options: 	{
				redirectTo: `${location.origin}/auth-server-action/callback`,
		}
	})
	}


	return <Button className="w-full" onClick={loginWithGithub}>Login With Github</Button>;
}
