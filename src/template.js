import React from 'react';
import styles from './components/App/styles.css'

const Html = (props) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
			<meta name='viewport' content='width=device-width, minimum-scale=1.0' />
			<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
			<link rel='icon' type='image/png' href='/favicon-32x32.png' sizes='32x32' />
			<link rel='icon' type='image/png' href='/favicon-16x16.png' sizes='16x16' />
			<link href='https://fonts.googleapis.com/css?family=Palanquin:300' rel='stylesheet' />
      <link rel='stylesheet' href='/app.css' />
      <title>{props.title}</title>
    </head>
    <body>
      <div id='root' className={styles.fullDiv} dangerouslySetInnerHTML={{ __html: props.body }} />
      <script src='/app.js' />
    </body>
  </html>
);

export default Html;

