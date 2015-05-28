# elements-westlawnext-integration
A test for client side integration with WestlawNext and Elements

## Purpose
The purpose of this repository is to mockup test scenarios for integration and prove in a controlled environment.

## Dependencies
[nodejs](https://nodejs.org/)

## Installation
Once you have downloaded the project and all dependencies, navigate to the root directory of the project and run:
```bash
npm install
```

## Configure
In the root directory of the project there is a .env file which is used to configure the project.

Enviornment Variable | Definition
---|---
WESTLAWNEXT_HOST | The full url representing WestlawNext i.e. http://www.westlawnext.com
ELEMENTS_HOST | The full url representing Elements i.e. http://www.elements.com

## Run
To run the project execute:
```bash
node servers.js
```
In a browser navigate to `ELEMENTS_HOST/html/index`, e.g. `http://www.elements.com/index`.

## CORS ISSUE
### The Problem
In order for Elements and Westlaw to integrate, AJAX requests that are Cross Origin need to pass their cookies in order to be authenticated when making a CORS request. With modern browsers using [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) and setting `withCredentials = true` will solve this problem. 
IE requires a non standard [XDomainRequest](https://msdn.microsoft.com/en-us/library/cc288060%28v=vs.85%29.aspx) object that does not set the cookies we need for authentication.
### Our Solution
We create a hidden IFrame and load it from the crossOrigin site onto the origin, and we can then use [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to communicate between the domains. There is a XMLHttpRequest polyfill that uses this strategy called [xdomain](https://github.com/jpillora/xdomain). We can use [modernizr](http://modernizr.com/) to test for our scenario and load xdomain only when needed.
#### note:
In order for xdomain to work, the crossOrigin needs to serve a [page](https://github.com/jpillora/xdomain#quick-usage) which loads the xdomain script and sets the origin as "master" in order to set up the two way communication.
