import { useState } from 'react';
import TextField from '../../components/TextField';

function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="h-screen w-full bg-green-100 flex justify-center items-center">
      <div className="flex flex-col">
        <TextField
          value={email}
          name="email"
          label="Email"
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <TextField
          value={password}
          name="password"
          label="Password"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <div className="w-full mt-4">
          <button className="w-full rounded-lg bg-green-500 text-white p-1 cursor-pointer">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
