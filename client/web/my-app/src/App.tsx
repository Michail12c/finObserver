import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query';

function App(): JSX.Element {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}></QueryClientProvider>;
}

export default App;
