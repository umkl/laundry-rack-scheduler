import type { ListResult } from 'pocketbase';
import { pb } from '../lib/pocketbase';

export default async function readSchedules(
    date: Date
): Promise<ListResult<Schedule>> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
    const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();

    const filter = `start >= "${startOfDay}" && start <= "${endOfDay}" || end >= "${startOfDay}" && end <= "${endOfDay}"`;

    const res = await pb.collection('schedules').getList(1, 20, {
        expand: 'assigner',
        filter,
    });

    return {
        ...res,
        items: res.items.map((item) => ({
            ...(item as any as Schedule),
            assigner: item.expand!.assigner.name ?? 'unknown',
        })),
    };
}
