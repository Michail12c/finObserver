import { Route, Routes } from 'react-router-dom';
import Funds from '../pages/funds';

function DashboardLayout(): JSX.Element {
  const loading = false;
  return (
    <div>
      {loading ? (
        <div className="p-8 text-black text-lg flex items-center justify-center flex-col">
          A moment please...
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Funds />} />
          <Route path="assets" element={<Funds />} />
        </Routes>
      )}
    </div>
  );
}

export default DashboardLayout;
