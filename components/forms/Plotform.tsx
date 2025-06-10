/* eslint-disable react/jsx-no-undef */
// @ts-ignore
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
import { PlotSchema } from "@/lib/validations";
// import { Badge } from '../ui/badge';
import Image from 'next/image';

import { createPlot, editPlot} from '@/lib/actions/plot.action';
import { useRouter, usePathname } from 'next/navigation';
import { Badge } from '../ui/badge';
// import { useTheme } from '@/context/ThemeProvider';

interface Props {
    type?: string;
    mongoUserId: string;
    plotDetails?: string;
  }

const Plotform = ({ type, mongoUserId, plotDetails }: Props) => {
//     const { mode } = useTheme();
//   const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const parsedPlotDetails =  plotDetails && JSON.parse(plotDetails || '');
const groupedTags = parsedPlotDetails?.tags.map((tag: any) => tag.name)



  // 1. Define your form.
  const form = useForm<z.infer<typeof PlotSchema>>({
    resolver: zodResolver(PlotSchema),
    defaultValues: {
      division: parsedPlotDetails?.division || '',
      name: parsedPlotDetails?.name || '',
      district: parsedPlotDetails?.district || '',
      location: parsedPlotDetails?.location || '',
      local_body: parsedPlotDetails?.local_body || '',
      area: parsedPlotDetails?.area || '',
      moa: parsedPlotDetails?.moa || '',
      date_purchase: parsedPlotDetails?.date_purchase || '',
      purchase_from: parsedPlotDetails?.purchase_from || '',
      amount: parsedPlotDetails?.amount || '',
      purpose: parsedPlotDetails?.purpose || '',
      lease_period: parsedPlotDetails?.lease_period || '',
      enchroached: parsedPlotDetails?.enchroached || '',
      enchroached_area: parsedPlotDetails?.enchroached_area || '',
      boundary_wall: parsedPlotDetails?.boundary_wall || '',
      po_constructed: parsedPlotDetails?.po_constructed || '',
            mut_doc: parsedPlotDetails?.mut_doc || '',
      mut_state: parsedPlotDetails?.mut_state || '',
      fund_type: parsedPlotDetails?.fund_type || '',
      fund_amount: parsedPlotDetails?.fund_amount || '',
      cases: parsedPlotDetails?.cases || '',
      case_description: parsedPlotDetails?.case_description || '',
      case_action: parsedPlotDetails?.case_action || '',
      case_divisionaction: parsedPlotDetails?.case_divisionaction || '',
      brief_history: parsedPlotDetails?.brief_history || '',
      corr_ro: parsedPlotDetails?.corr_ro || '',
      corr_division: parsedPlotDetails?.corr_division || '',
       tags: groupedTags || []
               
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PlotSchema>) {
    setIsSubmitting(true);
    
    try {
      if(type === 'Edit') {
        await editPlot({
          plotId: parsedPlotDetails._id,
          division: values.division,
          name: values.name,
          district: values.district,
          location: values.location,
          local_body: values.local_body,
          area: values.area,
          moa: values.moa,
          date_purchase: values.date_purchase,
          purchase_from: values.purchase_from,
          amount: values.amount,
          purpose: values.purpose,
          lease_period: values.lease_period,
          enchroached: values.enchroached,
          enchroached_area: values.enchroached_area,
          boundary_wall: values.boundary_wall,
          po_constructed: values.po_constructed,
                    mut_doc: values.mut_doc,
          mut_state: values.mut_state,
          fund_type: values.fund_type,
          fund_amount: values.fund_amount,
          cases: values.cases,
          case_description: values.case_description,
          case_action: values.case_action,
          case_divisionaction: values.case_divisionaction,
          brief_history: values.brief_history,
          corr_ro: values.corr_ro,
          corr_division: values.corr_division,
          tags: values.tags,
          path: pathname,
        })

        router.push(`/plot/${parsedPlotDetails._id}`);
      } else {
        await createPlot({
            division: values.division,
            name: values.name,
            district: values.district,
            location: values.location,
            local_body: values.local_body,
            area: values.area,
            moa: values.moa,
            date_purchase: values.date_purchase,
            purchase_from: values.purchase_from,
            amount: values.amount,
            purpose: values.purpose,
            lease_period: values.lease_period,
            enchroached: values.enchroached,
            enchroached_area: values.enchroached_area,
            boundary_wall: values.boundary_wall,
            po_constructed: values.po_constructed,
                   mut_doc: values.mut_doc,
          mut_state: values.mut_state,
          fund_type: values.fund_type,
          fund_amount: values.fund_amount,
          cases: values.cases,
          case_description: values.case_description,
         case_action: values.case_action,
          case_divisionaction: values.case_divisionaction,
          brief_history: values.brief_history,
          corr_ro: values.corr_ro,
          corr_division: values.corr_division,
          path: pathname,
          tags: values.tags,
          author: JSON.parse(mongoUserId),
        });

        router.push('/plot');
      }

    } catch (error) {
      
    } finally {
      setIsSubmitting(false);
    }
  }

   const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
      if (e.key === 'Enter' && field.name === 'tags') {
        e.preventDefault();
  
        const tagInput = e.target as HTMLInputElement;
        const tagValue = tagInput.value.trim();
  
        if(tagValue !== '') {
          if(tagValue.length > 15) {
            return form.setError('tags', {
              type: 'required',
              message: 'Tag must be less than 15 characters.'
            })
          }
  
          if(!field.value.includes(tagValue as never)) {
            form.setValue('tags', [...field.value, tagValue]);
            tagInput.value = ''
            form.clearErrors('tags');
          }
        } else {
          form.trigger();
        }
      }
    }
  
    const handleTagRemove = (tag: string, field: any) => {
      const newTags = field.value.filter((t: string) => t !== tag);
  
      form.setValue('tags', newTags);
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
        name="name"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Plot Name <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Plot Name
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="district"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">District/Panchayat <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter District or Panchayat Information.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Location <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Location of PO i.e. Urban/Rural
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="local_body"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Local Body <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter local body information i.e. Muncipality, Nagarparishad etc
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
            <FormLabel className="paragraph-semibold text-dark400_light800">Area of plot (in Sq. mtr) <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter area of plot in sq. mtr
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="moa"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Mode of Acquisition <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter MOA (Mode of Acquisition) of Plots (Lease/Reserved/free hold)
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="date_purchase"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Date of Purchase <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter date of purchase of plot
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="purchase_from"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">PLot purchased from <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter plot seller information
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Amount of Plot (in Rs.) <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter amount of plot in Rs.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="purpose"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Purpose of plot purchased <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter purpose of plot purchased i.e. construction of PQ/SQ/IQ etc.
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
            <FormLabel className="paragraph-semibold text-dark400_light800">Lease Period of Plot <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter lease period of plot
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="enchroached"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Whether Plot is enchorached? <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Whether plot is enchorached (Yes/No)
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="enchroached_area"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">If enchroached than Area (in Sq. mtr) <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Area of Enchroachement (in Sq. Mtr)
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="boundary_wall"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Boundary wall constructed <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Is boundary wall constructed (Yes/No)
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="po_constructed"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Is PO constructed <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Is Post Office constructed earlier/currently on the plot.
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
       <FormField
              control={form.control}
              name="mut_doc"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Mutation document type <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Enter what type of document of mutation is available?
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mut_state"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Mutation State <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Enter wheter mutation is complete/pending/cannot be done.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fund_type"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Fund Type <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Mention type of funds i.e. Plan/Non-Plan/Project Arrow or others.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fund_amount"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Funds Allotted (in Rs.) <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Enter Amount of Funds Allotted
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cases"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Case type <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Case type i.e. Legal/Dispute/Others.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="case_description"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Case Description <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Case Description
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="case_action"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Case Action Proposed <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Give the details of the proposed actions for the case.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="case_divisionaction"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Division Action <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Give details of Action taken by Divisions.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brief_history"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Brief History <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Enter Brief History of the Post office since inspection till date.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="corr_ro"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Last RO Corr <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Last Correspondance by RO NMR
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="corr_division"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Last Division Corr <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <Input 
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    {...field} />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Last Correspondance from Division.
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">Tags <span className="text-primary-500">*</span></FormLabel>
                  <FormControl className="mt-3.5">
                    <>
                    <Input 
                    // disabled={type === 'Edit'}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    />
                    
                    {field.value.length > 0 && (
                      <div className="flex-start mt-2.5 gap-2.5">
                        {field.value.map((tag: any) => (
                          <Badge 
                          key={tag} 
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize" 
                          // onClick={() => type !== 'Edit' ? handleTagRemove(tag, field) : () => {}}
                          // onClick={() => type === 'Edit' ? handleTagRemove(tag, field) : () => {}}
                          onClick={() => handleTagRemove(tag, field)}
                          >
                           {tag}
                          {/* {type !== 'Edit' && (<Image 
                          src="/assets/icons/close.svg"
                          alt="Close icon"
                          width={12}
                          height={12}
                          className="cursor-pointer object-contain invert-0 dark:invert"
                          />)} */}
                          <Image 
                          src="/assets/icons/close.svg"
                          alt="Close icon"
                          width={12}
                          height={12}
                          className="cursor-pointer object-contain invert-0 dark:invert"
                          />
                          </Badge>
                        ))}
                      </div>
                    )}
                    </>
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.
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

export default Plotform
