import { User } from './user';

export interface UserRepository {
  save: (user: User | User[]) => Promise<void>;
  findById: (id: string) => Promise<User | null>;
  findByIds: (ids: string[]) => Promise<User[]>;
  findByEmail: (email: string) => Promise<User>;
}
