
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
// import { DepartmentalbldgSchema } from "@/lib/validations";
import { FundSchema } from "@/lib/validations";
// import { Badge } from '../ui/badge';
// import Image from 'next/image';

// import { createDopBldg, editDopBldg} from '@/lib/actions/departmentalbldg.action';
import { createFund, editFund} from '@/lib/actions/fund.action';
import { useRouter, usePathname } from 'next/navigation';
// import { Badge } from '../ui/badge';
// import { useTheme } from '@/context/ThemeProvider';
// import { useTheme } from '@/context/ThemeProvider';

interface Props {
    type?: string;
    mongoUserId: string;
    fundDetails?: string;
  }

const Fundform = ({ type, mongoUserId, fundDetails }: Props) => {
    // const { mode } = useTheme();
//   const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();


  const parsedFundDetails =  fundDetails && JSON.parse(fundDetails || '');

//   const groupedTags = parsedDopDetails?.tags.map((tag: { name: any; }) => tag.name)


 const form = useForm<z.infer<typeof FundSchema>>({
  resolver: zodResolver(FundSchema),
  defaultValues: {
    fund_type: parsedFundDetails?.fund_type || '',
    division: parsedFundDetails?.division || '',
    po: parsedFundDetails?.po || '',
    work: parsedFundDetails?.work || '',
    pe_amount: parsedFundDetails?.pe_amount || '',
    be_allot: parsedFundDetails?.be_allot || '',
    re_allot: parsedFundDetails?.re_allot || '',
    add_allot: parsedFundDetails?.add_allot || '',
    tot_allot: parsedFundDetails?.tot_allot || '',
    tender_amount: parsedFundDetails?.tender_amount || '',
    progress: parsedFundDetails?.progress || '',
    balance: parsedFundDetails?.balance || '',
  },
});

  
  // 2. Define a submit handler.
  // async function onSubmit(values: z.infer<typeof TicketSchema>) {
  //   setIsSubmitting(true);
    
  //   try {
  //     if(type === 'Edit') {
  //       await editTicket({
  //         ticketId: parsedTicketDetails._id,
  //         division: values.division,
  //         po: values.po,
  //         tkttitle: values.tkttitle,
  //         tktdescription: values.tktdescription,
  //         tktpriority: values.tktpriority,
  //         tktstatus: values.tktstatus,
  //         path: pathname,
  //       })

  //       router.push(`/ticket`);

  //     } else {
  //       await createTicket({
  //         division: values.division,
  //         po: values.po,
  //         tkttitle: values.tkttitle,
  //         tktdescription: values.tktdescription,
  //         tktpriority: values.tktpriority,
  //         tktstatus: values.tktstatus,
  //         path: pathname,
  //       //   tags: values.tags,
  //         author: JSON.parse(mongoUserId),
          
  //       });

  //       router.push('/ticket');
  //     }

  //   } catch (error) {
      
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }

    async function onSubmit(values: z.infer<typeof FundSchema>) {
  setIsSubmitting(true);

  try {
    if (type === 'Edit') {
      await editFund({
          fundId: parsedFundDetails._id,
          fund_type: values.fund_type,
          division: values.division,
          po: values.po,
          work: values.work,
          pe_amount: values.pe_amount,
          be_allot: values.be_allot,
          re_allot: values.re_allot,
          add_allot: values.add_allot,
          tot_allot: values.tot_allot,
          tender_amount: values.tender_amount,
          progress: values.progress,
          balance: values.balance,
          path: pathname,
          
      });
    } else {
      await createFund({
        fund_type: values.fund_type,
        division: values.division,
        po: values.po,
        work: values.work,
        pe_amount: values.pe_amount,
        be_allot: values.be_allot,
        re_allot: values.re_allot,
        add_allot: values.add_allot,
        tot_allot: values.tot_allot,
        tender_amount: values.tender_amount,
        progress: values.progress,
        balance: values.balance,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });
    }

    router.push('/dashboard');
  } catch (error) {
    console.error(error);
  } finally {
    setIsSubmitting(false);
  }
}
//    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: any) => {
//     if (e.key === 'Enter' && field.name === 'tags') {
//       e.preventDefault();

//       const tagInput = e.target as HTMLInputElement;
//       const tagValue = tagInput.value.trim();

//       if(tagValue !== '') {
//         if(tagValue.length > 15) {
//           return form.setError('tags', {
//             type: 'required',
//             message: 'Tag must be less than 15 characters.'
//           })
//         }

//         if(!field.value.includes(tagValue as never)) {
//           form.setValue('tags', [...field.value, tagValue]);
//           tagInput.value = ''
//           form.clearErrors('tags');
//         }
//       } else {
//         form.trigger();
//       }
//     }
//   }

//   const handleTagRemove = (tag: string, field: any) => {
//     const newTags = field.value.filter((t: string) => t !== tag);

//     form.setValue('tags', newTags);
//   }


  
 return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
      
      <FormField
        control={form.control}
        name="fund_type"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">
              Fund Type <span className="text-primary-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field}
              />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter fund type (e.g. Plan, Non-Plan, etc.)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="division"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Division <span className="text-primary-500">*</span></FormLabel>
            <FormControl className="mt-3.5">
              <Input 
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter Division Name
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="po"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Post Office <span className="text-primary-500">*</span></FormLabel>
            <FormControl>
              <Input 
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Enter PO Name
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="work"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Work Details <span className="text-primary-500">*</span></FormLabel>
            <FormControl>
              <Input 
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Describe the nature of the work.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="pe_amount"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">PE Amount <span className="text-primary-500">*</span></FormLabel>
            <FormControl>
              <Input 
                type="number"
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="be_allot"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">BE Amount <span className="text-primary-500">*</span></FormLabel>
            <FormControl>
              <Input 
                type="number"
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="re_allot"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">RE Amount <span className="text-primary-500">*</span></FormLabel>
            <FormControl>
              <Input 
                type="number"
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="add_allot"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Add Amount <span className="text-primary-500">*</span></FormLabel>
            <FormControl>
              <Input 
                type="number"
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tot_allot"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Total Allotment <span className="text-primary-500">*</span></FormLabel>
            <FormControl>
              <Input 
                type="number"
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tender_amount"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Tender Amount <span className="text-primary-500">*</span></FormLabel>
            <FormControl>
              <Input 
                type="number"
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Optional Fields: be_allot, re_allot, add_allot, tender_amount, progress, balance */}
      <FormField
        control={form.control}
        name="progress"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Progress</FormLabel>
            <FormControl>
              <Input 
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="balance"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Balance</FormLabel>
            <FormControl>
              <Input 
                type="text"
                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="primary-gradient w-fit !text-light-900" disabled={isSubmitting}>
        {isSubmitting ? (
          type === 'Edit' ? 'Updating...' : 'Creating...'
        ) : (
          type === 'Edit' ? 'Update Record' : 'Create Record'
        )}
      </Button>
    </form>
  </Form>
)
}

export default Fundform