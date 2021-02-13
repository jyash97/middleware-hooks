module.exports = {
  siteMetadata: {
    siteTitle: `Middleware Hooks`,
    defaultTitle: `Middleware Hooks`,
    siteTitleShort: `Middleware Hooks`,
    siteDescription: `A collection of React hooks to upgrade the existing 'useReducer' hooks`,
    siteUrl: `https://middleware-hooks.netlify.app`,
    siteAuthor: `@jyash97`,
    themeColor: `#8257E6`,
    basePath: `/`,
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
        githubUrl: `https://github.com/jyash97/middleware-hooks`,
        baseDir: `site/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Middleware Hooks`,
        short_name: `Middleware Hooks`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: ``,
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://middleware-hooks.netlify.app`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
