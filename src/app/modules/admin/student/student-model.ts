export interface ClassModel {
  filterType: string;
  year: number;
  classes: string[];
}

export interface ClassFilterForm {
  type: string;
  year: number;
  class: string;
}

export interface Student {
  name: string;
  filterType: string;
  year: number;
  className: string;
  editMode?:boolean;
  subject1?:string;
  subject2?:string;
  subject3?:string;
  image?:string;
  isDeleted?:boolean
}
