function ConfigurationController() {
    var self = this;

    self.deletePoll = function(){
        var query = 'DROP TABLE poll';
        app.db.query(query, [], function(){});
        alert("Table Poll deleted");
    };
    
    self.createPoll = function(){
        var query = 'CREATE TABLE IF NOT EXISTS poll (id TEXT NOT NULL PRIMARY KEY, name TEXT not null, doodleKey TEXT not null)';
        app.db.query(query, [], function(){});
        alert("Table Poll created");
    };
    
    self.fillPollWithTestData = function() {
        var query = 'INSERT INTO poll (id, name, doodleKey) VALUES (?, ?, ?)';
        app.db.query(query, ["drhy5z3ffmanbzav ", "MIS Umfrage", "ndpz3mib"], function(){});
        alert("Table Poll filled with test-value");
    };

    self.initController = function() {
        
    };
    
    
    
    

}

