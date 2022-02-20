import Lottie from 'react-lottie'
import React from 'react'
import styles from './Loader.module.scss'
import animationData from './animation.json'
import classNames from 'classnames'

const Loader = ({ width = 250, height = 250, className }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData
  }
  return (
    <div className={classNames(styles.Loader, className)}>
      <Lottie
        options={defaultOptions}
        height={height}
        width={width}
        isStopped={false}
        isPaused={false}
      />
    </div>
  )
}

Loader.displayName = 'Loader'

Loader.propTypes = {}

export default Loader
