export type User = {
  name: string;
  username: string;
  password: string | undefined;
};

export type UserDB = {
  name: string;
  username: string;
  state: string;
  id: string;
};

export type RegisterDataUser = {
  names: string;
  lastnames: string;
  username: string;
  password: string;
};
