import {
    Transforms,
    Element as SlateElement,
  } from 'slate'
  
  
  import {
    useSlateStatic,
    useSelected,
    useFocused,
    ReactEditor,
  } from 'slate-react'
  





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