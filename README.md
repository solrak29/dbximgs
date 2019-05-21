# dbximgs
Using DropBox samples; I created this so I can share images with friends.
When you have a folder with lots of images and the friend you share the folder
with does not have enough space (i.e. paid version), then they can't see
you images.  So I created this little app based on the sample dbximgs from DropBox.

# config.js
You must provide a config.js for the parameters.
The following values are expected:

```javascript
module.exports = {
  DBX_API_DOMAIN: 'https://api.dropboxapi.com',
  DBX_OAUTH_DOMAIN: 'https://www.dropbox.com',
  DBX_OAUTH_PATH: '/oauth2/authorize',
  DBX_TOKEN_PATH: '/oauth2/token',
  DBX_APP_KEY:'<your key>',
  DBX_APP_SECRET:'<your secret>',
  OAUTH_REDIRECT_URL:<your url>
  DBX_ACCESS_TOKEN: '<yourtoken>',
  DBX_PATH: 'your drop box path'
}
```
More enhancements to come...maybe.

# contributing
If you want to contribute that would be great to enhance this little test.

# references

* https://docs.galleria.io/article/18-quick-start
* https://docs.galleria.io/article/139-optimize
* http://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesListFolder__anchor
* https://dropbox.github.io/gallerywithtagstutorial/?_tk=guides_lp&_ad=javascript_tutorial2&_camp=photo2
* https://github.com/dropbox/nodegallerytutorial?_tk=guides_lp&_ad=javascript_tutorial1&_camp=photo
