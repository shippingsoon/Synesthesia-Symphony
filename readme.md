Synesthesia Symphony
====================

Synesthesia Symphony is a shoot 'em up game designed for HTML5 Canvas. What makes this <a href="https://en.wikipedia.org/wiki/Shoot_%27em_up#Types" target="_blank">danmaku</a> unique is the bullet patterns that are dynamically generated based on what MIDI notes are playing. It also uses a color based collision system inspired by <a href="https://en.wikipedia.org/wiki/Ikaruga" target="_blank">Ikaruga</a>. 

On the frontend I used a <a href="https://github.com/shippingsoon/Finite-State-Machine" target="_blank">finite state machine</a> and the <a href="http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html" target="_blank">javascript module pattern</a> to keep the codebase organized and robust. To make things even more manageable, I set an arbitrary limit of 400 lines for each submodule.

The backend is coded in Node.js. I used Expressjs and a <a href="http://docs.sequelizejs.com/en/latest/">promised based ORM</a> for my <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller">Model View Controller</a> framework. I used this MVC framework to implement a <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">RESTful</a> JSON API. Mocha and <a href="https://github.com/shouldjs/should.js">Shouldjs</a> was used for unit testing.

#### Installation:

To install on Linux:<br/>
```sh
sudo apt-get install nodejs npm git
git clone https://github.com/shippingsoon/Synesthesia-Symphony
cd Synesthesia-Symphony
npm update
```
#### Run:

```sh
nodejs synesthesia-symphonny.js
```

#### Play it here:
<a href="https://www.shippingsoon.com/synesthesia-symphony" target="_blank">https://www.shippingsoon.com/synesthesia-symphony</a>
