import React, { createContext, useContext, useState } from 'react';
import { IAppContext } from '../interfaces/IAppContext';

const AppContext = createContext<IAppContext>({
  user: null,
  setUser: Function
});

export function useAppContext(): IAppContext {
  return useContext(AppContext);
}

export default function AppProvider({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [user, setUser] = useState(null);

  const value = { user, setUser };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
