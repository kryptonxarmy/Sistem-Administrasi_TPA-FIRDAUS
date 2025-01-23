// components/RichTextEditor.jsx
"use client"
import { useRef, useEffect } from 'react';
import DynamicBundledEditor from './DynamicBundledEditor';

export default function RichTextEditor({ value, onEditorChange, disabled = false }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.getContent()) {
      editorRef.current.setContent(value || '');
    }
  }, [value]);

  return (
    <DynamicBundledEditor
      onInit={(evt, editor) => {
        editorRef.current = editor;
        if (value) {
          editor.setContent(value);
        }
      }}
      value={value}
      onEditorChange={onEditorChange}
      disabled={disabled}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
          'searchreplace', 'table', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  );
}