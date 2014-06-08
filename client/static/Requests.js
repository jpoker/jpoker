'use strict';

(function () {

    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
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
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    alert(xmlhttp.responseText + ' XmlHttp - asynchronous');
                }
            }
        };

        xmlhttp.send(null);//request body - GET doesn't have a request body
    }

    //GetUsersAsynchr();

    var PostNewSession = function (master_id) {
        xmlhttp.open('POST', '/sessions/new/' + master_id, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    alert(xmlhttp.responseText);
                } else {
                    alert('error: ' + xmlhttp.statusText);
                }
            }
        };

        xmlhttp.send('master_id=' + master_id);
    };

    //PostNewSession('SCRUM_MASTER');

    var PostJoinSession = function (session_id, user_id) {
        xmlhttp.open('POST', '/sessions/edit/' + session_id + '/user/' + user_id, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    alert(xmlhttp.responseText);
                } else {
                    alert('error: ' + xmlhttp.statusText);
                }
            }
        };

        xmlhttp.send('session_id=' + session_id + '&user_id=' + user_id);
    };

    PostJoinSession('6', 'She');

}());

    //synchronous requests
