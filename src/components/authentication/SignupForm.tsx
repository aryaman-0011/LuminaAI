"use client"

import React, { useId, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { signup } from '@/app/actions/auth-action'
import { redirect } from 'next/navigation'


const passwordValidationRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')

const formSchema = z.object({
    full_name: z.string().min(3, {
        error: "Your name must be at least  3 characters long."
    }),

    email: z.email({
        error: "Please enter a valid email address!"
    }),

    password: z.string().nonempty('Password is required!').min(8, {
        error: 'Password must be at least 8 characters long!'
    }).regex(
        passwordValidationRegex, {
        error: 'Password must contain 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special letter'
    }),


    confirmPassword: z.string().nonempty('Confirm Password is required!')


}).refine(data => data.password === data.confirmPassword, {
    error: 'Enter correct password',
    path: ["confirmPassword"]
})

const SignupForm = ({ className }: { className?: string }) => {

    const [loading, setLoading] = useState(false)

    const toastId = useId()


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            full_name: "",
            confirmPassword: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        toast.loading('Signing up...', { id: toastId })
        setLoading(true)
        // Do something with the form values.
        // ✅ This will be type-safe and validated.


        const formData = new FormData()
        formData.append('full_name', values.full_name)
        formData.append('email', values.email)
        formData.append('password', values.password)


        const { success, error } = await signup(formData)
        if (!success) {
            toast.error(String(error), { id: toastId })
            setLoading(false)
        } else {
            toast.success('Signed up successfully! Please confirm your email address.', { id: toastId })
            redirect('/login')
        }

        setLoading(false)

        console.log(values)
    }


    return (
        <div className={cn("grid gap-6", className)}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your full name" {...field} />
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
                                    <Input placeholder="name@example.com" {...field} />
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
                                <FormControl>
                                    <Input type='password' placeholder="Enter your password" {...field} />
                                </FormControl>
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
                                <FormControl>
                                    <Input type='password' placeholder="Confirm your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full' disabled={loading}>
                        {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                        Sign Up
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SignupForm