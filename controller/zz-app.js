function App() {
    var app = this;

    // helper controller
    app.state = new AppState();
    app.db;

    app.headerTitleText = ko.observable("SnipWik");

    app.initDb = function() {
        app.db = DB.init();
    };

    // layout header data binding
    app.canNavigateBack = ko.observable(false);
    var currentController = null;

    // the controller for the current view
    app.getCurrentController = function() {
        return currentController;
    };

    // the viewHistory (stack) maintains the "back" behaviour of the app
    var viewHistory = new Array();
    // did we navigate back?
    var wasNavigatingBack = false;

    // data structure for navigation stack entries
    var ViewHistoryEntry = function(viewpath, title) {
        var thisEntry = this;
        var slash = "/"; // just to get not confused with "/" or "\"
        var slashIndex = viewpath.indexOf(slash);
        var hasSubfolder = viewpath.contains(slash);

        // properties
        thisEntry.id = viewpath;
        thisEntry.file = "view/" + viewpath + '.html';
        thisEntry.name = (hasSubfolder) ? viewpath.substr(slashIndex + 1) : viewpath;
        thisEntry.subfolder = (hasSubfolder) ? viewpath.substr(0, slashIndex) : "";

        // Controllername: "order/my-view" -> OrdnerMyViewController
        thisEntry.controller = thisEntry.name.toCamel().ucfirst() + "Controller";
        if (hasSubfolder)
            thisEntry.controller = thisEntry.subfolder.ucfirst() + thisEntry.controller;

        // methods
        thisEntry.createController = function() {
            try {
                var controller = eval("new " + thisEntry.controller + "()");
            } catch (e) {
                console.log("error: on creating controller: " + e);
                console.log(printStackTrace());
                return null;
            }

            return controller;
        };

        thisEntry.equals = function(path) {
            var temp = new ViewHistoryEntry(path);
            return thisEntry.id == temp.id;
        };
    };

    // the current view is always on top of the navigation stack
    app.currentView = function() {
        return viewHistory.last(); // could be undefined
    };

    // the last view is always the last second postition of the stack, if applicable
    app.lastView = function() {
        return viewHistory[viewHistory.length - 2]; // could be null
    };

    // we can navigate backwards, unless we are in the very first view 
    var updateBackNavigation = function() {
        //update back button visibility
        app.canNavigateBack(app.lastView() !== undefined);

        return app.canNavigateBack();
    };

    //// you can add an handler which is called before the navigation (for export)
    //// and one handler which is called after the navigation (for import)
    //app.navigateBackWithCallback = function (exportHandler, importHandler) {
    //    if (exportHandler) exportHandler();
    //    app.navigateBack();
    //    if (importHandler) importHandler();
    //};

    app.wasLastNavigationBackwards = function() {
        return wasNavigatingBack;
    };

    app.navigateBackHandler = function() {
        app.navigateBack();
    };

    // "back" function of the app
    app.navigateBack = function() {
        if (!app.canNavigateBack()) {
            // this function cannot be called, if its not possible
            console.log("error: invalid method call, cannot navigate back");
            return;
        }

        if (!app.canNavigate()) {
            return;
        }

        // remove ("pop") current view and navigate (backwards) to the new current view
        viewHistory.pop();
        //alert(app.currentView().file);
        app.navigateTo(app.currentView().id, {backwards : true});
    };


    // get/set home view
    var homeViewEntry = null;

    app.home = function(viewPath) {
        if (typeof viewPath !== 'undefined') {
            homeViewEntry = new ViewHistoryEntry(viewPath);
        }

        return homeViewEntry;
    };


    // "home" navigation
    app.navigateHome = function() {
        var home = app.home();
        if (home) {
            viewHistory.clear();
            var homeView = new ViewHistoryEntry(home.file);
            viewHistory.push(homeView);
            app.canNavigateBack(true);
            app.navigateTo(app.home().id);
        } else {
            throw "home view ist not defined! use app.home('viewname') in the index.html";
        }
    };

    // goes back to a specific screen
    app.navigateBackTo = function(viewpath, /*optional*/ doNotExecute) {
        while (app.lastView() && (app.lastView().id != viewpath)) {
            console.log('remove navigation history entry: ' + app.lastView().file);
            viewHistory.pop();
        }

        // if upfate fails, this is an invalid function call
        if (!updateBackNavigation()) {
            alert('unexpected error: cannot remove latest page history to the page: ' + viewpath);
        }

        if (doNotExecute) {
            viewHistory.pop(); // remove instead, because we will navigate to another screen
        } else {
            app.navigateBack();
        }
    };


    app.canNavigate = function(backwards, viewPath) {
        var okay = true;

        if (currentController != null && currentController.canNavigate) {
            okay = currentController.canNavigate(backwards, viewPath);
        }

        return okay;
    };

    // navigates to a given view
    // initHandler: function which init the javascript for the new view
    // options: { 
    //              backwards: true/false       true=used for backwards navigation only
    //              nohistory: true/false       true=next page is not move on top of the page history stack
    //          }
    app.navigateTo = function(viewPath, /*optional*/options) {
        var self = this;
        console.log("call navigate to");
        var innerOptions = options; // BECAUSE THE FUCKING OPTIONS CANNOT BE SET?? WHY ??? 

        // default options
        if (!innerOptions) {
            innerOptions = {backwards : false, nohistory : false, reset : false, doNotExecute : false};
        }

        // only test on forward navigation, if the controller allows it
        if (!innerOptions.backwards) {
            // DO NOT concatenate if expressions here
            if (!app.canNavigate(innerOptions.backwards, viewPath))
                return;
        }

        // remember, navigationdirection
        wasNavigatingBack = innerOptions.backwards;

        // create view entry
        var viewEntry = new ViewHistoryEntry(viewPath);
        console.log("navigation: " + viewEntry.file + " [nohistory:" + innerOptions.nohistory + ",backwards:" + innerOptions.backwards + ",reset:" + innerOptions.reset + ", doNotExecute: " + innerOptions.doNotExecute + "]");

        if (innerOptions.doNotExecute) {
            // just push on history stack
            viewHistory.push(viewEntry);
            return;
        }

        // unapply knockout bindings for the current view
        ko.cleanNode($('#head')[0]);

        //TODO: instead of just replacing "content", we could do an simple transition effect (slide left/right)
        // by adding the content into an addtional (nonvisible) div and do a jquery ui transition or something...

        console.log("state: loading view " + viewEntry.file + "...");

        // replace content with screen2 page
        $('#content').load(viewEntry.file, function() {
            console.log("state: view loaded.");

            //export data, if export function exits
            if (currentController && currentController.exportData)
                currentController.exportData();

            // evaluate controller (app.title should be updated by the controller of the current view)
            console.log("state: creating controller " + viewEntry.controller + "...");
            currentController = viewEntry.createController();
            console.log("state: controller created.");

            // reset history?
            if (innerOptions.reset) {
                viewHistory.clear();
                console.log("state: navigation history cleared.");
            }

            // if we are not navigating backwards, place this view on top of the nav stack
            if (!(innerOptions.nohistory || innerOptions.backwards)) {
                viewHistory.push(viewEntry);
                //console.log("Navigation History Stack: " + JSON.stringify(viewHistory));
            }

            if (currentController && currentController.initController)
                currentController.initController();

            // now update state of back button
            updateBackNavigation();

            // set the binding
            ko.applyBindings(currentController, $('#head')[0]);


            // info: other view-specific handlers should be registered in the corresponding controller
            console.log("state: loading controller finished.");
            app.header.refreshCotroller();

        });

        // add hash to url
        //setLocationHash('#' + viewEntry.id);

        // if (!wasNavigatingBack) checkAndInitUsedTemplates();
    };


    //function initPage() {
    //    if ($('#wrapper').length) {
    //        checkAndInitUsedTemplates();
    //        alert("init");
    //    } else {
    //        window.setTimeout(function () {
    //            initPage();
    //        }, 250);
    //    }
    //}


    // set a hashtag after the url
    function setLocationHash(str) {
        window.location.hash = str;
    }


    $(document).ready(function() {
        // do something on startup
    });


    app.togglePanel = function(data, event) {
        expandOrCollapseDiv(data + "Panel");
        $("#" + data + "Icon").toggleClass("fa-chevron-up fa-chevron-down");
    };

    var expandOrCollapseDiv = function(id) {
        var growDiv = document.getElementById(id);
        if (growDiv.clientHeight) {
            collapse(growDiv, id);
        } else {
            expand(growDiv, id);
        }
    };

    app.expandDiv = function(id) {
        var growDiv = document.getElementById(id);
        expand(growDiv, id);
    };

    app.collapseDiv = function(id) {
        var growDiv = document.getElementById(id);
        collapse(growDiv, id);
    };

    var collapse = function(growDiv, id) {
        growDiv.style.height = 0;
        $("#" + id + ".panel-body").css({"padding-top" : "0", "padding-bottom" : "0"});
    };

    var expand = function(growDiv, id) {
        var wrapper = $("#" + id).find(".measureWrapper");
        growDiv.style.height = (wrapper[0].clientHeight + 30) + "px";
        $("#" + id + ".panel-body").css({"padding-top" : "15px", "padding-bottom" : "15px"});
    };
}

var app = new App();

