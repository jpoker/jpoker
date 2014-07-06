'use strict';

var Request = ( function () {

    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
    } catch ( e ) {
        try {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        } catch ( E ) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest !== 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }

    //browser doesn't wait response from server it setups a callback
    var GetUsersAsynchr = function () {
        xmlhttp.open( 'GET', '/session/0/users/out_info', true );
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    alert( xmlhttp.responseText + ' XmlHttp - asynchronous' );
                }
            }
        };

        xmlhttp.send( null );//request body - GET doesn't have a request body
    };

    return {
        PostNewSession : function (masterId , callback) {
            xmlhttp.open('POST', '/sessions/new/' + masterId, true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 200) {
                        //alert( xmlhttp.responseText );
                        callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.responseText});
                    } else {
                        callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.statusText });
                    }
                }
            };

            xmlhttp.send('master_id=' + masterId);
        },

        PostJoinSession : function ( sessionId, userId, callback) {
            xmlhttp.open('POST', '/sessions/edit/' + sessionId + '/user/' + userId, true);
            xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                        callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.responseText});
                    } else {
                        callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.responseText});
                    }
                }
            };

            xmlhttp.send('session_id=' + sessionId + '&user_id=' + userId);
        },

        PostUsersAlreadyIn : function (sessionId, requestorId, callback) {
        xmlhttp.open( 'POST', '/session/' + sessionId + '/users/' + requestorId, true );
        xmlhttp.onreadystatechange = function () {
            if ( xmlhttp.readyState === 4 ) {
                if ( xmlhttp.status === 200 ) {
                    callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.responseText});
                }
                else{
                    callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.responseText});
                }

            }
        };

        xmlhttp.send('session_id=' + sessionId + '&requestor_id=' + requestorId);//request body - GET doesn't have a request body
    }
        };
    })();