import React from 'react';

interface Props {
    onReset: () => void;
}

export const RegistrationSuccess: React.FC<Props> = ({ onReset }) => {
    return (
        <div className="min-h-screen bg-green-900 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none select-none">
                <div className="absolute top-10 left-10 text-9xl">🐂</div>
                <div className="absolute bottom-10 right-10 text-9xl">🌴</div>
                <div className="absolute top-1/2 left-1/4 text-9xl transform -rotate-45">🎓</div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_0_50px_#e5c5114d] border-8 border-[#e5c511] max-w-3xl w-full text-center relative z-10">
                
                <div className="w-24 h-24 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#e5c511] shadow-lg">
                    <span className="text-5xl text-white">✓</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-green-900 mb-2 tracking-tight">
                    REGISTRATION SUCCESSFUL
                </h1>
                <p className="text-[#e5c511] font-bold text-xl mb-8 uppercase tracking-widest">Fall Semester 2049</p>

                <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-6 mb-8 text-left">
                    <h3 className="text-green-900 font-bold text-lg mb-4 border-b-2 border-gray-200 pb-2">Registered Courses:</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-gray-700">
                            <span className="text-green-600 font-bold mt-1">CRN 40291</span>
                            <div>
                                <span className="font-bold text-green-900 block">Bulls Market Selling</span>
                                <span className="text-sm text-gray-500"> Wed 11:00 AM - 3:00 PM • MSC Lawn</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-gray-700">
                            <span className="text-green-600 font-bold mt-1">CRN 11032</span>
                            <div>
                                <span className="font-bold text-green-900 block">Electric Scooter Crashing</span>
                                <span className="text-sm text-gray-500">Tue/Thu 2:00 PM - 3:15 PM • Middle of the Sidewalk</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3 text-gray-700">
                            <span className="text-green-600 font-bold mt-1">CRN 99210</span>
                            <div>
                                <span className="font-bold text-green-900 block">Avoiding Squirrels on Campus 101</span>
                                <span className="text-sm text-gray-500">Fri 7:00 PM - 12:45 AM • Castor Beach</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        className="w-full bg-green-900 text-[#e5c511] font-bold text-xl py-4 rounded-xl hover:bg-green-800 border-4 border-[#e5c511] shadow-lg transition-transform active:scale-95 uppercase"
                        onClick={onReset}
                    >
                        Return to Login
                    </button>
                    <p className="text-xs text-gray-400 mt-4">
                        A confirmation email has been sent to your student email address. Please allow 3-5 business weeks for processing.
                    </p>
                </div>
            </div>
        </div>
    );
};