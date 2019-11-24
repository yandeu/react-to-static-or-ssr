import jsYaml from 'js-yaml'

const useParseMarkdown = file => {
  let res: { yaml: any; markdown: string } = { yaml: {}, markdown: '' }

  if (typeof file !== 'undefined') {
    const regex = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)(.*)/s
    const parts = regex.exec(file.trim())
    if (parts) {
      res.yaml = jsYaml.safeLoad(parts[1])
      res.markdown = parts[2]
    }
  }

  return res
}

export default useParseMarkdown
