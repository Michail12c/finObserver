import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Login from './pages/login';
import Registration from './pages/registration';
import NotFoundPage from './pages/notFoundPage';
import Home from './pages/home';
import RequiresAuth from './core/RequiresAuth';
import DashboardLayout from './layouts/DashboardLayout';
import AppProvider from './core/AppContext';

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route element={<RequiresAuth />}>
              <Route path="/dashboard/*" element={<DashboardLayout />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </QueryClientProvider>
      </AppProvider>
    </Router>
  );
}

export default App;
