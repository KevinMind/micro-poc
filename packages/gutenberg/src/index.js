import express from 'express';
import { JSDOM } from 'jsdom';

import routesConfig  from './routesConfig';
import htmlTetmplates  from './templates';

const app = express();

app.use('', async (req, res) => {
  const { url } = req;

  // get route config based on request url
  const { templateId, clients } = routesConfig[url] || {};

  // get template based on route config with default option
  const template = htmlTetmplates[templateId] || htmlTetmplates.defaultTemplate;

  // generate server side dom
  const dom = new JSDOM(template);

  if (clients) {
    // for each client, render content to target dom element
    clients.forEach(({ id, target, content }) => {
      // select target dom element in template
      try {
        const el = dom.window.document.getElementById(target);
        el.innerHTML = content;
      } catch (e) {
        console.warn(`error rendering: ${JSON.stringify({ id, target, url }, 0, 2)}`, e);
      }
    });
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
