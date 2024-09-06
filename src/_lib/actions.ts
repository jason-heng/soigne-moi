"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cookieHelper } from "./session"

export async function logout() {
    cookies().delete(cookieHelper.name)
    redirect('/auth')
}