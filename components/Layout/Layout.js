import React from 'react'
import styles from './Layout.module.scss'
import Navbar from '../Navbar'
import { node, array, string } from 'prop-types'

const Layout = ({ children, title }) => {
  
  return (
    <div className={styles.Content}>
      <Navbar title={title} />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: node,
  refs: array.isRequired,
  title: string.isRequired
}

export default Layout
