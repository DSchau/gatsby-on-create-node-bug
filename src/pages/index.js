import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const code = data.examples.edges.reduce((lookup, { node }) => {
      lookup[node.mdAbsolutePath] = node.code;
      return lookup;
    }, {});

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        {
          data.markdown.edges.map(({ node }) => (
            <div key={node.fileAbsolutePath}>
              <h1>{node.frontmatter.title}</h1>
              <pre>{code[node.fileAbsolutePath]}</pre>
            </div>
          ))
        }
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }

    examples:allExampleCode {
      edges {
        node {
          code
          mdAbsolutePath
        }
      }
    }
    markdown:allMarkdownRemark {
      edges {
        node {
          fileAbsolutePath
          frontmatter {
            title
          }
          html
        }
      }
    }
    
  }
`
