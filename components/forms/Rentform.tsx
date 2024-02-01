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
import { RentedbldgSchema } from "@/lib/validations";
// import { Badge } from '../ui/badge';
// import Image from 'next/image';

import { createRentBldg, editRentBldg} from '@/lib/actions/rentedbldg.action';
import { useRouter, usePathname } from 'next/navigation';
// import { useTheme } from '@/context/ThemeProvider';

interface Props {
    type?: string;
    mongoUserId: string;
    rentDetails?: string;
  }

const Rentform = ({ type, mongoUserId, rentDetails }: Props) => {
//     const { mode } = useTheme();
//   const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const parsedRentDetails =  rentDetails && JSON.parse(rentDetails || '');



  // 1. Define your form.
  const form = useForm<z.infer<typeof RentedbldgSchema>>({
    resolver: zodResolver(RentedbldgSchema),
    defaultValues: {
      division: parsedRentDetails?.division || '',
      po: parsedRentDetails?.po || '',
      class_po: parsedRentDetails?.class_po || '',
      date_po_function: parsedRentDetails?.date_po_function || '',
      class_city: parsedRentDetails?.class_city || '',
      soa: parsedRentDetails?.soa || '',
      paq: parsedRentDetails?.paq || '',
      area: parsedRentDetails?.area || '',
      lease_period: parsedRentDetails?.lease_period || '',
      rent: parsedRentDetails?.rent || '',
           
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof RentedbldgSchema>) {
    setIsSubmitting(true);
    
    try {
      if(type === 'Edit') {
        await editRentBldg({
          rentbldgId: parsedRentDetails._id,
          division: values.division,
          po: values.po,
          class_po: values.class_po,
          date_po_function: values.date_po_function,
          class_city: values.class_city,
          soa: values.soa,
          paq: values.paq,
          area: values.area,
          lease_period: values.lease_period,
          rent: values.rent,
          path: pathname,
        })

        router.push(`/rentbldg/${parsedRentDetails._id}`);
      } else {
        await createRentBldg({
            division: values.division,
          po: values.po,
          class_po: values.class_po,
          date_po_function: values.date_po_function,
          class_city: values.class_city,
          soa: values.soa,
          paq: values.paq,
          area: values.area,
          lease_period: values.lease_period,
          rent: values.rent,
          path: pathname,
        });

        router.push('/rentbldg');
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
        name="po"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Post Office <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Post Office Name
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="class_po"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Class of Post Office <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Class of POs (HSG/LSG/HO etc)
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="date_po_function"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Date of PO Functioning <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Date of PO Functioning
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="class_city"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Class of City <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter class of city (X, Y or Z)
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="soa"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">SOA <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter SOA (Scheduled of Accomodation) of Post office
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="paq"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Post Attached Quarter <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter PAQ (Post Attached Quarter) Available (Yes/No)
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="area"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Area of PO (in Sq. mtr) <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Post office Area in sq. mtr
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lease_period"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Latest Lease Period <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Latest Lease Period (date/year)
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="rent"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Monthly Rent (in Rs.) <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter per month rent in Rs.
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

export default Rentform