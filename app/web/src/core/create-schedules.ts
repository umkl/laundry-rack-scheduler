import { pb } from '../lib/pocketbase';

export async function createSchedule(schedule: {
    start: Date;
    end: Date;
    assigner: string;
}) {
    await pb.collection('schedules').create({
        start: schedule.start,
        end: schedule.end,
        assigner: schedule.assigner,
    });
}
