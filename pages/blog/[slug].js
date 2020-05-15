import React from 'react'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Error from '../_error'
import {Layout} from '../../components/layout/Layout'
import Seo from '../../components/pages/Seo'
import {PostLayout} from '../../components/layout/PostLayout'
import {PostHeader} from '../../components/molecules/PostHeader'
import {CustomPostLink, CustomPostImg} from '../../helpers/renders'

Page.getInitialProps = async ({pathname, query}) => {
  const {slug} = query
  const article = await getPost({slug})
  const relatedArticles = await getRelatedArticlesTo({article})

  return {pathname, article: article, relatedArticles: relatedArticles}
}
export default function Page({pathname, article}) {
  if (!article) return <Error statusCode={404} />

  const {data, content} = article

  const _article = (
    <article>
      <PostHeader
        title={data.title}
        imgSrc={data.img_src}
        createdAt={data.createdAt}
        authorName={data.author_name}
        authorImgSrc={data.author_img_src}
        author={{
          name: data.author_name,
          imgSrc: data.author_img_src
        }}
      />
      <ReactMarkdown
        source={content}
        escapeHtml={false}
        renderers={{
          link: CustomPostLink,
          image: CustomPostImg,
        }}
      />
      <style jsx global>{`
        article {
          font-size: 1.25rem;
          color: var(--grey-900);
          font-weight: 300;
          margin-bottom: 1.25rem;
          font-family: var(--ff-serif);
        }

        article h1, h2, h3, h4, h5, h6 {
          font-family: var(--ff-sans-serif) !important;
          letter-spacing: -1px;
        }
        
        article h1 {
          line-height: 1.25;
          letter-spacing: -1.75px;
        }

        article h2 {
          margin: 3rem 0 1rem;
          font-weight: 700;
          font-size: 32px;
          line-height: 1.25;
        }

        article h3,
        article h4 {
          margin-top: 3rem;
        }

        article p > img {
          max-width: 100%;
          display: block;
          margin: 0 auto;
          border-radius: 20px;
        }

        article > h2 + p {
          margin: 0.5rem 0 0 0;
        }

        article p, 
        article li {
          line-height: 1.75;
          hyphens: auto;
          font-size: 18px;
          font-weight: 400;
        }

        article p + p {
          margin: 1.75rem 0 0 0;
        }

        article > p:last-of-type {
          margin-bottom: 2rem;
        }

        article strong {
          color: black;
          font-weight: 500;
        }

        article ul,
        article ol {
          margin: 1.25rem 0 2rem 0;
          padding-left: 1.5rem;
        }

        article li {
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        article a {
          color: var(--primary-800);
        }

        article blockquote > p {
          color: black;
          font-size: 27px;
          position: relative;
          margin: 3rem 0;
          padding: 1.5rem 2rem;
          font-family: var(--ff-serif);
          font-weight: bold;
        }

        article blockquote > p:before,
        article blockquote > p:after {
          content: '"';
        }

        article hr {
          background: linear-gradient(to right,var(--primary-000),var(--primary-100));
          margin: 3rem 0;
          height: 2px;
          border: none;
          border-radius: 54px;
        }

        img > img + article h2 {
          margin-top: 2rem;
        }

        article code {
          font-size: 16px;
        }

        @media screen and (min-width: 768px) {
          article blockquote:before {
            left: -100px;
            right: -100px;
          }
        }
      `}</style>
    </article>
  )
  
  return (
    <Layout route={pathname}>
      <Seo
        title={`${article.data.title} | Elrincondevictor`}
        description={`${article.data.description}`}
        image={`/static/img/social-media/${article.data.slug}.png`}
        canonical={`https://www.elrincondevictor.com/blog/${article.data.slug}`}/>
      <div className='container-wrapper'>
        <div className='container'>
          <PostLayout main={_article} />
        </div>
      </div>
    </Layout>
  )
}

// get a blog info and parse it
async function getPost({slug}) { 
  const contentModule = await require(`../../content/${slug}.md`)
  return matter(contentModule.default)
}

async function getRelatedArticlesTo({article}) {
  const {list: articlesList} = await require(`../../content/index.json`);
  
  let similarArticles = []
  article.data.tags.forEach(tag => {
    articlesList.filter(article => {
      article.tags.includes(tag) && similarArticles.push(article)
    })
  })

  // this makes sure there are not items repeated
  return [...new Set(similarArticles)]
}