export const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]
export const MarkActive = {
    bold:{
      active: false
    },
    italic:{
      active: false
    },
    underline:{
      active: false
    },
    Inline_left:{
        active:false
    },
    Inline_Right:{
      active:false
    },
    Inline_center:{
      active: false
    }
  }
export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  return <span {...attributes}>{children}</span>
}


export const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

export const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}