export interface Site {
  _id:string, 
  code: string;
  name: string;
}

export interface CreateSite {
  code: string;
  name: string;
}