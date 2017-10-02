'use strict';


function initBranching() {

    var gitgraph = new GitGraph({
        template: "blackarrow",
        reverseArrow: false,
        orientation: "horizontal",
        mode: "compact"
    });

    var develop = gitgraph.branch('develop');


    develop.commit().commit();



}

$(document).ready(initBranching);



