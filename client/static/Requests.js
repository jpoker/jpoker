'use strict';

var Request = ( function () {

    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject( "Msxml2.XMLHTTP" );
    } catch ( e ) {
        try {
            xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
        } catch ( E ) {
            xmlhttp = false;
        }
    }
    if ( !xmlhttp && typeof XMLHttpRequest != 'undefined' ) {
        xmlhttp = new XMLHttpRequest();
    }

    //browser doesn't wait response from server it setups a callback
    var GetUsersAsynchr = function () {
        xmlhttp.open( 'GET', '/session/0/users/out_info', true );
        xmlhttp.onreadystatechange = function () {
            if ( xmlhttp.readyState == 4 ) {
                if ( xmlhttp.status == 200 ) {
                    alert( xmlhttp.responseText + ' XmlHttp - asynchronous' );
                }
            }
        };

        xmlhttp.send( null );//request body - GET doesn't have a request body
    }

    return {
        PostNewSession : function (master_id , callback) {
            xmlhttp.open( 'POST', '/sessions/new/' + master_id, true );
            xmlhttp.onreadystatechange = function () {
                if ( xmlhttp.readyState == 4 ) {
                    if ( xmlhttp.status == 200 ) {
                        //alert( xmlhttp.responseText );
                        callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.responseText});
                    } else {
                        callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.statusText });
                    }
                }
            };

            xmlhttp.send( 'master_id=' + master_id );
        },

        PostJoinSession : function ( session_id, user_id, callback) {
            xmlhttp.open( 'POST', '/sessions/edit/' + session_id + '/user/' + user_id, true );
            xmlhttp.onreadystatechange = function () {
                if ( xmlhttp.readyState == 4 ) {
                    if ( xmlhttp.status == 200 ) {
                        callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.responseText});
                    } else {
                        callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.responseText});
                    }
                }
            };

            xmlhttp.send( 'session_id=' + session_id + '&user_id=' + user_id );
        },

        PostUsersAlreadyIn : function (session_id, requestor_id, callback) {
        xmlhttp.open( 'POST', '/session/' + session_id + '/users/' + requestor_id, true );
        xmlhttp.onreadystatechange = function () {
            if ( xmlhttp.readyState == 4 ) {
                if ( xmlhttp.status == 200 ) {
                    callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.responseText});
                }
                else{
                    callback({'status' : xmlhttp.status, 'responseText' : xmlhttp.responseText});
                }
            }
        };

        xmlhttp.send('session_id=' + session_id + '&requestor_id=' + requestor_id);//request body - GET doesn't have a request body
    }
        };
    })();