import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { CalendarContext } from '../context/calendar';
import readSchedules from '../core/read-schedules';
import { createSchedule } from '../core/create-schedules';
import '../lib/date';

export default function Calendar() {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [date, setDate] = useState<Date>(new Date());
    const { assigner } = useContext(CalendarContext);
    const [schedules, setSchedules] = useState<any>([]);

    const hours = Array.from({ length: 24 }, (_, i) => i);

    const query = useQuery({
        queryKey: ['calendar', date],
        queryFn: async () => {
            const schedules = await readSchedules(date);
            return schedules;
        },
    });

    useEffect(() => {
        if (query.data) {
            setSchedules(query.data.items);
        }
    }, [query.data, setSchedules]);

    const { mutate } = useMutation({
        mutationKey: ['create-schedule'],
        mutationFn: async () => {
            if (!startDate || !endDate || !assigner) {
                const issue = 'either start date, end date or assigner not set';
                alert(issue);
                throw new Error(issue);
            }
            await createSchedule({
                start: startDate,
                end: endDate,
                assigner: assigner.id,
            });
        },
        onSuccess: () => {
            setSchedules([
                ...schedules,
                {
                    start: startDate,
                    end: endDate,
                    assigner: assigner?.name,
                },
            ]);
            setStartDate(undefined);
            setEndDate(undefined);
        },
    });

    function click(hour: any) {
        const datePick = new Date(date);
        datePick.setHours(hour);
        datePick.setMinutes(0);

        if (startDate) {
            if (datePick <= startDate) {
                return;
            } else {
                setEndDate(datePick);
            }
        } else {
            setStartDate(datePick);
        }
    }

    function cancel() {
        setSchedules([]);
        setStartDate(undefined);
        setEndDate(undefined);
    }

    function confirm() {
        mutate();
        // setStartDate(undefined);
        // setEndDate(undefined);
    }

    function next() {
        const dateNext = new Date(date);
        dateNext.setDate(date.getDate() + 1);
        setDate(dateNext);
    }

    function prev() {
        const dateNext = new Date(date);
        dateNext.setDate(date.getDate() - 1);
        setDate(dateNext);
    }

    return (
        <div className="flex flex-col flex-1 h-full bg-red-200 overflow-hidden">
            <div className="rounded-lg flex-1 bg-orange-100 p-4 flex flex-col container mx-auto overflow-hidden">
                <div className="flex flex-row justify-between items-center w-full bg-green-400">
                    <div onClick={next} className="p-4 bg-red-600">
                        <ChevronLeft />
                    </div>
                    <div className="flex flex-col items-center">
                        <p>w{date.getWeek()}</p>
                        <h2 className="font-semibold">weekday</h2>
                        <p>{date?.toLocaleDateString('de-AT')}</p>
                    </div>
                    <div onClick={prev} className="p-4 bg-red-600">
                        <ChevronRight />
                    </div>
                </div>
                <div className="gap-4 grid grid-cols-[50px_1fr] relative w-full mt-4 grow-0 overflow-y-scroll">
                    {schedules.map((schedule: any) => {
                        const rowStart =
                            new Date(schedule.start).getHours() + 1;
                        const rowEnd = new Date(schedule.end).getHours() + 2;
                        const style = {
                            gridRowStart: rowStart,
                            gridRowEnd: rowEnd,
                        };
                        return (
                            <div
                                className={
                                    'bg-red-400 w-full h-full absolute col-start-2 col-end-2'
                                }
                                style={style}
                            >
                                {schedule.assigner}
                                <br />
                                {new Date(schedule.start).toLocaleTimeString(
                                    'de-AT',
                                    {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    }
                                )}{' '}
                                -{' '}
                                {new Date(schedule.end).toLocaleTimeString(
                                    'de-AT',
                                    {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    }
                                )}
                            </div>
                        );
                    })}

                    {hours.map((hour) => (
                        <>
                            <div className="bg-red-200 h-[100px]">
                                <p>{`${hour}:00`}</p>
                            </div>
                            <div
                                className="bg-red-200 h-[100px] flex justify-center items-center"
                                onClick={() => click(hour)}
                            >
                                <Plus />
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <div className="flex flex-row gap-4 container justify-between mx-auto p-4 bg-red-400 rounded-lg items-center">
                <div className="flex flex-row gap-4">
                    <p>
                        start:{' '}
                        {startDate
                            ? startDate.toLocaleTimeString('de-AT', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: false,
                              })
                            : 'not set'}
                    </p>
                    <ArrowRight />
                    <p>
                        end:{' '}
                        {endDate
                            ? endDate.toLocaleTimeString('de-AT', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: false,
                              })
                            : 'not set'}
                    </p>
                </div>
                {endDate && (
                    <div className="flex gap-4">
                        <button onClick={cancel} className="bg-red-200 p-2">
                            cancel
                        </button>
                        <button onClick={confirm} className="bg-red-200 p-2">
                            confirm
                        </button>
                    </div>
                )}
            </div>
            <div className="container mx-auto p-4 bg-red-400 rounded-lg">
                you are currently assigning for{' '}
                <span className="underline">{assigner?.name || 'not set'}</span>
            </div>
        </div>
    );
}
