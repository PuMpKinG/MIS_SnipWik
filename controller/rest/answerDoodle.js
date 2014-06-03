function RestAnswerdoodleController() {
    var self = this;

    self.polls = ko.observableArray();

    // aktuell angezeigte Umfrage Daten
    self.id = ko.observable();
    self.title = ko.observable();
    self.description = ko.observable();
    self.name = ko.observable();
    self.options = ko.observableArray();

    //participant Info
    self.personName = ko.observable();
    self.answerOptions = new Array();

    self.selectedPoll = ko.observable();

    function getAnswerCheckboxes(chkboxName) {
        var checkboxes = document.getElementsByName(chkboxName);
        var values = new Array();
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                values.push(1);
            } else {
                values.push(0);
            }
        }
        return values;
    }

    self.sendAnswer = function() {
        self.answerOptions = getAnswerCheckboxes("selectedAnswer");

        var doc = document.implementation.createDocument(null, null, null);

        var ansOpt = new Array();
        self.answerOptions.forEach(function(opt){
            ansOpt += xmlify("option", opt);
        });
        

        var doc = document.implementation.createDocument(null, null, null);

        var data = xmlify("participant",
                xmlify("name", self.personName()),
                xmlify("preferences", opts)
                );

        console.log(data);

        app.rest.postParticipant(self.id(), data,
                function(data, jqXHR) {
                    console.log("success push new participant for poll with id: " + self.id() + ", data: " + data);

                },
                function(jqXHR, jsonValue) {
                    console.log("error push new participant for poll with id: " + self.id() +"error: " + jsonValue);
                });
    };

    var doc = document.implementation.createDocument(null, null, null);

    function xmlify() {
        var node = doc.createElement(arguments[0]), text;

        for (var i = 1; i < arguments.length; i++) {
            if (typeof arguments[i] == 'string') {
                node.appendChild(doc.createTextNode(arguments[i]));
            }
            else {
                node.appendChild(arguments[i]);
            }
        }

        return node;
    }
    ;


    self.initController = function() {
        loadPoll();
    }

    function loadPoll() {
        var pollQuery = "SELECT * FROM poll";
        app.db.query(pollQuery, [], function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.polls.push({"id": rowIndex, "name": row.name});
            }
        });
    }
}

