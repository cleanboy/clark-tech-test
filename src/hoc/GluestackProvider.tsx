import { GluestackUIProvider } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config";

type GluestackProviderProps = {
    children: React.ReactNode;
};

const GluestackProvider = ({ children }: GluestackProviderProps) => {
    return (
        <GluestackUIProvider config={config}>
            {children}
        </GluestackUIProvider>
    );
}

export default GluestackProvider;