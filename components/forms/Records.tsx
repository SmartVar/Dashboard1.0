"use client"
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
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
import { TemplatesSchema } from "@/lib/validations";
// import { Badge } from '../ui/badge';
// import Image from 'next/image';

import { createTemplate, editTemplate} from '@/lib/actions/template.action';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeProvider';

interface Props {
    type?: string;
    mongoUserId: string;
    templateDetails?: string;
  }

const Records = ({ type, mongoUserId, templateDetails }: Props) => {
    const { mode } = useTheme();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const parsedTemplateDetails =  templateDetails && JSON.parse(templateDetails || '');



  // 1. Define your form.
  const form = useForm<z.infer<typeof TemplatesSchema>>({
    resolver: zodResolver(TemplatesSchema),
    defaultValues: {
      title: parsedTemplateDetails?.title || '',
      category: parsedTemplateDetails?.category || '',
      subcategory: parsedTemplateDetails?.subcategory || '',
      description: parsedTemplateDetails?.description || '',
      section: parsedTemplateDetails?.section || '',
      
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof TemplatesSchema>) {
    setIsSubmitting(true);
    
    try {
      if(type === 'Edit') {
        await editTemplate({
          templateId: parsedTemplateDetails._id,
          title: values.title,
          category: values.category,
          subcategory: values.subcategory,
          description: values.description,
          section: values.section,
          path: pathname,
        })

        router.push(`/templates/${parsedTemplateDetails._id}`);
      } else {
        await createTemplate({
          title: values.title,
          category: values.category,
          subcategory: values.subcategory,
          description: values.description,
          section: values.section,
          // author: JSON.parse(mongoUserId),
          path: pathname,
        });

        router.push('/templates');
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
              The title should be same as filter Name i.e. Funds/Proposals/Plots/Forwardings etc.
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
              The category should be Noting/Drafting/Brief History.
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
              The sub-category should be specific, unique and related to title.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col gap-3">
            <FormLabel className="paragraph-semibold text-dark400_light800">Description <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
              onInit={(evt, editor) => {
                // @ts-ignore
                editorRef.current = editor
              }}
              onBlur={field.onBlur}
              onEditorChange={(content) => field.onChange(content)}
              initialValue={parsedTemplateDetails?.description || ''}
              init={{
                height: 350,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                  'searchreplace', 'visualblocks', 'codesample', 'fullscreen',
                  'insertdatetime', 'media', 'table'
                ],
                toolbar: 
                'undo redo | ' +
                'codesample | bold italic forecolor | alignleft aligncenter |' +
                'alignright alignjustify | bullist numlist',
                content_style: 'body { font-family:Inter; font-size:16px }',
                skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                content_css: mode === 'dark' ? 'dark' : 'light', 
              }}
            />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              The description should be your template main content i.e. Noting/Drafting/Brieh History.
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
              The section should be your branch where you work i.e. Bldg/Staff/Inv/PG etc.
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