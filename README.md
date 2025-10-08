# waste-zero-full-stack

As soon as new task is assigned.
- create feature branch
    From git website, feature branch, base is main-group-* branch
    git branch - shows which branch we are on currently.
    git checkout <feature-branch-name>
- code base is ready to be worked upon.
  after the changes are made.... (do everyday)

  git branch - check if you are on correct branch
  git add .
  - add unwanted files or folders to .gitignore file
  git commit -m "commit message"

- once the code is finished
  git fetch - this will pull all the latest info from the git
  git merge origin/main-group-A
  ** merge conflicts will arise
  - accept incoming changes - remove your changes, add their changes
  - accept current changes- keep your changes, remove their changes
  - accept both changes - keep both
 
    git add .
    git commit -m "merge conflicts resolved"
    git push origin <your branch name>


    - go to git site, and raise PR..... base branch = main-group branch
