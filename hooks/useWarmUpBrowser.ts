import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

// Improve browser to appear quickly
export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};