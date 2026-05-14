import { createContext } from 'react';

export const UsersContext = createContext<{
    users: User[];
    setUsers: (users: User[]) => void;
}>({
    users: [],
    setUsers: () => {},
});
