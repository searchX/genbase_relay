import 'src/global.css';

import {useScrollToTop} from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import {UserProvider} from './context/UserContext';

// ----------------------------------------------------------------------

export default function App() {
    useScrollToTop();

    return (
        <UserProvider>
            <ThemeProvider>
                <Router/>
            </ThemeProvider>
        </UserProvider>
    );
}
