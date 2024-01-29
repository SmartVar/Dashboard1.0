import * as z from "zod"

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
})

export const TemplatesSchema = z.object({
  title: z.string().min(4).max(130),
  category: z.string().min(4).max(100),
  subcategory: z.string().min(4).max(100),
  description: z.string().min(100),
  section: z.string().min(4).max(100),
})
export const PendencySchema = z.object({
  title: z.string().min(4).max(130),
  category: z.string().min(4).max(100),
  subcategory: z.string().min(4).max(100),
  description: z.string().min(100),
  section: z.string().min(4).max(100),
})

export const RulingsSchema = z.object({
  title: z.string().min(4).max(130),
  category: z.string().min(4).max(100),
  subcategory: z.string().min(4).max(100),
  link: z.string().min(10),
  section: z.string().min(4).max(100),
})

export const AnswerSchema = z.object({
  answer: z.string().min(100)
})


export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(50),
  bio: z.string().min(10).max(150),
  portfolioWebsite: z.string().url(),
  location: z.string().min(5).max(50),
})