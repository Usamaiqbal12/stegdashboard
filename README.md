## Stegvision Dashboard (React Application)

Building from source:
```
# install dependencies:
$ npm install

# run locally (localhost:3000):
$ npm start

# create build for deployment:
$ npm run build

# create package (.tgz file):
$ npm run package
```

## Deploying to Linux/Apache2:

* There is one configuration file, it is `public/runtime-config.js`.  You may need to change the `urlBase` parameter.

* `scp` the .tgz file to the system

* As root, untar the file and move `build` to `/var/www/html`

* Restart apache2
