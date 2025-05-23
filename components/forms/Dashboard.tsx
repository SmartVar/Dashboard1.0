/* eslint-disable tailwindcss/no-custom-classname */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
// import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { ProfileSchema } from "@/lib/validations"
import { usePathname, useRouter } from "next/navigation"
import { updateUser } from "@/lib/actions/user.action"

interface Props {
  clerkId: string;
  user: string;
}

const Dashboard = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname()

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || '',
      username: parsedUser.username || '',
      // role: parsedUser.role || '',
      location: parsedUser.location || '',
      section: parsedUser.section || '',
    },
  })

  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);

    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          section: values.section,
          location: values.location,
        //   bio: values.bio,
        },
        path: pathname
      })

      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-9 flex w-full flex-col gap-9">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your name" 
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Username <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your username" 
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        

        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Section 
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Where are you from?" 
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Location 
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Where are you from?" 
                  className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        

        <div className="mt-7 flex justify-end">
         
          <Button type="submit" className="primary-gradient text-light900_dark100 w-fit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default Dashboard