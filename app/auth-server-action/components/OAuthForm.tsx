'use client'

import { Button } from "@/components/ui/button";
import React from "react";
import {supabase} from "@/lib/supabase/client";

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
