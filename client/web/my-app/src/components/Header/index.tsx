import { Link } from 'react-router-dom';

function Header(): JSX.Element {
  return (
    <div className="w-full p-2 bg-slate-300">
      <ul className="flex justify-end">
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
