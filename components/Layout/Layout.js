import React from 'react'
import Navbar from '../Navbar'
import { node, string, bool } from 'prop-types'
import Footer from '../Layouts/Footer'

const Layout = ({ children, title, userLogged }) => {
  return (
    <div>
      <Navbar userLogged={userLogged} title={title} />
      {children}
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: node,
  userLogged: bool,
  title: string.isRequired
}

export default Layout
