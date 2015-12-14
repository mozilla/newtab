module.exports = function formatHistoryTiles(sites) {
  return sites.map(site => {
    return {
      title: new URL(site.url).host.replace('www.', ''),
      type: site.type,
      url: site.url,
      frecency: site.frecency
    };
  }).filter((site, index, arr) => arr.map(s => s.title).indexOf(site.title) === index);
};
