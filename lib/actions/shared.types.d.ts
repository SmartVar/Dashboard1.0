import { Schema } from "mongoose";

import { IUser } from "@/mongodb";

export interface SearchParams {
  query: string;
  type?: string | null;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  role: string;
  section: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string; // Add searchQuery parameter
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}



export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface GetTaskParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  pagefilter?: string;
}
export interface GetEventsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  pagefilter?: string;
  // eslint-disable-next-line no-undef
  event_date?: date;
}
export interface GetDopBldgsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  pagefilter?: string;
}
export interface GetTicketsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  pagefilter?: string;
}

export interface GetBoardParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  pagefilter?: string;
}
export interface GetRentBldgParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  pagefilter?: string;
}
export interface GetPlotParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  pagefilter?: string;
}


export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface CreateBoardParams {
  title: string;
  cards: string[];
  path: string;
}
export interface CreateTaskParams {
  // id: string;
  title: string;
  doc: string;
  division: string;
  c_no: string;
  f_no: string;
  dod: string;
  status: string;
  label: string;
  priority: string;
  remark: string;
  path: string;
}
export interface CreateDopBldgParams {
  division: string;
  po: string;
  classes: string;
  location: string;
  purchase_year: string;
  soa: string;
  paq: string;
  area: string;
  builtup_area: string;
  open_space: string;
  floors: string;
  value: string;
  year: string;
  expenditure: string;
  mut_doc: string;
  mut_state: string;
  fund_type: string;
  fund_amount: string;
  cases: string;
  case_description: string;
  case_action: string;
  case_divisionaction: string;
  brief_history: string;
  corr_ro: string;
  corr_division: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}
export interface CreateEventParams {
  division: string;
  title: string;
  description: string;
  section: string;
  event_date: Date;
  path: string;
}

export interface CreateTicketParams {
  division: string;
  po: string;
tkttitle: string;
  tktdescription: string;
  tktstatus: string;
  tktpriority: string;
 author: Schema.Types.ObjectId | IUser;
  path: string;
}
export interface CreateRentBldgParams {
  division: string;
  po: string;
  class_po: string;
  date_po_function: string;
  class_city: string;
  soa: string;
  area: string;
  paq: string;
  lease_period: string;
  rent: string;
  frac_status: string;
  frac_level: string;
  fund_type: string;
  fund_amount: string;
  cases: string;
  case_description: string;
  case_action: string;
  case_divisionaction: string;
  brief_history: string;
  corr_ro: string;
  corr_division: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}
export interface CreatePendencyParams {
  dak_no: string;
  doc: string;
  division: string;
  c_no: string;
  subject: string;
  f_no: string;
  dos: string;
  dor: string;
  remarks: string;
  status: string;
  // author: Schema.Types.ObjectId | IUser;
  path: string;
}
export interface CreatePlotParams {
  division: string;
  name: string;
  district: string;
  location: string;
  local_body: string;
  area: string;
  moa: string;
  date_purchase: string;
  purchase_from: string;
  amount: string;
  purpose: string;
  lease_period: string;
  enchroached: string;
  enchroached_area: string;
  boundary_wall: string;
  po_constructed: string;
    mut_doc: string;
  mut_state: string;
  fund_type: string;
  fund_amount: string;
  cases: string;
  case_description: string;
  case_action: string;
  case_divisionaction: string;
  brief_history: string;
  corr_ro: string;
  corr_division: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}


export interface GetQuestionByIdParams {
  questionId: string;
}
export interface GetBoardByIdParams {
  boardId: string;
}

export interface GetTemplateByIdParams {
  templateId: string;
}
export interface GetTaskByIdParams {
  taskId: string;
}
export interface GetDopBldgByIdParams {
  departmentalbldgId: string;
}
export interface GetEventByIdParams {
  eventId: string;
}
export interface GetTicketByIdParams {
  ticketId: string;
}
export interface GetRentBldgByIdParams {
  rentbldgId: string;
}
export interface GetPendencyByIdParams {
  pendencyId: string;
}
export interface GetPlotByIdParams {
  plotId: string;
}


