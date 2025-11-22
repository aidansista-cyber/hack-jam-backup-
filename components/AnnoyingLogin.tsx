import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { AppState } from '../types';

interface Props {
    onSuccess: () => void;
}

export const AnnoyingLogin: React.FC<Props> = ({ onSuccess }) => {
    const [step, setStep] = useState<'form' | 'captcha' | 'rolematch'>('form');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    
    // Step 2 State
    const [captchaSelected, setCaptchaSelected] = useState<number | null>(null);
    const [captchaAttempts, setCaptchaAttempts] = useState(0);
    
    // Step 3 State
    const [roleSelected, setRoleSelected] = useState<number | null>(null);

    // Requirements MUST be alphabetically ordered as requested
    const requirements = [
        { id: 'req1', label: "A special character must be included ($%#@!)", check: (p: string) => /[$%#@!]/.test(p) },
        { id: 'req2', label: "Be at least 8 characters long", check: (p: string) => p.length >= 8 },
        { id: 'req3', label: "Contains the letter 'z' (lowercase)", check: (p: string) => p.includes('z') },
        { id: 'req4', label: "Does NOT contain the word 'bulls'", check: (p: string) => !p.toLowerCase().includes('bulls') },
        { id: 'req5', label: "Ends with a number", check: (p: string) => /\d$/.test(p) },
        { id: 'req6', label: "NetID characters must be in alphabetical order", check: (_: string) => {
            if (!username) return false;
            const clean = username.toLowerCase();
            return clean === clean.split('').sort().join('');
        }},
    ];

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = [];
        if (username.length < 3) newErrors.push("NetID is too short.");
        
        const failingReqs = requirements.filter(r => !r.check(password));
        if (failingReqs.length > 0) {
            newErrors.push("Credentials do not meet the strict registrar criteria.");
        }

        setErrors(newErrors);

        if (newErrors.length === 0) {
            setStep('captcha');
        }
    };

    const handleCaptchaSubmit = () => {
        if (captchaSelected === null) return;
        // Annoying logic: First attempt always fails. Second attempt succeeds regardless of choice.
        if (captchaAttempts === 0) {
            setErrors(["WRONG! That image clearly doesn't smell like tuition fees. Try again."]);
            setCaptchaAttempts(1);
            setCaptchaSelected(null);
        } else {
            setErrors([]);
            setStep('rolematch');
        }
    };

    const handleRoleSubmit = () => {
        if (roleSelected === null) return;
        // Randomly decide if they are right (50/50) to be annoying, but let them pass eventually
        const isSuccess = Math.random() > 0.3; 
        
        if (isSuccess) {
            onSuccess();
        } else {
            setErrors(["Error: That is NOT where you get guaranteed food poisoning. Try again."]);
            // Reset to force re-selection
            setRoleSelected(null);
        }
    };

    if (step === 'form') {
        return (
            <div className="min-h-screen bg-green-900 flex items-center justify-center p-4 comic-sans">
                <div className="bg-white p-8 rounded-3xl shadow-[10px_10px_0px_0px_#e5c511] border-4 border-[#e5c511] max-w-md w-full transform rotate-1">
                    <div className="text-center mb-6">
                         <span className="text-6xl">🐂</span>
                         <h1 className="text-4xl font-bold text-green-900 mt-2 animate-bounce">USF REGISTRATION</h1>
                         <p className="text-sm font-bold text-[#e5c511] uppercase tracking-widest">Secure Login Portal</p>
                    </div>
                    
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="group">
                            <label className="block text-xl font-bold mb-2 text-green-900 transform -rotate-2 group-hover:rotate-2 transition-transform">NetID / User Name</label>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border-4 border-green-700 p-3 rounded-xl focus:border-[#e5c511] focus:ring-4 focus:ring-[#e5c511]/50 outline-none text-lg font-mono text-green-900 bg-gray-50"
                                placeholder="RockyTheBull..."
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xl font-bold mb-2 text-green-900 transform rotate-1 group-hover:-rotate-1 transition-transform">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-4 border-green-700 p-3 rounded-xl focus:border-[#e5c511] focus:ring-4 focus:ring-[#e5c511]/50 outline-none text-lg text-green-900 bg-gray-50"
                            />
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border-2 border-dashed border-green-600">
                            <h3 className="font-bold text-sm uppercase mb-2 text-green-800 underline">Registrar Requirements:</h3>
                            <ul className="space-y-1">
                                {requirements.map((req) => (
                                    <li key={req.id} className={`text-sm flex items-center gap-2 font-medium ${req.check(password) ? 'text-green-700 font-bold line-through decoration-[#e5c511] decoration-2' : 'text-red-500'}`}>
                                        <span>{req.check(password) ? '✅' : '❌'}</span>
                                        {req.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {errors.length > 0 && (
                            <div className="bg-red-100 border-l-8 border-red-600 p-4 text-red-800 font-bold animate-pulse">
                                {errors.map(e => <p key={e}>{e}</p>)}
                            </div>
                        )}

                        <Button type="submit" variant="annoying" className="w-full text-2xl py-4 shake-hover">
                            ENTER OASIS !!!
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    if (step === 'captcha') {
        return (
            <div className="min-h-screen bg-[#e5c511] flex items-center justify-center p-4 comic-sans">
                <div className="bg-white p-8 rounded-full shadow-2xl border-8 border-green-900 max-w-2xl w-full text-center">
                    <h2 className="text-3xl font-black mb-4 text-green-900">Academic Verify 1 of 2</h2>
                    <p className="text-xl mb-8 font-bold text-green-800">Please select the image that <span className="text-[#e5c511] underline decoration-wavy bg-green-900 px-2">smells like tuition fees</span>.</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {['https://assets-prd.ignimgs.com/2023/01/13/screen-05-end-1673643056539.png', 'https://i.redd.it/5j5iqu6n2kc61.png', 'https://images4.alphacoders.com/628/628354.jpg', 'https://i.redd.it/7swsw43wjguy.jpg'].map((id, _idx) => (
                            <div 
                                key={id}
                                onClick={() => setCaptchaSelected(_idx)}
                                className={`cursor-pointer overflow-hidden rounded-xl border-4 transition-all transform hover:scale-105 ${captchaSelected === _idx ? 'border-green-500 ring-4 ring-[#e5c511] scale-95' : 'border-transparent hover:border-[#e5c511]'}`}
                            >
                                <img src={`${id}`} alt="Random" className="w-full h-32 object-cover" />
                            </div>
                        ))}
                    </div>

                    {errors.length > 0 && (
                        <div className="mb-6 text-white font-black text-xl bg-red-500 p-2 rounded inline-block border-2 border-red-700">
                            {errors[0]}
                        </div>
                    )}

                    <Button onClick={handleCaptchaSubmit} variant="annoying" className="w-full text-xl">
                        CONFIRM ENROLLMENT
                    </Button>
                </div>
            </div>
        );
    }

    if (step === 'rolematch') {
         return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4 comic-sans border-8 border-green-900">
                <div className="bg-green-50 p-6 rounded-lg shadow-[20px_20px_0px_0px_#064e3b] border-4 border-green-900 max-w-3xl w-full text-center">
                    <h2 className="text-3xl font-black mb-2 text-green-900">Student Verification 2 of 2</h2>
                    <p className="text-lg mb-6 text-green-800">Select the Best Worst Option.</p>
                    
                    <div className="bg-[#e5c511]/20 p-4 mb-8 rounded-xl border-2 border-[#e5c511] inline-block transform -rotate-1">
                        <h3 className="text-2xl font-bold text-green-900">"Where are you going to get food poisoning?"</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {[
                            { id: 1, img: "data:image/jpeg;base64,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", name: "The Hub" },
                            { id: 2, img: "https://preview.redd.it/nasty-patty-or-chum-burger-v0-kspnxmm8w54c1.jpg?width=258&format=pjpg&auto=webp&s=82a65873cda41ace1dea46505065a49c0813e34c", name: "Argos" },
                            { id: 3, img: "https://images.squarespace-cdn.com/content/v1/548612e5e4b02cf2865dc364/1626712669246-C1G2HSP3JUU373UVELWP/nastypatty.png?format=1000w", name: "Panda Express" }
                        ].map((person) => (
                            <div 
                                key={person.id}
                                onClick={() => setRoleSelected(person.id)}
                                className={`cursor-pointer p-4 bg-white rounded-xl border-4 transition-all ${roleSelected === person.id ? 'border-green-600 bg-green-100 transform -translate-y-2 shadow-lg' : 'border-gray-200 hover:border-[#e5c511] hover:bg-[#e5c511]/10'}`}
                            >
                                <img src={`${person.img}`} alt={person.name} className="w-32 h-32 rounded-full mx-auto mb-3 object-cover border-4 border-green-900" />
                                <p className="font-bold text-xl text-green-900">{person.name}</p>
                            </div>
                        ))}
                    </div>

                     {errors.length > 0 && (
                        <div className="mb-6 text-red-600 font-bold text-lg border-b-4 border-red-200 inline-block">
                            {errors[0]}
                        </div>
                    )}

                    <Button onClick={handleRoleSubmit} variant="annoying" className="px-12 text-xl py-3">
                        REGISTER FOR CLASSES
                    </Button>
                </div>
            </div>
        );
    }

    return null;
};