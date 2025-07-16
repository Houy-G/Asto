"use client"

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
import {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
// file validation constants
const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']


const formSchema = z.object({
    username: z.string().min(3,{message:"Username must be at least 3 characters."}),
    email: z.string().email({message:"Invalid email address."}),
    password: z.string().min(6,{message:"Password must be at least 6 characters."}).regex(passwordRegex,"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    confirmPassword: z.string().min(6,{message:"Confirm Password must be at least 6 characters."}).regex(passwordRegex,"Confirm Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    // file: z
    //     .any()
    //     .refine((file) => file instanceof File, 'File is required')
    //     .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 2MB')
    //     .refine(
    //         (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
    //         'Only .jpeg .jpg, .png, .pdf files are allowed'
    //     ),

})
export default function RegisterPage() {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [ConfirmPasswordType, setConfirmPasswordType] = useState("password");

    const [showPassword, setShowPassword] = useState(false);
    const [PasswordType, setPasswordType] = useState("password");

    const togglePasswordVisibility = () => {
        if (showPassword) {
            setPasswordType("password");
        }else {setPasswordType("");}

        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        if (showConfirmPassword) {
            setConfirmPasswordType("password");
        }else {setConfirmPasswordType("");}

        setShowConfirmPassword(!showConfirmPassword);
    };

    type RegisterFormValues = z.infer<typeof formSchema>
    // 1. Define your form.
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.table(values)
    }

    return (
        <div className={""}>
            <Card className={"w-[40%] mx-auto"}>
                <CardHeader>
                    <CardTitle className={"text-3xl flex justify-center"}> Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>User Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type={"email"} placeholder="you@example.com" {...field} />
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
                                        <FormLabel>Password</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <div className={"flex"}>
                                            <FormControl>
                                                <Input type={ConfirmPasswordType} placeholder="********" {...field} />
                                            </FormControl>
                                            <FormControl className={"relative z-10 right-10"}>
                                                <button type="button" onClick={toggleConfirmPasswordVisibility}>
                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </FormControl></div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/*<FormField*/}
                            {/*    control={form.control}*/}
                            {/*    name="file"*/}
                            {/*    render={({ field: { onChange, ref } }) => (*/}
                            {/*        <FormItem>*/}
                            {/*            <FormLabel>Upload File</FormLabel>*/}
                            {/*            <FormControl>*/}
                            {/*                <Input*/}
                            {/*                    type="file"*/}
                            {/*                    accept=".jpg,.jpeg,.png,.pdf"*/}
                            {/*                    onChange={(e) => {*/}
                            {/*                        if (e.target.files?.[0]) {*/}
                            {/*                            onChange(e.target.files[0]);*/}
                            {/*                        }*/}
                            {/*                    }}*/}
                            {/*                    ref={ref}*/}
                            {/*                />*/}
                            {/*            </FormControl>*/}
                            {/*            <FormMessage />*/}
                            {/*        </FormItem>*/}
                            {/*    )}*/}
                            {/*/>*/}


                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            </div>

    )
}