import { Control } from "react-hook-form";

export interface IFormValues {
  url: string;
  position: string;
  company: string;
  location: string;
  type: string[];
  level: string;
  due_date: string;
  responsibilities: string;
  qualifications: string;
  skills: string;
  posting_password: string;
  other?: string;
}

export interface ITextField {
  name: keyof IFormValues;
  control: Control<IFormValues>;
  required?: boolean;
  type?: string;
  asCol?: boolean;
}

type Option = {
  id: number;
  value: string;
  label: string;
};

export interface ISelectField extends ITextField {
  options: Option[];
}
