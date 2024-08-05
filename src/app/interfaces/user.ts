export interface User {
    _id:string, 
    code: string;
    name: string;
    appareil: string;
    password?: string;
  }
  
  export interface CreateUser {
    code: string;
    name: string;
    appareil: string;
    password?: string;
  }