import React, { Component } from 'react'

class Document extends Component {
  render() {
    const { children, assets } = this.props
    return (
      <html lang="">
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}

          {assets.vendor.js && <script src={assets.vendor.js} />}
          {process.env.NODE_ENV === 'production' ? (
            <script src={assets.client.js} defer />
          ) : (
            <script src={assets.client.js} defer crossorigin />
          )}
        </head>
        <body>
          <div id="root">{children}</div>
        </body>
      </html>
    )
  }
}

export default Document
