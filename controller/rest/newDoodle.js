function RestNewdoodleController() {
    var self = this;

    var level = 3;
    var locale = "de";
    var hidden = false;
    var location = "internet";

    self.id = ko.observable();
    self.title = ko.observable("Test");
    self.description = ko.observable("Test-Umfrage");
    self.name = ko.observable("Ich");
    self.email = ko.observable("Ich@ich.de");
    self.options = ko.observableArray();

    self.addOption = function() {
        self.options.push({"id": this.options().length, "option": ""});
        
    };

    self.options.push({"id": 0, "option": "Huhn"});
    self.options.push({"id": 1, "option": "Ei"});

    // rest poll call
    self.createPoll = function() {

        var doc = document.implementation.createDocument(null, null, null);

        var opts = "";
        ko.utils.arrayForEach(this.options(), function(opt) {
            opts += xmlify("option", opt.option);
        });

        var doc = document.implementation.createDocument(null, null, null);

        var data = xmlify("poll",
                xmlify("type", "TEXT"),
                xmlify("hidden", "false"),
                xmlify("levels", "2"),
                xmlify("title", self.title()),
                xmlify("description", self.description()),
                xmlify("initator", xmlify("name", self.name())),
                xmlify("options", opts)
                );

        console.log(data);

        app.rest.postPoll(data, 
        function() {

        },
        function() {

        });
    };
    
    /*
     * <poll xmlns="http://doodle.com/xsd1"> 
     <type>TEXT</type> 
     <hidden>false</hidden> 
     <levels>2</levels> 
     <title>PPP</title> 
     <description>yum!</description> 
     <initiator> 
     <name>Paul</name> 
     </initiator> 
     <options> 
     <option>Pasta</option> 
     <option>Pizza</option> 
     Copyright © 2008-2012 Doodle AG 1.6.2 Page 4/9<option>Polenta</option> 
     </options> 
     </poll>
     */

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

}

