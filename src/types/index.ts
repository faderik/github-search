/* eslint-disable @typescript-eslint/no-explicit-any */
type User = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

type Repo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string;
  owner: User;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
};
