export interface IListing {
  _id: number;
  jobTitle: string;
  company: string;
  location: string;
  jobLevel: string;
  jobType: string[];
  applicationDueDate: Date;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  postingUrl: string;
  other?: string;
}

