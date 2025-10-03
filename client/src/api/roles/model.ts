export type Role = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  isDefault: boolean;
  description: string;
};

export type NewRole = Pick<Role, 'name' | 'description' | 'isDefault'>;

export type RolesResponse = {
  next: number | null;
  prev: number | null;
  pages: number;
  data: Role[];
};
