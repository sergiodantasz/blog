'use client';

import dynamic from 'next/dynamic';

import { useEffect, useId, useRef, useState } from 'react';

import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { useTheme } from '@/hooks/use-theme';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type MarkdownEditorProps = {
  name: string;
  disabled?: boolean;
  defaultValue?: string;
};

export function MarkdownEditor({ name, disabled = false, defaultValue }: MarkdownEditorProps) {
  const { resolvedTheme } = useTheme();
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    wrapperRef.current?.setAttribute('data-color-mode', resolvedTheme);
  }, [resolvedTheme]);
  return (
    <div
      ref={wrapperRef}
      data-disabled={disabled}
    >
      <MDEditor
        value={value}
        onChange={setValue}
        height={400}
        textareaProps={{
          id,
          name,
          disabled,
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[remarkGfm]],
        }}
      />
    </div>
  );
}
