import {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import App from './app';
import {store} from './redux/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HelmetProvider>
        <Provider store={store}>
            <HashRouter>
                <Suspense>
                    <App/>
                </Suspense>
            </HashRouter>
        </Provider>
    </HelmetProvider>,
);
