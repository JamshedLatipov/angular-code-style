import { RoleFunctions } from './role-functions';
import { UserBio } from './user-bio';

interface UserData {
  ROLE_ADMIN: boolean;
  ROLE_DEVELOPER: boolean;
  ROLE_MAP_ADMIN: boolean;
  ROLE_MAP_OPERATOR: boolean;
  ROLE_POS_ADMIN: boolean;
  ROLE_POS_IT_ADMIN: boolean;
  ROLE_POS_LAMP_MANAGER: boolean;
  ROLE_POS_MINER: boolean;
  ROLE_POS_MINER_DISPATCHER: boolean;
  ROLE_POS_OPERATOR: boolean;
  ROLE_POS_SENSOR_DISPATCHER: boolean;
  ROLE_POS_STRATA_ADMIN: boolean;
  ROLE_POS_USER: boolean;
  ROLE_TELEMETRY_ADMIN: boolean;
  ROLE_TELEMETRY_OPERATOR: boolean;

  functions: RoleFunctions[];
  user: UserBio;
}

export interface UserWithRoles {
  data: UserData;
  success: string;
}
