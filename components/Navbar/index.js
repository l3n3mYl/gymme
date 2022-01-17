import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.scss'
import { array, string } from 'prop-types'
import debounce from '../../lib/helpers/debounce'

const Navbar = ({ refs, title }) => {
  
  const [scrollState, setScrollState] = useState("top")
  const [position, setPosition] = useState('Home')

  const handleScroll = debounce(() => {
    var scrolled = document.scrollingElement.scrollTop
    
    for(let i in refs) {
      if(refs[i].current.offsetTop <= scrolled) {
        setPosition(refs[i].current.id)
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
    <header className={styles.Header}>
      <p className={styles.smallLogo}>{title}</p>
      <input type="checkbox" id={styles.menuToggle} className={styles.menuToggle} />
      <nav className={scrollState === "highlight" ? styles.highlightScrollbar : ''}>
        <p className={styles.bigLogo}>{title}</p>
        <ul>
          {
            refs.map((ref) => (
              ref.current && 
              <li key={ref.current.id} onClick={() => {ref.current.scrollIntoView()}}>
                <p className={position === ref.current.id ? styles.highlight : ''} >{ref.current.id}</p>
              </li>
            ))
          }
        </ul>
      </nav>
      <label htmlFor={styles.menuToggle} className={styles.label}>
        <span />
      </label>
    </header>
  )
}

Navbar.propTypes = {
  refs: array.isRequired,
  title: string.isRequired
}

export default Navbar
