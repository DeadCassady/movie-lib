import { SetMetadata } from "@nestjs/common";

import { Role } from "src/users/roles/roles.enum";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles)
