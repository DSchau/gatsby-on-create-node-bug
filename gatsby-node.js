const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const crypto = require(`crypto`);

const createContentDigest = obj =>
  crypto
    .createHash(`md5`)
    .update(obj)
    .digest(`hex`);

// Store code snippets in GraphQL for the home page examples.
// Snippets will be matched with markdown templates of the same name.
exports.onCreateNode = async ({actions, node, loadNodeContent}) => {
  const {createNode} = actions;
  const {absolutePath, ext, name, relativeDirectory, sourceInstanceName} = node;

  if (
    sourceInstanceName === 'content' &&
    ext === '.js'
  ) {
    const code = await loadNodeContent(node);
    createNode({
      id: name,
      children: [],
      parent: 'EXAMPLES',
      code,
      mdAbsolutePath: absolutePath.replace(/\.js$/, '.md'),
      internal: {
        type: 'ExampleCode',
        contentDigest: createContentDigest(JSON.stringify(code)),
      },
    });
  }
};
