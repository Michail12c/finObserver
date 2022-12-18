import { Navigate, Outlet } from 'react-router-dom';

function RequiresAuth(): JSX.Element {
  const auth = true;
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
}

export default RequiresAuth;
