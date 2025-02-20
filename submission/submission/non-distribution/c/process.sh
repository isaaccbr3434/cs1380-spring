#!/bin/bash

# Convert input to a stream of non-stopword terms
# Usage: ./process.sh < input > output

# Convert each line to one word per line, **remove non-letter characters**, make lowercase, convert to ASCII; then remove stopwords (inside d/stopwords.txt)
# Commands that will be useful: tr, iconv, grep

#!/bin/bash

# Convert input to a stream of non-stopword terms
# Usage: ./process.sh < input > output

STOPWORDS_FILE="d/stopwords.txt"

if [[ ! -f "$STOPWORDS_FILE" ]]; then
  echo "Error: Stopwords file not found at $STOPWORDS_FILE" >&2
  exit 1
fi

cat | \
  tr '[:upper:]' '[:lower:]' | \
  sed 's/[^a-zA-Z0-9]/ /g' | \
  sed 's/[0-9]//g' | \
  iconv -f utf8 -t ascii//TRANSLIT | \
  tr -s ' ' '\n' | \
  grep -vwF -f "$STOPWORDS_FILE"

