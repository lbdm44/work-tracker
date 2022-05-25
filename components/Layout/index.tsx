import type React from 'react';
import type { PropsWithChildren } from '../../types';
import Header from './Header';

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
