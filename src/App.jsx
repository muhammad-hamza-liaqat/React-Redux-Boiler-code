import { AppRoutes } from './routes/index.js';
import { PageLoader } from './components/index.js';
import './App.css';

function App() {
  return (
    <PageLoader>
      <AppRoutes />
    </PageLoader>
  );
}

export default App;
