"use client";
import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners';

const Layout = ({ children }) => {
  return (
    <div className="px-5">

      <Suspense fallback={<BarLoader width="100%" color="#6C47FF" />}>
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;