import type { NewRole, Role, RolesResponse } from './model';

export const fetchRoles = async (
  page: number = 1,
  search: string = ''
): Promise<RolesResponse> => {
  const url = new URL('http://localhost:3002/roles');
  url.searchParams.set('page', String(page));
  if (search) url.searchParams.set('search', search);

  const res = await fetch(url.toString());

  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Error fetching roles');
  return json;
};

export const fetchRole = async (roleId: string): Promise<Role> => {
  const res = await fetch(`http://localhost:3002/roles/${roleId}`);

  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Error fetching role');
  return json;
};

export const fetchAllRoles = async (): Promise<Role[]> => {
  const fetchPage = async (page: number): Promise<RolesResponse> => {
    const res = await fetch(`http://localhost:3002/roles?page=${page}`);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch roles (page ${page}, status ${res.status})`
      );
    }
    return res.json() as Promise<RolesResponse>;
  };

  // first page is mandatory: need to know `pages`
  const page1 = await fetchPage(1);

  // fetch the rest in parallel
  const promises: Promise<RolesResponse>[] = [];
  for (let p = 2; p <= page1.pages; p++) {
    promises.push(fetchPage(p));
  }

  let others: RolesResponse[];
  try {
    others = await Promise.all(promises);
  } catch (err) {
    // optional: rethrow with more context
    throw new Error(
      `Failed to fetch subsequent role pages: ${(err as Error).message}`
    );
  }

  return [page1, ...others].flatMap((r) => r.data);
};

export const createRole = async (role: NewRole): Promise<Role> => {
  const res = await fetch('http://localhost:3002/roles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(role),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Error creating role');
  return json;
};

export const updateRole = async ({
  roleId,
  role,
}: {
  roleId: string;
  role: NewRole;
}): Promise<Role> => {
  const res = await fetch(`http://localhost:3002/roles/${roleId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(role),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Error updating role');
  return json;
};

export const deleteRole = async (roleId: string): Promise<Role> => {
  const res = await fetch(`http://localhost:3002/roles/${roleId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Error deleting role');
  return json;
};
