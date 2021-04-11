exports.createPages = async({
    actions,
    graphql,
    reporter
}) => {
    const result = await graphql(`
        {
            allWpPost {
                nodes {
                    __typename
                    databaseId
                    id
                    uri
                }
            }
        }
    `);

    console.log(result);

    if (result.errors) {
        reporter.error('Error fetching data', result.errors);
    }

    const { allWpPost } = result.data;

    let wpPostTemplate = require.resolve(`./src/templates/WpPost.js`);

    allWpPost.nodes.map( post => {
        actions.createPage({
            path: post.uri,
            component: wpPostTemplate,
            context: post
        })
    })
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    if (stage.startsWith("develop")) {
      actions.setWebpackConfig({
        resolve: {
          alias: {
            "react-dom": "@hot-loader/react-dom",
          },
        },
      })
    }
  }

exports.createResolvers = ({
    actions,
    cache,
    createNodeId,
    createResolvers,
    store,
    reporter,
}) => {
    const { createNode } = actions
    createResolvers({
        StrapiPageContentArticleGallery: {
            imageFile: {
                type: `File`,
                resolve(source, args, context, info) {
                    return createRemoteFileNode({
                        url: `${source.url}`, // for S3 upload. For local: `http://localhost:1337${source.url}`,
                        store,
                        cache,
                        createNode,
                        createNodeId,
                        reporter,
                    })
                },
            },
        },
    })
}