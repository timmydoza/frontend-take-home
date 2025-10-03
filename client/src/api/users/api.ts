import type { NewUser, User, UsersResponse } from './model';

export const fetchUsers = async (
  page: number = 1,
  search: string = ''
): Promise<UsersResponse> => {
  const url = new URL('http://localhost:3002/users');
  url.searchParams.set('page', String(page));
  if (search) url.searchParams.set('search', search);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('fetch failed');
  return res.json();
};

export const addUser = async (user: NewUser): Promise<User> => {
  const res = await fetch('http://localhost:3002/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error('fetch failed');

  return res.json();
};
