'use client';

import Editor from '@/modules/editor/Editor';
import { NavBar, TabBar } from 'antd-mobile';
import {
  AppOutline,
  UserOutline,
  CalendarOutline,
  ContentOutline,
  BellOutline,
} from 'antd-mobile-icons';

const tabs = [
  {
    key: 'home',
    title: 'Trang chủ',
    icon: <AppOutline />,
  },
  {
    key: 'events',
    title: 'Sự kiện',
    icon: <CalendarOutline />,
  },
  {
    key: 'content',
    title: 'Nội dung',
    icon: <ContentOutline />,
  },
  {
    key: 'personalCenter',
    title: 'Người dùng',
    icon: <UserOutline />,
  },
];

export default function Home() {
  return (
    <main>
      <div className='fixed top-0 w-full backdrop-blur-2xl bg-white z-50 border-b border-back-ground'>
        <NavBar
          back={null}
          left='Dòng họ Nguyễn Phúc'
          right={
            <div className='flex justify-end space-x-2 text-2xl'>
              <BellOutline className='text-gray-400' />
            </div>
          }
        />
      </div>
      <div className='h-[45px]' />
      <div className='bg-back-ground-light overflow-hidden my-2 px-2 md:my-4 md:mx-[calc((100%-720px)/2)] md:px-4 md:rounded-lg'>
        <Editor />
      </div>
      <div className='h-[49px]' />
      <div className='fixed bottom-0 w-full backdrop-blur-2xl bg-white z-50 border-t border-back-ground'>
        <TabBar>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </main>
  );
}
