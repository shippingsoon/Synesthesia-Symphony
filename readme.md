Synesthesia Symphony
====================

Synesthesia Symphony is a shoot 'em up game designed for HTML5 Canvas. What makes this <a href="https://en.wikipedia.org/wiki/Shoot_%27em_up#Types" target="_blank">danmaku</a> unique is the bullet patterns that are dynamically generated based on what MIDI notes are playing. It also uses a color based collision system inspired by <a href="https://en.wikipedia.org/wiki/Ikaruga" target="_blank">Ikaruga</a>. 

On the frontend I used a <a href="https://github.com/shippingsoon/Finite-State-Machine" target="_blank">finite state machine</a> and the <a href="http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html" target="_blank">javascript module pattern</a> to keep the codebase organized.

The backend is coded in Node.js. I used Expressjs and a <a href="http://docs.sequelizejs.com/en/latest/">promised based ORM</a> for my <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller">Model View Controller</a> framework. I used this MVC framework to implement a <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">RESTful</a> JSON API. Mocha and <a href="https://github.com/shouldjs/should.js">Shouldjs</a> was used for unit testing. MySQL Workbench was used to generate the EER models.


#### Installation:

To install on Linux:<br/>
```sh
sudo apt-get install nodejs npm git
git clone https://github.com/shippingsoon/Synesthesia-Symphony
cd Synesthesia-Symphony
sudo npm update
sudo npm -g install forever
sudo npm -g install nodemon
#Edit MySQL user and password.
vi node_modules/server_settings/server_settings.js
```
#### Run:

```sh
nodejs synesthesia-symphonny.js

#Using forever.js
forever start synesthesia-symphony.js

#For development
nodemon synesthesia-symphony.js
```

#### Play it here:
<a href="https://shippingsoon.com:3000" target="_blank">https://shippingsoon.com:3000</a>
