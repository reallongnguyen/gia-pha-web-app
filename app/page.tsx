'use client';

import { SearchInput } from '@/components/organisms/search-input/SearchInput';
import { useSearchWord } from '@/modules/dictionary/hooks/useSearchWord';
import { useWordSuggestion } from '@/modules/dictionary/hooks/useWordSuggestion';
import { NavBar, TabBar } from 'antd-mobile';
import { AppOutline, UserOutline, BellOutline } from 'antd-mobile-icons';
import Image from 'next/image';
import { useCallback, useState } from 'react';

const tabs = [
  {
    key: 'home',
    title: 'Trang chủ',
    icon: <AppOutline />,
  },
  {
    key: 'personalCenter',
    title: 'Người dùng',
    icon: <UserOutline />,
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const suggestWords = useWordSuggestion(searchTerm);
  const { word, isNotFound } = useSearchWord(searchWord);

  const search = useCallback(
    (keyword?: string) => {
      setSearchWord(keyword || searchTerm);
    },
    [searchTerm]
  );

  return (
    <main>
      <div className='fixed top-0 w-full backdrop-blur-2xl bg-brand z-50 border-b border-back-ground'>
        <NavBar
          back={null}
          className='lg:w-[780px] lg:mx-auto'
          left={
            <div className='flex items-center space-x-2'>
              <Image
                className='filter-white'
                src='/gpt-dict.png'
                width={40}
                height={24}
                alt='GPT Dict'
              />
              <div className='text-gray-100 text-base font-semibold font-mono'>
                GPT Dict
              </div>
            </div>
          }
          right={
            <div className='flex justify-end space-x-2 text-2xl'>
              <BellOutline className='text-white/40' />
            </div>
          }
        />
      </div>
      <div className='h-[45px]' />
      <div className='mt-4 px-4 lg:px-0 lg:w-[780px] lg:mx-auto lg:mt-6'>
        <SearchInput
          placeholder='日本、にほん、ニホン'
          search={search}
          onTextChange={setSearchTerm}
          value={searchTerm}
          suggestions={suggestWords}
          renderSuggestion={(suggestion) => <div>{suggestion.word}</div>}
          suggestionToSearchTerm={(suggestion) => suggestion.word}
        />
      </div>
      {word && (
        <div className='bg-back-ground-light mt-4 mx-4 p-6 space-y-4 rounded-xl lg:w-[780px] lg:mx-auto lg:mt-6'>
          <div className='text-xl font-semibold text-brand'>{word.lexeme}</div>
          <div className='text-base'>Hiragana: {word.hiragana}</div>
          <div className='text-base'>Hán Việt: {word.hanviet || '-'}</div>
          {word.meaning.map((mean) => (
            <div key={mean.meaning} className='space-y-4'>
              <div className='text-base'>Ý nghĩa: {mean.meaning}</div>
              <div className='text-base'>Giải thích: {mean.explainations}</div>
              <div className='text-base'>
                {mean.example &&
                  mean.example
                    .split('\n')
                    .map((line, idx) => <div key={line + idx}>{line}</div>)}
              </div>
            </div>
          ))}
        </div>
      )}
      {searchTerm === searchWord && isNotFound && (
        <div className='mt-4 mx-4 p-6 space-y-4 rounded-xl text-base lg:w-[780px] lg:mx-auto lg:mt-6'>
          Không có kết quả cho từ{' '}
          <span className='text-brand font-semibold'>{searchWord}</span>
        </div>
      )}
      <div className='h-16' />
      <div className='lg:hidden block h-[49px]' />
      <div className='hidden fixed bottom-0 w-full backdrop-blur-2xl bg-white z-50 border-t border-back-ground'>
        <TabBar>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </main>
  );
}
