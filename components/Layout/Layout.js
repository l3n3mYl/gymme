import React from 'react'
import styles from './Layout.module.scss'
import Navbar from '../Navbar'
import { node, array, string } from 'prop-types'
import Footer from '../Layouts/Footer'

const Layout = ({ children, title }) => {
  
  return (
    <div className={styles.Content}>
      <Navbar title={title} />
      {children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: node,
  title: string.isRequired
}

export default Layout
