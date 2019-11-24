import React from 'react'
import Marked from 'marked'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

const ParseMarkdown = ({ markdown }) => {
  const html = Marked(markdown)
  const jsx = parse(html, {
    replace: domNode => {
      if (domNode.attribs && domNode.name === 'a') {
        return <Link to={domNode.attribs.href}>{domNode.children?.[0].data}</Link>
      }
    }
  })

  return jsx as JSX.Element
}

export default ParseMarkdown
