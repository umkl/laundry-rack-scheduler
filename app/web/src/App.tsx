import Calendar from './feats/Calendar';
import PickAssigner from './feats/PickAssigner';
import { CalendarProvider } from './context/CalendarProvider';
import { useQuery } from '@tanstack/react-query';
import readUsers from './core/read-users';
import { UsersContext } from './context/users';
import { useEffect, useState } from 'react';

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const query = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return await readUsers();
        },
    });

    useEffect(() => {
        if (query.data) {
            setUsers(query.data);
        }
    }, [query.data, setUsers]);

    return (
        <div className="h-dvh relative flex flex-col">
            <div className="bg-blue-200 p-4">
                <h1 className="text-3xl font-bold text-center">
                    laundry-rack-scheduler
                </h1>
                <p className="text-center uppercase italic">
                    {query.data?.map((x) => x.name).join(',')}
                </p>
            </div>

            <UsersContext.Provider
                value={{
                    users,
                    setUsers,
                }}
            >
                <CalendarProvider>
                    <Calendar />
                    <PickAssigner />
                </CalendarProvider>
            </UsersContext.Provider>
        </div>
    );
}

export default App;
