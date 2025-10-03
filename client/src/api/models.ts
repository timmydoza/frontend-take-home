export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  first: string;
  last: string;
  roleId: string;
  photo: string;
};

export type Role = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  isDefault: boolean;
  description: string;
};

type PaginatedData<Data> = {
  next: number | null;
  prev: number | null;
  pages: number;
  data: Data[];
};

export type UsersResponse = PaginatedData<User>;
export type RolesResponse = PaginatedData<Role>;
