import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Icon } from '@iconify/react'
import { readingBlockTypes } from '../data/readingBlockTypes'
import { LogBlockNode } from '../editor/logBlockNode'

function createInitialContent(log) {
  if (log?.contentJson) {
    return log.contentJson
  }

  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: log?.body ? [{ type: 'text', text: log.body }] : [],
      },
    ],
  }
}

function BookLogEditor({ log, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
      }),
      LogBlockNode,
    ],
    content: createInitialContent(log),
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
    onUpdate({ editor }) {
      onChange({
        body: editor.getText(),
        contentJson: editor.getJSON(),
      })
    },
  })

  const handleInsertBlock = (type) => {
    editor?.chain().focus().insertLogBlock(type).run()
  }

  return (
    <>
      <EditorContent editor={editor} />

      <div className="block-picker">
        {readingBlockTypes.map((blockType) => (
          <button
            type="button"
            key={blockType.type}
            onClick={() => handleInsertBlock(blockType.type)}
          >
            <Icon icon={blockType.icon} width="18" height="18" />
            <span className="sr-only">{blockType.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export default BookLogEditor
