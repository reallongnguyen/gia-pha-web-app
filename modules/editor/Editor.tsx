'use client';

import { MutableRefObject, useEffect, useMemo } from 'react';
import YooptaEditor, { createYooptaEditor } from '@yoopta/editor';
import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import Accordion from '@yoopta/accordion';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';
import Code from '@yoopta/code';
import ActionMenuList, {
  DefaultActionMenuRender,
} from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import parsers from '@yoopta/exports';

const plugins: any[] = [
  Paragraph,
  Accordion,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Code,
  Link,
  Embed,
  Image.extend({
    options: {
      async onUpload(file) {
        console.log(file);

        return {
          src: 'https://isling.me/a.png',
          alt: 'isling',
          sizes: {
            width: 240,
            height: 240,
          },
        };
      },
    },
  }),
  Video,
  File.extend({
    options: {
      onUpload: async (file) => {
        return { src: 'https://isling.me/a.png' };
      },
    },
  }),
];

const TOOLS = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

function Editor({
  parentRef,
}: {
  parentRef?:
    | false
    | HTMLElement
    | MutableRefObject<HTMLElement | null>
    | undefined;
}) {
  const editor = useMemo(() => createYooptaEditor(), []);

  useEffect(() => {
    function handleChange(value: any) {
      console.log('value', value);
      console.log('save to db', editor.getEditorValue());
      console.log('raw text', parsers.plainText.serialize(editor, value));
    }

    editor.on('change', handleChange);

    return () => {
      editor.off('change', handleChange);
    };
  }, [editor]);

  return (
    <YooptaEditor
      editor={editor}
      plugins={plugins}
      tools={TOOLS}
      marks={MARKS}
      selectionBoxRoot={parentRef}
      autoFocus
      width='100%'
    />
  );
}

export default Editor;
