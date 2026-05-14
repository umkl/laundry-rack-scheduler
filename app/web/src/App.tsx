import './App.css';
import Calendar from './feats/Calendar';

function App() {
    return (
        <div className="h-screen relative flex flex-col">
            <div className="bg-blue-200 p-4">
                <h1 className="text-3xl font-bold text-center">
                    laundry-rack-scheduler
                </h1>
                <p className="text-center">MIKS, TOPS, LUKI</p>
            </div>
            <Calendar />
        </div>
    );
}

export default App;
