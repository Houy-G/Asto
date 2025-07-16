'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {router} from "next/client";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
const formSchema = z.object({
    email: z.string().email({message:"Invalid email address."}),
    password: z.string()
})

export default function LoginPage() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [PasswordType, setPasswordType] = useState("password");

    const togglePasswordVisibility = () => {
        if (showPassword) {
            setPasswordType("password");
        }else {setPasswordType("");}

        setShowPassword(!showPassword);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email:"",
            password:"",
        },
    })

    const handleLogin = async (e: z.infer<typeof formSchema>) => {
        setError('');
        console.table(e);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}users/login`, e);

            const token = res.data.token;

            if (token) {
                Cookies.set('token', token, { expires: 7 }); // ⏳ Expires in 7 days
                await router.push('/product'); // ✅ Protected route
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className={""}>
            <Card className={"w-[40%] mx-auto"}>
                <CardHeader>
                    <CardTitle className={"text-3xl flex justify-center"}> Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-10 mx-auto">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type={"email"} placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>password</FormLabel>
                                        <div className={"flex"}>
                                            <FormControl>
                                                <Input type={PasswordType} placeholder="********" {...field} />
                                            </FormControl>
                                            <FormControl className={"relative z-10 right-10"}>
                                                <button type="button" onClick={togglePasswordVisibility}>
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </FormControl></div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className={"mx-auto w-full"}>Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
