'use strict';

const SockJS = require('sockjs-client');    // (1)
// const Stomp = require('stompjs'); // (2)
require('stompjs');

function register(registrations) {
    const socket = SockJS('/endpoint'); // (3)
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame){
        registrations.forEach(function(registration) {  // (4)
            stompClient.subscribe(registration.route, registration.callback);
        });
    });
}

module.exports.register = register;