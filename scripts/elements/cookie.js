/**
 * Created by jhorlin.dearmas on 5/26/2015.
 */

(function (window, document) {
    "use strict";

    window.initCookie = function () {

        var crossDomain = ':crossDomain';
        var originDomain = ':originDomain';
        document.getElementById('origin').innerHTML = originDomain;
        document.getElementById('crossOrigin').innerHTML = crossDomain;
        function setCookieSuccess(valueElement, nameElement, xhr, e) {
            if(xhr.status === 201) {
                var message = document.getElementById('cookieMessage');
                message.innerHTML = "success";
                setTimeout(function () {
                    message.innerHTML = "";
                }, 3000);
                valueElement.value = "";
                nameElement.value = "";
            } else {
                setCookeError(xhr, e);
            }
        }

        function setCookeError(xhr, e) {
            var message = document.getElementById('cookieMessage');
            message.innerHTML = "oops!!! it did not work";
            setTimeout(function () {
                message.innerHTML = "";
            }, 3000);
        }

        function getCookieSuccess(value, xhr, e) {
            if(xhr.status === 200) {
                value.innerHTML = xhr.responseText;
            } else {
                getCookieError(xhr, e);
            }
        }

        function getCookieError(xhr, e) {
            var message = document.getElementById('getCookieMessage');
            message.innerHTML = "unable to get cookie";
            setTimeout(function () {
                message.innerHTML = "";
            }, 3000);
        }

        window.setValue = function () {
            var value = document.getElementById('cookieValue');
            var name = document.getElementById('cookieName');
            var setCookie = new XMLHttpRequest();
            setCookie.withCredentials = true;
            setCookie.onload = setCookieSuccess.bind(this, value, name, setCookie);
            setCookie.onerror = setCookeError.bind(this, setCookie);
            setCookie.open('POST', [crossDomain, 'cookies', name.value].join('/'), true);
            setCookie.send(value.value);
        };

        window.getValue = function () {
            var name = document.getElementById('getCookieName');
            var value = document.getElementById('getCookieValue');
            value.value = "";
            var getCookie = new XMLHttpRequest();
            getCookie.withCredentials = true;
            getCookie.onload = getCookieSuccess.bind(this, value, getCookie);
            getCookie.onerror = getCookieError.bind(this, getCookie);
            getCookie.open('GET', [crossDomain, 'cookies', name.value].join('/'), true);
            getCookie.send();
        };

    };


}(this, document));