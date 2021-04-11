module.exports = {
  siteMetadata: {
    title: "Gatsby Conf Demo",
  },
  plugins: [
    `babel-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
        resolve: `gatsby-source-wordpress`,
        options: {
            url: `http://dangerzone.local/graphql`
        }

    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [isResettingCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        isResettingCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
    {
        resolve: `gatsby-plugin-styled-components`,
        options: {
          // Add any options here
        },
      },
  ],
};
