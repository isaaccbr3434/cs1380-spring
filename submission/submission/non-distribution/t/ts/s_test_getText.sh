#!/bin/bash
# This is a student test

T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/..$R_FOLDER" || exit 1

DIFF=${DIFF:-diff}


if $DIFF <(cat "$T_FOLDER"/d/actual_output.txt | c/getText.js | sort) <(sort "$T_FOLDER"/d/test_actual_output.txt) >&2;
then
    exit 0
else
    echo "$0 failure: texts are not identical"
    exit 1
fi

