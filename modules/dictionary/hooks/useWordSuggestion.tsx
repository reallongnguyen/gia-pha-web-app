import { WordSuggestion } from '../models/word-suggestion';
import { useDebounce } from '@uidotdev/usehooks';
import useSWR from 'swr';
import { fetcher } from '@/modules/app/fetcher';

export function useWordSuggestion(searchTerm: string) {
  const debounceSearchTerm = useDebounce(searchTerm, 300);

  const { data } = useSWR<{
    data: { lexeme: string; hiragana: string; frequency_ranking: number }[];
  }>(
    debounceSearchTerm ? `/v1/word-masters?search=${debounceSearchTerm}` : null,
    fetcher
  );

  return data
    ? data.data
        .sort((a, b) => a.frequency_ranking - b.frequency_ranking)
        .map(
          (w) =>
            ({
              word: w.lexeme,
              hiragana: w.hiragana,
            } as WordSuggestion)
        )
    : [];
}
