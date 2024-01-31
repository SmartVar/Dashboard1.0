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

export interface CreateNotingsParams {
  content: string;
  author: string; // User ID
  noting: string; // Noting ID
  path: string;
}

export interface GetNotingsParams {
  title: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}








// Others

export interface CreateAnswerParams {
  content: string;
  author: string; // User ID
  question: string; // Question ID
  path: string;
}




export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface DeleteAnswerParams {
  answerId: string;
  path: string;
}



export interface RecommendedParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface JobFilterParams {
  query: string;
  page: string;
}

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}
export interface GetTemplatesParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  pagefilter?: string;
}
export interface GetDopBldgParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  pagefilter?: string;
}
export interface GetRulingsParams {
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

export interface CreateTemplateParams {
  title: string;
  category: string;
  subcategory: string;
  description: string;
  section: string;
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
  path: string;
}
export interface CreateRulingParams {
  title: string;
  category: string;
  subcategory: string;
  link: string;
  section: string;
  path: string;
}

export interface GetQuestionByIdParams {
  questionId: string;
}

export interface GetTemplateByIdParams {
  templateId: string;
}
export interface GetDopBldgByIdParams {
  departmentalbldgId: string;
}
export interface GetRulingByIdParams {
  rulingId: string;
}

export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}
export interface DeleteTemplateParams {
  templateId: string;
  path: string;
}
export interface DeleteDopBldgParams {
  departmentalbldgId: string;
  path: string;
}
export interface DeleteRulingParams {
  rulingId: string;
  path: string;
}

export interface EditQuestionParams {
  questionId: string;
  title: string;
  content: string;
  path: string;
}
export interface EditTemplateParams {
  templateId: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  section: string;
  path: string;
}
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
  path: string;
}
export interface EditRulingParams {
  rulingId: string;
  title: string;
  category: string;
  subcategory: string;
  link: string;
  section: string;
  path: string;
}
export interface EditNotingParams {
  notingId: string;
  title: string;
  category: string;
  description: string;
  section: string;
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

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}





export interface ToggleSaveQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}

export interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}


