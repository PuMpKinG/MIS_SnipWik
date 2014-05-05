function DetailspageController(){
    var self = this;
    
    self.togglePanel = function (data, event) {
        expandOrCollapseDiv(data + "Panel");
        $("#" + data + "Icon").toggleClass("fa-chevron-up fa-chevron-down");
    };

    var expandOrCollapseDiv = function (id) {
        var growDiv = document.getElementById(id);
        if (growDiv.clientHeight) {
            collapse(growDiv, id);
        } else {
            expand(growDiv, id);
        }
    };

    var collapse = function (growDiv, id) {
        growDiv.style.height = 0;
        $("#" + id + ".panel-body").css({ "padding-top": "0", "padding-bottom": "0" });
    };

    var expand = function (growDiv, id) {
        var wrapper = $("#" + id).find(".measureWrapper");
        growDiv.style.height = (wrapper[0].clientHeight + 30) + "px";
        $("#" + id + ".panel-body").css({ "padding-top": "15px", "padding-bottom": "15px" });
    };
   
}


