import React from 'react';
import Header from '../components/Header';

function HomeLayout({ children }: any): JSX.Element {
  return (
    <React.Fragment>
      <Header />
      <div className="container mx-auto">{children}</div>
    </React.Fragment>
  );
}

export default HomeLayout;
