import React from 'react'

import * as Styles from './styles'

function Result({ url, title, description, displayUrl, source }) {
  return (
    <div className="card mb-3">
      <div className="col">
        <div className="card-body">
          <small><a className="text-info" href={url}>{displayUrl}</a> - <span className="text-muted">{source}</span></small>
          <h5 className="card-title text-primary"><a href={url}>{title}</a></h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default Result