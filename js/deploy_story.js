'use strict';


function initBranching() {
    var graphConfig = new GitGraph.Template({
        colors: [
            "#e6f598",
            "#66c2a5",
            "#fee08b",
            "#d53e4f",
            "#abdda4",
            "#fee08b",
            "#3288bd",
            "#fdae61",
        ],
        branch: {
            color: "#000000",
            lineWidth: 3,
            spacingX: 60,
            mergeStyle: "straight",
            showLabel: true,
            labelFont: "normal 10pt Arial",
            labelRotation: 0
        },
        commit: {
            spacingY: -30,
            dot: {
                size: 8,
                strokeColor: "#000000",
                strokeWidth: 4
            },
            tag: {
                font: "normal 10pt Arial",
                color: "yellow"
            },
            message: {
                color: "black",
                font: "normal 12pt Arial",
                displayAuthor: false,
                displayBranch: false,
                displayHash: false,
            }
        },
        arrow: {
            size: 8,
            offset: 3
        }
    });

    var config = {
        template: graphConfig,
        mode: "extended"
    };

    var bugfixCommit = {
        messageAuthorDisplay: false,
        messageBranchDisplay: false,
        messageHashDisplay: false,
        message: "Bug fix commit(s)"
    };

    var supportCommit = {
        messageAuthorDisplay: false,
        messageBranchDisplay: false,
        messageHashDisplay: false,
        message: "Support commit(s)"
    };

    var stabilizationCommit = {
        messageAuthorDisplay: false,
        messageBranchDisplay: false,
        messageHashDisplay: false,
        message: "Release stabilization commit(s)"
    };

    var featureColumn = 0;
    var developColumn = 1;
    var releaseColumn = 2;
    var hotfixColumn = 3;
    var stagingColumn = 4;
    var publicReleaseColumn = 5;
    var supportColumn = 6
    var productionColumn = 7;

    var gitGraph = new GitGraph(config);

    var develop = gitGraph.branch({name: "develop", column: developColumn});
    develop.commit("Initial commit");


    develop.commit({messageDisplay: false});

    var feature1 = gitGraph.branch({parentBranch: develop, name: "feature/1", column: featureColumn});
    feature1.commit("A feature to go into v0.1.0").commit({messageDisplay: false});
    feature1.merge(develop);
    feature1.commit("Adjust commits")
    feature1.merge(develop);

}

$(document).ready(initBranching);



