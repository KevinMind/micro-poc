import React from 'react';
import path from 'path';
import express from 'express';
import jsonfile from 'jsonfile';

import ReactDOMServer from 'react-dom/server';

import ReactOrange from '../src/ReactOrange';

const manifestPath = path.resolve(__dirname, '../client/manifest.json');

express()
  // serve static files from client
  .use('/static', express.static(path.resolve(__dirname, '../client')))
  // handle serve requests to render application fragment
  .use('', (req, res) => {
    const { ssr } = req.query;

    console.log('serving oranges', req.query);

    const content = ssr === 'true'
      ? ReactDOMServer.renderToString(<ReactOrange />)
      : '';

    const manifest = jsonfile.readFileSync(manifestPath) || {};

    res.json({
      content,
      manifest,
    })
  })
  .listen(8081, (err) => {
    if (err) {
      console.warn('error starting orange', err);
    } else {
      console.log('sering react oranges hot off the press at port:', 8081);
    }
  });
