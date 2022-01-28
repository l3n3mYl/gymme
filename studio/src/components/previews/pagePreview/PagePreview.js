import React from 'react'

import config from '../../../../config'

import styles from './IframePreview.css'

const { siteUrl } = config

export default function PagePreview({ slug }) {
  const url =
    process.env.NODE_ENV === 'production'
      ? `${siteUrl}${slug}?preview`
      : `http://localhost:3000${slug}?preview`

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe title={slug} src={url} frameBorder={'0'} />
      </div>
    </div>
  )
}
