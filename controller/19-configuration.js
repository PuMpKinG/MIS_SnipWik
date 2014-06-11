function ConfigurationController() {
    var self = this;

    self.deletePoll = function(){
        var query = 'DROP TABLE poll';
        app.db.query(query, [], function(){});
        alert("Table Poll deleted");
    };
    
    self.createPoll = function(){
        var query = 'CREATE TABLE IF NOT EXISTS poll (id TEXT NOT NULL PRIMARY KEY, name TEXT not null)';
        app.db.query(query, [], function(){});
        alert("Table Poll created");
    };
    
    self.fillPollWithTestData = function() {
        var query = 'INSERT INTO poll (id, name) VALUES (?, ?)';
        app.db.query(query, ["p9aaknkevwhw3sxw", "Test"], function(){});
        alert("Table Poll filled with test-value");
    };

    self.initController = function() {
        
    };
    
    
    
    

}

