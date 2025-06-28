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
  case_description: z.string().min(2).max(3500),
  case_action: z.string().min(2).max(130),
  case_divisionaction: z.string().min(2).max(130),
  brief_history: z.string().min(2).max(3500),
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
  ro_corr: z.string().min(2).max(130),
  division_corr: z.string().min(2).max(130),
  status: z.string().min(2).max(130),
  reminders: z.string().min(2).max(130),
  tot_reminder: z.string().min(2).max(130),

})
export const ReportSchema = z.object({
  title: z.string().min(2).max(130),
  nmd: z.string().min(2).max(130),
  thn: z.string().min(2).max(130),
  nsk: z.string().min(2).max(130),
  rgd: z.string().min(2).max(130),
  mld: z.string().min(2).max(130),
  pld: z.string().min(2).max(130),
  psd: z.string().min(2).max(130),
  csd: z.string().min(2).max(130),
  rtc: z.string().min(2).max(130),
 c_sion: z.string().min(2).max(130),
  c_pune: z.string().min(2).max(130),
  e_sion: z.string().min(2).max(130),
  remark: z.string().min(2).max(130),
  status: z.string().min(2).max(130),


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
  case_description: z.string().min(2).max(3500),
  case_action: z.string().min(2).max(130),
  case_divisionaction: z.string().min(2).max(130),
  brief_history: z.string().min(2).max(3500),
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
    mut_doc: z.string().min(2).max(100),
  mut_state: z.string().min(2).max(100),
  fund_type: z.string().min(2).max(100),
  fund_amount: z.string().min(2).max(100),
  cases: z.string().min(2).max(100),
  case_description: z.string().min(2).max(3500),
  case_action: z.string().min(2).max(130),
  case_divisionaction: z.string().min(2).max(130),
  brief_history: z.string().min(2).max(3500),
  corr_ro: z.string().min(2).max(500),
  corr_division: z.string().min(2).max(500),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
})


export const ProfileSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  section: z.string().min(2).max(150),
  // portfolioWebsite: z.string().url(),
  location: z.string().min(2).max(50),
})

export const TicketSchema = z.object({
  division: z.string().min(1),
  po: z.string().min(1),
  tkttitle: z.string().min(1),
  tktdescription: z.string().min(1),
  tktpriority: z.string().min(1),
  tktstatus: z.string().min(1),
  tktimage: z.any().optional(), // <- important
});

export const FundSchema = z.object({
  fund_type: z.string().min(1, "Fund type is required"),
  division: z.string().min(1, "Division is required"),
  po: z.string().min(1, "Post Office is required"),
  work: z.string().min(1, "Work description is required"),
  pe_amount: z.string().min(1, "PE amount is required"),
  be_allot: z.string().optional(),
  re_allot: z.string().optional(),
  add_allot: z.string().optional(),
  tot_allot: z.string().min(1, "Total allotment is required"),
  tender_amount: z.string().optional(),
  progress: z.string().optional(),
  balance: z.string().optional(),
});
