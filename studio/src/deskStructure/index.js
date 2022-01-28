import { FaEdit, FaEye, FaQuestion } from 'react-icons/fa'
import { RiCommunityFill } from 'react-icons/ri'
import { GrDocumentText } from 'react-icons/gr'
import {
  MdSettings,
  MdHome,
  MdInfoOutline,
  MdBusiness,
  MdOutlinePriceChange
} from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder'

import PagePreview from '../components/previews/pagePreview/PagePreview'

export default () =>
  S.list()
    .title('G_W_M')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('Company Info')
        .child(
          S.editor()
            .id('companyInfo')
            .schemaType('companyInfo')
            .documentId('companyInfo')
        )
        .icon(MdBusiness),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home')
                .child(
                  S.editor()
                    .id('homePage')
                    .schemaType('homePage')
                    .documentId('homePage')
                    .views([
                      S.view.form().icon(FaEdit),
                      S.view
                        .component(() => PagePreview({ slug: '/' }))
                        .icon(FaEye)
                        .title('Preview')
                    ])
                )
                .icon(MdHome),
              S.listItem()
                .title('About')
                .child(
                  S.editor()
                    .id('about')
                    .schemaType('about')
                    .documentId('about')
                    .views([
                      S.view.form().icon(FaEdit),
                      S.view
                        .component(() => PagePreview({ slug: '/' }))
                        .icon(FaEye)
                        .title('Preview')
                    ])
                )
                .icon(MdInfoOutline),
              S.listItem()
                .title('Workouts')
                .child(
                  S.editor()
                    .id('workouts')
                    .schemaType('workouts')
                    .documentId('workouts')
                    .views([
                      S.view.form().icon(FaEdit),
                      S.view
                        .component(() => PagePreview({ slug: '/' }))
                        .icon(FaEye)
                        .title('Preview')
                    ])
                )
                .icon(GrDocumentText),
              S.listItem()
                .title('Pricings')
                .child(
                  S.editor()
                    .id('pricingPage')
                    .schemaType('pricingPage')
                    .documentId('pricingPage')
                    .views([
                      S.view.form().icon(FaEdit),
                      S.view
                        .component(() => PagePreview({ slug: '/' }))
                        .icon(FaEye)
                        .title('Preview')
                    ])
                )
                .icon(MdOutlinePriceChange),
              S.listItem()
                .title('Community')
                .child(
                  S.editor()
                    .id('community')
                    .schemaType('community')
                    .documentId('community')
                    .views([
                      S.view.form().icon(FaEdit),
                      S.view
                        .component(() => PagePreview({ slug: '/' }))
                        .icon(FaEye)
                        .title('Preview')
                    ])
                )
                .icon(RiCommunityFill),
              S.listItem()
                .title('FAQ')
                .child(
                  S.editor()
                    .id('faqPage')
                    .schemaType('faqPage')
                    .documentId('faqPage')
                    .views([
                      S.view.form().icon(FaEdit),
                      S.view
                        .component(() => PagePreview({ slug: '/' }))
                        .icon(FaEye)
                        .title('Preview')
                    ])
                )
                .icon(FaQuestion)
            ])
        )
    ])
