function SearchresultController(){
    var self = this;
    
    self.searchresult = ko.observableArray();
    
    self.navigateToDetails = function(){
        app.navigateTo("detailspage");
    }
    
     self.initController = function(){
         self.searchresult.push({
             "title" : "Quick Sort Algorithmus",
             "description": "Quicksort (engl. quick ‚schnell‘ und to sort ‚sortieren‘) ist ein schneller, rekursiver, nicht-stabiler Sortieralgorithmus, der nach dem Prinzip Teile und herrsche (lat. Divide et impera!, engl. divide and conquer) arbeitet."
         });
         self.searchresult.push({
             "title" : "Bubble Sort Algorithmus",
             "description": "Bubblesort (auch Sortieren durch Aufsteigen) ist ein Algorithmus, der vergleichsbasiert eine Liste von Elementen sortiert. Dieses Sortierverfahren arbeitet in-place, sortiert stabil und hat eine Laufzeit von \mathcal{O}(n^2) im schlimmsten (Worst-Case) wie auch im durchschnittlichen Fall (Average-Case)"
         });
         
     }
}

