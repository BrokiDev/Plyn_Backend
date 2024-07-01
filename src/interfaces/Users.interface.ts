export interface User {
  uuid?: string;
  fName: string;
  lName: string;
  companyName: string | null;
  email: string;
  password: string;
  role?: string;
}
