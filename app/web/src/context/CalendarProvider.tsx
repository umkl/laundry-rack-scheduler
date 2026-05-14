import { useContext, useEffect, useState } from 'react';
import { CalendarContext } from './calendar';
import { UsersContext } from './users';

const userId = localStorage.getItem('user');

export const CalendarProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { users } = useContext(UsersContext);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [assigner, setAssigner] = useState<User | undefined>(undefined);

    useEffect(() => {
        setAssigner(
            users.find((x) => {
                return x.id === userId;
            })
        );
    }, [users]);

    return (
        <CalendarContext.Provider
            value={{
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                assigner,
                setAssigner,
            }}
        >
            {children}
        </CalendarContext.Provider>
    );
};
