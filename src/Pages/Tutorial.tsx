import React, { useEffect } from 'react'
import ParseMarkdown from '../Components/ParseMarkdown/ParseMarkdown'
import { clientStore, serverStore, withStore } from '../store/store'
import { fetchPage } from '../store/actions'
import Hero from '../Components/Hero/Hero'
import useParseMarkdown from '../Components/ParseMarkdown/useParseMarkdown'

const loadData = ({ url, origin }) => {
  return serverStore.dispatch(fetchPage(`${origin}/markdown${url}.md`))
}

const Tutorial = props => {
  const id = props.match?.params?.id
  const store = clientStore()
  const parsed = useParseMarkdown(store.state.page)
  const { yaml, markdown: md } = parsed

  useEffect(() => {
    store.dispatch(fetchPage(`/markdown/tutorials/${id}.md`))
  }, [id])

  return (
    <div>
      <Hero title={yaml.title} subtitle={yaml.description} />
      <section>
        <div className="container">
          <div style={{ paddingBottom: 32 }}>
            Author: <a href={yaml.author?.website}>{yaml.author?.name}</a>
          </div>
          <ParseMarkdown markdown={md} />
        </div>
      </section>
    </div>
  )
}
export default withStore(Tutorial, { loadData })
