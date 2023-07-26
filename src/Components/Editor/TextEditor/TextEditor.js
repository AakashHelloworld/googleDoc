import React, {useState,useCallback} from 'react'
import { createEditor, Editor,   useState } from 'slate'
import { Slate, withReact, Editable } from 'slate-react'
import Tools from '../Tools'
import {initialValue, MarkActive, Leaf, CodeElement, DefaultElement} from "./index"
export default function TextEditor(){

  const [editor] = useState(() => withReact(createEditor()))
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <div>
      <Tools Editor={Editor} editor={editor} MarkActive={MarkActive} />
      <Slate editor={editor} initialValue={initialValue} >
      <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          autoFocus
         />
      </Slate>
    </div>
  )
}
