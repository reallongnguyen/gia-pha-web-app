import { fetcher } from '@/modules/app/fetcher';
import useSWR from 'swr';
import { Word } from '../models/word';
import { AxiosResponse } from 'axios';

export function useSearchWord(searchTerm: string) {
  const { data, error } = useSWR<{ data: Word }, AxiosResponse>(
    searchTerm ? `/v1/words/${searchTerm}` : null,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404) return;

        // Only retry up to 3 times.
        if (retryCount >= 3) return;
      },
    }
  );

  if (error?.status === 404) {
    return { word: undefined, isNotFound: true };
  }

  return { word: data?.data, isNotFound: false };
}
