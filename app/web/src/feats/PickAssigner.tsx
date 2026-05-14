import { useContext } from 'react';
import { CalendarContext } from '../context/calendar';
import { UsersContext } from '../context/users';
import { getRandomColorHex } from '../lib/random-color';

export default function PickAssigner() {
    const { setAssigner, assigner } = useContext(CalendarContext);
    const { users } = useContext(UsersContext);

    if (assigner) return null;

    return (
        <div className="absolute bg-black/50 w-full h-screen flex justify-center items-center">
            <div className=" bg-red-200 w-fit">
                <h1 className="text-center mt-4">pick</h1>
                <div className="flex flex-row gap-4 m-4">
                    {users &&
                        users.map((user) => {
                            return (
                                <button
                                    className="p-4"
                                    style={{
                                        backgroundColor: getRandomColorHex(),
                                    }}
                                    onClick={() => {
                                        setAssigner(user);
                                        localStorage.setItem('user', user.id);
                                    }}
                                >
                                    {user.name}
                                </button>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
