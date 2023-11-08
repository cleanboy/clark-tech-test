import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config";

import Router from './src/screens/Router';

export default function App() {
    return (
        <GluestackUIProvider config={config}>
            <Router />    
        </GluestackUIProvider>
    );
}