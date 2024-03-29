---

## Rails or Node?

---

### Why Choose Rails?
<br>

- Quickest path to building an app with full CRUD.

- Better at working with complex data relationships - ActiveRecord rocks!

- When full page refreshes aren't an issue.

- Easier to program because synchronous programming is more straightforward than async programming.

---

### Why Choose Node?
<br>

- JavaScript everywhere!

- When high performance and high capacity matter.

- Designed with modern realtime, mobile and Single Page Applications in mind - easier to avoid full page refreshes.

---

### Why is Node so Performant?

- First, it's important to understand how time consuming and "expensive" data Input/Output operations are:

<img src="http://image.slidesharecdn.com/nodejsexplained-130219213912-phpapp02/95/nodejs-explained-5-638.jpg?cb=1386103418" width="900">

---

### Why is Node so Performant? (cont.)

- Node's **Asynchronous / Event-driven** design enables **non-blocking** Input/Output:

<img src="http://image.slidesharecdn.com/talk-nodejsandisomorphicjavascript-150117083443-conversion-gate02/95/introduction-to-nodejs-and-isomorphic-javascript-9-638.jpg?cb=1421483753" width="800">

---

### Why is Node so Performant? (cont.)
<br>

- This technical jargon basically results in a Node server capable of supporting _tens of thousands_ of concurrent connections!

- For more information, check the references at the end of this presentation.

---

### Synchronous vs. Asynchronous
<br>

<p style="text-align:left;font-weight:bold">Rails (Synchronous Programming)</p>

- <p>Each line of code must finish before the next line is executed. Sounds logical until you consider if the line of code involves an I/O operation (network, database, or file system call) that your program will spend most of its time waiting until the I/O operation is completed.</p>

---

### Synchronous vs. Asynchronous
<br>

<p style="text-align:left;font-weight:bold">Node.js (Asynchronous Programming)</p>

- Node is asynchronous and non-blocking, that means that it is designed not wait for those notoriously slow I/O operations to complete before it moves on.

- Your friend, the **callback function**, enables this pattern. When our code calls a method involving I/O, we also provide a callback function to be, well, "called back", when the I/O operation is complete.

---

### Questions - What is Node.js?
<br>

- **True or false - Node itself is written in JavaScript.**

- **Is Node.js a programming language?**

- **What is the primary reason why Node/Express applications are so performant?**

- **Is<br>`var elem = document.getElementById('my-list');`<br>a valid JavaScript statement in a Node app?**

---

#### Now that you've learned the use case for Node, let's see how it can run JavaScript programs

---

### Using Node to Execute JavaScript
<br>

<p style="text-align:left">Let's see how we can run a JavaScript program in Node:</p>

```sh
? mkdir first-node
? cd first-node
? touch main.js
? subl .
```

---

### Using Node to Execute JavaScript
<br>

<p style="text-align:left">Toss in a little JavaScript into <em>main.js</em>:</p>

```js
function multiply(x, y) {
  return x * y;
}

var n = multiply(5, 8);

console.log(n);
```

<p style="text-align:left">Now use Node to run <em>main.js</em>:</p>

```sh
? node main
40
```

<p style="text-align:left"><small>Note how you don't need to include the "js" file extension.</small></p>

---

### Practice (5 mins)<br>Use Node to Execute JavaScript
<br>

- To practice, and to help get back into the JavaScript "mindset", replace the code in `main.js` with code that:

  - Defines an empty array named `fives`.
  - Uses a `for` loop to loop through the numbers 1 through 100.
  - Within the loop's code block, if the current value of the loop variable is evenly divisible by 5, add it to the `fives` array.
  - After the loop has completed, `console.log` the `fives` array.

- Use Node to execute your program.

---

#### Easy - right?<br>Now let's learn about <em>Modules</em>

---

### Node.js Modules
<br>

- Modules in Node allow us to organize and reuse JavaScript code.

- Node itself comes with several **core modules**, such as the `http` and `fs` modules.

- There are thousands of open-source modules available.

---

### Node.js Modules (cont.)
<br>

- In our own programs, we organize our code into modules. Each module will be contained in its own file - there is a one-to-one mapping between a file and a module.

- You can put your app's custom module files in any folder within your project. This allows us to organize our code inside folders named `models`, `routes`, etc.

---

### Modules <em>exports</em> Their Functionality

- Inside of our modules, Node automatically provides a special object named `module.exports` and a "shortcut" variable that points to `module.exports` named what else - `exports`.

- We can attach our module's functionality to `module.exports` or `exports`:

```js
module.exports.myNumber = 123;
// same as above
exports.myNumber = 123;

// add as many properties as you wish
exports.sayHi = function() { console.log('Hi'); };
```

---

### Modules <em>exports</em> Their Functionality
<br>

- <p>If we want to **assign one** piece of functionality without using a property, be sure to use `module.exports`:</p>

```js
module.exports = function() { console.log('Hi'); };
// Below will not work due to breaking the object reference
exports = function() { console.log('Hi'); };
```

---

### Using the <em>require</em> Method
<br>

- Wherever and whenever we need to use our custom module, we just `require` the module file, without the file extension, using a relative path.

- Note that the module is loaded only once, even if it is "required" multiple times.

---

### Using the <em>require</em> Method (cont.)
<br>

- `require` basically "turns into" whatever `module.exports` is. This is true whether we "attach" properties the original `module.exports` or `exports` object, or assign to it a function, array or whatever:

```js
// my-module attached a myNumber property to module.exports
var myMod = require('my-module');
console.log(myMod.myNumber);  // outputs 123

// module.exports was assigned a sayHi function
var sayHi = require('my-module');
console.log( sayHi() );  // outputs 'Hi'
```

---

### Our First Module
<br>

- Together, let's create a module that:
  -  Provides an array named `weekdays` containing two-character names of the days of the week.
  -  Provides a function named `getWeekday` that accepts a number from<br>0 to 6 and returns the name; where 0 = 'Su'.
  -  If an invalid number is passed in, assume a value of 1.

- Let's put our module inside of a "utilities" folder and name it "days-of-week.js":

	```sh
	? mkdir utilities
	? touch utilities/days-of-week.js
	```

---

### Our First Module (cont.)

<p style="text-align:left">The code will look like this:</p>

```js
// days-of-week.js

// This is a local variable in scope to this module only
var defaultDay = 1;

// Exporting the weekdays array
module.exports.weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// You can "attach" properties directly on "exports".
// However, "assigning" directly to exports breaks!
exports.getWeekday = function(dayNo) {
	return exports.weekdays[dayNo < 0 || dayNo > 6 ? defaultDay : dayNo];
}

console.log("days-of-week module has been loaded");
```
**Note that in Node, all variables defined are local to that module - they will not pollute the global scope.**

---

### Our First Module (cont.)
<br>

<p style="text-align:left">Use our "days-of-week" module in "main.js":</p>

```js
// main.js
	
var dow = require('./utilities/days-of-week');
	
// Outputs the weekdays array
console.log(dow.weekdays);
	
// Outputs "Fr"
console.log(dow.getWeekday(5));
```

<p style="text-align:left">Run "main.js" with Node:</p>

`> node main`

---

### Practice - Modules #1 (10 mins)
<br>

<p style="text-align:left">Create two separate modules:</p>

<p style="text-align:left">A module named "random" that has a function <strong>assigned</strong> to the <em>module.exports</em> and returns a random number, as an integer, between two numbers provided, inclusive, as arguments; so that we could use it in our program like this:</p>
	
```js
var random = require('./utilities/random');
for (var i = 0; i < 10; i++) {
	console.log( random(100, 200) );
}
```

---

### Practice - Modules #2 (10 mins)
<br>

<p style="text-align:left">A module named "circle" that exports two functions:</p>

- `area`: Computes the area of a circle (radius squared X Pi), with the radius provided as an argument. 
- `circumference`: Computes the circumference of a circle (radius X 2 X Pi), with the radius provided as an argument. 
- Hint: This is JS, so `Math.PI` is available.

```js
var circle = require('./utilities/circle');
console.log( circle.area(50) );  // 7853.98...
console.log( circle.circumference(75) );  // 471.23...
```
	
---

### Questions - Modules

- **What are modules used for in Node?**

- **How many modules can be defined in a file?**

- **What is the special object we use in our module to attach or assign functionality to?**

- **How many times can we `require` a module in our program?**

- **Does the variable name we use need to match the name of the module?**

<p>continued on next slide...</p>

---

### Questions - Modules (cont.)
<br>

- **Will this work?**

```js
// in module file named add.js
exports = function (x, y) { return x + y };

// in other file
var add = require('add');
console.log( add(1, 2) );
```

---

#### Now that you've created and used your own modules, let's see how we can install open-source packages and use the modules they contain

---

### NPM - Node Package Manager
<br>

- Node uses a package management system to distribute open-source packages called **N**ode **P**ackage **M**anager (_npm_).

- Usually a package distributes a Node module, however, sometimes the package distributes a CLI instead of a module we would use in our program.

---

### NPM - Node Package Manager (cont.)
<br>

- Working with packages in Node is very similar to working with gems in Ruby:


	| Ruby | Node |
	| ---- | ------- |
	| `gem install ... ` | `npm install ...` |
	| `bundle install` (works with `Gemfile`) | `npm install` (works with `package.json`)|

---

### NPM - Node Package Manager (cont.)
<br>

- Let's use `npm` to install one of Node's packages:

	```sh
	? npm install request
	```

- Take a look and you will find that a `node_modules` folder has been added to your project and that it contains a folder for the `request` module.

- Note: it's recommended that `node_modules` be added to your `.gitignore` file.

---

### NPM - Node Package Manager (cont.)

- <p>We can now require the `request` module in our "main.js" and make HTTP requests:</p>

```js
// Don't specify path when module is in node_modules
var request = require('request');
request('http://jsonplaceholder.typicode.com/users', function(err, res, body) {
	console.log(body);
});
```

- **Why do we need to provide a callback?**

- Note the first parameter in the callback is `err`. This "error-first" callback signature is prevalent throughout Node.

- Use Node to execute _main.js_ and check out the result!

---
<p style="margin-top:-50px"></p>
### NPM - Node Package Manager (cont.)

- <p>`npm` uses a `packages.json` file to define our application's profile and both its application dependencies & development dependencies.</p>

```js
{
  "name": "first-node",
  "version": "1.0.0",
  "description": "My first node app",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "You <you@email.com>",
  "license": "MIT",
  "dependencies": {
    "request": "^2.69.0"
  },
  "devDependencies": {
    "gulp": "^3.9.1"
  }
}

```

---

### NPM - Node Package Manager (cont.)
<br>

- The `package.json` file works a bit like a `Gemfile` in that we can install the dependencies from it.

- Let's delete our `node_modules` file:

	```sh
	? rm -rf node_modules
	```

- Now we can create our `package.json` file...

---

### NPM - Node Package Manager (cont.)
<br>

- Create our `package.json` file like this:

	```sh
	? npm init
	// just accept the default values by pressing enter...
	```

---

### NPM - Node Package Manager (cont.)
<br>

- Let's edit our `package.json` to include the `request` module dependency:

	```json
	{
  		"name": "first-node",
	...
  		"dependencies": {
    		"request": "latest"
  		}
	...
	}
	```

---

### NPM - Node Package Manager (cont.)
<br>

- Now we can install our app's dependencies like this:

	```sh
	? npm install
	```
	Witness the return of `node_modules`!

---

### Conclusion
<br>

- In the next lesson, you will use one of the most popular Node modules, `Express`, that turns Node into a capable web server.

- **Questions?**

- Take a break!

---

### References
<br>

