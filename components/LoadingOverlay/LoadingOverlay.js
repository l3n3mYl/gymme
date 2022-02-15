import { bool, node } from 'prop-types'
import classNames from 'classnames'
import React from 'react'

import Loader from '../Loader'

import styles from './LoadingOverlay.module.scss'

const LoadingOverlay = ({ children, isLoading }) => {
  return (
    <aside
      className={classNames(styles.LoadingOverlay, isLoading && styles.loading)}
    >
      {isLoading && (
        <div className={styles.LoadingOverlayIndicator}>
          <Loader />
        </div>
      )}
      <div className={styles.LoadingOverlayContent}>{children}</div>
    </aside>
  )
}

LoadingOverlay.displayName = 'LoadingOverlay'

LoadingOverlay.propTypes = {
  children: node,
  isLoading: bool
}

export default LoadingOverlay
