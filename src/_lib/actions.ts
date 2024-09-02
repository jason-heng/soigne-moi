"use server"

import { cookies } from "next/headers"
import { cookieHelper } from "./session"
import { redirect } from "next/navigation"

export async function logout() {
    cookies().delete(cookieHelper.name)
    redirect('/auth')
}