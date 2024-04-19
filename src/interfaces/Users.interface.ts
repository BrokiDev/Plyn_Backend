export interface User {
  fName: string;
  lName: string;
  companyName: string | null;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
}
