import React from 'react'
import config from '../../../../config'
import styles from './IframePreview.css'

const { siteUrl } = config

export default function PostPreview(props) {
  const { displayed } = props.document
  const slug = displayed?.slug?.current

  if (!slug) {
    return <div>The post needs a slug before it can be previewed.</div>
  }

  const url =
    process.env.Node_ENV === 'production'
      ? `${siteUrl}/blog/${slug}?preview`
      : `https://localhost:3000/blog/${slug}/?preview`

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe title={slug} src={url} frameBorder={'0'} />
      </div>
    </div>
  )
}
