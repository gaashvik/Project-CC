
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};
