import { createContext } from 'react';

export const CalendarContext = createContext<{
    startDate: Date;
    setStartDate: (date: Date) => void;
    endDate?: Date;
    setEndDate: (date: Date | undefined) => void;
    assigner?: User;
    setAssigner: (assigner: User | undefined) => void;
}>({
    startDate: new Date(),
    setStartDate: () => {},
    endDate: undefined,
    setEndDate: () => {},
    assigner: undefined,
    setAssigner: () => {},
});
