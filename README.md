# portfolio-keystone
Node-based Keystone.JS portfolio site

# Deploying to Openshift - Steps

1. Create node.js 0.10 app
2. Install MongoDB 2.4
3. Install RockMongo.
4. git clone the app you created from step#1
5. follow the steps from https://github.com/h4t0n/nodejs-4-lts-openshift
to get NodeJS 4.2.3. You will need it to run Keystone 0.40 described below.
git remote add github -m master https://github.com/h4t0n/nodejs-4-lts-openshift.git
6. Manually copy node modules from this project to your app, commit it.
7. You will need Keystone 0.40. Without it, Keystone's Admin UI will be missing buttons and time out while loading. This is due to JSX not being parsed correctly in the 0.3x version due to how Openshift is set up.
-> download master from keystonejs/keystone, put its package.json in and npm install, then manually replace the files in node_modules/keystone
  with the contents of master
  if you have issues for untracked files, go to /.git/ and edit the config file: add "longpaths = true" to [CORE]. This will probably happen for babel-es2015.
8. Remove "Keystone ^0.3.14" from your package.json to prevent Openshift overwriting your Keystone 0.40 with 0.3.16
9. It should work now :)
