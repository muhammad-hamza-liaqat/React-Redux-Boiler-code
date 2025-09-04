import { Provider } from 'react-redux';
import { store } from '../store/index.js';
import { AxiosProvider } from './index.js';

export const ReduxProvider = ({ children }) => {
    return (
        <Provider store={store}>
            <AxiosProvider>
                {children}
            </AxiosProvider>
        </Provider>
    );
}; 