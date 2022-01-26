import React from 'react'
import Navbar from '../Navbar'
import { node, string } from 'prop-types'
import Footer from '../Layouts/Footer'

const Layout = ({ children, title }) => {
  
  return (
    <div>
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
