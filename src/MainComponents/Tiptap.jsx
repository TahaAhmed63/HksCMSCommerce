// TiptapEditor.js

"use client"
import { EditorContent, useEditor } from '@tiptap/react'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const CustomTableCell = TableCell.extend({
    addAttributes() {
      return {
        // extend the existing attributes …
        ...this.parent?.(),
  
        // and add a new one …
        backgroundColor: {
          default: null,
          parseHTML: element => element.getAttribute('data-background-color'),
          renderHTML: attributes => {
            return {
              'data-background-color': attributes.backgroundColor,
              style: `background-color: ${attributes.backgroundColor}`,
            }
          },
        },
      }
    },
  })
export const tableHTML = `
  <table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
  </table>
`
const MenuBar = ({ editor }) => {
  if (!editor) return null
  
  return (
    <div className="flex flex-wrap items-center gap-2 bg-gray-100 p-2 rounded-t-md border-b border-gray-300">
      {/* Text formatting buttons */}
      <div className="flex space-x-1">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-300' : ''}`}>
          Strike
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()} className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('code') ? 'bg-gray-300' : ''}`}>
          Code
        </button>
      </div>

      {/* Clear and formatting options */}
      <div className="flex space-x-1">
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="p-2 rounded-md hover:bg-gray-200">
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()} className="p-2 rounded-md hover:bg-gray-200">
          Clear nodes
        </button>
      </div>

      {/* Heading buttons */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5, 6].map(level => (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
            className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('heading', { level }) ? 'bg-gray-300' : ''}`}
          >
            H{level}
          </button>
        ))}
      </div>

      {/* List and block options */}
      <div className="flex space-x-1">
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}>
          Bullet list
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}>
          Ordered list
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('codeBlock') ? 'bg-gray-300' : ''}`}>
          Code block
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-300' : ''}`}>
          Blockquote
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="p-2 rounded-md hover:bg-gray-200">
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()} className="p-2 rounded-md hover:bg-gray-200">
          Hard break
        </button>
      </div>

      {/* Undo/Redo buttons */}
      <div className="flex space-x-1">
        <button onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded-md hover:bg-gray-200">
          Undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded-md hover:bg-gray-200">
          Redo
        </button>
      </div>

      {/* Table controls */}
      <div className="flex space-x-1">
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="p-2 rounded-md hover:bg-gray-200">
          Insert table
        </button>
        <button onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()} className="p-2 rounded-md hover:bg-gray-200">
          Add column before
        </button>
        <button onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()} className="p-2 rounded-md hover:bg-gray-200">
          Add column after
        </button>
        <button onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()} className="p-2 rounded-md hover:bg-gray-200">
          Delete column
        </button>
        <button onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()} className="p-2 rounded-md hover:bg-gray-200">
          Add row before
        </button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()} className="p-2 rounded-md hover:bg-gray-200">
          Add row after
        </button>
        <button onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()} className="p-2 rounded-md hover:bg-gray-200">
          Delete row
        </button>
        <button onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()} className="p-2 rounded-md hover:bg-gray-200">
          Delete table
        </button>
      </div>
    </div>
  )
}

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      CustomTableCell,
      TableCell,
    ],
    editorProps: {
        attributes: {
            class: "prose p-4 border border-gray-300 rounded-b-md bg-white focus:outline-none max-w-full",
          },
    },
  })

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap
