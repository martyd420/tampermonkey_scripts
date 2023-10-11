// ==UserScript==
// @name         Freelo hotfix
// @version      0.1
// @description  Redirect to task detail instead of taskbar popup
// @author       martyd420
// @match        https://app.freelo.io/project/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=freelo.io
// @grant        none
// ==/UserScript==
 
 
(function() {
    var origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', function() {
            // posledni request je na https://app.freelo.io/api/tasks/find-by-ids?layout=kanban
            //                                                        -----------
            if (this.responseURL.includes('find-by-ids')) {
                setTimeout(function(){
                    document.querySelectorAll('a[href*="task"]').forEach((link) => {
                        link.onclick = function(){
                            document.location.replace(link.href);
                        };
                    });
                }, 256);
            }
        });
        origOpen.apply(this, arguments);
    };
})();
