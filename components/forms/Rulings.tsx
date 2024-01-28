"use client"
import React, { useState } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form';
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
import { Button } from "../ui/button"
import { RulingsSchema } from "@/lib/validations";
// import { Badge } from '../ui/badge';
// import Image from 'next/image';

import { createRuling, editRuling} from '@/lib/actions/ruling.action';
import { useRouter, usePathname } from 'next/navigation';
// import { useTheme } from '@/context/ThemeProvider';

interface Props {
    type?: string;
    mongoUserId: string;
    rulingDetails?: string;
  }

const Records = ({ type, mongoUserId, rulingDetails }: Props) => {
//     const { mode } = useTheme();
//   const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const parsedRulingDetails =  rulingDetails && JSON.parse(rulingDetails || '');



  // 1. Define your form.
  const form = useForm<z.infer<typeof RulingsSchema>>({
    resolver: zodResolver(RulingsSchema),
    defaultValues: {
      title: parsedRulingDetails?.title || '',
      category: parsedRulingDetails?.category || '',
      subcategory: parsedRulingDetails?.subcategory || '',
      link: parsedRulingDetails?.link || '',
      section: parsedRulingDetails?.section || '',
      
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RulingsSchema>) {
    setIsSubmitting(true);
    
    try {
      if(type === 'Edit') {
        await editRuling({
          rulingId: parsedRulingDetails._id,
          title: values.title,
          category: values.category,
          subcategory: values.subcategory,
          link: values.link,
          section: values.section,
          path: pathname,
        })

        router.push(`/rulings/${parsedRulingDetails._id}`);
      } else {
        await createRuling({
          title: values.title,
          category: values.category,
          subcategory: values.subcategory,
          link: values.link,
          section: values.section,
          path: pathname,
        });

        router.push('/rulings');
      }

    } catch (error) {
      
    } finally {
      setIsSubmitting(false);
    }
  }

  

  
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Title <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Be specific and imagine you&apos;re asking a question to another person.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Category <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Be specific and imagine you&apos;re asking a question to another person.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="subcategory"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Sub Category <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Be specific and imagine you&apos;re asking a question to another person.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="link"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Link <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Be specific and imagine you&apos;re asking a question to another person.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="section"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Section <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Be specific and imagine you&apos;re asking a question to another person.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
            <Button type="submit" className="primary-gradient w-fit !text-light-900" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            {type === 'Edit' ? 'Editing...' : 'Posting...' }
          </>
        ) : (
          <>
            {type === 'Edit' ? 'Edit Records' : 'Enter a Record'}
          </>
        )}
      </Button>
    </form>
  </Form>
  )
}

export default Records