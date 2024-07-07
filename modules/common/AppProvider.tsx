'use client';

import { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';

export function AppProvider({ children }: PropsWithChildren) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
