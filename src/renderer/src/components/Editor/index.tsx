import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { parse } from 'path'

export interface onContentUpdatedParams {
  title: string
  content: string
}
interface EditorProps {
  content: string
  onContentUpdated: (params: onContentUpdatedParams) => void
}

export function Editor({ content, onContentUpdated }: EditorProps) {
  const editor = useEditor({
    extensions: [
      Document.extend({
        content: 'heading block*',
      }),
      StarterKit.configure({
        document: false,
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Untitled',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
    ],
    onUpdate: ({ editor }) => {
      const regex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/

      const parsedContent = editor.getHTML().match(regex)?.groups

      const title = parsedContent?.title ?? 'Untitled'
      const content = parsedContent?.content ?? ''
      console.log(parsedContent)
      console.log(editor.getHTML())
      onContentUpdated({
        title,
        content,
        //@ts-ignore
        editorJSON: editor.getJSON(),
      })
    },
    content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
      },
    },
  })
  return <EditorContent className="w-[65ch]" editor={editor} />
}
