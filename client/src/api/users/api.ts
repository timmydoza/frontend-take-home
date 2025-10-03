import type { NewUser, User, UsersResponse } from './model';

export const fetchUsers = async (
  page: number = 1,
  search: string = ''
): Promise<UsersResponse> => {
  const url = new URL('http://localhost:3002/users');
  url.searchParams.set('page', String(page));
  if (search) url.searchParams.set('search', search);

  const res = await fetch(url.toString());

  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Error fetching users');
  return json;
};

export const createUser = async (user: NewUser): Promise<User> => {
  const res = await fetch('http://localhost:3002/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Error creating user');
  return json;
};

export const updateUser = async ({
  userId,
  user,
}: {
  userId: string;
  user: NewUser;
}): Promise<User> => {
  const res = await fetch(`http://localhost:3002/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Error updating user');
  return json;
};

export const deleteUser = async (userId: string): Promise<User> => {
  const res = await fetch(`http://localhost:3002/users/${userId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Error deleting user');
  return json;
};
