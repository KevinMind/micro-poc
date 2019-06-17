import React from 'react';
import path from 'path';
import express from 'express';
import jsonfile from 'jsonfile';

import ReactDOMServer from 'react-dom/server';

import ReactApple from '../src/ReactApple';

const manifestPath = path.resolve(__dirname, '../client/manifest.json');

express()
  // serve static files from client
  .use('/static', express.static(path.resolve(__dirname, '../client')))
  // handle serve requests to render application fragment
  .use('', (req, res) => {
    const { ssr } = req.query;

    console.log('serving apples', req.query);

    const content = ssr === 'true'
      ? ReactDOMServer.renderToString(<ReactApple />)
      : '';

    const manifest = jsonfile.readFileSync(manifestPath) || {};

    res.json({
      content,
      manifest,
    })
  })
  .listen(6061, (err) => {
    if (err) {
      console.warn('error starting apple', err);
    } else {
      console.log('sering react apples hot off the press at port:', 6061);
    }
  });
