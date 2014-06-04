function RestController() {
    var self = this;

    var doodleRestApiURL = "http://doodle-test.com/api1WithoutAccessControl";
    var pollURL = doodleRestApiURL + "/polls/";


    //Description:  http://doodle.com/xsd1/RESTfulDoodle.pdf
    // levels (e.g., „levels=2“ for a Yes-No poll and „levels=3“ for a Yes-No-Ifneedbe poll, default: 2) 
    // locale (e.g., „locale=de“ or „locale=en“) 
    // title (e.g., „title=“When and where?“) 
    // location(e.g., „location=At my Office“) 
    // description (e.g., „description=yada, yada, yada“) 
    // name (e.g., „name=Paul“) 
    // eMailAddress (e.g., „eMailAddress=user@customers.acme.com“) 
    // hidden (e.g., „hidden=true“ for a hidden poll, default: false) 
    // 
    // option1 (e.g., „option1=Pizza“) 
    // option2 (e.g., „option2=Pasta“) 
    //--------------------------------------------------------------------------

    /***********************************************/
    /***                 Umfrage                 ***/
    /***********************************************/
    self.getPoll = function(id, successCB, errorCB) {
        if (typeof id !== "number" && !isNaN(id))
            throw "id is not a valid number!";
        GET(pollURL, id, successCB, errorCB);
    };

    self.postPoll = function(data, successCB, errorCB) {
        POST(pollURL, "", data, successCB, errorCB);
    };

    self.deletePoll = function(id, successCB, errorCB) {
        if (typeof id !== "number" && !isNaN(id))
            throw "id is not a valid number!";
        DELETE(pollURL, id, successCB, errorCB);
    };

    /***********************************************/
    /***                 Mitglieder              ***/
    /***********************************************/
    self.getParticipant = function(pollID, participantID, successCB, errorCB) {
        if (typeof id !== "number" && !isNaN(id))
            throw "id is not a valid number!";
        GET(pollURL + pollID + "/participants/", participantID, successCB, errorCB);
    };

    self.postParticipant = function(pollID, data, successCB, errorCB) {
        POST(pollURL + pollID + "/participants/", "", data, successCB, errorCB);
    };

    self.deleteParticipant = function(pollID, participantID, successCB, errorCB) {
        if (typeof id !== "number" && !isNaN(id))
            throw "id is not a valid number!";
        DELETE(pollURL + pollID + "/participants/", participantID, successCB, errorCB);
    };


    /***********************************************/
    /***     Ajax Funtion for all REST calls     ***/
    /***********************************************/
    var GET = function(url, urlExtra, successCB, errorCB, synchron) {
        var isAsync = synchron ? false : true;
        console.log("ajax get url: " + url + urlExtra);
        $.ajax({
            url: url + urlExtra,
            type: 'GET',
            dataType: "xml",
            async: isAsync,
        }).done(function(data, status, jqXHR) {
            successCB(data, jqXHR);
        }).fail(function(jqXHR) {
            var jsonValue = jqXHR.responseText != "" ? jqXHR.responseText : emptyResponse;
            errorCB(jqXHR, jsonValue);
        });
    };

    var POST = function(url, urlExtra, postData, successCB, errorCB, synchron) {
        var isAsync = synchron ? false : true;
        console.log("ajax post url: " + url + urlExtra + " [postdata:" + postData + "]");
        $.ajax({
            url: url + urlExtra,
            type: 'POST',
            contentType: "application/xml",
            dataType: 'xml',
           // timeout: timeout,
            data: postData.outerHTML,
            async: isAsync,
        }).done(function(data, status, jqXHR) {
            successCB(data, jqXHR);
        }).fail(function(jqXHR) {
            var jsonValue = jqXHR.responseText != "" ? jqXHR.responseText : emptyResponse;
            errorCB(jqXHR, jsonValue);
        });
    };

    var PUT = function(url, urlExtra, putData, successCB, errorCB, synchron) {
        var isAsync = synchron ? false : true;
        console.log("ajax put url: " + url + urlExtra + " [putdata:" + putData + "]");
        $.ajax({
            url: url + urlExtra,
            type: 'PUT',
            contentType: "application/xml",
            dataType: 'xml',
            timeout: timeout,
            data: "=" + putData,
            async: isAsync,
        }).done(function(data, status, jqXHR) {
            successCB(data, jqXHR);
        }).fail(function(jqXHR, status) {
            var jsonValue = jqXHR.responseText != "" ? jqXHR.responseText : emptyResponse;
            errorCB(jqXHR, jsonValue);
        });
    };

    var DELETE = function(url, urlExtra, successCB, errorCB, synchron) {
        var isAsync = synchron ? false : true;
        console.log("ajax delete url: " + url + urlExtra);
        $.ajax({
            url: url + urlExtra,
            type: 'DELETE',
            dataType: "application/xml",
            timeout: timeout,
            async: isAsync,
        }).done(function(data, status, jqXHR) {
            successCB(data, jqXHR);
        }).fail(function(jqXHR) {
            var jsonValue = jqXHR.responseText != "" ? jqXHR.responseText : emptyResponse;
            errorCB(jqXHR, jsonValue);
        });
    };


}
