# SecureShare

SecureShare allows generating a secure, one-time link with a message that can be sent to anyone. The message can only be retrieved once before being destroyed. This allows sending people sensitive information in emails or chat without the information persisting in the history forever.

[Securely share your message today!](https://secure-share-fe.herokuapp.com/)

## Dependencies

* Ruby 2.4.4+
* Rails 5.2.2+
* React 16.7.0+

### Deploying

```
git subtree push --prefix api heroku_api master
git push heroku_api `git subtree split --prefix api master`:master --force

git subtree push --prefix frontend heroku_fe master
git push heroku_fe `git subtree split --prefix frontend master`:master --force
```
