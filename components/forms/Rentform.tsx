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
import { Badge } from '../ui/badge';
import Image from 'next/image';

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

const groupedTags = parsedRentDetails?.tags.map((tag: { name: any; }) => tag.name)


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
      frac_status: parsedRentDetails?.frac_status || '',
      frac_level: parsedRentDetails?.frac_level || '',
            fund_type: parsedRentDetails?.fund_type || '',
      fund_amount: parsedRentDetails?.fund_amount || '',
      cases: parsedRentDetails?.cases || '',
      case_description: parsedRentDetails?.case_description || '',
      case_action: parsedRentDetails?.case_action || '',
      case_divisionaction: parsedRentDetails?.case_divisionaction || '',
      brief_history: parsedRentDetails?.brief_history || '',
      corr_ro: parsedRentDetails?.corr_ro || '',
      corr_division: parsedRentDetails?.corr_division || '',
       tags: groupedTags || []
           
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
          frac_status: values.frac_status,
          frac_level: values.frac_level,
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
          frac_status: values.frac_status,
          frac_level: values.frac_level,
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

        router.push('/rentbldg');
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
      <FormField
        control={form.control}
        name="frac_status"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Frac Status <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Frac Status (Completed/Pending)
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="frac_level"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Frac Level <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
              {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Frac Level (Ist/IInd/IIIrd)
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
                                  onClick={() => handleTagRemove(tag, field)}
                                  >
                                  
                                    {tag}
                                    {type !== 'Edit' && (<Image 
                                      src="/assets/icons/close.svg"
                                      alt="Close icon"
                                      width={12}
                                      height={12}
                                      className="cursor-pointer object-contain invert-0 dark:invert"
                                    />)}
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

export default Rentform