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
  role: string;
}
