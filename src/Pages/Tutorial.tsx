import React, { useEffect } from 'react'
import { clientStore, serverStore } from '../store/store'
import { fetchPage } from '../store/actions'
import ParseMarkdown from '../Components/ParseMarkdown/ParseMarkdown'
import useParseMarkdown from '../Components/ParseMarkdown/useParseMarkdown'
import Hero from '../Components/Hero/Hero'

const Tutorial = props => {
  const id: string = props.match?.params?.id
  const store = clientStore()
  const { yaml, markdown } = useParseMarkdown(store.state.page)

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
          <ParseMarkdown markdown={markdown} />
        </div>
      </section>
    </div>
  )
}

Tutorial.prefetchData = ({ url, origin }) => {
  return serverStore.dispatch(fetchPage(`${origin}/markdown${url}.md`))
}

export default Tutorial
