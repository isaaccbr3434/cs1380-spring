#!/usr/bin/env node

/*
Extract all URLs from a web page.
Usage: ./getURLs.js <base_url>
*/

const readline = require('readline');
const {JSDOM} = require('jsdom');
const {URL} = require('url');

let baseURL = process.argv[2];
if (!baseURL) {
  console.error('Usage: ./getURLs.js <base_url>');
  process.exit(1);
}

if (baseURL.endsWith('index.html')) {
  baseURL = baseURL.slice(0, baseURL.length - 'index.html'.length);
} else if (!baseURL.endsWith('/')) {
  baseURL += '/';
}

let htmlInput = '';

const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  htmlInput += line + '\n';
});

rl.on('close', () => {
  try {
    const dom = new JSDOM(htmlInput);
    const document = dom.window.document;

    const urlSet = new Set();

    document.querySelectorAll('a[href]').forEach((anchor) => {
      try {
        const href = anchor.getAttribute('href');
        if (href) {
          const absoluteURL = new URL(href, baseURL);
          let normalizedURL = absoluteURL.toString();
          normalizedURL = normalizedURL.replace(/\/$/, '');
          normalizedURL = normalizedURL.replace(/^http:\/\//, 'https://');
          urlSet.add(normalizedURL);
        }
      } catch (error) {
      }
    });

    [...urlSet]
        .sort()
        .forEach((url) => console.log(url));
  } catch (error) {
    console.error('Error processing HTML:', error);
    process.exit(1);
  }
});
