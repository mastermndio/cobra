module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-theme-try-ghost/gatsby-browser.js'),
      options: {"plugins":[],"ghostConfig":null,"siteConfig":{"siteUrl":"https://styxlab.github.io","postsPerPage":3,"siteTitleMeta":"Piopelines Startup Blog","siteDescriptionMeta":"Turn your Ghost blog into a flaring fast static site with Gatsby","shareImageWidth":1000,"shareImageHeight":523,"shortTitle":"Jamify","siteIcon":"favicon.png","backgroundColor":"#e9e9e9","themeColor":"#15171A"},"routes":{"basePath":"/","collections":[]}},
    },{
      plugin: require('../node_modules/gatsby-theme-ghost-dark-mode/gatsby-browser.js'),
      options: {"plugins":[],"defaultModeDark":false,"overrideOS":false},
    }]
