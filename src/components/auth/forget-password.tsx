"use client"
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import { LoginProps, LoginSchema } from '@/schemas'
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { handleCredentialsSignIn } from '@/actions/authAction'

export const ForgetPassword = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginProps>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: LoginProps) => {
    setError("");
    setSuccess("")
    startTransition(() => {
      console.log("submit")
      handleCredentialsSignIn(values).then((data => {
        setError(data?.error);
        // setSuccess(data.success);
     
      }))
    })
    console.log(values)
  }

  return (
    <CardWrapper
      headerLabel='Forget Password'
    //   backButtonHref='/'
    //   backButtonLabel='Forget password'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'>
          <div className='space-y-6'>
            <FormField control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder='user@example.com' type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} className='w-full' type='submit'>
            Send reset mail
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
