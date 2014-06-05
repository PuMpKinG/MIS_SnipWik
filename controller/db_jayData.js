/**
 * Created by marcel on 05.06.2014. WebStorm 8.0.2
 */
// require('../lib/jayData.min.js');

var DB = (function() {
    var self = this;
    self.db;

    function initialize() {
        //self.db = window.openDatabase("MisDB", "1.0", "MIS DB", 1000000);
        //self.db.transaction(createTablesIfExist, errorCB);

        /*
         * Entities
         */
        $data.Entity.extend("$org.types.Solution", {
           Id: {type: "int", key:true, computed: true},
           Name: {type: "string", required: true},
           Desc: {type: "string"},
           SolutionDetail: {type: Array, elementType: "$org.types.SolutionDetail", inverseProperty: "Solution"}
       });

        $data.Entity.extend("$org.types.SolutionDetailType", {
            Id: {type: "int", key:true, computed: true},
            Name: {type: "string", required: true},
            Type: {type: "string"},
            SolutionDetail: {type: Array, elementType: "$org.types.SolutionDetail", inverseProperty: "SolutionDetailType"}
        });

        $data.Entity.extend("$org.types.SolutionDetail", {
            Id: {type: "int", key:true, computed: true},
            Content: {type: "string"},
            SolutionDetailType: {type: Array, elementType: "$org.types.SolutionDetailType", inverseProperty: "SolutionDetail"},
            Solution: {type: Array, elementType: "$org.types.Solution", inverseProperty: "SolutionDetail"}
        });

        $data.Entity.extend("$org.types.Poll", {
            Id: {type: "int", key:true, computed: true},
            Name: {type: "string", required: true}
        });

        $data.EntityContext.extend("$org.types.MisContext", {
            Poll: {type: $data.EntitySet, elementType: $org.types.Poll},
            Solution: {type: $data.EntitySet, elementType: $org.types.Solution},
            SolutionDetail: {type: $data.EntitySet, elementType: $org.types.SolutionDetail},
            SolutionDetailType: {type: $data.EntitySet, elementType: $org.types.SolutionDetailType}
        });

        /*
         * local database
         */
        $org.context = new $org.types.MisContext({
            name: "sqLite",
            databaseName: "snipwik",
            dbCreation: $data.storageProviders.DbCreationType.DropAllExistingTables
        });

        $org.context.onReady(function () {

            /*
             * Import Data
             */
            $org.context.Solution.add( new $org.types.Solution({
                Name: "Quick Sort Algorithmus",
                Desc: "schnell sortieren halt"
            }));
            $org.context.Solution.add( new $org.types.Solution({
                Name: "Bubble Sort Algorithmus",
                Desc: "Algorithmus, der vergleichsbasiert eine Liste von Elementen sortiert. Dieses Sortierverfahren arbeitet in-place, sortiert stabil und hat eine Laufzeit von \mathcal{O}(n^2) im schlimmsten (Worst-Case) wie auch im durchschnittlichen Fall (Average-Case)"
            }));
            $org.context.Solution.add( new $org.types.Solution({
                Name: "Fit First Algorithmus",
                Desc: "simpler Bin Packing Algorithmus"
            }));
            $org.context.Solution.add( new $org.types.Solution({
                Name: "Fit Best Algorithmus",
                Desc: "geht ab!"
            }));
            //$org.context.saveChanges(); // push to DB

            $org.context.SolutionDetailType.add( new $org.types.SolutionDetailType({
                Name: "Beschreibung",
                Type: "textual"
            }));
            $org.context.SolutionDetailType.add( new $org.types.SolutionDetailType({
                Name: "Problemstellung",
                Type: "textual"
            }));
            $org.context.SolutionDetailType.add( new $org.types.SolutionDetailType({
                Name: "Pseudo-Code",
                Type: "code"
            }));
            $org.context.SolutionDetailType.add( new $org.types.SolutionDetailType({
                Name: "Java-Code",
                Type: "code"
            }));
            //$org.context.saveChanges(); // push to DB

            var id0 = new Array(0);
            var id1 = new Array(1);
            var id2 = new Array(2);

            $org.context.SolutionDetail.add( new $org.types.SolutionDetail({
                Content: "Quicksort (engl. quick ‚schnell‘ und to sort ‚sortieren‘) ist ein schneller, rekursiver, nicht-stabiler Sortieralgorithmus, der nach dem Prinzip Teile und herrsche (lat. Divide et impera!, engl. divide and conquer) arbeitet.",
                Solution: id0,
                SolutionDetailType: id0
            }));
            $org.context.SolutionDetail.add( new $org.types.SolutionDetail({
                Content: "Suchen von etwas, wa",
                Solution: id0,
                SolutionDetailType: id1
            }));
            $org.context.SolutionDetail.add( new $org.types.SolutionDetail({
                Content: "//hier steht pseudocode",
                Solution: id0,
                SolutionDetailType: id2
            }));

            $org.context.saveChanges(); // push to DB

            //var promise = $org.context.Solution.filter( function (item) {return item.Name== this.solutionName;}, {solutionName: 'Quick Sort Algorithmus'});
            $org.context.Solution.toArray().then ( function (solution) {console.dir(solution)});
            //console.dir(promise);

        });

    }

//    function createTablesIfExist(tx) {
//        tx.executeSql('CREATE TABLE IF NOT EXISTS solution_detail (id INTEGER NOT NULL PRIMARY KEY, detail_type_id INTEGER not null, solution_id INTEGER not null, content TEXT)', [], function() {
//            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (1, 1, 1, "Quicksort (engl. quick ‚schnell‘ und to sort ‚sortieren‘) ist ein schneller, rekursiver, nicht-stabiler Sortieralgorithmus, der nach dem Prinzip Teile und herrsche (lat. Divide et impera!, engl. divide and conquer) arbeitet.")');
//            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (2, 2, 1, "Suchen von etwas...")');
//            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (3, 3, 1, "PseudoCode")');
//            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (4, 4, 1, "JavaCode")');
//            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (5, 1, 2, "Bubblesort (auch Sortieren durch Aufsteigen) ist ein Algorithmus, der vergleichsbasiert eine Liste von Elementen sortiert. Dieses Sortierverfahren arbeitet in-place, sortiert stabil und hat eine Laufzeit von \mathcal{O}(n^2) im schlimmsten (Worst-Case) wie auch im durchschnittlichen Fall (Average-Case)")');
//            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (6, 2, 2, "Suchen von etwas...")');
//            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (7, 3, 2, "PseudoCode")');
//            tx.executeSql('INSERT INTO solution_detail (id, detail_type_id, solution_id, content) VALUES (8, 4, 2, "JavaCode")');
//        });
//
//        tx.executeSql('CREATE TABLE IF NOT EXISTS solution_detail_type (id INTEGER NOT NULL PRIMARY KEY, type_name TEXT, is_code INTEGER, is_textual INTEGER)', [], function() {
//            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, is_code, is_textual) VALUES (1, "Beschreibung", 0, 1)');
//            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, is_code, is_textual) VALUES (2, "Problemstellung", 0, 1)');
//            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, is_code, is_textual) VALUES (3, "PseudoCode", 1, 0)');
//            tx.executeSql('INSERT INTO solution_detail_type (id, type_name, is_code, is_textual) VALUES (4, "Code (Java)", 1, 0)');
//        });
//
//
//
//        tx.executeSql('CREATE TABLE IF NOT EXISTS poll (id INTEGER NOT NULL PRIMARY KEY, name TEXT not null)', [], function() {
//            tx.executeSql('INSERT INTO poll (id, name) VALUES (1, "Umfrage 1")');
//            tx.executeSql('INSERT INTO poll (id, name) VALUES (2, "Umfrage 2")');
//        });
//    }

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

