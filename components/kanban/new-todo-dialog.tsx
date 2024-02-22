'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useTaskStore } from '@/lib/store'


import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
 
import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from 'react'
 
 

export default function NewTodoDialog() {
  const addTask = useTaskStore(state => state.addTask)

    const [date, setDate] = React.useState<Date>()

  // eslint-disable-next-line no-undef
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const { title, description } = Object.fromEntries(formData)

    if (typeof title !== 'string' || typeof description !== 'string') return

    addTask(title, description)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' size='sm' className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
          ＋ Add New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className='text-dark100_light900 sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-dark500_light700'>Add New Todo</DialogTitle>
          <DialogDescription className='text-dark100_light900'>
            What do you want to get done today?
          </DialogDescription>
        </DialogHeader>
        <form
          id='todo-form'
          className='grid gap-4 py-4 text-dark100_light900'
          onSubmit={handleSubmit}
        >
          <div className='grid grid-cols-4 items-center gap-4 text-dark100_light900'>
            <Input
              id='title'
              name='title'
              placeholder='Todo title...'
              className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 col-span-4 border'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4 text-dark100_light900'>
            <Textarea
              id='description'
              name='description'
              placeholder='Description...'
              className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 col-span-4 border'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4 text-dark100_light900'>
          <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal primary-gradient min-h-[46px] px-4 py-3 !text-light-900",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 test-white primary-gradient" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 text-dark100_light900" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
        </div>
        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type='submit' size='sm' form='todo-form' className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
              Add Todo
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
