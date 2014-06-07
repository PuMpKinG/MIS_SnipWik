function DetailspageController() {
    var self = this;

    self.solution = ko.observable();
    self.details = ko.observableArray();

    self.initController = function() {
        var solutionId = app.state.solutionId();

        loadSolution(solutionId);
        loadDetails(solutionId);

        app.state.editSolution(self.solution);
        app.state.editDetails(self.details);
    };

    self.saveCSV = function() {
        var solutionId = app.state.solutionId();

        // actual delimiter characters for CSV format
        var colDelim = '","';
        var rowDelim = '"\r\n"';

        var csv = 'id' + colDelim + 'name' + colDelim + 'description' + rowDelim;

        var solutionQuery = "SELECT * FROM solution WHERE id = ?";
        app.db.query(solutionQuery, [solutionId], function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                csv += row.id + colDelim + row.name + colDelim + row.description + rowDelim;
            }

            var pom = document.createElement('a');
            var blob = new Blob([csv], {type : 'text/csv;charset=utf-8;'});
            var url = URL.createObjectURL(blob);
            pom.href = url;
            pom.setAttribute('download', 'data.csv');
            pom.click();
        });
    };
    
    
    self.saveXML = function() {
        var solutionId = app.state.solutionId();

        var xml = "<solution>";
        xml += "<details>";

        var detailsQuery = "SELECT sd.id, sd.content, sdt.id as typeId, sdt.type_name, sdt.is_code, sdt.is_textual FROM solution_detail sd INNER JOIN solution_detail_type sdt ON sdt.id = sd.detail_type_id WHERE sd.solution_id = ? AND sdt.is_textual = 1";
        app.db.query(detailsQuery, [solutionId], function(details) {
            var len = details.rows.length;
            for (var detailsIndex = 0; detailsIndex < len; detailsIndex++) {
                var detail = details.rows.item(detailsIndex);
                xml += "<detail is_code='" + detail.is_code + "' is_text='" + detail.is_textual + "'>";
                xml += "<id>" + detail.id + "</id>";
                xml += "<content>" + detail.content.replace("<", "&lt;").replace(">", "&gt;") + "</content>";
                xml += "<type>" + detail.type_name + "</type>";
                xml += "</detail>";
            }

            xml += "</details>";
            xml += "</solution>";

            var pom = document.createElement('a');
            var blob = new Blob([xml], {type : 'text/xml;charset=utf-8;'});
            var url = URL.createObjectURL(blob);
            pom.href = url;
            pom.setAttribute('download', 'data.xml');
            pom.click();
        });
    };

    function loadSolution(solutionId) {
        var solutionQuery = "SELECT * FROM solution WHERE id = ?";
        app.db.query(solutionQuery, [solutionId], function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.solution(row.name);
            }
        });
    }

    function loadDetails(solutionId) {
        var detailsQuery = "SELECT sd.id, sd.content, sdt.id as typeId, sdt.type_name, sdt.is_code, sdt.is_textual FROM solution_detail sd INNER JOIN solution_detail_type sdt ON sdt.id = sd.detail_type_id WHERE sd.solution_id = ?";
        app.db.query(detailsQuery, [solutionId], function(results) {
            var len = results.rows.length;
            for (var rowIndex = 0; rowIndex < len; rowIndex++) {
                var row = results.rows.item(rowIndex);
                self.details.push({"itemId" : row.id, "content" : row.content, "typeId" : row.typeId, "name" : row.type_name, "isCode" : row.is_code, "isText" : row.is_textual});
            }
        });
    }
}


