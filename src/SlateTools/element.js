
import { Image } from "./Image"

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