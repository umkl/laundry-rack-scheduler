import { pb } from '../lib/pocketbase';

export default async function readUsers(): Promise<User[]> {
    const users = (await pb.collection('users').getFullList()).map((x) => ({
        id: x.id,
        name: x.name,
    }));

    return users;
}
