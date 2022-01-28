import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.scss'
import { array, string } from 'prop-types'
import debounce from '../../lib/helpers/debounce'
import CompanyIcon from '../Handlers/Elements/CompanyIcon'
import classNames from 'classnames'

const Navbar = ({ title }) => {
  
  const [scrollState, setScrollState] = useState("top")
  const [position, setPosition] = useState('Home')

  const ids = ['Home', 'About', 'Workouts', 'Pricing', 'Community', 'FAQ']

  const handleScroll = debounce(() => {
    var scrolled = document.scrollingElement.scrollTop
    
    for(let i in ids) {
      if(200 >= document.getElementById(ids[i]).getBoundingClientRect().top) {
        setPosition(ids[i])
      }
    }
    if(scrolled >= 120) {
      if(!scrollState !== "highlight") {
        setScrollState("highlight")
      }
    } else {
      if(scrollState !== "top") {
        setScrollState("top")
      }
    }

  }, 30)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <header className={classNames(styles.Header, scrollState === 'highlight' ? styles.headerHighlight : '')}>
      <a href='#Home' className={styles.smallLogo}><CompanyIcon /></a>
      <input type="checkbox" id={styles.menuToggle} className={styles.menuToggle} />
      <nav className={scrollState === "highlight" ? styles.highlightScrollbar : ''}>
        <a href='#Home' className={styles.bigLogo}><CompanyIcon /></a>
        <ul>
          {ids.map((id, i) => {
            return <li key={`${id}_${i}`} ><a className={position == id ? styles.highlight : ''} href={`#${id}`}>{id}</a></li>
          })}
        </ul>
        <div className={styles.Buttons}>
          <button>Log In</button>
          <button>Sign Up</button>
        </div>
      </nav>
      <label htmlFor={styles.menuToggle} className={styles.label}>
        <span />
      </label>
    </header>
  )
}

Navbar.propTypes = {
  title: string.isRequired
}

export default Navbar
