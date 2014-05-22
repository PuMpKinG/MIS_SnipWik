var DB = (function() {
    var self = this;

    self.db;

    function initialize() {
        self.db = window.openDatabase("MisDB", "1.0", "MIS DB", 1000000);
        self.db.transaction(createTablesIfExist, errorCB);

        return this;
    }

    function createTablesIfExist(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS search_history_local (id INTEGER NOT NULL PRIMARY KEY, search_string TEXT, search_time DATE)', [], function() {

        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS solution (id INTEGER NOT NULL PRIMARY KEY, name TEXT not null, description TEXT)', [], function() {
            tx.executeSql('INSERT INTO solution (id, name, description) VALUES (1, "Quick Sort Algorithmus", "Quicksort (engl. quick ‚schnell‘ und to sort ‚sortieren‘) ist ein schneller, rekursiver, nicht-stabiler Sortieralgorithmus, der nach dem Prinzip Teile und herrsche (lat. Divide et impera!, engl. divide and conquer) arbeitet.")');
            tx.executeSql('INSERT INTO solution (id, name, description) VALUES (2, "Bubble Sort Algorithmus", "Bubblesort (auch Sortieren durch Aufsteigen) ist ein Algorithmus, der vergleichsbasiert eine Liste von Elementen sortiert. Dieses Sortierverfahren arbeitet in-place, sortiert stabil und hat eine Laufzeit von \mathcal{O}(n^2) im schlimmsten (Worst-Case) wie auch im durchschnittlichen Fall (Average-Case)")');
        });

        tx.executeSql('CREATE TABLE IF NOT EXISTS solution_detail_type (id INTEGER NOT NULL PRIMARY KEY, type_name TEXT, type TEXT)', [], function() {
            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, type) VALUES (1, "Beschreibung", "TEXT")');
            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, type) VALUES (2, "Problemstellung", "TEXT")');
            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, type) VALUES (3, "PseudoCode", "CODE")');
            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, type) VALUES (4, "Code (Java)", "CODE")');
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
    }

    function errorCB(error) {
        console.log("error processing SQL: (message: " + error.message + ", code: " + error.code + ")");
    }

    function nullCB() {
    }

    var query = function(query, params, callback) {
        self.db.transaction(function(tx) {
            if (callback) {
                tx.executeSql(query, params, function(tx, results) {
                    callback(results);
                }, errorCB);
            } else {
                tx.executeSql(query, params, nullCB, errorCB);
            }
        }, errorCB);
    };

    return {
        init: initialize,
        query: query
    };
})();

