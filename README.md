# LK Angular Scaffold

***

### Quick Start

Install Node.js and then:

	$ git clone https://bitbucket.org/lightningkite/angular-scaffold.git
	$ cd angular-scaffold
	$ sudo npm -g install grunt-cli karma bower
	$ npm install
	$ bower install
	$ grunt watch
	

####This Scaffold is backend agnostic and is compatible with almost any backend. 

##### To work with django:

there are two changes to the index.html that need to be made. Insert /static/ to the src and href like so:

	<!-- compiled CSS --><% styles.forEach( function ( file ) { %>
    <link rel="stylesheet" type="text/css" href="/static/<%= file %>" /><% }); %>

    <!-- compiled JavaScript --><% scripts.forEach( function ( file ) { %>
    <script type="text/javascript" src="/static/<%= file %>"></script><% }); %>
    
Then place your sym links from your django project to the build folder and you should be good to go.
    
##### To work stand alone or for development:

`http-server` can help if you dont want to set a backend up for development. To run with http-server:

1. run `npm install -g http-server`
2. make sure you have run the quick start commands
3. after instalation, in the project root run `http-server ./build`
4. navigate to localhost:8080

more info about http-serve can be found here: [https://github.com/nodeapps/http-server](https://github.com/nodeapps/http-server)

-----

## Using this scaffold

Use this scaffold along with [Lk best practices](http://lightningkite.github.io/styles/) to improve your workflow! This scaffold comes with some example situations that help illustrate best practices and how this scaffold should be used. It will follow the practices outlined in the lk best practices page.

### Source Directory:

The source directory is where all of our code and assets will live. There are 4 main directories in here and the index.html file. The structure is as follows: 

```
src/
  |- app/          : project source code
  |- assets/       : images, files, or any other assets our site needs
  |- common/       : site Independant modules, see README.md inside directory
  |- sass/         : sass/css files
  |- index.html    : root html document
```

#### App:

The app directory is going to house all of our source code. It is important to keep this directory and all its subdirectories orginized. Following best practices will help you avoid cluttering the files inside and keep your code maintainable and easier to read.

Starting out there are two directories and two files. 

`app.js` is our main control for the whole application. It is important that this file remains clean as it can affect your whole application. The only things that should go in here is what is already there:

- the module declaration, 
- the config block
- the run block
- and the controller

`app.spec.js` is there for you too add tests to any code added to the app.js file

The `authentication` and `home` directory are mainly for example but are ready to go and can be used in your application. If you dont want them just remove the directories and start creating your own.

First the home directory is a simple example of a module that does not rely on any other modules and only has a controller. It used controllerAs syntax **which should be used througout your site**. pretty simple...

Second the authentication directory houses a more complicated set up. Anything inside authentication will deal with logging in, and authenticating a user. first lets look at the login directory. Here we have our login.js file which has our main authentication module. We have the config block in here becuase this is where we will go when we navigate to /login. Again this page uses controllerAs syntax to keep our code and $scope clean! The template file which will be loaded is along side the .js file, and we also have our .spec.js file for testing.

The authToken directory is where we have a factory (AuthTokenFactory) that retrieves, updates, and destroys a token from local storage. Notice the module name *lk.authentication.token*, how it builds off the main *lk.authentication* module. Because we use grunt to build our src files, it runs alphabetically thorugh our .js files and will add them to our project. (index.html) What would be best is to extend the main module, so any suggestions are welcome. This gets the job done though and in a clean way. We add this module as a dependency to the login.js module and it will be able to use the AuthTokenFactory there. Again there is also a spec.js file which houses the test for this factory. This is a good example of some simple test cases and how to test. 

Seperating our code after this mannor will help make it easy to navigate and will help you, the devloper, comparmentalize your code so it is modular and agile. 

#### Assets:

This one is pretty self explanitory. Any assets your page uses such as images should go here.  The orginization is up to.

#### Common:

#### NOTE: THIS FILE IS NOT FOR COMPONENTS THAT YOU JUST CANT FIND A GOOD PLACE FOR! 

This file is to be used for directives, factories, services, or other Angular components that are used across multiple modules. It is a **common** directory that houses **common** components used across the site. The main point of this directory is to have your components completely seperate that you could drop them into another app and they would work. They should not rely on any other component in your app.  

An example of what would go in here is a selector directive (possibly used to help select something like a data) that is used in multiple pages.  

As you set up your component, (the datepicker directive in this case) break the component into its own directory. We want to avoid cluttering 1 .js file with a lot of components. That is bad practice and you will hate your life as your project starts to expand. For our time picker, our directory stucture would look like this:

```
src/
  |- app/
  |  |- common/
  |  |  |- datePicker/
  |  |  |  |- datePicker.js
  |  |  |  |- datePicker.tpl.html
  |  |  |  |- datePicker.spec.js
```

the datePicker directory would also house any other assets we need for the directive. 

Structuring our code this way allows for agile, safe, and independant components. Test should be written especially for a common component becuase it is being used across multiple pages.

----

Another idea for using the common directory would be for filters that are used across the site. If you use a filter in more then one template or file, it might be a good idea to put it in here so you know exactly where it is at. 

```
src/
  |- app/
  |  |- common/
  |  |  |- filters/
  |  |  |  |- timeFilter/
  |  |  |  |  |- timeFilter.js
  |  |  |  |  |- timeFilter.spec.js
```

or to help reduce the amount of directories you have to traverse through

```
src/
  |- app/
  |  |- common/
  |  |  |- timeFilter/
  |  |  |  |- timeFilter.js
  |  |  |  |- timeFilter.spec.js
```

would be just as acceptable. 


#### Sass:

Obviously we use sass for our development. Your sass files will go in here. You may want to put individual sass files next to to components like directives or templates which is fine. This directory is for the sass files that style the whole site. 


#### Tests:

Karma unit tests will be run from any file named ```*.spec.js```. Protractor end-to-end tests will be run from any file named ```*.e2e.js```. Karma unit tests are run on build but to run the protractor tests they need to be run manually with the command ```grunt test```. There is some server set up required if you are developing in a server environment. Protractor, Selenium, xvfb (and supporting packages), and phantomjs should all be installed globally on the server before the ```grunt test``` command will work correctly. Also Selenium should be running as a service on the server.
[https://www.exratione.com/2013/12/angularjs-headless-end-to-end-testing-with-protractor-and-selenium/](https://www.exratione.com/2013/12/angularjs-headless-end-to-end-testing-with-protractor-and-selenium/)

If you are working locally end-to-end tests are easier to get working and you basically just have to install protractor globally and run the command ```webdriver-start``` to get a selenium server up and running to get your tests to work. See the protractor docs: [http://angular.github.io/protractor/#/tutorial](http://angular.github.io/protractor/#/tutorial)

Tests are all written with the Jasmine testing framework. Protractor is an extension of Jasmine and provides a few extra features for navigating the browser and selecting elements on the page. To get up to speed on writing unit tests and end-to-end tests see the [Jasmine](http://jasmine.github.io/) docs and the [Protractor](http://angular.github.io/protractor/) docs.



-----

adopted from [ng-boilerplate](http://joshdmiller.github.io/ng-boilerplate/#/home)
