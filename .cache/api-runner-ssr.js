var plugins = [{
      plugin: require('/home/mastermnd/Documents/Pipelines/cobra/node_modules/gatsby-theme-try-ghost/plugins/gatsby-plugin-ghost-manifest/gatsby-ssr'),
      options: {"plugins":[],"short_name":"Jamify","start_url":"/","background_color":"#e9e9e9","theme_color":"#15171A","display":"minimal-ui","icon":"static/favicon.png","legacy":true,"query":"\n                    {\n                        allGhostSettings {\n                            edges {\n                                node {\n                                    title\n                                    description\n                                }\n                            }\n                        }\n                    }\n                  "},
    },{
      plugin: require('/home/mastermnd/Documents/Pipelines/cobra/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"query":"\n                    {\n                        allGhostSettings {\n                            edges {\n                                node {\n                                    title\n                                    description\n                                }\n                            }\n                        }\n                    }\n                  ","feeds":[{"query":"\n        {\n            allGhostPost(\n                sort: {order: DESC, fields: published_at}\n            ) {\n                edges {\n                    node {\n                        # Main fields\n                        id\n                        title\n                        slug\n                        featured\n                        feature_image\n\n                        # Dates unformatted\n                        created_at\n                        published_at\n                        updated_at\n\n                        # SEO\n                        excerpt\n                        meta_title\n                        meta_description\n\n                        # Authors\n                        authors {\n                            name\n                        }\n                        primary_author {\n                            name\n                        }\n                        tags {\n                            name\n                            visibility\n                        }\n\n                        # Content\n                        html\n\n                        # Additional fields\n                        url\n                        canonical_url\n                    }\n                }\n            }\n        }\n  ","output":"/rss","title":"RSS Feed"}]},
    },{
      plugin: require('/home/mastermnd/Documents/Pipelines/cobra/node_modules/gatsby-plugin-advanced-sitemap/gatsby-ssr'),
      options: {"plugins":[],"query":"\n                    {\n                        allGhostPost {\n                            edges {\n                                node {\n                                    id\n                                    slug\n                                    updated_at\n                                    created_at\n                                    feature_image\n                                }\n                            }\n                        }\n                        allGhostPage {\n                            edges {\n                                node {\n                                    id\n                                    slug\n                                    updated_at\n                                    created_at\n                                    feature_image\n                                }\n                            }\n                        }\n                        allGhostTag {\n                            edges {\n                                node {\n                                    id\n                                    slug\n                                    feature_image\n                                }\n                            }\n                        }\n                        allGhostAuthor {\n                            edges {\n                                node {\n                                    id\n                                    slug\n                                    profile_image\n                                }\n                            }\n                        }\n                    }","mapping":{"allGhostPost":{"sitemap":"posts"},"allGhostTag":{"sitemap":"tags"},"allGhostAuthor":{"sitemap":"authors"},"allGhostPage":{"sitemap":"pages"}},"exclude":["/dev-404-page","/404","/404.html","/offline-plugin-app-shell-fallback"],"createLinkInHead":true,"addUncaughtPages":true},
    },{
      plugin: require('/home/mastermnd/Documents/Pipelines/cobra/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/mastermnd/Documents/Pipelines/cobra/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/mastermnd/Documents/Pipelines/cobra/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}