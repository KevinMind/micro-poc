import express from 'express';
import axios from 'axios';
import qs from 'qs';
import { JSDOM } from 'jsdom';
import { omitBy, values, set } from 'lodash';

import routesConfig  from './routesConfig';
import htmlTetmplates  from './templates';

const app = express();

const IS_DEV = process.env.NODE_ENV === 'development';

const getClientAssets = (dom, target, el) => ({ manifest, content }) => {
  // Avoid loading chunk js initially
  const removedChunkedManifest = omitBy(manifest, (value, key) =>
    /js\/[0-9]+/.test(key)
  );

  const urls = values(removedChunkedManifest);

  const css = urls
    .filter(url => url.endsWith('.css'))
    .map(
      url => {
        const link = dom.window.document.createElement('link');
        link.type = 'text/css';
        link.media = 'all';
        link.href = url;
        return link;
      }
    );

  const js = urls
    .filter(url => url.endsWith('.js'))
    .sort()
    .map(
      url => {
        const script = dom.window.document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'UTF-8';
        script.crossorigin = IS_DEV;
        script.src = url;
        script.defer = !IS_DEV;
        return script;
      });

  if (css.length) {
    console.log('appending style resources');
    css.forEach(styleTag => dom.window.document.head.appendChild(styleTag));
  }

  if (js.length) {
    console.log('appending javascript resources');
    js.forEach(scriptTag => dom.window.document.body.appendChild(scriptTag));
  }

  if (content) {
    console.log('appending content');
    el.innerHTML = content;
  }
};

const setHydrateConfig = (dom, clients = []) => {
  const config = {};

  clients.forEach(({ id, target }) => {
    config[id] = target;
  });

  const script = dom.window.document.createElement('script');
  script.innerHTML = `
    window.__MF__ = ${JSON.stringify(config)}
  `;
  dom.window.document.body.prepend(script);
};

const getClientRenderer = (dom, url, query) => async ({ baseUrl, content, id, ssr, target }) => {
  // select target dom element in template
  const el = dom.window.document.getElementById(target);

  try {
    // if url is avaialable, fetch client from host
    if (baseUrl) {
      const params = { ...query, ssr };
      let finalUrl = `${baseUrl}${url}`;
      if (params) {
        finalUrl += `?${qs.stringify(params)}`
      }
      return axios
        .get(finalUrl)
        .then(resp => resp.data)
        .then(getClientAssets(dom, target, el))
        .catch(e => console.log(e));
    }

    // client can have default content set
    if (content) {
      el.innerHTML = content;
    }

  } catch (e) {
    console.warn(`error rendering: ${JSON.stringify({ id, target, url }, 0, 2)}`, e);
  }
};

app.use('', async (req, res) => {
  const { url, query } = req;

  // get route config based on request url
  const { templateId, clients } = routesConfig[url] || {};

  // get template based on route config with default option
  const template = htmlTetmplates[templateId] || htmlTetmplates.defaultTemplate;

  // generate server side dom
  const dom = new JSDOM(template);

  if (clients && clients.length) {
    // get client renderer with access to same dom, url, and query
    const render = getClientRenderer(dom, url, query);

    // for each client, queue content render
    for (const client of clients) {
      await render(client);
    }
    // tell all the mf where to hydrate
    setHydrateConfig(dom, clients);
  }

  // return serialized result
  res.send(dom.serialize());

});


app.listen(3000, err => {
  if (err) {
    return console.log('error starting app', err);
  }
  return console.log('started app on port', 3000);
});
