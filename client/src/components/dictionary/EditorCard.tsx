import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bold,
  Italic,
  Quote,
  Code,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Copy,
  Printer,
  Eye,
  Eraser,
} from 'lucide-react';
import { cn, escapeHtml } from '@/lib/utils';
import { toast } from 'sonner';

interface EditorCardProps {
  content: string;
  onChange: (value: string) => void;
}

function renderMarkdown(text: string): string {
  const safe = escapeHtml(text);
  return safe
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-navy mt-3 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-navy mt-4 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-extrabold text-navy mt-5 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-navy/70">$1</em>')
    .replace(/_(.+?)_/g, '<span class="text-navy/60 italic">$1</span>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 rounded-lg bg-cream-200 text-orange-600 text-sm font-mono">$1</code>')
    .replace(/^(\d+)\. (.+)$/gm, '<div class="flex gap-2 my-1"><span class="text-orange-500 font-semibold shrink-0">$1.</span><span>$2</span></div>')
    .replace(/^- (.+)$/gm, '<div class="flex gap-2 my-1"><span class="text-orange-500 shrink-0">•</span><span>$1</span></div>')
    .replace(/^_(.+)_$/gm, '<p class="text-navy/50 italic text-sm mt-1">$1</p>')
    .replace(/\n\n/g, '<br/>')
    .replace(/\n/g, '<br/>');
}

const toolbarButtons = [
  { icon: Bold, action: 'bold', label: 'Bold' },
  { icon: Italic, action: 'italic', label: 'Italic' },
  { icon: Quote, action: 'quote', label: 'Quote' },
  { icon: Code, action: 'code', label: 'Code' },
  { icon: List, action: 'ul', label: 'Bullet List' },
  { icon: ListOrdered, action: 'ol', label: 'Number List' },
  { icon: Heading1, action: 'h1', label: 'H1' },
  { icon: Heading2, action: 'h2', label: 'H2' },
  { icon: Heading3, action: 'h3', label: 'H3' },
  { icon: Copy, action: 'copy', label: 'Copy' },
  { icon: Printer, action: 'print', label: 'Print' },
  { icon: Eye, action: 'toggle', label: 'Preview / Edit' },
  { icon: Eraser, action: 'clear', label: 'Clear' },
];

type Mode = 'edit' | 'preview';

export function EditorCard({ content, onChange }: EditorCardProps) {
  const [activeToolbar, setActiveToolbar] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>(content ? 'preview' : 'edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevContentRef = useRef(content);

  useEffect(() => {
    const prev = prevContentRef.current;
    prevContentRef.current = content;
    if (!prev && content) setMode('preview');
  }, [content]);

  const switchToEdit = useCallback(() => {
    setMode('edit');
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, []);

  const handleToolbar = useCallback(
    (action: string) => {
      setActiveToolbar(action);
      setTimeout(() => setActiveToolbar(null), 300);

      if (action === 'toggle') {
        setMode((m) => (m === 'edit' ? 'preview' : 'edit'));
        return;
      }

      if (action === 'clear') {
        onChange('');
        setMode('edit');
        requestAnimationFrame(() => textareaRef.current?.focus());
        return;
      }

      if (action === 'copy') {
        navigator.clipboard.writeText(content).then(() => toast.success('Copied to clipboard'));
        return;
      }

      if (action === 'print') {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`<html><head><title>Dictionary Definition</title><style>body{font-family:system-ui;max-width:700px;margin:40px auto;padding:20px;line-height:1.7;color:#14213D;}h1,h2,h3{margin-top:16px;}</style></head><body>${renderMarkdown(content)}</body></html>`);
          printWindow.document.close();
          printWindow.print();
        }
        return;
      }

      const ta = textareaRef.current;
      if (!ta) {
        switchToEdit();
        return;
      }

      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = content.substring(start, end);

      const wrappers: Record<string, { prefix: string; suffix: string }> = {
        bold: { prefix: '**', suffix: '**' },
        italic: { prefix: '*', suffix: '*' },
        quote: { prefix: '> ', suffix: '' },
        code: { prefix: '`', suffix: '`' },
        ul: { prefix: '- ', suffix: '' },
        ol: { prefix: '1. ', suffix: '' },
        h1: { prefix: '# ', suffix: '' },
        h2: { prefix: '## ', suffix: '' },
        h3: { prefix: '### ', suffix: '' },
      };

      const w = wrappers[action];
      if (!w) return;

      const newText = content.substring(0, start) + w.prefix + (selected || 'text') + w.suffix + content.substring(end);
      onChange(newText);
      ta.focus();
    },
    [content, onChange, switchToEdit],
  );

  return (
    <div className="card-premium overflow-hidden h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-4 py-3 border-b border-cream-400 flex-wrap">
        {toolbarButtons.map(({ icon: Icon, action, label }) => (
          <button
            key={action}
            onClick={() => handleToolbar(action)}
            title={label}
            className={cn('toolbar-btn', activeToolbar === action && 'active')}
          >
            <Icon className="h-[16px] w-[16px]" />
          </button>
        ))}
      </div>

      {/* Thin divider */}
      <div className="h-px bg-cream-300" />

      {/* Editor Area */}
      <div className="flex-1 min-h-[340px] relative">
        {mode === 'preview' && content ? (
          <div className="p-6 overflow-auto h-full max-h-[500px]">
            <div
              className="prose prose-navy max-w-none text-[15px] leading-relaxed text-navy"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Your AI generated definition will appear here..."
            className="w-full h-full min-h-[340px] p-6 bg-transparent text-[15px] leading-relaxed text-navy placeholder:text-cream-500 resize-none focus:outline-none"
          />
        )}
      </div>
    </div>
  );
}
