interface PostingBasic {
  postingUrl: string;
  jobTitle: string;
  company: string;
  location: string;
  jobType: string[];
  jobLevel: string;
  applicationDueDate: string;
  other?: string;
}

export interface IPostingPost extends PostingBasic {
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
}

export interface IPostingGet extends IPostingPost {
  _id: string;
}

export interface IFormData extends PostingBasic {
  responsibilities: string;
  qualifications: string;
  skills: string;
}
