var DB = (function() {
    var self = this;

    self.db;

    function initialize() {
        self.db = window.openDatabase("MisDB", "1.0", "MIS DB", 1000000);
        self.db.transaction(createTablesIfExist, errorCB);

        return this;
    }

    function createTablesIfExist(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS solution (id INTEGER NOT NULL PRIMARY KEY, name TEXT not null, description TEXT)', [], function() {
            tx.executeSql('INSERT INTO solution (id, name, description) VALUES (1, "Quick Sort Algorithmus", "Quicksort (engl. quick ‚schnell‘ und to sort ‚sortieren‘) ist ein schneller, rekursiver, nicht-stabiler Sortieralgorithmus, der nach dem Prinzip Teile und herrsche (lat. Divide et impera!, engl. divide and conquer) arbeitet.")');
            tx.executeSql('INSERT INTO solution (id, name, description) VALUES (2, "Bubble Sort Algorithmus", "Bubblesort (auch Sortieren durch Aufsteigen) ist ein Algorithmus, der vergleichsbasiert eine Liste von Elementen sortiert. Dieses Sortierverfahren arbeitet in-place, sortiert stabil und hat eine Laufzeit von \mathcal{O}(n^2) im schlimmsten (Worst-Case) wie auch im durchschnittlichen Fall (Average-Case)")');
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS solution_detail_type (id INTEGER NOT NULL PRIMARY KEY, type_name TEXT, is_code INTEGER, is_textual INTEGER)', [], function() {
            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, is_code, is_textual) VALUES (1, "Beschreibung", 0, 1)');
            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, is_code, is_textual) VALUES (2, "Problemstellung", 0, 1)');
            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, is_code, is_textual) VALUES (3, "PseudoCode", 1, 0)');
            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, is_code, is_textual) VALUES (4, "Code (Java)", 1, 0)');
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS solution_detail (id INTEGER NOT NULL PRIMARY KEY, detail_type_id INTEGER not null, solution_id INTEGER not null, content TEXT)', [], function() {
            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (1, 1, 1, "Quicksort (engl. quick ‚schnell‘ und to sort ‚sortieren‘) ist ein schneller, rekursiver, nicht-stabiler Sortieralgorithmus, der nach dem Prinzip Teile und herrsche (lat. Divide et impera!, engl. divide and conquer) arbeitet.")');
            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (2, 2, 1, "Suchen von etwas...")');
            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (3, 3, 1, "PseudoCode")');
            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (4, 4, 1, "JavaCode")');
            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (5, 1, 2, "Bubblesort (auch Sortieren durch Aufsteigen) ist ein Algorithmus, der vergleichsbasiert eine Liste von Elementen sortiert. Dieses Sortierverfahren arbeitet in-place, sortiert stabil und hat eine Laufzeit von \mathcal{O}(n^2) im schlimmsten (Worst-Case) wie auch im durchschnittlichen Fall (Average-Case)")');
            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (6, 2, 2, "Suchen von etwas...")');
            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (7, 3, 2, "PseudoCode")');
            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (8, 4, 2, "JavaCode")');
        });
        
//        tx.executeSql('DROP TABLE poll', [], function(){
//            
//        });
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS poll (id TEXT NOT NULL PRIMARY KEY, name TEXT not null)', [], function() {
            tx.executeSql('INSERT INTO poll (id, name) VALUES ("p9aaknkevwhw3sxw", "Umfrage 1")');
        });
    }

    function errorCB(error) {
        console.log("error processing SQL: (message: " + error.message + ", code: " + error.code + ")");
    }

    function nullCB() {
    }

    var query = function(queryString, params, callback) {
        console.log("executing SQL: " + queryString + ", parameter: " + params + " (" + new Date() + ")");

        self.db.transaction(function(tx) {
            if (callback) {
                tx.executeSql(queryString, params, function(tx, results) {
                    console.log("returning results (" + new Date() + ")");
                    callback(results);
                }, errorCB);
            } else {
                tx.executeSql(queryString, params, nullCB, errorCB);
            }
        }, errorCB);
    };

    return {
        init: initialize,
        query: query
    };
})();

