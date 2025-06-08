import * as z from "zod"

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
})


// export const TaskSchema = z.object({
//   // id: z.string(),
//   title: z.string(),
//   division: z.string(),
//   doc: z.string(),
//   c_no: z.string(),
//   f_no: z.string(),
//   dod: z.string(),
//   status: z.string(),
//   label: z.string(),
//   priority: z.string(),
//   remark: z.string(),
//   })

// export const CardSchema = z.object({
//   // id: z.string(),
//   title: z.string(),
//   labels: z.string(),
//   date: z.string(),
//   tasks: z.string(),
//   })
// export const BoardSchema = z.object({
//   // id: z.string(),
//   title: z.string(),
//    })



export const DepartmentalbldgSchema = z.object({
  division: z.string().min(2).max(130),
  po: z.string().min(2).max(100),
  classes: z.string().min(1).max(100),
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
  mut_doc: z.string().min(2).max(100),
  mut_state: z.string().min(2).max(100),
  fund_type: z.string().min(2).max(100),
  fund_amount: z.string().min(2).max(100),
  cases: z.string().min(2).max(100),
  case_description: z.string().min(2).max(130),
  case_action: z.string().min(2).max(130),
  case_divisionaction: z.string().min(2).max(130),
  brief_history: z.string().min(2).max(500),
  corr_ro: z.string().min(2).max(500),
  corr_division: z.string().min(2).max(500),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),

})
export const EventSchema = z.object({
  division: z.string().min(2).max(130),
  title: z.string().min(2).max(130),
  description: z.string().min(2).max(130),
  section: z.string().min(2).max(130),
  event_date: z.date(),

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
  frac_status: z.string().min(2).max(100),
  frac_level: z.string().min(2).max(100),
    fund_type: z.string().min(2).max(100),
  fund_amount: z.string().min(2).max(100),
  cases: z.string().min(2).max(100),
  case_description: z.string().min(2).max(130),
  case_action: z.string().min(2).max(130),
  case_divisionaction: z.string().min(2).max(130),
  brief_history: z.string().min(2).max(500),
  corr_ro: z.string().min(2).max(500),
  corr_division: z.string().min(2).max(500),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
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


export const ProfileSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  section: z.string().min(2).max(150),
  // portfolioWebsite: z.string().url(),
  location: z.string().min(2).max(50),
})

export const TicketSchema = z.object({
  division: z.string().min(2).max(130),
  po: z.string().min(2).max(100),
  tkttitle: z.string().min(2).max(100),
  tktdescription: z.string().min(2).max(150),
  tktstatus: z.string().min(2).max(100),
  tktpriority: z.string().min(2).max(100),
 })