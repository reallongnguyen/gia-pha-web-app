import { Button, Input, List, Popover } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import { KeyboardEventHandler, ReactNode, useRef, useState } from 'react';

export interface SearchInputProps<T> {
  autoFocus?: boolean;
  placeholder?: string;
  value?: string;
  onTextChange?: (s: string) => void;
  search?: (s?: string) => void;
  suggestions?: T[];
  renderSuggestion?: (v: T) => ReactNode;
  suggestionToSearchTerm?: (v: T) => string;
}

export function SearchInput<T>(props: SearchInputProps<T>) {
  const {
    autoFocus,
    placeholder,
    value,
    onTextChange,
    search,
    suggestions: suggestResults,
    renderSuggestion: renderSuggest,
    suggestionToSearchTerm: suggestToSearchTerm,
  } = props;

  const [showSuggestion, setShowSuggestion] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (text: string) => {
    if (onTextChange) {
      onTextChange(text);
    }

    setShowSuggestion(true);
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      setShowSuggestion(false);

      if (search) {
        search(value);
      }
    }
  };

  const handleClickSearch = () => {
    setShowSuggestion(false);

    if (search) {
      search(value);
    }
  };

  const handleSelectSuggestion = (suggest: T) => () => {
    setShowSuggestion(false);

    if (!onTextChange || !suggestToSearchTerm) {
      return;
    }

    const word = suggestToSearchTerm(suggest);

    onTextChange(word);

    if (search) {
      search(word);
    }
  };

  return (
    <Popover
      visible={showSuggestion && suggestResults && suggestResults.length > 0}
      content={
        <div
          className='max-h-60 overflow-y-auto overflow-x-hidden'
          style={{ width: inputRef.current?.clientWidth }}
        >
          <List style={{ '--border-bottom': '0px', '--border-top': '0px' }}>
            {suggestResults &&
              suggestResults.map((suggest) => (
                <List.Item
                  key={JSON.stringify(suggest)}
                  onClick={handleSelectSuggestion(suggest)}
                  arrowIcon={false}
                >
                  {renderSuggest && renderSuggest(suggest)}
                  {!renderSuggest && JSON.stringify(suggest)}
                </List.Item>
              ))}
          </List>
        </div>
      }
      style={{ '--arrow-size': '0px' }}
    >
      <div
        className='bg-back-ground-light h-12 pl-6 pr-3 border border-brand/80 flex items-center rounded-xl md:rounded-full'
        ref={inputRef}
      >
        <Input
          autoFocus={autoFocus}
          className='h-full'
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <Button
          type='button'
          fill='none'
          size='small'
          shape='rounded'
          disabled={value === ''}
          onClick={handleClickSearch}
        >
          <SearchOutline className='text-2xl text-brand' />
        </Button>
      </div>
    </Popover>
  );
}
