export type UserStatus = 'Active' | 'Suspended' | 'Pending Invitation' | 'Deleted';

export type UserProps = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
};
