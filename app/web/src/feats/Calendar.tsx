import {
    ArrowRight,
    ArrowRightIcon,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

export default function Calendar() {
    return (
        <div className="flex flex-col flex-1 h-full bg-red-200">
            <div className="rounded-lg flex-1 bg-orange-100 p-4 flex flex-col container mx-auto">
                <div className="flex flex-row justify-between items-center w-full bg-green-400">
                    <div className="p-4 bg-red-600">
                        <ChevronLeft />
                    </div>
                    <div className="flex flex-col items-center">
                        <p>w21</p>
                        <h2 className="font-semibold">weekday</h2>
                        <p>18.05.26</p>
                    </div>
                    <div className="p-4 bg-red-600">
                        <ChevronRight />
                    </div>
                </div>
                <div className="gap-4 grid grid-cols-[200px_1fr] relative w-full mt-4 h-full">
                    <div className="bg-red-200">
                        <p>10:00</p>
                    </div>
                    <div className="bg-red-200"></div>
                </div>
            </div>
            <div className="flex flex-row gap-4 container mx-auto p-4 bg-red-400 rounded-lg">
                <p>start: 1231223</p>
                <ArrowRight />
                <p>end: 1231223</p>
            </div>
            <div className="container mx-auto p-4 bg-red-400 rounded-lg">
                currently assigning for MIKS
            </div>
        </div>
    );
}
