import React from 'react'
import classNames from 'classnames'
import Type from '../Type'
import client from "../../../lib/sanity";
import styles from './styles/BlockContent.module.scss'
import SanityBlockContent from '@sanity/block-content-to-react'

const BlockContent = ({ blocks, className, ...others }) => {

  const serializers = (baseFontSize) => ({
    marks: {
      button: ({ mark, children }) => {
        return (
          children[0] && (
            <ButtonStandard
              override
              target={mark.blank && '_blank'}
              href={mark.href}
            >
              {children}
            </ButtonStandard>
          )
        )
      },
      link: ({ mark, children }) => {
        return (
          children[0] && (
            <SmartLink target={mark.blank && '_blank'} href={mark.href}>
              {children}
            </SmartLink>
          )
        )
      }
    },
    types: {
      block(props) {
        switch (props.node.style) {
          case 'display':
            return (
              <Type as="h2" size="display" padded>
                {props.children}
              </Type>
            )
          case 'h2':
            return (
              <Type as="h2" size="display" padded>
                {props.children}
              </Type>
            )
          case 'h3':
            return (
              <Type as="h3" size="titleMedium" padded>
                {props.children}
              </Type>
            )
  
          case 'h4':
            return (
              <Type as="h4" size="title" padded>
                {props.children}
              </Type>
            )
  
          case 'baseLarge':
            return (
              <Type as="p" size="baseLarge">
                {props.children}
              </Type>
            )
          case 'baseMedium':
            return (
              <Type as="p" size="baseMedium">
                {props.children}
              </Type>
            )
          case 'small':
            return (
              <Type as="p" size="small">
                {props.children}
              </Type>
            )
  
          case 'blockquote':
            return <Blockquote quoteMarks>{props.children}</Blockquote>
  
          default:
            if (props.children.length > 1 || props.children[0] !== '') {
              return (
                <Type as="p" size={baseFontSize || 'base'}>
                  {props.children}
                </Type>
              )
            } else return <br />
        }
      },
      figure(props) {
        return createFigure(props.node)
      },
      grid(props) {
        return createGrid(props.node)
      },
      video(props) {
        return createMediaComponent(props.node)
      },
      line(props) {
        return createLine(props.node)
      },
      itemGallery(props) {
        return createGallery(props.node)
      }
    }
  })

  return  <div className={classNames(styles.Content, className)}>
    <SanityBlockContent
      blocks={blocks}
      serializers={serializers()}
      {...client.config()}
      {...others}
    />
  </div>
}

export default BlockContent
