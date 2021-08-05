#!/bin/bash

exitWithError() {
  msg=$1
  echo "$msg"
  read -s -n 1 -p "Press any key to exit . . ."
  exit 1
}

if [[ -n $(git diff --stat) ]]; then
  exitWithError "Some files have been changed locally."
fi

if [[ -z $(git status -s) ]]; then
  echo
else
  exitWithError "Some files are modified/untracked."
fi

npm run prepack
if [ $? = 0 ]; then
  echo
else
  exit 1
fi

branch=$(git rev-parse --abbrev-ref HEAD)

if [ $branch == 'master' ]; then
  git pull origin $branch
else
  read -r -p "Are you sure to publish on branch: $branch? [Y/n] " input
  case $input in
    [yY][eE][sS]|[yY])
      git pull origin $branch # FIXME: If branch doesn't exist on remote, process will dead with error "fatal: couldn't find remote ref 0.2.7"
      ;;
    *)
      exitWithError ''
      ;;
  esac
fi

echo ""
echo "------------------------------------------------------------------------------"
echo "About npm version rule, suppose current version is x.y.z, the next will be:"
echo "major      ->  (x+1).0.0"
echo "minor      ->  x.(y+1).0"
echo "patch      ->  x.y.(z+1)"
echo "premajor   ->  (x+1).0.0-beta.0"
echo "preminor   ->  x.(y+1).0-beta.0"
echo "prepatch   ->  x.y.(z+1)-beta.0"
echo "prerelease ->  x.y.z-beta.(b+1)"
echo "------------------------------------------------------------------------------"
echo ""

COLUMNS=45
echo "Select release option..."
PS3='Please enter your choice: '
select opt in "major" "minor" "patch" "premajor" "preminor" "prepatch" "prerelease"; do
  case $opt in
  "minor" | "major" | "patch" | "premajor" | "preminor" | "prepatch" | "prerelease")
    echo "You chose choice $REPLY which is '$opt'"
    break
    ;;
  *)
    exitWithError "Invalid option $REPLY, $opt not supported."
    break
    ;;
  esac
done

if [ $opt == "premajor" -o $opt == "preminor" -o $opt == "prepatch" -o $opt == "prerelease" ]; then
  npm version $opt --preid="beta" -m "release v%s"
else
  npm version $opt -m "release v%s"
fi

TAG=$(git describe --tags $(git rev-list --tags --max-count=1))

conventional-changelog -p angular -i changelog.md -s -r 0

if [ $? -eq 0 ]; then
  echo
else
  npm install conventional-changelog-cli -g
  conventional-changelog -p angular -i changelog.md -s -r 0
fi

git add changelog.md
git commit -m "docs: add $TAG changelog"
git push origin $branch

rm -rf dist

if [ $opt == "premajor" -o $opt == "preminor" -o $opt == "prepatch" -o $opt == "prerelease" ]; then
  git push origin $TAG
  npm publish --tag=beta
else
  git push origin $TAG
  npm publish # FIXME: the latest published version will always have 'latest' tag, use 'npm dist-tag add [package]@version latest' to change
fi

echo success
read -rsp "Press enter to exit"
exit 1