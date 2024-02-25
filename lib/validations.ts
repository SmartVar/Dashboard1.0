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

export const TaskSchema = z.object({
  // id: z.string(),
  title: z.string(),
  division: z.string(),
  doc: z.string(),
  c_no: z.string(),
  f_no: z.string(),
  dod: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  remark: z.string(),
  })

export const CardSchema = z.object({
  // id: z.string(),
  title: z.string(),
  labels: z.string(),
  date: z.string(),
  tasks: z.string(),
  })
export const BoardSchema = z.object({
  // id: z.string(),
  title: z.string(),
   })


export const RulingsSchema = z.object({
  title: z.string().min(4).max(130),
  category: z.string().min(4).max(100),
  subcategory: z.string().min(4).max(100),
  link: z.string().min(10),
  section: z.string().min(4).max(100),
})

export const DepartmentalbldgSchema = z.object({
  division: z.string().min(2).max(130),
  po: z.string().min(2).max(100),
  class: z.string().min(1).max(100),
  location: z.string().min(2),
  purchase_year: z.string().min(2).max(100),
  soa: z.string().min(2).max(100),
  paq: z.string().min(2).max(100),
  area: z.string().min(2).max(100),
  builtup_area: z.string().min(2).max(100),
  open_space: z.string().min(2).max(100),
  floors: z.string().min(2).max(100),
  value: z.string().min(2).max(100),
  year: z.string().min(2).max(100),
  expenditure: z.string().min(2).max(100),
})

export const RentedbldgSchema = z.object({
  division: z.string().min(2).max(130),
  po: z.string().min(2).max(100),
  class_po: z.string().min(1).max(100),
  date_po_function: z.string().min(2),
  class_city: z.string().min(2).max(100),
  soa: z.string().min(2).max(100),
  area: z.string().min(2).max(100),
  paq: z.string().min(2).max(100),
  lease_period: z.string().min(2).max(100),
  rent: z.string().min(2).max(100),
})
export const PlotSchema = z.object({
  division: z.string().min(2).max(130),
  name: z.string().min(2).max(100),
  district: z.string().min(1).max(100),
  location: z.string().min(2),
  local_body: z.string().min(2).max(100),
  area: z.string().min(2).max(100),
  moa: z.string().min(2).max(100),
  date_purchase: z.string().min(2).max(100),
  purchase_from: z.string().min(2).max(100),
  amount: z.string().min(2).max(100),
  purpose: z.string().min(2).max(100),
  lease_period: z.string().min(2).max(100),
  enchroached: z.string().min(2).max(100),
  enchroached_area: z.string().min(2).max(100),
  boundary_wall: z.string().min(2).max(100),
  po_constructed: z.string().min(2).max(100),
})



export const AnswerSchema = z.object({
  answer: z.string().min(100)
})


export const ProfileSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  section: z.string().min(2).max(150),
  // portfolioWebsite: z.string().url(),
  location: z.string().min(2).max(50),
})

export const PendencySchema = z.object({
  division: z.string().min(2).max(130),
  dak_no: z.string().min(2).max(130),
  doc: z.string().min(2).max(130),
  c_no: z.string().min(2).max(130),
  subject: z.string().min(2).max(130),
  f_no: z.string().min(2).max(130),
  dos: z.string().min(2).max(130),
  dor: z.string().min(2).max(130),
  remarks: z.string().min(2).max(130),
  status: z.string().min(2).max(130),
  })