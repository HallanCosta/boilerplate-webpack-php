/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/utils.js
//
//
//
//
// GERENCIA A REQUISIÇÃO HTTP
//
// REFERÊNCIA:
// https://www.google.com/search?q=AJAX+VANILLA+JS
// https://wickedev.com/use-vanilla-javascript-to-make-ajax-request/
//
//
//
//

var $ajax = {
    post: function(url, data, responseCallback) {
        console.log('::: $ajax POST > url and data:', url, data);

        // Create the XMLHttpRequest object.
        var xhr = new XMLHttpRequest();
        // Initialize the request
        xhr.open("POST", url, true);
        // Set content type
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // Send the request with data to post
        xhr.send(JSON.stringify(data));
        // Fired once the request completes successfully 
        xhr.onload = function(e)
        {
            // Check if the request was a success
            if (this.readyState === XMLHttpRequest.DONE)
            {
                if (this.status === 200 || this.status === 201)
                {
                    // var r = { code: 0, message: '' }

                    // Get and convert the responseText into JSON
                    // try { r = JSON.parse(xhr.responseText); } catch (e) {}

                    var r = JSON.parse(xhr.responseText);

                    responseCallback({ code: this.status || 0, message: r || 'Não foi possível ler a resposta do servidor. Por favor, tente novamente ou fale conosco por outro meio.' });

                    console.log('::: $ajax POST > Sucesso:', r);
                } else if (this.status >= 400) {
                    responseCallback({ code: 0, message: 'Não foi possível enviar os dados. Por favor, tente novamente ou fale conosco por outro meio.' });
                    console.log('::: $ajax POST > Error:', JSON.stringify(xhr.response));
                } else if (this.status >= 500) {
                    responseCallback({ code: 0, message: 'Não foi possível se comunicar com o servidor. Por favor, tente novamente ou fale conosco por outro meio.' });
                    console.log('::: $ajax POST > Error:', JSON.stringify(xhr.response));
                } else {
                    // Desconhecido
                    responseCallback({ code: 0, message: 'Não foi possível se comunicar com o servidor. Por favor, tente novamente ou fale conosco por outro meio.' });
                    console.log('::: $ajax POST > Error:', JSON.stringify(xhr.response));
                }
            }
        }
    },

    get: function (url, responseCallback) {
        console.log('::: $ajax GET > url:', url);

        // Create the XMLHttpRequest object.
        var xhr = new XMLHttpRequest();
        // Initialize the request
        xhr.open("GET", url, true);
        // Set content type
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // Send the request get
        xhr.send();
        // Fired once the request completes successfully 
        xhr.onload = function(e)
        {
            // Check if the request was a success
            if (this.readyState === XMLHttpRequest.DONE)
            {
                if (this.status === 200 || this.status === 201)
                {
                    var r = JSON.parse(xhr.responseText);

                    responseCallback({ code: this.status || 0, message: r || 'Não foi possível ler a resposta do servidor. Por favor, tente novamente ou fale conosco por outro meio.' });

                    console.log('::: $ajax GET > Sucesso:', r);
                } else if (this.status >= 400) {
                    responseCallback({ code: 0, message: 'Não foi possível enviar os dados. Por favor, tente novamente ou fale conosco por outro meio.' });
                    console.log('::: $ajax GET > Error:', JSON.stringify(xhr.response));
                } else if (this.status >= 500) {
                    responseCallback({ code: 0, message: 'Não foi possível se comunicar com o servidor. Por favor, tente novamente ou fale conosco por outro meio.' });
                    console.log('::: $ajax GET > Error:', JSON.stringify(xhr.response));
                } else {
                    // Desconhecido
                    responseCallback({ code: 0, message: 'Não foi possível se comunicar com o servidor. Por favor, tente novamente ou fale conosco por outro meio.' });
                    console.log('::: $ajax GET > Error:', JSON.stringify(xhr.response));
                }
            }
        }
    }
}

var $object = {
    /**
     * Alternative for Object.assign 
     * @param {array} objs 
     * @returns merge of the objects
     */
    assign: function(objs){ 
        var merge =  objs.reduce(function (r, o) {
            Object.keys(o).forEach(function (k) {
                r[k] = o[k];
            });
            return r;
        }, {});

        return merge;
    }
}

function $el(seletor) {
    return document.querySelector(seletor);
}

function $els(seletor) {
    return document.querySelectorAll(seletor);
}

function $trim(textElement) {
    return textElement.trim(); 
} 

// Working on IE8+
function $addClass(el, className) {
    if (el) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            var current = el.className, found = false;
            var all = current.split(' ');
            for(var i=0; i<all.length, !found; i++) found = all[i] === className;
            if(!found) {
                if(current === '') el.className = className;
                else el.className += ' ' + className;
            }
        }
    }
}

// Working on IE8+
function $removeClass(element, className) {
    if (element) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}


function $event(event, element, fn) {
    if (window.addEventListener) {
        if (typeof element === 'string') {
            const selector = document.querySelector(element);
            selector.addEventListener(event, fn, false);            
        } else {
            element.addEventListener(event, fn, false);            
        }
    }
    else if (window.attachEvent) {
        if (typeof element === 'string') {
            const selector = document.querySelector(element);
            selector.attachEvent(`on${event}`, fn);            
        } else {
            element.attachEvent(`on${event}`, fn);            
        }
    }
    else {
        if (typeof element === 'string') {
            const selector = document.querySelector(element);
            selector[`on${event}`] = fn;            
        } else {
            element[`on${event}`] = fn;          
        }
    }
}

function $hasClass(element, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
}

function $attr(element, attribute, value = "") {
    element.setAttribute(attribute, value);
}

function $getAttr(element, attribute) {
    return element.getAttribute(attribute);
}

function $removeAttr(element, attribute) {
    element.removeAttribute(attribute);
}

function $toggle(element, className, callback) {
    if (!$hasClass(element, className)) {
        $addClass(element, className);
        callback(true);
    } else {
        $removeClass(element, className);
        callback(false);
    }
}

function $find(element, seletor) {
    return element.querySelector(seletor);
}

function $findAttr(element, attribute) {
    var attr = $getAttr(element, attribute);

    if (attr !== null) {
        return true;
    } else {
        return false;
    }
}

function $addHTML(element, html) {
    element.innerHTML = html;
}

function $addText(element, text) {
    element.innerText = text;
}

/**
 * Method Delay
 * @param {function} callback - action that will perform only once
 * @param {number} time - delay in seconds
 */
function $delay(callback, time) {
    setTimeout(callback, time * 1000);
}
;// CONCATENATED MODULE: ./src/js/pages/home.js
function Home() {
  console.log('> Start page home');
}
;// CONCATENATED MODULE: ./src/js/index.js







/**
 * Init the code 
 */
DomReady.ready(function()
{
    switch ($$page) {
        case 'home':
            Home();
            break;
        default:
            break;
    }
});

/******/ })()
;