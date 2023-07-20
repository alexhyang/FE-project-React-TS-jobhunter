export interface IListing {
  _id: number;
  jobTitle: string;
  company: string;
  location: string;
  jobLevel: string[];
  // TODO: jobLevel: string;
  jobType: string[];
  applicationDueDate: Date;
  responsibilities: string[];
  qualifications: string[];
  skills: string[];
  postingUrl: string;
  other?: string;
}

// Skill: id, name, count
export type Skill = [number, string, number];