[Node.js Homepage](https://nodejs.org/)

[Node Package Manager](https://www.npmjs.com/)

[Why Do Companies Choose Node](https://strongloop.com/strongblog/why-do-companies-choose-node-performance-scalability-and-productivity/)

[Blocking/Non-Blocking, Async/Sync](http://stackoverflow.com/questions/10570246/what-is-non-blocking-or-asynchronous-i-o-in-node-js)

[Node Event Loop](https://www.youtube.com/watch?v=0fM4pRAs3BI)



### Express Framework - Intro
<br>

- Express is the most popular web framework for Node.js.


- It is a minimalistic and lightweight, especially when compared to a massive framework such as Rails.

- Express uses Node's built-in HTTP server, but extends its capability by giving us the ability to:
	- Define Routes
	- Add functionality with third-party Middleware
	- Define our own Custom Middleware
	- Use View Engines to Render Views

---

### Setup our App
<br>

- Create a folder and cd into it:

	```sh
	? mkdir first-express
	? cd first-express
	```
	
- Create our `package.json`. Accept the defaults, **except** for the **entry point** - set this to be "**server.js**":

	```sh
	? npm init
	```

- `subl .`


---

### Install the Express Module
<br>

- Use `npm` to install the Express module in this project:

	```sh
	? npm install express --save
	```
	
- The `--save` option makes an entry in the dependency section of our `package.json` file.

- Create a `server.js` to put our web app's main code in:

	```sh
	? touch server.js
	```

---

### Express - Hello World!

- To test our setup, let's make our app return "Hello World!" when we browse to `localhost:3000`.  In `server.js`:

	```js
	// Load express
	var express = require('express');
	
	// Create our express app
	var app = express();
	
	// Define a root route directly on app
	// Later, we will use the router object
	app.get('/', function(req, res) {
	  res.send('<h1>Hello World!</h1>');
	});
	
	// Tell the app to listen on port 3000
	app.listen(3000, function() {
	  console.log('Listening on port 3000');
	});
	```

---

### Express - Hello World! (cont.)
<br>

- Run the app, then browse to `localhost:3000`:

	```sh
	? node server
	```

---

### Basic Structure of Express App

- Here is a helpful outline of what we need to do in our main Express app file - let's put this guide right in our `server.js`:

	```js
	// Require modules
	var express = require('express');
	
	// Create the Express app
	var app = express();
	
	// Configure the app (app.set)
	
	
	// Mount middleware (app.use)
	
	
	// require and mount (app.use) routes

	
	// Tell the app to listen on port 3000
	app.listen(3000, function() {
	  console.log('Listening on port 3000');
	});
	```

---

### Update Our First Route

- Now let's update our route to return "Hello Express" instead of "Hello World":

	```js
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

- If you refresh the page, you'll see that it still says "Hello World!" - what's up?  Well, unlike with Rails, Node does not automatically restart the server for us when we make changes to our code.

- Of course there are utilities to perform the restart for us, but until we install one later this week, get used to stopping the server with `control-c` and restarting it.

---

### Our First Route (cont.)
<br>

- Looking at our first route in Sublime, note that we are defining a route using the `get` method on the Express `app` object. Later, we will learn a preferred way of defining routes using the Express `Router` object, but you need to be aware of defining routes this way because you will see it quite often.

- Besides the `get` method, there are other methods such as `post`, `put` and `delete`, that map to the other HTTP verbs.

---

### Our First Route (cont.)
<br>

- In the case of our first route, we have specified a HTTP method of `get` and a path of `/`.

- Only HTTP **get** requests matching a path of `/` (root path) will invoke the callback function.

	```js
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

---

### The Route's Callback
<br>

- Again, looking at our first route:

	```js
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

- The route's callback function will be executed if a matching HTTP request comes along.

- Don't forget, instead of an anonymous function for the callback, we can always use a named function, or even a `require` that returns a function. 

---

### The Route's Callback (cont.)
<br>

- The route's callback function defines two parameters, the first representing the [request](http://expressjs.com/api.html#req) object, the second the [response](http://expressjs.com/api.html#res) object:

	```js
	app.get('/', function(req, res) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

- These two arguments are automatically provided to the callback by Express.
  - The `request` object has properties and methods pertaining to the HTTP request and we use the `response` object primarily to send back our app's response to the request.

---

### The Route's Callback (cont.)
<br>

- Because they are just parameter names, you can change them. For example, feel free to use `request` for `req` and `response` for `res`:

	```js
	app.get('/', function(request, response) {
	  res.send('<h1>Hello Express</h1>');
	});
	```

---

### Practice (3 mins)<br>Define a Simple Route
<br>

- Define another route that matches a `get` request to a path of `/goodbye` that sends a text response of "Goodbye World".

- Don't forget to restart the server and test your new route by browsing to `localhost:3000/goodbye`.

---

### Question - Basic Routing
<br>

- **Is it okay to define more than one route on the same path?<br>For example:**

	```js
	app.get('/cars', function(req, res) {
  		res.send("Here's a list of my cars...");
	});
	
	app.post('/cars', function(req, res) {
  		res.send('Thanks for the car!');
	});
	```

---

### Request Parameters

- Remember the `params` hash in Rails? Well, the _request_ object in Express has a `params` object.

- **However**, it only contains the parameters contained in _named routes_:

- Let's add another route:

	```js
	app.get('/goodbye/:name', function(req, res) {
  		res.send('Goodbye ' + req.params.name);
	});
	```

- Restart and check it out:

	```sh
	localhost:3000/goodbye/PeeWee
	```

---

### Query String Values
<br>

- Who remembers **what a `query string` is?**

- In Express, we can access them in our route handlers using the `query` object attached to the _request_ object. Let's modify our root route to try this out:

	```js
	app.get('/', function(req, res) {
		var msg = req.query.msg ? req.query.msg : '!';
  		res.send('<h1>Hello Express ' + msg + '</h1>' );
	});	
	```

- **What can we type in the address bar to test this out?**

---

### Ways to Respond to a Request

- So far we have responded in our route handler (callback) code by using the `send` method on the _res_ (response) object.

- Here is a list of other methods that can be used to terminate the request/response cycle:
  - `res.json()` - Send a JSON response
  - `res.jsonp()` - Send a JSON response with JSONP support
  - `res.redirect()` -	Redirect a request
  - `res.render()` - Render a view template
  - `res.send()` - Send a response of various types
  - `res.sendFile()` - Send a file as an octet stream

---

### Ways to Respond to a Request (cont.)
<br>

- Let's change our `/goodbye` route to return `json` instead of plain text:

	```js
	app.get('/goodbye', function(req, res) {
  		res.json( {msg: 'Goodbye World'} );
	});
	```

- Try it out!

---

### Rendering Views

- We can use the `render` method on the _response_ object to render templates.

- Express can work with a multitude of _view engines_.

- [`Jade`](http://jade-lang.com/) is a template language that leverages indentation to create HTML with a "shorthand" syntax.

- When we scaffold an app using the _Express Generator_ (more on this later), Jade is the default because it is written by the same fine people that brought us the Express framework.

- [`EJS`](https://www.npmjs.com/package/ejs) (embedded JavaScript) templates look and work very much like _erb_ templates - much nicer IMHO!

---

### Rendering Views (cont.)

- To try out views in Express, let's say we decided to render a `home` view for the root route.

- Like in Rails, it's common to organize views inside of a separate folder. However, unlike Rails, we can call it and put it anywhere we want within our project. Rails' conventions are pretty genius though:

	```sh
	? mkdir views
	? touch views/home.ejs
	```

- `ejs` is the file extension for the EJS view engine.

- Note that we don't use a `.html.` before the file extension like we did in Rails.

---

### Rendering Views (cont.)
<br>

- We're not going to go into depth on EJS templates in this lesson. In fact, because MEAN Stack apps are Single-Page applications, server-side view engines are not very useful because they typically serve up an `index.html` page and HTML fragments from then on.

- As a consequence, EJS templates do not have a layout feature. However, they do have partials. To learn more, there's a link in the References section regarding EJS templating.

---

### Rendering Views (cont.)

- By default, Sublime/Emmet won't recognize EJS templates, so we can click the file type at the bottom right and select **HTML**. Or `shift-command-p` and install the _EJS_ Sublime package.

- After doing so, you will be able to type `!` or `html:5` and press tab to generate our HTML boilerplate in `home.ejs`:

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
  		<meta charset="UTF-8">
  		<title>Document</title>
	</head>
	<body>
	</body>
	</html>
	```

---
### Rendering Views (cont.)
<br>

- Add an `<h1>` inside the `<body>` so that we see something :)

	```html
	<body>
  		<h1>Home Page</h1>
	</body>
	```

---

### Rendering Views (cont.)
<br>

- Okay, now let's modify our callback in our root route to render our new `home.ejs` template:

	```js
	app.get('/', function(req, res) {
  		res.render('home');
	});
	```

- Just the file name, not the `ejs` extension.

- Restart, browse, why didn't it work?...

---

### Rendering Views (cont.)

- First off, we'll notice that Express' error messages aren't as "pretty" as those in Rails. Remember, Express is "lightweight".

- Express' errors usually won't be as helpful as in Rails, but this one, _Error: No default engine was specified..._, makes it clear that we need to specify a view engine.

- This is our first opportunity to configure our app:

	```js
	// Configure the app (app.set)
	app.set('view engine', 'ejs');
	```
- The `set` method on the Express `app` object is used to configure the app's settings...

---

### Rendering Views (cont.)
<br>

- We also need to tell Express **where** are views can be found:

	```js
	// Configure the app (app.set)
	app.set('view engine', 'ejs');
	app.set('views', path.join(__dirname, 'views'));
	```

- Don't be intimidated by this code:<br>`path.join(__dirname, 'views')`...

---

### Rendering Views (cont.)
<br>

- `path.join` is just a method that builds a properly formatted path from segment strings passed to it. `__dirname` is always available and represents the path of the current folder where the currently running code lives; and `views` is the name of the folder we created to hold our views.

- Restart and try again...

---

### Rendering Views (cont.)
<br>

- This time our server app won't even start up due to this error: _ReferenceError: path is not defined_.

- Class: _WFT Jim, why did you have us use a method that doesn't even exist?_<br>Jim: _For practice interpreting and learning from errors_ :)

---

### Rendering Views (cont.)
<br>

- The Node core contains a `path` module, so we don't have to `npm install` it, but we do have to `require` it:

	```js
	// Require modules
	var express = require('express');
	var path = require('path');
	```

- Restart and let's see what the next error is...

---

### Rendering Views (cont.)
<br>

- _Error: Cannot find module 'ejs'_ - this error is telling us that we need to install the EJS view engine package:

	```sh
	? npm i ejs -S
	```
	
- The `i` is a short for `install` and `-S` is short for `--save`.

- Express will automatically require the view engine for us, so we don't need to.

- Restart and bam!

---

### Passing Data to a View
<br>

- The purpose of using a view engine is so that we can dynamically render a view on the server before sending it to the client.

- We just used the `render` method, passing in the view name as an argument.

- We can also pass in a JavaScript object as a second argument, and all of it's properties will be available for use directly in the view within `ejs` tags!

---

### Passing Data to a View (cont.)
<br>

- Let's add a route to display a list of To Do's:

	```js
	app.get('/todos', function(req, res) {
	  var todos = [
	    {todo: 'Feed dogs', done: true},
	    {todo: 'Learn Express', done: false},
	    {todo: 'Have fun', done: true}
	  ];
	  res.render('todos/index', {
	  	todos: todos
	  });
	});
	```

---

### Passing Data to a View (cont.)
<br>

- Based on the path, `todos/index`, we will have to create a folder inside of our views folder named `todos` and add a filed named `index.ejs` to it:

	```sh
	? mkdir views/todos
	? touch views/todos/index.ejs
	```

---

<p style="margin-top:-100px"></p>
### Passing Data to a View (cont.)

- Now let's code our `todos/index.ejs`. Start by coping over the HTML from `home.ejs` and fix it up to look like this:

	```html
	<body>
	  <h2>Todos</h2>
	  <ul>
	    <% todos.forEach(function(t) { %>
	      <li>
	      <%= t.todo %>
	       - 
	      <%= t.done ? 'done' : 'not done' %>
	      </li>
	    <% }); %>
	  </ul>
	</body>
	```

- This should look very familiar to you. Lovers of Clown Hats - rejoice!

- Restart and browse to the new route - not bad :)

---

### Passing Data to a View (cont.)
<br>

- If you have data that you want available to **all** views, the Express `app` object has a `locals` object on it that you can add properties to.

- Let's see how we can use `locals` to provide our app's `title`. In `server.js`:

	```js
	app.set('views', path.join(__dirname, 'views'));
	// new code below
	app.locals.title = 'First Express';
	```

---

### Passing Data to a View (cont.)
<br>

- Then in both `home.ejs` and `index.ejs`, update the `<title>` element in the `<head>`:

	```html
	<meta charset="UTF-8">
  	<title><%= title %></title>
	```
	Restart and check out the browser tab!

---

### Add a Todo
<br>

- To demonstrate how we can add a todo (albeit, not persisted), let's add a `<form>` element to `index.ejs` below the `</ul>` tag:

	```html
	...
	  </ul>
		
	  <form action="/todos" method="post">
	    <input type="text" name="newTodo">
	    <input type="submit" value="Add Todo">
	  </form>
	```

- Wait...!

---

### Add a Todo (cont.)
<br>

- **Don't restart** the server and refresh the page. Why did the newly updated view appear without restarting? Well, view templates are processed with each request, so the server always sees the current version of views.

- **Now we need a route, what's it gonna be?**
<br>

---

### Add a Todo (cont.)

<br/>

- Let's stub it up like so:
	
	```js
	app.post('/todos', function(req, res) {
		res.render('todos/index');
	});
	```
	
- Now, restart, click the "Add Todo" button to submit a POST request and see what happens...

---

### Add a Todo (cont.)

- We're blowing up because the `todos` array is not accessible in our new route. In the upcoming lab, we'll see that this is a great opportunity for a module.

- For now, let's put our `todos` array on the `locals` object in `server.js`:

	```js
	app.locals.title = 'First Express';
	app.locals.todos = [
	  {todo: 'Feed dogs', done: true},
	  {todo: 'Learn Express', done: false},
	  {todo: 'Have fun', done: true}
	];
	```

---

### Add a Todo (cont.)
<br>

- Be sure to remove the `var todos` from inside the route handler and fix it up to be simply `res.render('todos/index');`

- Let's submit a new Todo and check DevTools' Network tab to see what the request looks like...

---

### Add a Todo (cont.)
<br>

- Checking the `Content-Type` of the Request Headers will show that our our data is being submitted to the server in a form's standard format: `application/x-www-form-urlencoded`

- This form data does not come in on the `params` object like it does in Rails, it comes in on the _request_'s `body` object...

---

### Add a Todo (cont.)
<br>

- Let's try logging it out first:

	```js
	app.post('/todos', function(req, res) {
	  console.log(req.body.newTodo);
	  res.render('todos/index');
	});
	```

- Restart and submit a new todo.

- Damn! What now...

---

### Add a Todo (cont.)
<br>

- Unlike the `req.params` and `req.query` objects that we saw earlier, Express by default does not parse the body for data by default.

- This is due to Express's minimalistic approach. It does not provide much functionality by default - we get to pick and choose what we want our app to spend time doing!

- The solution is **middleware**.

---

### Add a Todo (cont.)

- Each request in an Express app is essentially processed by a series of middleware functions.

- Even our route definitions are handled by Express's middleware stack - it just so happens they ended the request by calling `send` or `render`.

- We'll come back to adding a todo in a bit, but let's first take a closer look at middleware and the request/response cycle in Express.

---

### Express Middleware
<br>

- Middleware are functions that execute on each request made to the server.

- You can have any number of middleware that will process the request one by one in the order they were _mounted_ with `app.use()`.

---

### Express Middleware (cont.)
<br>

- Middleware can be used to, log info, compile css, do authentication, make changes to the req/res object, end the request-response cycle, etc.

- Once a piece of middleware has done its job, it either calls `next()` to pass control to the next middleware in the pipeline **or** ends the request as we've been doing with the `render` method.

---

### The Request/Response Cycle in Express
<br>

<img src="http://adrianmejia.com/images/express-middlewares.png" width="900">

---

### Adding our own Middleware

- Just to demonstrate, let's write and mount a simple middleware to log out the `user-agent` of each request:

	```js
	// Use middleware (app.use)
	// Be sure to mount before routes
	app.use(function(req, res, next) {
	  console.log(req.headers['user-agent']);
	  next();
	});
	```

- Note that we must call the `next` function that is passed in after the middleware has accomplished its task  - otherwise our app stops dead in it's tracks!

- Restart, refresh - neato!

---

### Common Express 4.0 Middleware

- __morgan__: Logger that logs requests.

- __body-parser__: Parses the body so that you can access data being sent in the request body with the `req.body` object.

- __cookie-parser__: Populates the `cookies` object on the _request_ object so that you can access data in cookies. For example, `req.cookies.name`. _cookie-parser_ is middleware which deals with the incoming _request_. To __set__ a cookie, you would use the `cookie` object on the _response_ object.

- __serve-favicon__: Serves the favicon from route _/favicon.ico_.

---

### Middleware
<br>

- Based upon the last slide, it should be clear that we need to mount the **body-parser** middleware. But let's take a look at [Express's docs pertaining to middleware](http://expressjs.com/guide/using-middleware.html).

- Let's look at the section entitled **Built-in middleware**.  Interestingly, since version 4.x, Express no longer includes it's own middleware (with the exception of `express.static`).  Instead, Express expects its developers to choose from the numerous modules available to install.

---

### Middleware (cont.)

- Before we install **body-parser**, let's mount Express' `express.static` middleware so that when the client requests any static assets, such as CSS, JavaScript, image or HTML files, it will immediately find and send the requested asset to the client:

	```js
	app.use(express.static(path.join(__dirname, 'public')));
	```

- That's all there is to it! Now, all we have to do is put our static assets into a folder named `public` and the middleware will return the asset when it is requested by the browser.

- Let's check this out...

---

### Middleware (cont.)
<br>

- Let's create a `public` folder and a `about.html` file inside of it:

	```sh
	? mkdir public
	? touch public/about.html
	? echo "<h1>About Page</h1>" > public/about.html
	```

- Restart the server and browse to `localhost:3000/about.html` to test it out.

- Note that we do not include "public" when specifying the path to the resource.

---

### Add a Todo (cont.)

- Okay, let's get back to adding new todos! Here is the [link to the middleware officially supported by the Express team](https://github.com/senchalabs/connect?_ga=1.31418111.1784656250.1446759094#middleware).

- `body-parser` just happens to be at the top of the list :)

- First we need to install it:

	```sh
	? npm install body-parser --save
	```
	
- Next we need to `require` it:

	```js
	var path = require('path');
	// new code below
	var bodyParser = require('body-parser');
	```

---

### Add a Todo (cont.)
<br>

- Let's mount the `body-parser` middleware to process both _application/json_ and _application/x-www-form-urlencoded_ data in the body:

	```js
	app.use(express.static(path.join(__dirname, 'public')));
	// new code below
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	```

- Note that `bodyParser` has methods on it that we need to invoke. This is just the way this middleware is designed to work

---

### Add a Todo (cont.)
<br>

- With the middleware installed and mounted, we can now use the `body` object on the _request_ to access the new Todo being submitted and add it to the `app.locals.todos` array:

	```js
	app.post('/todos', function(req, res) {
	  app.locals.todos.push({
	    todo: req.body.newTodo,
	    done: false
	  });
	  res.render('todos/index');
	});
	```
	
- Restart - sweeet!

---

### Practice (5 mins) - Modules

- To get a little more practice using modules, let's refactor our code a bit.

- Instead of assigning an array literal to `app.locals.todos`, let's return the array of _todos_ from a module!

- Let's create a module named `todos.js` inside of a folder named `data`.

- When you are done, this is how the line of code in `server.js` should look:

	```js
	app.locals.todos = require('./data/todos');
	```

---

## <span style="text-transform:lowercase">express-generator</span>

---

### <span style="text-transform:lowercase">express-generator</span>
<br>

- Okay, so we've had some fun getting an Express app up and running from scratch.

- We've included some basic routes and even mounted some common and custom middleware!

- In this part of the lesson we'll take a look at how a tool, `express-generator`, structures an Express app and mounts key middleware by default.

- Think of `express-generator` as a very lightweight `rails new...`
 
---

### <span style="text-transform:lowercase">express-generator</span> (cont.)
<br>

- `express-generator` is a command line tool that quickly generates a skeleton Node app that incorporates the Express framework.

- Let's install it:

	```sh
	? npm install express-generator -g
	```

- `express-generator` has a CLI that we want to be able to run from any project, that's why we install it using the global `-g` flag.

---

### <span style="text-transform:lowercase">express-generator</span> (cont.)

Let's take a look at the options available to us:

```sh
? express -h
```
<br>

```sh
  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass) (defaults to plain css)
    -f, --force         force on non-empty directory
```    
---

### Generating Our App's Skeleton with<br><span style="text-transform:lowercase">express-generator</span>

- We are going to generate a new app, so let's cd up and out of our `first-express` app.

- We will use the `-e` option to use the __ejs__ template engine instead of __jade__.

- From your new app's parent directory (just like `rails new...`)

	```sh
	? express -e second-express
	? cd second-express
	```

---

### Folder Structure

- Our scaffolded folder structure will look like this:

	```sh
	├── app.js
	├── bin
	│   └── www
	├── package.json
	├── public
	│   ├── images
	│   ├── javascripts
	│   └── stylesheets
	│       └── style.css
	├── routes
	│   ├── index.js
	│   └── users.js
	└── views
	    ├── error.js
	    └── index.js
	```

- Let's explore the above structure in Sublime.

---

### Install Dependencies
<br>

- A quick look at the `package.json` file reveals the default modules Express has set up.

- These modules are not installed in the `node_modules` folder by default.

- `? npm install` without specifying a package name will install the modules listed in `package.json` into the `node_modules` folder.

---

### Starting the Application
<br>

- Starting a generated Express app properly is slightly different than what we've seen.

- Type `npm start`. This will execute the start script specified in *package.json*.

- `npm start`, then browse to `localhost:3000`.

---

### <span style="text-transform:lowercase">bin/www</span> - WTF?

- What's with this `./bin/www` file? Well, the Express team decided to partition out the HTTP server related code out of `app.js` to remove code that's not really key to our app.

- Take a look at how the Express app in `app.js` exports itself and how it is required inside `www` (no file extension - weird, but true).

- Normally, we don't need to make many changes inside of `www`. We will mess with it a bit when we look at doing a realtime app, but for now, we are just going to change our app's file name...

---

### Renaming <span style="text-transform:lowercase">app.js</span>
<br>

- In MEAN Stack apps, Angular's main module is often named `app.js` and this could get confusing having two `app.js` files. This is why many developers name their main Express file `server.js`.

- So let's rename it...

---

### Renaming <span style="text-transform:lowercase">app.js</span>
<br>

- First, rename `app.js` to `server.js`.

- Then, inside of `www`, change line 7 from:

	```js
	var app = require('../app');
	```
	
	to:
	
	```js
	var app = require('../server');
	```

- That's it! Restart and test.

---

## Best Practice Routing

---

### The Express <em>Router</em> Object
<br>

- There are several ways to set up [routing in an Express](http://expressjs.com/guide/routing.html) app.

- In our `first-express` app, we used Express' `app.get` and `app.post` methods to mount our routes.

- Express also provides a `Router` "factory" function that creates instances of "routers".

- The router objects can then be used to provide more flexible and powerful routing.

---

### The Express <em>Router</em> Object (cont.)
<br>

- As a model example of using this better approach, let's look at how the `express-generator` sets up its routing.

- First, there's a `routes` folder containing **_____________?**

- Next, those route modules are required on lines 8 & 9 of `server.js`.

- Let's take a look at what those modules export...

---

### The Express <em>Router</em> Object (cont.)

- Yes, those modules export instances of Express' `Router` object after they have had their specific routes defined with `get` methods, just like we did with `app.get()`.

- Lastly, the routers are mounted in the middleware stack with the `app.use` method in lines 25 & 26 like this:

	  ```js
		app.use('/', routes);
		app.use('/users', users);
	  ```
- **Developer Reasoning:  What do you suppose the Express router object _really_ is? Discuss with your pair for a minute.**

---

### The Express <em>Router</em> Object (cont.)
<br>

- <p>It's important to understand that the path specified in the `app.use` is **combined** with the path specified on the router objects...</p>

---

<p style="margin-top:-150px"></p>
### The Express <em>Router</em> Object (cont.)

<img src="https://camo.githubusercontent.com/eddb0d05c3e11e539e08c24733f8fcdcdae96b85/687474703a2f2f7279616e73756b616c652e636f6d2f76697a2f74682f6a732f657870726573736a735f345f726f75746572732f657870726573736a735f345f726f75746572732e706e67" width="900">

---

### Pledge to Use RESTful Routes
<br>

- Although MEAN Stack apps have very little convention, pledge that you will define RESTful routes *whenever possible*.

- Thank you!

---

### Practice (10 mins)<br>Router Refactor

<p style="text-align:left">Let's refactor our <em>first-express</em> application to use the <em>Router</em> object as modeled by the app generated using <em>express-generator:</em></p>

1. Modularize with a module. Create a `routes` folder and name module `index`. 
	
2. Export an instance of `Router`
	
3. Mount the router instance using `app.use` with a path of `/`.

<p style="text-align:left">continued...</p>

---

### Practice (10 mins)<br>Router Refactor (cont.)
<br>

<p style="text-align:left"><strong>Bonus</strong>: Put the <em>todos</em> related routes in it's own module.</p>

<p style="text-align:left"><strong>Advanced Bonus</strong>: Get the <em>router.post</em> route to work! There are a couple of ways to accomplish this...<br>Hint: Remember, that you can require a module more than once.</p>

---

## References
<br>

<p style="text-align:left"><em>Note: When searching for info on the Express framework, be sure that you search for the info for version 4 only - there were significant changes made from earlier versions.</em></p>

- [Express](http://expressjs.com/)

- [Use EJS to Template Your Node Application](https://scotch.io/tutorials/use-ejs-to-template-your-node-application)



![](http://core0.staticworld.net/images/idge/imported/article/nww/2011/06/mongodb-100275964-orig.png)
# Intro to MongoDB

| Learning Objectives |
| :--- |
| Describe how MongoDB is Different from a RDBMS |
| Start and Stop the MongoDB Engine |
| Save and Retrieve MongoDB Documents using the Mongo Shell |
| Model Data using Embedding & Referencing |

## Roadmap
- MongoDB vs. Relational SQL Databases
- More About MongoDB
- Installing and Starting MongoDB
- Creating a Database and Inserting Documents
- Data Modeling in MongoDB
- Querying Data
- Updating Data
- Removing Data

## MongoDB vs. Relational SQL Databases

### Terminology

<img src="http://4.bp.blogspot.com/-edz2_QrFvCE/UnzBhKZE3FI/AAAAAAAAAEs/bTEsqnZFTXw/s1600/SQL-MongoDB+Correspondence.PNG" style="width:900px">

As diagramed above, there is a one-to-one mapping of the key concepts of a database.

### Key Differences of MongoDB

#### Schema-less
As you saw when using PostgreSQL, **every** row in a given table has the same number of columns, each with the same datatype.
 
However, documents (think SQL rows) within the same MongoDB collection (think SQL table) can have a varying number of fields (think SQL columns).

The fields don't have to be named the same, nor do they need to contain similar data. In fact, a field with the same name can hold different types of data - not that it would be recommended to do this.

#### No Table Joins
In a SQL DB, we break up related data into separate tables. These separate tables are later "joined" as necessary in queries.

In MongoDB, there are no joins. Related data, for example, a _post_ has many _comments_, is often _embedded_ in a single document (example later).  We'll also see another way of modeling associations between data using _referencing_.

The supporters of MongoDB highlight the lack of table joins as a performance advantage since joins are expensive in terms of computer processing.

## More About MongoDB

### Overview

<img src="https://s-media-cache-ak0.pinimg.com/736x/d3/2e/1b/d32e1b0ae6736a2fd7ec0e391c0013b2.jpg" style="width:900px">

#### What is MongoDB?

MongoDB is the [dominate player](http://db-engines.com/en/ranking) in the world of data stores known as _NoSQL databases_, also called _document databases_. NoSQL databases do not model or store data in the tabular relations we became familiar with in unit two.

MongoDB puts the "M" in the MEAN Stack, a technology stack that emphasizes the use of JavaScript in both the front-end and back-end.

Instead of _SQL_ (_Structured Query Language_), MongoDB uses JavaScript as it's native language for database operations.

You're going to see that working with **data** in MongoDB is like working with JavaScript objects.

Although MongoDB is ideal when working in the world of full-stack JavaScript, it can be used with a multitude of programming languages and frameworks, including Ruby on Rails! When used with Rails, there is no need for database migrations! If this interests you, google the _mongoid_ ORM gem.

#### Hu-mongo-us Use Case

NoSQL databases are heavily used in big data and social media applications.  

They can store vast amounts of data more easily than a relational DB can.

They are also very useful in applications where the data is "unstructured". For example, think about how much easier it would be to model the data representing a drawing for an online drawing application without fixed columns and tables. A complex, semi-structured model like this would be a great application for a NoSQL database like MongoDB.

Also, MongoDB is often used to prototype applications because an application's database can more easily adapt as the application's requirements change. 

However, as great as NoSQL databases are for real-time big and unstructured data, they are not ideal for applications that require a high level of transactional support. For example:

> Consider what happens when a stock is bought/sold at a stock exchange. The buy/sell event would impact several tables in the DB that are used to track the transaction, customer accounts/balances, the equity's ownership, etc.

**What could happen if all the information related to the purchase/sale of a stock was not updated at the _exact_ same time?**

Ensuring this point-in-time consistency across multiple data tables is a cornerstone of a RDBMS like PostgreSQL.

MongoDB is designed to maintain consistency at the _document_ level only. If we needed to ensure that more than one document, such as the documents representing the stock, the buyer's account and the seller's account, are updated simultaneously, it would take a lot of code and some hoops to jump through to make this happen in MongoDB.  Whereas this "transactional" support is the bread and butter of a RDBMS.

### Data Format

- A MongoDB database consists of _collections_ that contain _documents_.
- A _document_ in MongoDB is composed of _field_ and _value_ pairs.

Lets take a look of what a MongoDB _document_ might look like:

```js
{
    _id: ObjectId("5099803df3f4948bd2f98391"),
    name: { first: "Alan", last: "Turing" },
    birth: ISODate("1912-06-23T00:00:00Z"),
    death: ISODate("1954-06-07T00:00:00Z"),
    contribs: [ "Turing machine", "Turing test", "Turingery" ],
    views: 1250000
}
```

__What does this data structure look very similar to?__

<br><br><br>

A MongoDB _document_ is very much like JSON, except it is stored in the database in a format known as _BSON_ (_Binary JSON_).

_BSON_ basically extends _JSON_ with additional data types, such as __ObjectID__ and __Date__ shown above.

### The Document *_id*

The *_id* is a special field represents the document's _primary key_ and will always be listed as the first field. It must be unique.

We _could_ explicitly set the *_id* like this:

```js
{
	_id: "B123",
	desc: "5 Gallon Bucket",
	price: 7.99
}
```

However, it's much more common to allow MongoDB to create it implicitly for us using its _ObjectID_ data type as shown in the Alan Turing document above.

A few review questions before we move on:

1. **For an application that visualizes airplanes' trips on a map using their GPS coordinates in real-time, which database technology might be more suitable, a SQL or NoSQL database system?**
2. **What is the name of the field that serves as a document's primary key?**
3. **Would it be possible to store the following two documents in the _same_  collection?**<br>

	```js
	{
		_id: ObjectId("5099803df3f4948bd2f23456"),
		make: "Toyota",
		model: "Prius",
		year: 2016
	}
	```
	
	```js
	{
		_id: 123456,
		item: "Hamburger",
		cheese: true
	}
	```

## Installing and Starting MongoDB

### Installation

You may already have MongoDB installed on your system, lets check in terminal `? mongod` (note the lack of a "b" at the end").

If you receive an error, lets use _Homebrew_ to install MongoDB:

1. Update Homebrew's database (this might take a bit of time)<br>`? brew update`
2. Then install MongoDB<br>`? brew install mongodb`
3. Now create the directory where your data will be stored<br>`? mkdir -p /data/db`<br>be sure you include the leading slash.
4. Get your username<br>`? whoami`
5. Grant permission<br>`? sudo chown -R <your username> /data/db`

### Updating MongoDB

If you do have MongoDB installed, it can be upgraded to its latest version:

1. Update Homebrew's database (this might take a bit of time)<br>`? brew update`
2. Then upgrade MongoDB<br>`? brew upgrade mongodb`

### Start Your Engine

`mongod` is the name of the actual process for the database engine. The installation of MongoDB does not set the mongoDB engine to start automatically when our systems boot up.

A common source of errors when starting to work with MongoDB is forgetting to start the database engine. So, be sure to check that you have the engine running in a terminal window if you get an error.

To start the database engine, type `mongod` in terminal.

MongoDB's default port is 27017.

### Stopping the MongoDB Engine

Press `control-c` to stop the engine.

It's important to stop Mongo's database engine **before** closing the terminal window.  Otherwise, you will need to manually shut down the process with this command:

```
$ pgrep mongo
31132
$ kill 31132
```

## Creating a Database and Inserting Documents

### Before we Start

In this lesson, we are going to be working directly with MongoDB to create and modify data using the _Mongo Shell_ application in a Terminal window. This is similar to how you were introduced to PostgreSQL via the _psql shell_.

You will find the Mongo Shell handy for examining and modifying data while developing your application.

However, within your application, you will be using software called _Mongoose_, which will make connecting to, and working with data in MongoDB much easier - similar to how _ActiveRecord_ made working with PostgreSQL much easier.

### The Mongo Shell

MongoDB installs with a client app, a JavaScript-based shell, that allows us to interact with MongoDB directly.

Make sure that the MongoDB engine (`mongod`) is running then...

Start the app in terminal by typing `mongo`

The app will load and change the prompt will change to `>`

List the shell's commands available: `> help`

Show the list of databases: `> show dbs`

Show the name of the currently active database: `> db`

Switch to a different database: `> use [name of database to switch to]`

Let's switch to the `local` database: `> use local`

Show the collections of the current database `> show collections`

### Creating a new Database

To create a new database in the Mongo Shell, we simply have to _use_ the database.  Lets create a database named _myDB_:

```
> use myDB
```

### Inserting Data into a Collection

This is how we can create and insert a document into a collection named _people_:

```
> db.people.insert({
... name: "Fred",	// Don't type the dots, they are from the 
... age: 21			// shell, indicating multi-line input mode
})
```
Using a collection for the first time creates it!

__YOU DO: Let's add another person to the _people_ collection. But this time, add an additional field called _birthDate_ and assign it a date value with something like this: *birthDate: new Date('3/21/1981')*__

Remember, documents in Mongo are schema-less. Each document within a collection can contain **completely** different data.  This is in direct contrast to SQL databases which have schemas where contains the same type of data.

To list all documents in a collection, we can use the _find_ method on the collection without any arguments:

```
> db.people.find()
```

We can also provide an optional _query object_ to specify criteria.  If we provide an empty query object, `find` will once again return all documents:

```
> db.people.find({})
```

#### Plant the Seed and Watch your Data Grow

To practice querying our database, here are few more documents to put in your _people_ collection.

In addition to a single document, we can also provide an __array__ to the _insert_ method and it will create a document for each object in the array.

```js
db.people.insert(
	[
		{
			"name": "Emma",
			"age": 20
		},
		{
			"name": "Ray",
			"age": 45
		},
		{
			"name": "Celeste",
			"age": 33
		},
		{
			"name": "Stacy",
			"age": 53
		},
		{
			"name": "Katie",
			"age": 12
		},
		{
			"name": "Adrian",
			"age": 47
		}
	]
)
```
Be sure to include the closing paren of the _insert_ method.

#### Creating Data Programmatically (using JavaScript code)

Let's see how we might create data programmatically.

Here's what we're going to do:

1. Loop through our _people_ collection.
2. Create a document in a collection named _bankAccounts_ for each person and "link" that document to the person to which it is for.

Enter the following JavaScript in the shell:

```
> var cursor = db.people.find();
> while (cursor.hasNext()) {
... var person = cursor.next();
... var acctNo = Date.now() + Math.floor(Math.random() * 100);
... var bal = Math.floor(Math.random() * 2000);
... db.bankAccounts.insert({
... owner: person._id,
... accountNo: acctNo,
... balance: bal
... });
... }
```

> Note: Using the `find()` method in the Mongo Shell returns a "cursor"

Luckily, we won't have to work with cursors like this in your applications thanks to the Mongoose ODM (Object _Document_ Mapper) you'll see later today.

**What command do we enter to check out the _bankAccount_ collection?**

As expected, the documents in the `bankAccounts` collection have an `owner` field that holds an `ObjectId` that "references" the `_id` of a document in the `People` collection.

Since there are no joins in a NoSQL database, if we have a document that "references" another document, we would have to make a separate query to fetch the referenced document.

**Only a single collection can be queried in a single command!**
**Why? Because there are no joins in a NoSQL database to join data across collections.**

#### Review Questions

- **How do we "create" a new collection?**

- **What method adds documents to a collection?**

## Data Modeling in MongoDB

There are two ways to model related data in MongoDB:

- via __embedding__ (entire "document", aka sub-document, is contained within the related document)
- via __referencing__ (a document contains the related document's `ObjectId` only)

Both approaches can be used simultaneously in the same document.

### Embedded Documents

In MongoDB, by design, it is common to __embed__ related data in the parent document.

Modeling data with the __embedded__ approach is different than what we've seen in a relational DB where we spread our data across multiple tables.

However, MongoDB works best when related data is embedded. Embedded data allows MongoDB to read and return large amounts of data far more quickly than a SQL database that requires join operations.

To demonstrate __embedding__, we will add another person to our _people_ collection, but this time we want to include contact info. A person may have several ways to contact them, so we will be modeling a typical one-to-many relationship: A Person has many Contacts / A Contact belongs to a Person

Let's walk through this command by entering it together:

```
> db.people.insert({
... name: "Manny",
... age: 33,
... contacts: [
... {
... type: "email",
... contact: "manny@domain.com"
... },
... {
... type: "mobile",
... contact: "(555) 555-5555"
... }
... ]
... })
```

The embedded data objects, like we see above, are called _subdocuments_. When we start working with Mongoose, these subdocuments will automatically have their own `_id`s!

The above approach of embedding "contact" data provides a great deal of flexibility in what types and how many contacts a person may have.

Another example of a data model where embedding works well is the typical a _post_ has many _comments_ scenario. Embedding comments within a _post_ document works great because those comments don't make sense without the post that they belong to.


### Referencing Documents (linking)

We can model data relationships using a __references__ approach where related data is stored in separate documents. These documents, due to the fact that they hold different types of data, are likely be stored in separate collections for organizational purposes (MongoDB doesn't care, but we might).

Earlier, we created a _bankAccounts_ collection to demonstrate the __references__ approach. Referencing a _bankAccount_ from a _person_ document may make more sense than embedding it because often more than one person can have access to the same _bankAccount_. If the _bankAccount_ were embedded, any update to the _bankAccount_, such as it's balance, would have to be repeated on every _person_ document with that _bankAccount_.

Consider also that documents can reference more than a single document with the use of arrays of ObjectIds.  For example, we could have an _accounts_ field that is an array on the person documents.

Again, because there are no "joins" in MongoDB, retrieving a person's bank account information would require a separate query on the _bankAccounts_ collection.

You can put the linking field on the _bankAccount_ documents, the _person_ documents, or both! It's your call!  **How is this different than what we saw in PostgreSQL?**

**What is the downside to including the references on both sides of the relationship?**

These decisions depend upon the design and functionality of your application and they are not always black-and-white. There are plenty of tutorials/videos discussing the pros and cons of embedding vs. referencing...

### Data Modeling Best Practices

MongoDB was designed from the ground up with application development in mind. More specifically, what can and can't be done in regards to data is enforced in your application, not the database itself (like in a SQL database).

Here are a few things to keep in mind:

- For performance and simplicity reasons, lean toward _embedding_ over _referencing_.
- Prefer the _reference_ approach when the amount of child data is unbound and there is a danger of exceeding the 16MB size limit for a document - an uncommon situation however - the entire body of work of Shakespeare can be stored in 5 megabytes!
- Prefer the _reference_ approach when multiple parent documents access the same child document and that child's data changes frequently. This avoids having to update redundant data in multiple locations.
- Obtaining _referenced_ documents requires multiple queries by your application instead of a single query when using _embedding_ - this is why _embedding_ is much more performant.
- In the _references_ approach, depending upon your application's needs, you may choose to maintain links to the related document's *_id* in either document, or both.

Also, if your data model calls for using _referenced_ data, _Mongoose_ will make it easier to implement using the _populate_ method.

For more details regarding data modeling in MongoDB, start with [this section of mongoDB's documentation ](http://docs.mongodb.org/manual/core/data-modeling-introduction/) or this [hour long YouTube video](https://www.youtube.com/watch?v=PIWVFUtBV1Q)

## Querying Data
<br>
>PSA: We are going to take a look at MongoDB's native query methods.  However, as fun as it is, in our applications, we will be using a very popular ODM, _Mongoose_.  Many of Mongoose's methods are similar to Mongo's, so it's still worth paying attention :)
<br>

We've seen how to retrieve all of the documents in a collection using the `find()` method.

We can also use the `find()` method to query the collection by passing in an argument containing our query criteria as an JS object:

```
> db.people.find( {name: "Miguel"} )
```

Here's how we can use MongoDB's `$gt` query operator to return all _people_ documents with an age greater than 20:

```
> db.people.find( {age: { $gt: 20 } } )
```

MongoDB comes with a slew of built-in [query operators](http://docs.mongodb.org/manual/reference/operator/query/#query-selectors) we can use to write complex queries.

__YOU DO:  Retrieve people that are less than or equal to age 30?__

In addition to selecting which data is returned, we can modify how that data is returned by limiting the number of documents returned, sorting the documents, and by projecting which fields are returned.

This sorts our age query and sorts by _name_:

```
> db.people.find( {age: { $gt: 20 } } ).sort( {name: 1} )
```
The "1" indicates ascending order. 

[This documentation](http://docs.mongodb.org/manual/core/read-operations-introduction/) provides more detail about reading data.

>Notice that the `query object`, is just that, a JS object with key:value pairs.

## Updating Data

In MongoDB, we use the `update()` method on a collection.

We will need to specify the _update criteria_ (like we did with `find()`), and use the `$set` action to set the new value.

```
> db.people.update( { name: "Miguel" }, { $set: { age: 99 } })
```

By default `update()` will only modify a single document. However, with the `multi` option, we can update all of the documents that match the query.

```
> db.people.update( { name: { $lt: "M" } }, { $inc: { age: 10 } }, { multi: true } )
```
We used the `$inc` update operator to increase the existing value.

Here is the [list of Update Operators](http://docs.mongodb.org/manual/reference/operator/update/) available.

__YOU DO: add another Contact to our person document named "Manny". Hint: you will need to use the link above to discover the Array Update Operator to use for this__

## Removing Data

We use the `remove()` method to data from collections.

If you want to completely remove a collection, including all of its indexes, use `[name of the collection].drop()`.

Call `remove({})` on the collection to remove **all** docs from a collection.

Otherwise, specify a criteria to remove all documents that match it:

```
>db.people.remove( { age: { $lt: 16 } } )
```
__YOU DO: Choose a person document by name and remove them from the collection.__

## Exercise

Create a file named `mongo.js` and type in an object that represents a MondoDB document that would model the following scenario:

- A gamer that plays games.
- The gamer has `name`, `birthdate`, and `favoriteGame` attributes.
- The gamer would like to track a chronological history of scores for each type of game they play.

We'll review in 10 minutes.

## Essential Questions

**SQL Tables are represented in MongoDB with ______?**

__While in MongoDB's shell, what command would we enter to retrieve all of the documents from a collection named _books_?__

## References

[mongoDB homepage](https://www.mongodb.org/)

[mLab - MongoDB Cloud Hosting](https://mlab.com/)

[MongooseJS - ODM](http://mongoosejs.com/)

0





[click here to view as a presentation](https://presentations.generalassemb.ly/85fb003f3063e6d152da8a1ab51a51ab#/1)

---

# Intro To
<br>
<img src="http://aredo.github.io/jakartajs-may-2014-meetup/images/mongoosejs.png" width="900px">

---

# Learning Objectives
<br>

- Describe the use case for Mongoose

- Define a basic Schema for a single Model

- Create and Read documents using a Model

- Define default values in a Schema

- Define validations in a Schema

---

# Roadmap
<br>

1. Intro to Mongoose
1. Including Mongoose in an app
1. Defining Schemas in Mongoose
1. Built-in Types for Properties
1. Compiling Schemas into Models
1. Use a Model to Create data
1. Use a Model to Read data
1. Defining default values for a Property
1. Defining validations for a Property
1. Essential Questions

---
# Intro to Mongoose
---
## Intro to Mongoose
<br>

- What is Mongoose?

- Sneak peak of some Mongoose code

- The big picture

---
### What is Mongoose?

---
<p>Yes, this guy, but not in the context of MongoDB...</p>

<img src="https://i.ytimg.com/vi/0HihH3m_ltY/hqdefault.jpg" width="900">

---
### What is Mongoose?
<br>

- Remember _ActiveRecord_?  **What is it?**

- _Mongoose_ is to MongoDB as _ActiveRecord_ is to a SQL database. However, because it maps code to Mongo's _documents_, it is referred to as an **Object Document Mapper (ODM)** instead of an ORM, but their general purpose is the same.

---
### What is Mongoose? (cont.)
<br>

- Using the Mongoose ODM is by far the most popular way to perform CRUD on a MongoDB.

- Let's check out the landing page for Mongoose and see what it has to say for itself...

	<a href="http://mongoosejs.com/index.html" target="_blank">Mongoose Homepage</a>

---
### What is Mongoose? (cont.)

- So, Mongoose's homepage says it best:

>"Mongoose provides a straight-forward, schema-based solution to model your application data"

- Wait a second, what's with this "schema" business, isn't MongoDB schema-less?  

- Well, yes it is, however, the vast majority of applications benefit when their data conforms to a defined structure (schema).

- Mongoose allows us to define schemas and ensures that documents conform.

---
### What is Mongoose? (cont.)
<br>

- Mongoose also provides lots of other useful functionality:
	- Default property values
	- Validation
	- Automatic related model population via the `populate` method
	- _Virtual properties_ - create properties like "fullName" that are not persisted in the database
	- Custom _Instance methods_ which operate on the document
	- _Static methods_ which operate on the entire collection 
	- `pre` and `post` event lifecycle hooks (Mongoose "middleware")

---
### Sneak peak of some Mongoose code
<br>

- For a preview of what Mongoose does, let's review the small amount of code shown on the Mongoose homepage...

---

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});
```

<p>So, the big picture is...</p>

---
### The Big Picture 
<br>

- Here is the big picture overview of the components we'll be working with:

<img src="https://i.imgur.com/Q6A7KTQ.png" width="900">

---
## Review Question
<br>

**In your own words, describe the use case for Mongoose (what is it's purpose and when might you choose to use it?).**

---
# Including Mongoose<br>in an App
---
## Including Mongoose in an App
<br>

- Create an Express app

- Install Mongoose

- Configure Mongoose in a module

- Adding event listeners to the Mongoose connection

---
### Create an Express App
<br>

- Let's use Express Generator:

	```sh
	? express first-mongoose -e
	```
	then
	
	```sh
	? cd first-mongoose && npm install
	```
	
- Let's also change `app.js` to `server.js` - **what do we have to do?**

---
### Install Mongoose
<br>

- Installing the Mongoose package is straight forward:

	```sh
	? npm i mongoose -S
	```
	Note: `i` is a shortcut for `install` and `-S` is a shortcut for `--save`
	
---
### Configure Mongoose in a module

- We're going to create a separate module named `database.js` and put it in a folder named `config`:

	```sh
	? mkdir config
	? touch config/database.js
	```

- Then in _database.js_, let's connect to a database named `movies`:

	```js
	var mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/movies');
	```
	
- **What happens if a database named `movies` does not exist?**

---
### Configure Mongoose in a module (cont.)
<br>

- Time to require our `database.js` module in `server.js`:

	```js
	var bodyParser = require('body-parser');
	
	// connect to the database with Mongoose
	require('./config/database');
	```

---
### Configure Mongoose in a module (cont.)
<br>

- <p>Note that we aren't assigning our module to a variable. That's because there's no need to because:</p>
	- We didn't export anything
	- We didn't need to export anything because we will be requiring the `mongoose` module as needed and...
	- Since Mongoose is a singleton, changes and configuration on it is reflected everywhere we require it.

---
### Configure Mongoose in a module (cont.)
<br>

- <p>Time to check if our app starts up without errors:</p>
	- Ensure that the MongoDB engine is running in a separate Terminal session:<br>`? mongod`
	- Start our app:<br>`? node bin/www`
	- Browse to:<br>`localhost:3000`

- No errors?  Great!  However, wouldn't it be nice to know that our connection to our database was successful?  Sure it would...

---
### Adding event listeners to the Mongoose connection
<br>

- The Mongoose connection object inherits from Node's `EventEmitter` which allows us to listen to defined events.

- Let's listen to the `open` and `error` events...

---
### Adding event listeners (cont.)

- Let's modify our _database.js_ module as follows:

	```js
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/movies');
	
	// shortcut to mongoose.connection object
	var db = mongoose.connection;
	
	db.once('open', function() {
  		console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
	});
	
	db.on('error', function(err) {
  		console.error(`Database error:\n${err}`);
	});
	```

- Now check it out with both the MongoDB engine running and not running (to trigger an error).

---
## Review Questions
<br>

1. **What is the advantage of creating a `database.js` module?**

2. **What method on the Mongoose object connects to a MongoDB database?**

---
# Defining Schemas in Mongoose

---
## Defining Schemas in Mongoose
<br>

- Create a module for the Schema/Model

- Define a basic Schema for a `Movie` model

---
### Create a module for the Schema/Model

- Now that we are connected to the MongoDB engine, it's time to define our first schema.<br>**Review: Do we use schemas to perform CRUD?**

- So, where are we going to put our app's schemas and models?  In their own folder - of course!

- Just like Rails, we are inspired by the MVC design pattern:

	```sh
	? mkdir models
	? touch models/movie.js
	```

- It is customary to have a single file per model where we define and compile its schema.

---
### Define a basic Schema for a _Movie_ model
<br>

- In our schema/model files, we will always do this:

	```js
	var mongoose = require('mongoose');
	// shortcut to the mongoose.Schema constructor function
	var Schema = mongoose.Schema;
	```

- Creating the shortcut to the `mongoose.Schema` constructor function is optional but convenient when defining complex schemas.

- Now let's define our schema...

---
### Define a basic Schema (cont.)
<br>

- Here's our basic _Movie_ schema:

	```js
	var Schema = mongoose.Schema;
	
	var movieSchema = new Schema({
  		title: String,
  		releaseYear: Number,
  		rating: String,
  		cast: [String]
	});
	```

- Note the `cast` property's type is an Array of Strings.

---
### Define a basic Schema (cont.)
<br>

- Vocab note:
	- A **property** may be referred to as a "**path**", or "**field**".

- **YOU DO:**
	- Add an additional path named `nowShowing` with a type of `Boolean`.

---
### Define a basic Schema (cont.)
<br>

- What we have defined is a very basic schema. Later we will see much more complex schemas.

- For now, let's take a look at the eight built-in types available...

---
## Built-in Types for Properties
<br>

- The types that we can assign to properties are known as `SchemaTypes`

- There are 8 built-in types that we can specify for our properties:
	- **String**
	- **Number**
	- **Boolean**
	- **Date**
	- **mongoose.Schema.Types.ObjectId**
	- **mongoose.Schema.Types.Buffer**
	- **Array - []** 
	- **mongoose.Schema.Types.Mixed**

---
# Compiling Schemas into Models

---
## Compiling Schemas into Models
<br>

#### **Are schemas used to perform CRUD?**

---
### Compiling Schemas into Models
<br>

- Just like we saw with ActiveRecord, CRUD is performed using a **Model**.

- Compiling a schema into a model is as easy as this:

	```js
	var Schema = mongoose.Schema;
		
	var movieSchema = new Schema({
  		title: String,
  		releaseYear: Number,
  		rating: String,
  		cast: [String]
	});
	
	// Compile the schema into a model and export it
	module.exports = mongoose.model('Movie', movieSchema);
	```

---

# Use a Model to Create data

---
### Use a Model to Create data
<br>

- Now that we have a model, we're ready to perform some CRUD!

- First up is **creating** data.

- Like in ActiveRecord, we have two ways to create documents:
	- `new` + `save`
	- `create`

- For a treat, let's `create` a document in Node's REPL...

---
### Use a Model to Create data (cont.)
<br>

```sh
? node
> require('./config/database')
> var Movie = require('./models/movie')
> Movie.create({
... title: 'Star Wars',
... releaseYear: 1977
... }, function(err, doc) {
... console.log(doc);
... })
```

- <p>Logged out will be a document that looks something like...</p>

---
### Use a Model to Create data (cont.)
<br>

```js
{ __v: 0,
  title: 'Star Wars',
  _id: 57ea692bab09506a97e969ba,
  cast: [] }
```

- The `__v` field is added by Mongoose to track versioning - ignore it.

- Note that although we did not supply a value for the `cast` property, it was initialized to an array - ready to have cast members pushed into it!

---
### Use a Model to Create data (cont.)
<br>

- That was fun. Exit the REPL and let's see how we can use<br>`new` + `save` to create movie documents - but this time from within our app.

- As we build out our CRUD functionality, this is the process we will repeat:
	1. Add a route
	2. Add the controller code
	3. Add the view

---
### Use a Model to Create data (cont.)
<br>

- For those of you missing Rails, we'll mimic the `new` action/view followed by a `create` action.

- We need a route that will take us to a `new.ejs` view. Express generator stubbed up a `users.js` route file, rename the file to `movies.js`.

- We also need to make a couple of changes in `server.js` - **what are they?**

---
### Use a Model to Create data (cont.)
<br>

- Inside of `routes/movies.js`, let's code our first route - responsible for showing a form for entering a movie.

- Make it RESTful:

	```js
	var express = require('express');
	var router = express.Router();
	
	router.get('/new', function(req, res) {
  		res.render('movies/new.ejs');
	});
	
	module.exports = router;
	```

---
### Use a Model to Create data (cont.)
<br>

- Now for the view.

- As we've discussed, organizing views for a certain model into a dedicated folder makes sense:

	```
	? mkdir views/movies
	? touch views/movies/new.ejs
	```
	
- Next, add the HTML boilerplate to `new.ejs`.

- The next slide has our ugly form...

---
```html
<body>
  <h2>Enter a New Movie</h2>
  <form action="/movies" method="post">
    <label>Title:
      <input type="text" name="title">
    </label><br>
    <label>Release Year:
      <input type="text" name="releaseYear">
    </label><br>
    <label>Rating
      <select name="rating">
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
      </select>
    </label><br>
    <label>Cast (separate actors with commas):
      <input type="text" name="cast">
    </label><br>
    <input type="submit" value="Add Movie">
  </form>
</body>
```

---
### Use a Model to Create data (cont.)
<br>

- **What is the route the form is going to `POST` to?**

- First, let's require the `movies` controller like this:

	```js
	var express = require('express');
	var router = express.Router();
	// Add movies controller
	var moviesCtrl = require('../controllers/movies');
	```
	
- **YOU DO:** Assuming `moviesCtrl` will have a `create` method. Now write the route that will invoke it!

---
### Use a Model to Create data (cont.)
<br>

- Then let's create the controller for our _movies_ resource:

	```
	? mkdir controllers
	? touch controllers/movies.js
	```
- In `controllers/movies.js` we're going to be using our `Movie` model, so we need to require it:

	```js
	var Movie = require('../models/movie');
	```
---
### Use a Model to Create data (cont.)

- Finally, this is how we will use Mongoose in the controller to create the movie submitted by our form:

	```js
	var Movie = require('../models/movie');
	
	module.exports = {
  		create: create
	};

	function create(req, res) {
	  // remove whitespace next to commas
	  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
	  // split if it's not an empty string
	  if (req.body.cast) req.body.cast = req.body.cast.split(',');
	  var movie = new Movie(req.body);
	  movie.save(function(err) {
	    // one way to handle errors
	    if (err) return res.render('movies/new');
	    console.log(movie);
	    // for now, redirect right back to new.ejs
	    res.redirect('/movies/new');
	  });
	}
	```

---
### Practice (5 mins)
<br>

- You should now be able to submit movies - congrats!

- Before moving on to displaying our newly created movies, do some quick refactoring by removing the `router.get('/new', ...` route by putting the code into `controllers/movies.js` where it belongs.

- Hint: The controller's `module.exports` will look something like this:

	```js
	module.exports = {
	  new: newMovie,
	  create: create
	};
	```
	Note that we can't assign a function named "new", because it's a reserved word in JS.

---
# Use a Model to Read data

---
### Use a Model to Read data
<br>

- Congrats!  After using the form to create some movies, we now need an `index.ejs` to view them.

- The querying ability of Mongoose is extremely capable.  For example:

	```js
	Movie.find({rating: 'PG'})
		.where('releaseYear').lt(1970)
		.where('cast').in('John Wayne')
		.sort('-title')
		.limit(3)
		.select('title releaseYear')
		.exec(cb);
	``` 

---
### Use a Model to Read data (cont.)

- Here are the useful methods on the model for querying data:
	- `find`: Returns an array of all documents matching the _query object_
		
		```js
		Movie.find({rating: 'PG'}, function(err, movies) {...
		```
		
	- `findById`: Find a document based on it's `_id`
	
		```js
		Movie.findById(req.params.id, function(err, movie) {...
		```

	- `findOne`: Find the first document that matches the _query object_

		```js
		Movie.findOne({releaseYear: 2000}, function(err, movie) {...
		```

---
### Reading Data - Practice (15 min)
<br>

- **How can we find all movies documents?**

- Time for some practice!

- Write the RESTful route, write the controller code, and create an _index.ejs_ to display all of the movie documents in a HTML table.

- Hint: Use the array `join` method to list the _cast_ names.

- We'll review in 15 minutes.

---
# Defining default values for a Property

---
## Defining default values for a Property
<br>

- Modifying the schema to add a simple default value

- Using a function to provide a default value

---
### Modifying the schema to add a simple default value
<br>

- To add a default value, we need to switch from this simple property definition syntax:

	```js
	var movieSchema = new Schema({
		title: String,
		releaseYear: Number,
  		...
	```

- To this object syntax:

	```js
	var movieSchema = new Schema({
  		title: String,
  		releaseYear: {type: Number},
  		...
	```

---
### Modifying the schema to add a simple default value (cont.)
<br>

- Now we can add a `default` key to specify a default value:

	```js
	var movieSchema = new mongoose.Schema({
	  title: String,
	  releaseYear: {type: Number, default: 2000},
	  rating: String,
	  cast: [String]
	});
	```

- Silly example defaulting the release year to 2000 - yes. But that's how we can add a simple default value.

- FYI, defaults for array types will not work - they require the use of Mongoose middleware.

---
### Modifying the schema to add a simple default value (cont.)

- Test it out and we'll see that it doesn't work because simply providing a key for `releaseYear` prevents the default from being assigned.

- We can fix this by deleting any key on `req.body` that is an empty string:

	```js
	if (req.body.cast) req.body.cast = req.body.cast.split(',');
  	// remove empty properties
  	for (var key in req.body) {
   		if (req.body[key] === '') delete req.body[key];
  	}
	```

- Now if we fail to enter a release year, the default will be set.

---
### Using a function to provide a default value
<br>

- You've seen how to add a simple default value, but we can also provide a function definition.

- The property's default would then be set to the value returned by the function!

---
### Using a function to provide a default value (cont.)

- For example, we can take our silly default for _releaseYear_ and make it just as silly like this:

	```js
	var movieSchema = new mongoose.Schema({
	  title: String,
	  releaseYear: {
  		 type: Number,
  		 default: function() {
  			return new Date().getFullYear();
  		 }
	  },
	  rating: String,
	  cast: [String]
	});
	```

- Don't be afraid to use named functions to clean things up.

---
### Setting Defaults - Practice (5 mins)
<br>

- We don't have built in timestamps in MongoDB.

- Add a new `createdAt` field that is a type of `Date` and defaults to the function `Date.now` (don't invoke it - no parens).

- We'll review in 5 minutes.

- Tomorrow, Phil will show you how to keep an `updatedAt` path updated each time the document is saved.

---
# Defining validations for a Property

---
### Defining validations for a Property
<br>

- Remember validations in Rails?  We can do the same thing in our Mongoose schemas.

- There are several built-in validators we can use.

- However, endless flexibility is possible with custom asynchronous and synchronous validator functions and/or Mongoose middleware.

- We'll keep it simple :)

---
### Defining validations for a Property (cont.)
<br>

- First up will be the Mongoose equivalent of ActiveRecord's _presence: true_.  Let's make `title` required:

	```js
	var movieSchema = new mongoose.Schema({
	  title: {
	    type: String,
	    required: true
	  },
	...
	```
- Now, if we try saving a movie without a `title` an error will be triggered.

---
### Defining validations for a Property (cont.)
<br>

- For fields that are of type _Number_, we can specify<br>a `min` and `max`:

	```js
	var movieSchema = new mongoose.Schema({
	  ...
	  releaseYear: {
	    type: Number,
	    default: function() {
	      return new Date().getFullYear();
	    },
	    min: 1900
	  },
	  ...
	```

- No more silent movies!

---
### Defining validations for a Property (cont.)
	
- For fields that are of type _String_, we have:
	- **`enum`**: String must be in the provided list
	- **`match`**: String must match the provided regular expression
	- **`maxlength`** and **`minlength`**: Take a guess :)

- Here is how we use the `enum` validator:

	```js
	var movieSchema = new mongoose.Schema({
	  ...
	  rating: {
	    type: String,
	    enum: ['G', 'PG', 'PG-13', 'R']
	  },
	  ...
	```

---
# Essential Questions
<br>

<p>Take a couple of minutes to review before you get picked</p>

- In your own words, describe the use case for Mongoose.

- True or false:  A document's structure is defined in a Mongoose model.

- What line of code would compile a `drinkSchema` into a model named `Drink`?

- What do we need to export from the module that contains the schema definition and the compiled model?

---

# References
<br>

- [Official MongooseJS Documentation](http://mongoosejs.com/)


0



<img src="http://s3.amazonaws.com/info-mongodb-com/_com_assets/media/mongodb-logo-rgb.jpeg" style="width:900px">

# Guide to Transferring a MongoDB Database
<hr>

## Use Case

Use this guide when you wish to transfer all of the data in a particular database from one MongoDB server to another.

For example:

- You have developed an application that uses a local MongoDB server (`mongod`) running on your development machine.

- Now you want to deploy your application on Heroku and transfer all of the data you've worked with locally, to a MongoDB server hosted in the cloud.

## Tools

There are a few different approaches available to backup and restore data.

In this guide, we will be using two command-line utilities provided by MongoDB: `mongodump` & `mongorestore`

>Although `mongodump` infers that data might be "dumped", rest assured the original data source will be unscathed.

## Dumping (exporting) the Source Data

We will be using the `mongodump` command in terminal to export data to our local filesystem.

Although it's possible to limit the data dump to certain collections, this guide is focused on transferring the entire contents of a specific database.

### Preparation

Before entering the command in terminal, do the following:

1. **Create a Directory**<br>Let's create a nifty directory to dump the data in:

  ```
  ? mkdir ~/datadump
  ```

2. **Identify the Server Host**<br>The default server host is `localhost` running on port `27017`. However, if you want to dump the contents of another server, perhaps one running on _mlab.com_, you will need the **url** and the **port number** of that server.

3. **Ensure `mongod` is Running**<br>If you are dumping data from your local MongoDB server, ensure that `mongod` is up and running.

4. **Credentials**<br>Again, if not dumping from your local server, you will need the **username** and **password** for a user account that belongs to the remote database (not the _mlab.com_ website).

### Dump the Data - Local DB Example

Here's the command to dump everything for a database named `ga-students`:

```
? mongodump -d ga-students -o ~/datadump
```

After the command executes, there will be a new directory, named the same as the database, with all of the contents of the database inside of it.

#### Options:

**-d**<br>Specifies the name of the _database_ to dump.

**-o**<br>Specifies the path to the _directory_ to dump to.

### Dump the Data - Remote DB Example

Here's the command to dump everything for a database named `ga-students` located on a fictitious remote server and credentials:

```
? mongodump -h ds012345.mlab.com:12345 -u the_user -p the_password -d ga-students -o ~/datadump
```

Just as in the local DB example, after the command executes, there will be a new directory, named the same as the database, with all of the contents of the database inside of it.

#### Additional Options:

**-h**<br>Specifies the URL and port of the remote _host_.

**-u**<br>Specifies the _username_ of a valid user for the specified database.

**-p**<br>Specifies the _password_ for the username.

## Restoring (importing) the Data Dump

We can use the `mongorestore` command in terminal to restore (import) data that was previously dumped from a local or remote MongoDB server to a local directory.

### Preparation

1. **Source Path**<br>Ensure you have the path handy to the directory that contains all of the data files that were previously dumped.

2. **Destination Server**<br><br>If the destination server is remote, you will need the **url** and **port number** of ther server.<br><br>If you will be importing the data to a local MongoDB server, ensure that `mongod` is running.

3. **Credentials**<br>Again, if you are restoring data to a remote database, you will need the **username** and **password** for a user account that belongs to the remote database (not the _mlab.com_ website).

### Restore the Data - to a Local DB Example

Here's the command to restore (import) data to a local MongoDB server:

```
? mongorestore -d ga-students --drop ~/datadump/ga-students
```

If we don't specify the host with the `-h` option, the server will default to `localhost:27017`, so there's no reason to specify it.

After the command executes, all of the data that exists in the `~/datadump/ga-students` directory will have been imported to a database named `ga-students`.

>Note that the directory name and database name **do not have to match**.  The directory name is used only to point to where all of the individual data files are located. If you specify a database name that does not exist on the local MongoDB server, it will create it.  However, this will not apply to most hosted MongoDB accounts, which require databases to be specifically created.

#### Options:

**--drop**<br>Use this option to drop (delete) each collection that is going to be imported. This will prevent errors if any document being imported has the same id as an existing document - the imported data will not replace existing data, it will just trigger an error.

### Restore the Data - to a Remote DB Example

Here's the command to restore (import) data to a remote MongoDB server:

```
? mongorestore -h ds012345.mlab.com:12345 -u the_user -p the_password -d ga-students --drop ~/datadump/ga-students
```

As you can see, the difference between restoring to a remote server and a local server is that the host must be specified (`-h ds012345.mlab.com:12345`), along with a valid username (`-u the_user`) / password (`-p the_password`) for the specified database.

After the command executes, all of the data that exists in the `~/datadump/ga-students` directory will have been imported to the **existing** database named `ga-students`. Remember, you will not be able to create new databases on a remote server.

## Final Thoughts

This guide explains a straightforward way to transfer data between MongoDB servers. The technique we used can also be used to "copy" data from one db to another on the **same** server.

Lastly, we have seen how to dump/restore **all** of the collections, indexes, etc. within a database. However, it's also possible to transfer data for a **single collection** using the `-c` option.

To check all of the options available with `mongodump` and `mongorestore`, use the `--help` option in terminal.
0



![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/440px-Node.js_logo.svg.png)

# Debugging and Logging in Node

| Learning Objectives |
| :--- |
| Use `morgan` Middleware for Logging |
| Use `nodemon` to Restart Node App Automatically |
| Use `node-inspector` to Debug App |

## Roadmap
- Intro to Debugging
- Create a Skeleton Express App
- Morgan, Your Friendly Logger
- Stop Server, Start Server - Not!
- Step-by-Step Debugging

## Intro to Debugging<br><small>(5 mins)</small>

Debugging is the process of fixing our code and is fundamental to software development.

Debugging server-side code, especially Node's asynchronous code can be tricky.

In this lesson, we will look at three npm packages that are helpful to debugging and development as a whole:

  - Server-side logging with `morgan`, a middleware package.
  - Auto-restart of our Node/Express server using `nodemon`.
  - Live debugging of server-side code using `node-inspector`.

## Create a Skeleton Express App<br><small>(Code Along - 5 mins)</small>
This lesson will require an Express app to work with, so let's use the `express-generator` to build a skeleton app for us.

Remember, it's the Wild West out there, and you will undoubtedly come across multiple structures for Node apps.

The `express-generator` was authored by the TJ Holowaychuk, the same person that authored Express itself.

It scaffolds a **minimal** Express app that includes the vital middleware and configuration necessary for most web apps.

We already installed `express-generator` earlier this week. As a reminder, this is how we did it:

```
? npm install express-generator -g
```

Even though we will not be using views in this lesson, let's generate our app as if we are using the **ejs** template engine:

```
? express debug-app -e
? cd debug-app
? npm install
? subl .
```

Then, test that the app starts up with<br>`? npm start`<br>which will run the command associated with the `start` key in `package.json`.

Browse to `localhost:3000` and observe Express's welcome page.

## Morgan, Your Friendly Logger<br><small>(Code Along - 15 mins)</small>

Take a gander at your Terminal output for our Node server.  You will see something like this:

```
...
GET / 304 284.925 ms - -
GET /stylesheets/style.css 304 2.426 ms - -
```

Obviously, this is the server logging out our request for the root path of our app and the request from the browser for the stylesheet that was linked in the `<head>`.

No big deal, right? Heck, we've seen this time and time again with Rails. However, there's very little magic in Node. In Node, nothing gets done without the use of modules.

The logging we are seeing here is provided by a piece of _middleware_ required and then mounted in the app's middleware stack.

Remember, think of **middleware** as a stack of processes that requests flow through. Each piece of middleware can perform tasks such as logging, authentication, compiling CSS, etc.

<img src="http://media.developeriq.in/images/nodeexpress_2_9_2015_1.png" style="width:900px">

Now let's take a look at `app.js`.

>Earlier this week we changed the name of `app.js` to `server.js` - you're going to see both names out in the Wild West...

This is the line that loads the `morgan` module used for logging requests:

```js
var logger = require('morgan');
```

and this is the line that plugs it into, or mounts it, into the middleware stack:

```js
app.use(logger('dev'));
```
> Note: The `'dev'` specifies one of Morgan's available format options.

Let's comment out the `app.use(logger('dev'));` line of code and restart the server. Watch your Terminal's output while refreshing the browser - nothing, nada...

**What would happen if we moved our logger middleware between our two routes like this?**

```js
app.use('/', routes);
app.use(logger('dev'));
app.use('/users', users);
```
**Test it out to confirm...**

## Stop Server, Start Server - Not!<br><small>(Code Along - 5 mins)</small>

Unfortunately, every change in the JS source code requires a server restart. This is because Node loads the entire application into memory at startup.

There's nothing quite as fun as stopping and starting the server right? If you answered "Yes", you may skip to the next section :)

Fortunately, there's a Node module, [`nodemon`](http://nodemon.io/), that will watch for changes saved to our files and restart the server for us. Let's install it globally so that we can use it in terminal as a command:

```
? npm install nodemon -g
```

Now we can start our server like this:

```
? nodemon
```
`nodemon` by default will run the command specified by the "start" key in `package.json`. 

To try it out, let's move...

```js
app.use(logger('dev'));
```

back above

```js
app.use(bodyParser.json());
```
Watch the terminal window when you save the file, and you'll see the server restart automatically!

A tool like `nodemon` is virtually mandatory for Node development because it saves a tremendous amount of time!

## Step-by-Step Debugging<br><small>(20 mins)</small>

#### Hello `node-inspector`

Debugging applications is a huge part in the life of a developer.

I remember showing several of you how useful Chrome's debugger in DevTools could be when you were developing your game.

You will find being able to use a debugger on server-side JavaScript to be just as useful!

Also, being able to set breakpoints, step through code line-by-line, inspect variables, etc., is not only valuable for debugging, it's a great way to learn how code masters craft their programs & libraries!

`node-inspector` is a dev tool that provides a visual interface to Node's built-in debugger. It uses a version of the same tooling engine that Chrome's DevTools does. Let's install it globally so that we don't have to install it for every app:

```
? npm install node-inspector -g
```

#### Starting in Debug Mode

Starting an app to use the debugger is not quite as straight forward as it is without debugging.  Throw in our desire to use `nodemon` for auto-restarts; requires a step-by-step guide:

1. In Terminal, type `node-inspector` to start the debugger.
2. **In a separate Terminal window**, we start our app in Node's debug mode using `nodemon`:<br>`nodemon --debug bin/www`<br>The `bin/www` is the path to our Express bootstrap code.
3. Open a browser window and copy/paste the URL that `node-inspector` provided - probably<br>`http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858`
  - This will open the debugger's UI.
  - The debugger will sometimes automatically hit a breakpoint in Express's bootstrap code.  To continue loading your app, click the bluish _Resume..._ button<br><p align='center'>
<img src='http://s10.postimg.org/ycaokgsl1/Screen_Shot_2015_07_27_at_14_22_53.png'
</p>
4. In another browser tab/window, browse to your app at `localhost:3000`.

  You are now set to debug!

**?: What is the minimum number of Terminal sessions open we will need to debug our Node app?**

**?: What npm package did we install to debug our Node app? Is it installed locally or globally?**

#### Setting a Breakpoint

We can view the source code by clicking on the files within the _Sources_ tab of the the debugger.

Let's set a breakpoint in our `/users` route handler. The handler code is in the `routes` folder. Click on `user.js` to view its source.

To set a breakpoint, we click on the line number - line 6 is where we want to break at. Click it and a blue breakpoint marker will appear.

Browsing to `localhost:3000/users` will trigger the breakpoint and the app will not continue until we tell it to.

The blue line highlights the next line of code to be executed.

There are lots of things we can do now, just take a look at those **Call Stack** & **Scope Variables** windows on the right!

One of the niftiest things to do is to hover over variables that are in scope and drill into their values if they are objects.

Hover over the `req` parameter  and explore it a bit. There are lots of properties in there like `body`, `params` and `query` that you will likely find useful when developing your apps!

Note that you can use the console and access any variables and methods that are within scope.

Continue the code (click on the bluish resume icon), then let's browse to `localhost:3000/users?includeDetail=true`.

When we hit our breakpoint, check the `query` property on the `req` object - sweet!

#### Stepping Through Code

Next to the blue resume button are buttons that allow you to step through, into and out of functions. Try clicking the _Step into next function call_ button.

You're now looking at the `send` function inside of the `response.js` module's source code!

Click the _Step out of current function_ button several times and watch the _Call Stack_ shrink - amazing!

Click the _Resume script execution_ button when you've been dazzled enough...

## Individual Practice - Set Up a New App for Debugging<br><small>(until 5 mins remain)</small>

To get some practice, you're going to set up a new app.

1. Create a new app using the `express` generator.
2. Ensure that you can browse to the Express welcome page.
3. Both `nodemon` and `node-inspector` were installed globally, so you won't have to install them again...
4. Start your app in debug mode (feel free to reference the lesson on how to do this).
5. Experiment as follows:
	1. Set a breakpoint on line 6 of `routes/user.js`.
	2. Browse to `localhost:3000/users`, which should trigger the breakpoint.
	3. What is the `baseUrl` of the `req` object?
	4. What does `this` point to?
	5. Step into the `res.send` method, then...
	6. What is the value of the `body` argument?
	7. Set a breakpoint on the `switch` statement on line 134.
	8. Using your mouse, select/highlight the expression `typeof chunk` then hover over the selection, what is the result of that expression?
	9. Click the "Step over next function call" icon once.
	10. Hover over `this.get` - what line number is the `get` method at?
	11. Click the "Step into next function call" icon - there we are, inside of the `get` method.
	12. Over over the `getHeader` method, note the file it defined in and the line number within the file.
	13. Click the "Step into next function call", there you are, in that file!
	14. Click the "Resume" icon.
	15. Explore on your own!

## Conclusion

- **Why can't you use the Chrome console to debug Node.js code without using `node-inspector`?**

- **If we want to debug our Express app, before browsing to our app, we need to browse where first?**

- **What is middleware?**

- **What is the middleware used to perform server-side logging in an Express app?**


## References

- [Morgan](https://github.com/expressjs/morgan)
- [Nodemon](https://github.com/remy/nodemon)
- [Express](http://expressjs.com/)
0



[Click to View this Presentation](https://presentations.generalassemb.ly/270b02e3881bb7df6f8e#/1)

---

![](http://www.cs.iit.edu/~cs561/cs521/automata/framework/img/regex.jpg)

# Regular Expressions

---

## Learning Objectives
<br>

- Not be mystified by Regular Expressions

- Write basic Regular Expression patterns

- Use RegEx patterns to validate HTML `<input>` tags

---

### What are Regular Expressions?

- A **sequence of characters** that define a pattern that is used to search/match, and optionally replace, text in strings and files.

- Grounded in Computer Science and used throughout computing by:

  - Programming languages

  - Word processors & text editors

  - System utilities like Unix's `grep`

- So comprehensive, they are their own computer language.

- They are very useful for things like web scraping and validation!

---

### Regular Expression Patterns
<br>

- To start, we're going to use the code playground, [codepen.io](http://codepen.io/pen/), to play with regex's in HTML `<input>` elements.

- Create a new pen, and hide the JS pane.

- In the HTML pane, let's add a simple form:

	```html
	<form>
		text: <input type="text" required pattern="Fred">
	</form>
	```

---

<p style="text-align:left">Put this in your pen's CSS pane:</p>

```css
body {
  font: 14pt Helvetica;
}
form {
  padding: 50px;
  border: 4px solid lightgreen;
  border-radius: 20px;
}
form:invalid {
  border-color: yellow;
}
input {
  font: 14pt Helvetica;
  margin: 10px;
  padding: 4px;
}
input:invalid {
  border-color: red;
}
```

---

### Regular Expression Patterns (cont.)
<br>

- We won't need to change our CSS going forward, so go ahead and hide the CSS pane.

- Just to get orientated, this is what a regular expression to match/validate a typical 10-digit phone number like `(310) 555-1212` looks like in JS and Ruby:

	```js
	/^\(\d{3}\)\s\d{3}-\d{4}$/
	```

- Crazy looking stuff - yes? Don't sweat it, by the end of the lesson, this gibberish will all make sense.

---

### Validating Text in an <span style="text-transform:lowercase">\<input></span>
<br>

- Let's take a look at a common and practical use for regular expressions - one that you can start applying to your apps pronto.

- HTML5 `<input>` elements have a `pattern` attribute just for regex patterns.

---

### Validating Text in an <span style="text-transform:lowercase">\<input></span>
<br>

- If the text in the `<input>` does not **completely** match the regular expression:

	- The submit button will not submit the form to the server.

	- The `<form>` will have the `:invalid` CSS pseudo-class applied to it.

---

### Patterns - <em>Literal Characters</em>
<br>

- The first type of characters within a regex pattern up discussion are **literal characters**.

- A **literal** is the most basic of the regex characters. They are _literally_ the character we want to match.

- The first regex we have put in our `<input>`, `pattern="Fred"`, has a pattern, `fred` that consists entirely of literal characters.

---

### Patterns - <em>Literal Characters</em> (cont.)
<br>

- Type "Fred" and you will see the form's border turn green indicating a match!

- **Reminder:** We are looking at regex's initially within the context of an HTML `<input>` element. If this were an ordinary regular expression, our pattern, `Fred`, would match the first occurrence of the letters `Fred` **anywhere** within a string such as<br>_Say hi to Fredrick, aka Fred, when you see him_.

---

### Patterns - <em>Character Class</em>
<br>

- Next up is a **character class**.  They tell the regex engine to match only one of several characters placed within square brackets.

- Lets change our pattern to `gr[ae]y`.

- Check it out!

---

### Patterns - <em>Character Class</em> (cont.)
<br>

- You can use a hyphen inside of a character class to specify a range of characters. For example, `[5-9]` will match a single digit of 5 to 9.

- You can use more than one range too. This pattern, `[0-9a-fA-F]`, would would match any single hexadecimal digit regardless of case.

- Character classes are great for matching frequently misspelled words like `li[cs]en[cs]e`.

---

### <em>Character Class</em> - Question
<br>

- **What regular expression could be used to match your name whether it is capitalized or not?**

---

### Negated Character Class
<br>

- Putting a `^` (caret) symbol after the opening `[`, means match any character **except** the character(s) in the brackets.

- So, `p[^ua]` will match the letter `p` followed by any single character except a `u` or `a`.

---

### Shorthand Character Classes
<br>

- <p>Because character classes are used so often, there are several _shorthand character classes_ available. For example, instead of using `[0-9]` to match a digit, you can use `\d` instead.</p>

---

### Shorthand Character Classes
<br>

- Here are more shorthand character classes:

	- **`\w`** will match any alphanumeric character, including digits and the underscore character.

	- **`\s`** will match any "whitespace" character, including a space, tab, newline and carriage return.

	- **`.`** (period) will match any character except line breaks.

- Google will be your friend when working with regular expressions, unless you work with them frequently, there's no way to remember all this stuff!

---

### More Negativity
<br>

- Interestingly, the uppercase versions of the previous shorthands match just the opposite of the lowercase versions:

	-  `\D` will match any character except a digit.

	-  `\W` will match anything but an alphanumeric character (and underscore).

	-  `\S` will match anything except a space, tab, newline or return.

---

### Exercise (5 mins)
<br>

- Based upon what you've learned already, work with a pair and:<br><br>**Write a regex pattern that will match:<br>The word "File", followed by a space and two uppercase letters from the alphabet, followed by a hyphen and three digits, except that the first of the three digits cannot be a zero.**

- For example, this text would be a match:<br>`File XY-123`

---

### Solution
<br>

- `File [A-Z][A-Z]-[1-9][0-9][0-9]`

- Note that there is no shortcut character class to match a letter from the alphabet only, so we must use:<br>`[a-z]` (lowercase),<br>`[A-Z]` (uppercase)<br>or `[a-zA-Z]` (upper or lowercase)

---

### Quantifiers
<br>

- In the previous exercise/solution, we repeated the same character classes when we wanted to match more than one. Well, there's a better way using **quantifiers**.

- There are four different quantifiers:

	- **`{}`**

	- **`*`**

	- **`+`**

	- **`?`**

- Let's see how they work...

---

### Quantifiers - <span style="text-transform:lowercase">{}</span>
<br>

- We use curly braces to specify a specific quantity, or range of quantities, to repeat a literal character, character class, etc.

- For example, `\d{3}` would match three digits.

- **What regex pattern could you use to match a social security number with this format:<br>`###-##-####`**

---

### Quantifiers - <span style="text-transform:lowercase">{}</span> (cont.)
<br>

- We can also specify a range like `[A-Z]{1,5}`, which would match between 1 and 5 capital letters.

- A range from a number to infinity can be created by leaving off the second number such as this `{5,}`.

- Note that regular expressions by default are "greedy", that is, they will match as many characters as possible (longest possible match).

---

### Other Quantifiers
<br>

- In addition to the `{min,max}` quantifier, there are repetition operators:

	- **`*`** - the star symbol will match the preceding character class zero or more times.

	- **`+`** - the plus symbol will match the preceding character class one or more times.

	- **`?`** - the question mark will match the preceding character class zero or one time.

- **Take 2 minutes to figure out the curly brace equivalents for each of the above repetition operators (\*, + and ?)**

---

### Exercise (5 mins)
<br>

- With your pair:<br>
**Write a pattern that would match a street address where the address:<br> - Starts with 1 to 5 digits (no leading zero)<br> - Followed by a space<br> - Followed by a street name beginning with a capital letter, then 1-n characters, including spaces.**

- For example, this text would be a match:<br>`123 Main Street`

---

### Possible Solution
<br>

`[1-9][0-9]{0,4} [A-Z].+`

---

### Escaping Special Characters
<br>

- We've seen how certain characters such as these, `/*+?.[]{}`, have special meaning in regular expressions.

- That being the case, how do we match these special characters as a literal character?  For example, what if you wanted a pattern to match a number that includes a decimal point?

---

### Escaping Special Characters (cont.)
<br>

- To accomplish this, you have to _escape_ the special character by preceding it with a `\` (backslash), for example, `\+`, would match the plus symbol.

- Note that we do not have to escape special characters within a _character class_ (square brackets).  So, if you wanted to match a plus or minus sign, you could use this pattern<br>`[+-]`.


---

### Practice (3 mins)
<br>

1. **Write the regular expression that would match a floating-point number with one or more digits on both sides of the decimal.**

2. **Write the regular expression that would match this text:<br>`What?`**

---

### Solution
<br>

1. `\d+\.\d+`

2. `What\?`

---

### Regular Expressions in JavaScript
<br>

- Before we begin to work with more complex regular expressions, lets use the console in Chrome's DevTools to check them out using JavaScript.

- In JavaScript, regular expressions are special objects that can be created using a _regular expression literal_, or the _RegEx()_ constructor function.

---

### Regular Expressions in JavaScript (cont.)
<br>

- The literal syntax uses forward slashes to delimit the regex:

	```javascript
	var re = /cats?/;
	```

- The literal syntax is the best option if you know the pattern you want to use in advance.  However, using the constructor approach allows you to pass in a string variable to create a regex dynamically:

	```javascript
	var s = "cats?";
	var re = new RegExp(s);
	```

---

### Regular Expressions in JavaScript (cont.)
<br>

- A regex object has a `test()` method that returns `true` if there is at least one match:

	```js
	var re = /cats?/;
	re.test('fatcat');   // returns true
	```

---

### Practice (3 mins)
<br>

- **Create a JS regex in the console that would match a phone number with the following format:<br>`(###) ###-####`**


	Hint, the parenthesis are _special characters_, **so we have to _________ them**.

- **Use the `test` method on the regex to test some phone numbers.**

---

### Solution
<br>

- Note the use of backslashes to escape the parens:

	```js
	var re = /\(\d{3}\) \d{3}-\d{4}/;
	```

- [These docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) discuss working with regular expressions in JavaScript, including the methods on _Strings_ as well as the _test()_ and _exec()_ methods of the _regular expression_ object.

---

#### JavaScript Methods Using Regular Expressions
<br>

<table class="standard-table">
 <thead>
  <tr>
   <th scope="col">Method</th>
   <th scope="col">Description</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec" title="The exec() method executes a search for a match in a specified string. Returns a result array, or null."><code>exec</code></a></td>
   <td>A <code>RegExp</code> method that executes a search for a match in a string. It returns an array of information.</td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test" title="The test() method executes a search for a match between a regular expression and a specified string. Returns true or false."><code>test</code></a></td>
   <td>A <code>RegExp</code> method that tests for a match in a string. It returns true or false.</td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match" title="The match() method retrieves the matches when matching a string against a regular expression."><code>match</code></a></td>
   <td>A <code>String</code> method that executes a search for a match in a string. It returns an array of information or null on a mismatch.</td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search" title="The search() method executes a search for a match between a regular expression and this String object."><code>search</code></a></td>
   <td>A <code>String</code> method that tests for a match in a string. It returns the index of the match, or -1 if the search fails.</td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace" title="The replace() method returns a new string with some or all matches of a pattern replaced by a replacement. The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match."><code>replace</code></a></td>
   <td>A <code>String</code> method that executes a search for a match in a string, and replaces the matched substring with a replacement substring.</td>
  </tr>
  <tr>
   <td><a href="/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split" title="Technical review completed."><code>split</code></a></td>
   <td>A <code>String</code> method that uses a regular expression or a fixed string to break a string into an array of substrings.</td>
  </tr>
 </tbody>
</table>

---

### A Great Site for Regex's
<br>

- As me move into more complex regular expressions, the [regex101.com](https://regex101.com/#javascript) web app will provide us with a better tool to learn and practice with.

- Open it up in place of codepen.

---

### Alternation

- Alternation allows us to easily search for one of several characters or words.

- Let's say you want a single regex that will match any of these sentences:<br>_I have a dog._<br>_I have a cat._<br>_I have a bird._<br>_I have a fish._

- This would do the trick<br>`/I have a (dog|cat|bird|fish)\./`.

---

### Exercise (5 mins)
<br>

- <p>**Write a regex that would match a CSS color hexadecimal (3 or 6 characters), such as<br>`#f355Ac` or `#D39`**</p>

---

### Solution
<br>


- Solution:

	```js
	/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/
	```

- **Why can't we use the alphanumeric character shortcut `\w`, in place of the much longer `[a-fA-F0-9]`?**

---

### Grouping
<br>

- Parentheses are used inside regular expressions to create groups that can then have a quantifier applied to the group as a whole.

- Whereas, the square brackets character class, `[]`, represents a **single** character to match, the parentheses, `()`, represent a **group** of characters to match.

---

### Grouping (cont.)
<br>

- Let's say we wanted to match a computer's IP Address. Ignoring the fact that we should limit the numbers to between 0 and 255, we could write something like this:<br>`/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/`

- But using grouping we can shorten this to:<br>`/(\d{1,3}\.){3}\d{1,3}/`

---

### Exercise (2 mins)
<br>

- <p>**Write a regular expression that would match this string:<br>`hey!hey!hey!`**</p>

---

### Solution
<br>

```js
/(hey!){3}/
```

---

### Anchors and Boundaries
<br>

- Anchors and boundaries are unique in that they don't match a character, instead they match a _position_.

- They allow us to write patterns that match strings that contain only the characters we are interested in and only if they are isolated the way we want them to be.

---

### Anchors and Boundaries (cont.)
<br>

- The `^` symbol is used to match the start of the line. This is very useful for processing a file containing multiple lines.

- The `$` symbol matches the end of the line.

- For example, without boundaries, the regex `/dog/` will return _true_ when tested against any of these strings: "dog", "dogs" and "My dog is named Spot".  However, the regex `/^dog$/` will match only the string "dog" and when there is no other text in the line.

---

### Anchors and Boundaries (cont.)
<br>

- <p>Let's test the pattern, `cat`, with anchors (`/^cat$/`), and without (`/cat/`), against the strings "cat" and "catsup".</p>

---

### Anchors and Boundaries (cont.)
<br>

- There is also `\b`, which matches a position called a<br>_word boundary_. The `\b` will match any of the following:

	- Before the first character in the string.

	- After the last character in the string.

	- Between two characters in the string where one character is a word character and the other is a non-word character such as a space, tab, or newline.

---

### Anchors and Boundaries (cont.)

- The `\b` easily allows us to search for whole words only.

- This is how could use the string `match()` method to return the matches by passing in a regex:

```js
// try with no word boundary
var re = /cat/g;
var matches = "The catsup was eaten by the cat".match(re);
// ["cat", "cat"]

// try using word boundary
var re = /\bcat\b/g;
var matches = "The catsup was eaten by the cat".match(re);
// ["cat"]
```
The `g` at the end of the regex is the _global_ flag and it tells the regex to search for all matches, instead of just the first.

---

### Capturing
<br>

- Parentheses can also be used to define **capture** groups.

- Capturing is when matched text is "captured" into numbered groups.

- These groups can then be reused with a process called backreferencing.

- Capturing is beyond the scope of this lesson. Here's [one of several articles out there](http://techbrij.com/javascript-backreferences-string-replace-regex) should the mood strike you.

---

### Moving Forward
<br>

- We've visited the core of regular expressions, however, we've really only scratched the surface.

- You will surely cross paths with regular expressions during your career as a developer. And when you do, as usual, Google and documentation will be your friend.

- There are several regex playgrounds like _regex101.com_ that we used this morning. Here's another one you can check out: [http://www.regexr.com/](http://www.regexr.com/)

---

### Final Questions
<br>

- **What is a Regular Expression?**

- **What Regular Expression could be used to match a string representing a social security number in this format:<br>`xxx-xx-xxxx`**

- Four exercises follow...

---

### Additional Exercises
<br>

- Now you can have some fun practicing writing four more regular expressions.

- A possible solution follows each of the four exercises.

---

### Additional Practice - 1 of 4
<br>

Match an _American Express Credit Card Number_ which always begin with 34 or 37 and totals 15 digits.

---

### Solution - 1 of 4
<br>

`/3[47]\d{13}/`

---

### Additional Practice - 2 of 4
<br>

Match a full U.S. Phone Number:<br>**+1-(555)-555-5555**

---

### Solution - 2 of 4
<br>

`/\+1-\(\d{3}\)-\d{3}-\d{4}/`

---

### Additional Practice - 3 of 4
<br>

A date in the format:<br>YYYY-MM-DD.<br>YYYY can start with either 19 or 20 only.<br>DD can be anything from 01 to 31, regardless of the month.

---

### Solution - 3 of 4
<br>

`/(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/`

---

### Additional Practice - 4 of 4
<br>

An integer between 0 and 255<br>This is difficult, remember to use the "alternation" (|) operator.

---

### Solution - 4 of 4
<br>

`/(2[0-4][0-9]|25[0-5]|[01]?[0-9]?[0-9])/`

---

## References
<br>

- [Regular Expressions in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)

- [RegEx Quick-Start & Cheat Sheet](http://www.rexegg.com/regex-quickstart.html)

- [Online regex tester](https://regex101.com/)
0
