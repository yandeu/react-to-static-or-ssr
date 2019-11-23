import React from 'react'

const NotFoundPage = props => {
  const { staticContext } = props
  if (staticContext) staticContext.status = 404

  return (
    <div>
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h1>404_PAGE</h1>
            <h3>sorry :/</h3>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotFoundPage
