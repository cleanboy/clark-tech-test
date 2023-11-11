import React from 'react';

import GluestackProvider from './src/hoc/GluestackProvider';
import Router from './src/screens/Router';

export default function App() {
    return (
        <GluestackProvider>
            <Router />    
        </GluestackProvider>
    );
}