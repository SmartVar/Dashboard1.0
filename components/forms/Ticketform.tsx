
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
import { TicketSchema } from "@/lib/validations";
// import { Badge } from '../ui/badge';
// import Image from 'next/image';

// import { createDopBldg, editDopBldg} from '@/lib/actions/departmentalbldg.action';
import { createTicket, editTicket} from '@/lib/actions/ticket.action';
import { useRouter, usePathname } from 'next/navigation';
// import { Badge } from '../ui/badge';
// import { useTheme } from '@/context/ThemeProvider';
// import { useTheme } from '@/context/ThemeProvider';

interface Props {
    type?: string;
    mongoUserId: string;
    ticketDetails?: string;
  }

const Ticketform = ({ type, mongoUserId, ticketDetails }: Props) => {
    // const { mode } = useTheme();
//   const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
const [imageFile, setImageFile] = useState<File | null>(null);

  const parsedTicketDetails =  ticketDetails && JSON.parse(ticketDetails || '');

//   const groupedTags = parsedDopDetails?.tags.map((tag: { name: any; }) => tag.name)


  // 1. Define your form.
  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      division: parsedTicketDetails?.division || '',
      po: parsedTicketDetails?.po || '',
      tkttitle: parsedTicketDetails?.tkttitle || '',
      tktdescription: parsedTicketDetails?.tktdescription || '',
      tktpriority: parsedTicketDetails?.tktpriority || '',
      tktstatus: parsedTicketDetails?.tktstatus || '',

      
    },
  })
  
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

  async function onSubmit(values: z.infer<typeof TicketSchema>) {
  setIsSubmitting(true);

  try {
    let base64Image: string | undefined;

    if (imageFile) {
      const reader = new FileReader();
      base64Image = await new Promise((resolve, reject) => {
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    }

    if (type === 'Edit') {
      await editTicket({
        ticketId: parsedTicketDetails._id,
        division: values.division,
        po: values.po,
        tkttitle: values.tkttitle,
        tktdescription: values.tktdescription,
        tktpriority: values.tktpriority,
        tktstatus: values.tktstatus,
        tktimage: base64Image, // optional
        path: pathname,
      });
    } else {
      await createTicket({
        division: values.division,
        po: values.po,
        tkttitle: values.tkttitle,
        tktdescription: values.tktdescription,
        tktpriority: values.tktpriority,
        tktstatus: values.tktstatus,
        tktimage: base64Image, // optional
        path: pathname,
        author: JSON.parse(mongoUserId),
      });
    }

    router.push('/ticket');
  } catch (error) {
    console.log(error);
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
          name="tkttitle"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Ticket Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Enter Ticket Title. Specify the work Civil/Electrical in title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tktdescription"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Ticket Decription <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Specifiy the detail of the issues in few words.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tktstatus"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Status <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Status will be Open/Close/Inprogress.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tktpriority"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Priority <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Priority of ticket will be Top/Medium/Low.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      <FormItem className="flex w-full flex-col">
  <FormLabel className="paragraph-semibold text-dark400_light800">
    Upload Ticket Image
  </FormLabel>
  <FormControl>
    <Input
      type="file"
      accept="image/*"
      className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          setImageFile(e.target.files[0]);
        }
      }}
    />
  </FormControl>
  <FormDescription className="body-regular mt-2.5 text-light-500">
    Upload relevant image for the ticket (if any).
  </FormDescription>
</FormItem>
                      
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

export default Ticketform