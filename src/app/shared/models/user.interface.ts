import { Role } from './role';

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
}
