import MainApp from '../apps/main';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString } from 'react-dom/server';
import Document from './views/Document'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const context = {};
    const markup = renderToString(
      <Document assets={assets}>
        <StaticRouter context={context} location={req.url}>
          <MainApp />
        </StaticRouter>
      </Document>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.send("<!DOCTYPE html>" + markup);
    }
  });

export default server;
