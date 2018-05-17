#!/bin/bash

# get script dir
# https://stackoverflow.com/questions/192292/bash-how-best-to-include-other-scripts
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
source "$DIR/travis-ci-git-commit.sh"

# minimize and uglify css & js
grunt

# check if something changed
if ! git diff-index --exit-code $TRAVIS_BRANCH --; then

    # print diff
    git diff

    # configure git
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"

    # push changes
    if travis-branch-commit; then
        exit 0
    else
        exit 1
    fi
fi

# terminate gracefully
exit 0
