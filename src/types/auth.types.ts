export interface SignIn {
  login: string;
  password: string;
}

export interface SignUp extends SignIn {
  name: string;
  surname: string;
}

export interface Employee {
  id: number;
  name: string;
  surname: string;
  middlename: string;
  role: string;
}

export interface EmployeeCreate extends Omit<Employee, 'id' | 'role'> {}

export enum Roles {
  Employee = 'Employee',
  Admin = 'Admin',
}
