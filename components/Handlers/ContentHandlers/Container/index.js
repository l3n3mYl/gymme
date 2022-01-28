import React from 'react'
import { bool, node, oneOf, string } from 'prop-types'
import classNames from 'classnames'
import Element from '../../Element'

import styles from './Container.module.scss'

export const sizes = [
  'small',
  'medium',
  'mediumLarge',
  'large',
  'wide',
  'spacious',
  'full'
]

const Container = ({
  as,
  center,
  children,
  className,
  gutter,
  noClearfix,
  size,
  spacious,
  hideOverFlow,
  ...other
}) => (
  <Element
    as={as}
    className={classNames(
      styles.Container,
      center && styles.center,
      gutter && styles.gutter,
      noClearfix && styles.noClearfix,
      size && styles[size],
      spacious && styles.spacious,
      hideOverFlow && styles.hideOverflow,
      className
    )}
    {...other}
  >
    {children}
  </Element>
)

Container.propTypes = {
  as: string,
  center: bool,
  children: node.isRequired,
  className: string,
  gutter: bool,
  noClearfix: bool,
  size: oneOf(sizes),
  spacious: bool,
  hideOverFlow: bool
}

export default Container
