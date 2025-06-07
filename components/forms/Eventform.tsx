/* eslint-disable react/jsx-no-undef */
"use client"
import React, { useState } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form';
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
// import { toast } from "sonner"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
// import { DepartmentalbldgSchema } from "@/lib/validations";
import { EventSchema } from "@/lib/validations";
// import { Badge } from '../ui/badge';
// import Image from 'next/image';

// import { createDopBldg, editDopBldg} from '@/lib/actions/departmentalbldg.action';
import { createEvent, editEvent} from '@/lib/actions/event.action';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
// import { Badge } from '../ui/badge';
// import { useTheme } from '@/context/ThemeProvider';
// import { useTheme } from '@/context/ThemeProvider';

interface Props {
    type?: string;
    mongoUserId: string;
    eventDetails?: string;
  }

const Dopform = ({ type, eventDetails }: Props) => {
    // const { mode } = useTheme();
//   const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const parsedEventDetails =  eventDetails && JSON.parse(eventDetails || '');

  
  // 1. Define your form.
  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      division: parsedEventDetails?.division || '',
      title: parsedEventDetails?.title || '',
      description: parsedEventDetails?.description || '',
      section: parsedEventDetails?.section || '',
      event_date: parsedEventDetails?.event_date || '',
      
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EventSchema>) {
    setIsSubmitting(true);
    
    try {
      if(type === 'Edit') {
        await editEvent({
          eventId: parsedEventDetails._id,
          division: values.division,
          title: values.title,
          description: values.description,
          section: values.section,
          event_date: values.event_date,
          path: pathname,
        })

        router.push('/dashboard');

      } else {
        await createEvent({
          division: values.division,
          title: values.title,
          description: values.description,
          section: values.section,
          event_date: values.event_date,
          path: pathname,
          
        });

        router.push('/dashboard');
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
        name="division"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Division <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Division Name
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Event Title <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Event Title.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Event Description <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Event Description.
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
              Enter Section (Bldg-1/Bldg-2/Bldg-3/Other).
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
<FormField
          control={form.control}
          name="event_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Event Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      {/* <FormField
        control={form.control}
        name="event_date"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Date of Event <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Event Date.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      /> */}
      
            <Button type="submit" className="primary-gradient w-fit !text-light-900" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            {type === 'Edit' ? 'Editing...' : 'Posting...' }
          </>
        ) : (
          <>
            {type === 'Edit' ? 'Edit Event' : 'Enter a Event'}
          </>
        )}
      </Button>
    </form>
  </Form>
  )
}

export default Dopform