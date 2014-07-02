'use strict';

(function () {

    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest !== 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }

    //var GetUsers = function () {
    //    xmlhttp.open('GET', '/session/0/users/out_info', false);
    //    xmlhttp.send(null);
    //    if (xmlhttp.status == 200) {
    //        alert(xmlhttp.responseText + 'XmlHttp');
    //    }
    //    else {
    //        alert('something wrong');
    //    }
    //}
    //GetUsers();

    //browser doesn't wait response from server it setups a callback
    var GetUsersAsynchr = function () {
        xmlhttp.open('GET', '/session/0/users/out_info', true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    alert(xmlhttp.responseText + ' XmlHttp - asynchronous');
                }
            }
        };

        xmlhttp.send(null);//request body - GET doesn't have a request body
    };

    //GetUsersAsynchr();

    var PostNewSession = function (masterId) {
        xmlhttp.open('POST', '/sessions/new/' + masterId, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    alert(xmlhttp.responseText);
                } else {
                    alert('error: ' + xmlhttp.statusText);
                }
            }
        };

        xmlhttp.send('master_id=' + masterId);
    };

    //PostNewSession('SCRUM_MASTER');

    var PostJoinSession = function (sessionId, userId) {
        xmlhttp.open('POST', '/sessions/edit/' + sessionId + '/user/' + userId, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    alert(xmlhttp.responseText);
                } else {
                    alert('error: ' + xmlhttp.statusText);
                }
            }
        };

        xmlhttp.send('session_id=' + sessionId + '&user_id=' + userId);
    };

    //PostJoinSession('6', 'She');

}());

    //synchronous requests
