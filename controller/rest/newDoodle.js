function RestNewdoodleController() {
    var self = this;

    var level = 3;
    var locale = "de";
    var hidden = false;
    var location = "internet";

    self.id = ko.observable();
    self.title = ko.observable("Huhn-Ei-Umfrage");
    self.description = ko.observable("Was war zuerst da?");
    self.name = ko.observable("Ich");
    self.email = ko.observable("Ich@ich.de");
    self.options = ko.observableArray();

    self.addOption = function() {
        self.options.push({"id": this.options().length, "option": ""});
    };

    self.options.push({"id": 0, "option": "Huhn"});
    self.options.push({"id": 1, "option": "Ei"});

   
    self.createPoll = function(){
        var xw = new XMLWriter('UTF-8');
        
//        xw.formatting = 'indented';//add indentation and newlines
//        xw.indentChar = ' ';//indent with spaces
//        xw.indentation = 2;//add 2 spaces per level
        
        xw.writeStartDocument();
        
        xw.writeStartElement('poll');
            xw.writeAttributeString( 'xmlns', 'http://doodle.com/xsd1');
            xw.writeElementString('type', 'TEXT');
            xw.writeElementString('hidden', 'false');
            xw.writeElementString('levels', '2');
            xw.writeElementString('title', self.title());
            xw.writeElementString('description', self.description());
            xw.writeStartElement('initiator');
                xw.writeElementString('name', self.name());
            xw.writeEndElement();
            xw.writeStartElement('options');
                ko.utils.arrayForEach(this.options(), function(opt) {
                    xw.writeElementString('option', opt.option);
                });
            xw.writeEndElement();
        xw.writeEndElement();
        xw.writeEndDocument();
        
        var data = xw.getDocument();
        
        console.log(data); 
        
        //data.documentElement.outerHTML
        app.rest.postPoll(xw.flush(), 
        function(xdoodleKey, doodleLocationId, jqXHR) {
            console.log("created doodle location id: " + doodleLocationId);
            self.id(doodleLocationId);
            self.savePoll();
        },
        function(jqXHR, jsonValue) {
            console.log("error on push new doole: " + jsonValue);
            alert("Error on creating new Doodle: " + jsonValue);
        });
    };

    //save doodleID and Name in DB
    self.savePoll = function () {
        // TODO: Id und X-Doodle Key müssen gespeichert werden.
        var pollQuery = "INSERT INTO poll (id, name) VALUES (?,?)";
        app.db.query(pollQuery, [self.id(), self.title()], function(){});
    };
    
    self.initController = function() {
            
    };
    
    
    //    // rest poll call
//    self.createPoll = function() {
//        var data = "<?xml version='1.0' encoding='UTF-8'?>";
//        data += "<poll xmlns='http://doodle.com/xsd1'>";
//        data += "<type>TEXT</type>";
//        data += "<hidden>false</hidden>";
//        data += "<levels>2</levels>";
//        data += "<title>"+self.title()+"</title>";
//        data += "<description>"+self.description()+"</description>";        
//        data += "<initiator><name>"+self.name()+"</name></initiator>";
//        data += "<options>";        
//        ko.utils.arrayForEach(this.options(), function(opt) {
//            data += "<option>" + opt.option + "</option>";
//        });
//        data += "</options>";
//        data += "</poll>";
//
//        console.log(data);
//
//        app.rest.postPoll(data, 
//        function(data, jqXHR) {
//            var id = jqXHR.getResponseHeader("Content-Location");
//            console.log("success push new doodle with answer: " + data);
//            console.log("success push new doodle with answer: id " + id );
//            alert(data);
//            alert(id);
//            self.id(id);
//            savePoll();
//        },
//        function(jqXHR, jsonValue) {
//            console.log("error on push new doole: " + jqXHR.status + " -> " + jqXHR.responseText);
//        });
//    }            
    
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
    

//    self.createPoll = function() {
//        //var doc = document.implementation.createDocument(null, null, null);
//
//        var opts = "";
//        
//        ko.utils.arrayForEach(this.options(), function(opt) {
//            opts += xmlify("option", opt.option).outerHTML;
//        });
//
//        //var doc = document.implementation.createDocument(null, null, null);
//
//        var data = xmlify("poll",
//                xmlify("type", "TEXT"),
//                xmlify("hidden", "false"),
//                xmlify("levels", "2"),
//                xmlify("title", self.title()),
//                xmlify("description", self.description()),
//                xmlify("initator", xmlify("name", self.name())),
//                xmlify("options", opts)
//                );
//
//        console.log(data);
//
//        app.rest.postPoll(data, 
//        function(data, jqXHR) {
//            console.log("success push new doodle with answer: " + data);
//            
//        },
//        function(jqXHR, jsonValue) {
//            console.log("error on push new doole: " + jsonValue);
//        });
//    };

//    var doc = document.implementation.createDocument(null, null, null);
//
//    function xmlify() {
//        var node = doc.createElement(arguments[0]), text;
//
//        for (var i = 1; i < arguments.length; i++) {
//            if (typeof arguments[i] == 'string') {
//                node.appendChild(doc.createTextNode(arguments[i]));
//            }
//            else {
//                node.appendChild(arguments[i]);
//            }
//        }
//
//        return node;
//    };
}

