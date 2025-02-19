#!/usr/bin/env node

/*
Merge the current inverted index (assuming the right structure) with the global index file
Usage: cat input | ./merge.js global-index > output

The inverted indices have the different structures!

Each line of a local index is formatted as:
  - `<word/ngram> | <frequency> | <url>`

Each line of a global index is be formatted as:
  - `<word/ngram> | <url_1> <frequency_1> <url_2> <frequency_2> ... <url_n> <frequency_n>`
  - Where pairs of `url` and `frequency` are in descending order of frequency
  - Everything after `|` is space-separated

-------------------------------------------------------------------------------------
Example:

local index:
  word1 word2 | 8 | url1
  word3 | 1 | url9
EXISTING global index:
  word1 word2 | url4 2
  word3 | url3 2

merge into the NEW global index:
  word1 word2 | url1 8 url4 2
  word3 | url3 2 url9 1

Remember to error gracefully, particularly when reading the global index file.
*/

// const {local} = require('@brown-ds/distribution');
const fs = require('fs');
const readline = require('readline');

// Function to compare frequency in descending order
// const compare = (a, b) => b.freq - a.freq;

const rl = readline.createInterface({
  input: process.stdin,
});

let localIndex = '';

rl.on('line', (line) => {
  localIndex += line + '\n';
});

rl.on('close', () => {
  const globalIndexFile = process.argv[2];
  if (!globalIndexFile) {
    console.error('Error: Missing global index file argument');
    process.exit(1);
  }

  fs.readFile(globalIndexFile, 'utf8', (err, globalData) => {
    if (err) {
      console.error('Error reading global index file:', err);
      process.exit(1);
    }

    printMerged(globalData);
  });
});

const printMerged = (globalData) => {
  const localIndexLines = localIndex.trim().split('\n');
  const local = {};

  for (const line of localIndexLines) {
    const parts = line.split(' |').map((part) => part.trim());
    if (parts.length === 3) {
      const [term, freq, url] = parts;
      const frequency = parseInt(freq, 10);

      if (!local[term]) {
        local[term] = [];
      }

      local[term][url] = frequency;
    }
  }

  const globalIndexLines = globalData.trim().split('\n');
  const global = {};

  for (const line of globalIndexLines) {
    const parts = line.split(' | ').map((part) => part.trim());
    if (parts.length === 2) {
      const [term, rest] = parts;
      const urlFreqPairs = rest.split(' ').reduce((acc, value, index, arr) => {
        if (index % 2 === 0) {
          acc[value] = parseInt(arr[index + 1], 10);
        }
        return acc;
      }, []);
      global[term] = urlFreqPairs;
    }
  }

  for (const term in local) {
    if (!global[term]) {
      global[term] = {};
    }

    Object.assign(global[term], local[term]);
  }

  for (const term in global) {
    const entries = Object.entries(global[term])
        .map(([url, freq]) => `${url} ${freq}`)
        .sort((a, b) => parseInt(b.split(' ')[1]) - parseInt(a.split(' ')[1])) // Sort by frequency (descending)
        .join(' ');

    console.log(`${term} | ${entries}`);
  }
};

