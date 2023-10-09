import {
  Editor,
  Transforms,
  Element as SlateElement,
} from 'slate'


import {
  useSlateStatic,
  useSelected,
  useFocused,
  ReactEditor,
} from 'slate-react'

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

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}


export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}


export const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}

export const LIST_TYPES = ['numbered_list', 'bulleted_list']

export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']


export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    } 
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list_item' : format,
    }
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}


export const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block_quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted_list':
      return (
        
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading_one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading_two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'list_item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered_list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    case 'image':
      return(
         <Image attributes={attributes} children={children} element={element} />
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}


export const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}




export const isImageUrl = url => {
  if (!url) return false
  return true
}



export const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}


export const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, element)

  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        style={
          {
            position: "relative"
          }
        }
      >
        <img
          src={element.url}
          style={{
            display: "block",
            maxWidth:"100%",
            maxHeight:"20rem",
            boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`
          }}
        />
        <button
          
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          style={{
            display: ` ${selected && focused ? 'inline' : 'none'}`,
            position:"absolute",
            top:"0.5rem",
            left:"0.5rem",
            backgroundColor: "white"
          }}
        >
          <span>delete</span>
        </button>
      </div>
    </div>
  )
}