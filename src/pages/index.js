import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import Lists from '../components/Lists'
import Projects from '../components/Projects'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import projects from '../data/projects'
import interviews from '../data/interviews'
import speaking from '../data/speaking'

import tania from '../../content/images/tania-2020.png'

export default function BlogIndex({ data, ...props }) {
  const latest = data.latest.edges
  const popular = data.popular.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedPopular = useMemo(() => getSimplifiedPosts(popular), [
    popular,
  ])

  const Section = ({ title, children, ...props }) => (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  )

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <section className="lead">
        <div className="container">
          <div className="copy">
            <h1>
              Hey! I'm Tania Rascia.
              <br /> I'm a software engineer and open-source creator.
            </h1>
            <p>
              This website is my digital garden&mdash;a compendium of the things
              I have learned and created over the years, and anything else I
              want to write about. You can read my <Link to="/blog">blog</Link>,
              view my <Link to="/guides">guides &amp; tutorials</Link>, or learn
              more <Link to="/me">about me</Link>.
            </p>
            <p className="flex">
              <a
                href="https://taniarascia.substack.com/subscribe"
                target="_blank"
                rel="noreferrer"
                className="button"
              >
                <span className="emoji">💌</span> Join Newsletter
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSd-Z3LTaSe8HsqAjnsGf3tXzAIFCTJT9JWtQTEbLpjOmc8UVA/viewform"
                target="_blank"
                rel="noreferrer"
                className="button"
              >
                Give Feedback
              </a>
            </p>
          </div>

          <div className="image">
            <img src={tania} alt="Tania" />
          </div>
        </div>
      </section>
      <div className="container">
        <Section title="Latest">
          <Posts data={simplifiedLatest} tags />
        </Section>
        <Section title="Popular">
          <Posts data={simplifiedPopular} tags />
        </Section>
        <Section title="Projects">
          <Projects data={projects} />
        </Section>
        <Section title="Interviews &amp; Podcasts" className="medium">
          <Lists data={interviews} />
        </Section>
        <Section title="Speaking" className="medium">
          <Lists data={speaking} />
        </Section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 20
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
