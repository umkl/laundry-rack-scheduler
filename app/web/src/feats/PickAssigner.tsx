import { useContext } from 'react';
import { CalendarContext } from '../context/calendar';
import { UsersContext } from '../context/users';

export default function PickAssigner() {
    const { setAssigner, assigner } = useContext(CalendarContext);
    const { users } = useContext(UsersContext);

    if (assigner) return null;

    return (
        <div className="absolute bg-black/50 w-full h-screen flex justify-center items-center">
            <div className=" bg-red-200 w-fit">
                <h1>pick assigner</h1>
                {users &&
                    users.map((user) => {
                        return (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-500 rounded"
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
    );
}