export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}
// export interface DeleteTemplateParams {
//   templateId: string;
//   path: string;
// }
// export interface DeleteBoardParams {
//   boardId: string;
//   path: string;
// }
export interface DeleteTaskParams {
  taskId: string;
  path: string;
}
export interface DeleteDopBldgParams {
  departmentalbldgId: string;
  path: string;
}
export interface DeleteEventParams {
  eventId: string;
  path: string;
}
export interface DeleteTicketParams {
  ticketId: string;
  path: string;
}
export interface DeleteRentBldgParams {
  rentbldgId: string;
  path: string;
}
export interface DeletePendencyParams {
  pendencyId: string;
  path: string;
}
export interface DeletePlotParams {
  plotId: string;
  path: string;
}


export interface EditQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}

// export interface EditBoardParams {
//  boardId: string;
//   title: string;
//   cards: string[];
//   path: string;
// }
// export interface EditTaskParams {
//   taskId: string;
//   // id: string;
//   title: string;
//   doc: string;
//   division: string;
//   c_no: string;
//   f_no: string;
//   dod: string;
//   status: string;
//   label: string;
//   priority: string;
//   remark: string;
//   path: string;
// }
export interface EditDopBldgParams {
  departmentalbldgId: string;
  division: string;
  po: string;
  classes: string;
  location: string;
  purchase_year: string;
  soa: string;
  paq: string;
  area: string;
  builtup_area: string;
  open_space: string;
  floors: string;
  value: string;
  year: string;
  expenditure: string;
    mut_doc: string;
  mut_state: string;
  fund_type: string;
  fund_amount: string;
  cases: string;
  case_description: string;
  case_action: string;
  case_divisionaction: string;
  brief_history: string;
  corr_ro: string;
  corr_division: string;
  path: string;
}
export interface EditEventParams {
  eventId: string;
  division: string;
  title: string;
  description: string;
  section: string;
  event_date: Date;
  path: string;
}
export interface EditTicketParams {
  ticketId: string;
  division: string;
  po: string;
tkttitle: string;
  tktdescription: string;
  tktstatus: string;
  tktpriority: string;
  path: string;
}

export interface EditRentBldgParams {
  rentbldgId: string;
  division: string;
  po: string;
  class_po: string;
  date_po_function: string;
  class_city: string;
  soa: string;
  area: string;
  paq: string;
  lease_period: string;
  rent: string;
  frac_status : string;
  frac_level : string;
    fund_type: string;
  fund_amount: string;
  cases: string;
  case_description: string;
  case_action: string;
  case_divisionaction: string;
  brief_history: string;
  corr_ro: string;
  corr_division: string;
  path: string;
}
export interface EditPendencyParams {
  pendencyId: string;
  dak_no: string;
  division: string;
  doc: string;
  c_no: string;
  subject: string;
  f_no: string;
  dos: string;
  dor: string;
  remarks: string;
  status: string;
  path: string;
}
export interface EditPlotParams {
  plotId: string;
  division: string;
  name: string;
  district: string;
  location: string;
  local_body: string;
  area: string;
  moa: string;
  date_purchase: string;
  purchase_from: string;
  amount: string;
  purpose: string;
  lease_period: string;
  enchroached: string;
  enchroached_area: string;
  boundary_wall: string;
  po_constructed: string;
      mut_doc: string;
  mut_state: string;
  fund_type: string;
  fund_amount: string;
  cases: string;
  case_description: string;
  case_action: string;
  case_divisionaction: string;
  brief_history: string;
  corr_ro: string;
  corr_division: string;
  tags: string[];
  path: string;
}


export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetQuestionsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}
export interface GetDepartmentalbldgsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}
export interface GetRentedbldgsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}
export interface GetPlotsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}


export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}