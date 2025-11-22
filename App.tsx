import React, { useState } from 'react';
import { AnnoyingLogin } from './components/AnnoyingLogin';
import { RegistrationSuccess } from './components/RegistrationSuccess';
import { AppState } from './types';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.LOGIN_FORM);

    const handleLoginSuccess = () => {
        setAppState(AppState.DASHBOARD);
    };

    const handleReset = () => {
        setAppState(AppState.LOGIN_FORM);
    };

    return (
        <div className="min-h-screen">
            {appState === AppState.DASHBOARD ? (
                <RegistrationSuccess onReset={handleReset} />
            ) : (
                <AnnoyingLogin onSuccess={handleLoginSuccess} />
            )}
        </div>
    );
};

export default App;