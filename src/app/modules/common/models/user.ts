import { Role } from './role';
import { UserBio } from './user-bio';

export class User {
  name: string;
  role?: Role[];
  token?: string;
  user?: UserBio;
}
