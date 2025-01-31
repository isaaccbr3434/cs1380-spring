#!/bin/bash
# This is a student test

#!/bin/bash

T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/..$R_FOLDER" || exit 1

DIFF=${DIFF:-diff}
DIFF_PERCENT=${DIFF_PERCENT:-0}

cat /dev/null > d/visited.txt
cat /dev/null > d/global-index.txt
cat "$T_FOLDER"/d/u.txt > d/urls.txt

START_CRAWL=$SECONDS
./engine.sh
END_CRAWL=$SECONDS
CRAWL_TIME=$((END_CRAWL - START_CRAWL))

TOTAL_VISITED=$(wc -l < d/visited.txt)

START_INDEX=$SECONDS
sort d/global-index.txt -o d/global-index.txt  # Simulating indexing process
END_INDEX=$SECONDS
INDEX_TIME=$((END_INDEX - START_INDEX))

TOTAL_INDEXED=$(wc -l < d/global-index.txt)

START_QUERY=$SECONDS
grep -f "$T_FOLDER/d/q.txt" d/global-index.txt > d/query-results.txt
END_QUERY=$SECONDS
QUERY_TIME=$((END_QUERY - START_QUERY))

TOTAL_QUERIES=$(wc -l < "$T_FOLDER/d/q.txt")

EXIT=0

if $DIFF <(sort d/visited.txt) <(sort "$T_FOLDER"/d/v.txt) >&2;
then
    echo "$0 success: visited URLs are identical"
else
    echo "$0 failure: visited URLs are not identical"
    EXIT=1
fi

if DIFF_PERCENT=$DIFF_PERCENT t/gi-diff.js <(sort d/global-index.txt) <(sort "$T_FOLDER"/d/i.txt) >&2;
then
    echo "$0 success: global index is identical"
else
    echo "$0 failure: global index is not identical"
    EXIT=1
fi

echo "==== PERFORMANCE METRICS ===="
echo "Crawling Time: $CRAWL_TIME seconds"
echo "Total Pages Downloaded: $TOTAL_VISITED"
if [ $CRAWL_TIME -gt 0 ]; then
    echo "Crawler Throughput: $(echo "scale=2; $TOTAL_VISITED / $CRAWL_TIME" | bc) pages/sec"
fi
echo ""

echo "Indexing Time: $INDEX_TIME seconds"
echo "Total Pages Indexed: $TOTAL_INDEXED"
if [ $INDEX_TIME -gt 0 ]; then
    echo "Indexer Throughput: $(echo "scale=2; $TOTAL_INDEXED / $INDEX_TIME" | bc) pages/sec"
fi
echo ""

echo "Query Processing Time: $QUERY_TIME seconds"
echo "Total Queries Processed: $TOTAL_QUERIES"
if [ $QUERY_TIME -gt 0 ]; then
    echo "Query Throughput: $(echo "scale=2; $TOTAL_QUERIES / $QUERY_TIME" | bc) queries/sec"
fi
echo "============================="

exit $EXIT
