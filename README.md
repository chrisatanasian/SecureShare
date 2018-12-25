# SecureShare

## Deploying

```
git subtree push --prefix api heroku_api master
git push heroku_api `git subtree split --prefix api master`:master --force

git subtree push --prefix frontend heroku_fe master
git push heroku_fe `git subtree split --prefix frontend master`:master --force
```
