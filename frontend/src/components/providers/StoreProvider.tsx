'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import React, { useEffect } from 'react';
import { fetchProfile } from '@/store/slices/authSlice';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch(fetchProfile());
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
