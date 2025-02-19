#!/usr/bin/env node

/*
Extract all text from an HTML page.
Usage: ./getText.js <input > output
*/


const {JSDOM} = require('jsdom');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const htmlInput = [];

rl.on('line', (line) => {
  htmlInput.push(line);
});

rl.on('close', () => {
  try {
    const fullHtml = htmlInput.join('\n');
    const dom = new JSDOM(fullHtml);
    const document = dom.window.document;

    const output = [];
    let footerText = ''; 


    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
      output.push(heading.textContent.trim().toUpperCase());
    });

    document.querySelectorAll('p').forEach((p) => {
      const link = p.querySelector('a');
      let text = p.textContent.trim();

      if (link) {
        const href = link.getAttribute('href');
        const linkText = link.textContent.trim();
        text = text.replace(linkText, `${linkText} [${href}]`).replace(/\.$/, ''); // Format link and move period
        output.push(text + '.');
      } else {
        if (p.closest('.footer')) {
          footerText = text;
        } else {
          output.push(text);
        }
      }
    });

    if (footerText) {
      output.push(footerText);
    }
    const result = output
        .filter((line) => line.trim()) 
        .join('\n\n'); 

    console.log(result);
  } catch (error) {
    console.error('Error converting HTML to text:', error.message);
    process.exit(1);
  }
});
