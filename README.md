# elements-westlawnext-integration
A test for client side integration with Westlawnext and Elements

## Purpose
The purpose of this repository is to mockup test scinarios for integration and prove in a controled enviornment.

## Dependencies
[nodejs](https://nodejs.org/)

## Instalation
Once you have downloaded the project and all dependencies, in the root directory of the project run
```bash
npm install
```

## Configure
In the root directory project there is a file .env

Enviornment Variable | Definition
---|---
WESTLAWNEXT_HOST | The full url representing WestlawNext i.e. http://www.westlawnext.com
ELEMENTS_HOST | The full url representing Elements i.e. http://www.elements.com

## Run
To run the project execute 
```bash
node servers.js
```
In a browser navigate to ELEMENTS_HOST/html/index i.e. http://www.elements.com/index.

## CORS ISSUE
### The Problem
The problem with CORS is that in order for Elements and Westlaw to integrate AJAX request that are Cross Origin need to pass their cookies in order to be authenticated when making a CORS request. With modern browsers using the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) and setting withCredentials = true will solve this problem. 
IE requires a silly non standard [XDomainRequest](https://msdn.microsoft.com/en-us/library/cc288060%28v=vs.85%29.aspx) object that does not set the cookes we need for authentication.
### Our Solution
If we were to create a hidden Ifram loaded from the crossOrigin site onto the origin we can use [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to comminicate between the domains. There is a XHLHttpRequest polyfil that uses this strategy called [xdomain](https://github.com/jpillora/xdomain). We can use [modernizr](http://modernizr.com/) to test our scinario and load xdomain only when needed.
#### note:
in order for xdomain to work the crossOrigin needs to serve a [page](https://github.com/jpillora/xdomain#quick-usage) with xdomain script setting the origin as a master in order to set up the two way communication.
