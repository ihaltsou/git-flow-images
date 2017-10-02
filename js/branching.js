'use strict';


function initBranching() {
  var graphConfig = new GitGraph.Template({
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

  var stabilizationCommit = {
    messageAuthorDisplay: false,
    messageBranchDisplay: false,
    messageHashDisplay: false,
    message: "Release stabilization commit(s)"
  };

  var featureColor = 0;
  var developColor = 1;
  var releaseColor = 2;
  var supportColor = 3;
  var masterColor = 4;
  var productionColor = 5;

  var gitGraph = new GitGraph(config);

  var develop = gitGraph.branch({name: "develop", column: developColor});
  develop.commit("Initial commit");

  var staging = gitGraph.branch({name: "staging", parentBranch: develop, column: masterColor});
  var production = gitGraph.branch({name: "production", parentBranch: develop, column: productionColor});


  develop.commit({messageDisplay: false});
  staging.commit({messageDisplay: false});
  production.commit({messageDisplay: false});

  var feature1 = gitGraph.branch({parentBranch: develop, name: "feature/1", column: featureColor});
  feature1.commit("A feature to go into v0.1.0").commit({messageDisplay: false});
  feature1.merge(develop);

  var feature2 = gitGraph.branch({parentBranch: develop, name: "feature/2", column: featureColor});
  feature2.commit("Another feature to go into v0.1.0").commit({messageDisplay: false});
  feature2.merge(develop);

  var release_010 = gitGraph.branch({parentBranch: develop, name: "release/v0.1.0", column: releaseColor});
  release_010.commit({message: "Start v0.1.0-rc Release Candidate builds", tag: "v0.1.0-rc", tagColor: 'gray'});
  release_010.commit(stabilizationCommit);
  release_010.merge(develop).merge(staging, {dotStrokeWidth: 10, message: "Release v0.1.0 tagged", tag: "v0.1.0"});





  var hotfix_01x = gitGraph.branch({parentBranch: staging, name: "hotfix/v0.1.x", column: supportColor});
  hotfix_01x.commit({
    message: "Start v0.1.1-rc Release Candidate builds",
    tag: "v0.1.1-rc",
    tagColor: 'gray'
  }).commit(bugfixCommit);

  var feature3 = gitGraph.branch({parentBranch: develop, name: "feature/3", column: featureColor});
  feature3.commit("A feature to go into v0.2.0").commit({messageDisplay: false});
  feature3.merge(develop);

  hotfix_01x.commit({dotStrokeWidth: 10, message: "Release v0.1.1 tagged", tag: "v0.1.1"}).merge(develop).merge(staging);

  hotfix_01x.commit({message: "Start v0.1.2-rc Release Candidate builds", tag: "v0.1.2-rc", tagColor: 'gray'})
  hotfix_01x.commit(bugfixCommit).commit({dotStrokeWidth: 10, message: "Release v0.1.2 tagged", tag: 'v0.1.2'});
  hotfix_01x.merge(develop).merge(staging);
  develop.commit({messageDisplay: false});

  var release_020 = gitGraph.branch({parentBranch: develop, name: "release/v0.2.0", column: releaseColor});
  release_020.commit({message: "Start v0.2.0-rc Release Candidate builds", tag: "v0.2.0-rc", tagColor: 'gray'})
  release_020.commit(stabilizationCommit);
  release_020.merge(develop).merge(staging, {dotStrokeWidth: 10, message: "Release v0.2.0 tagged", tag: "v0.2.0"});

  staging.merge(develop).merge(production, {dotStrokeWidth: 10, message: "Release v1.0.0 tagged", tag: "v1.0.0"});



  var support_11x = gitGraph.branch({parentBranch: staging, name: "support/v1.1.x", column: supportColor});
  support_11x.commit({message: "Start v1.1.1-rc Release Candidate builds", tag: "v1.1.1-rc", tagColor: 'gray'})
  support_11x.commit(bugfixCommit).commit({dotStrokeWidth: 10, message: "Release v1.1.1 tagged", tag: "v1.1.1"});
  support_11x.merge(develop);
  develop.commit({messageDisplay: false});

  var feature4 = gitGraph.branch({parentBranch: develop, name: "feature/4", column: featureColor});
  develop.commit({messageDisplay: false});
  feature4.commit("A feature to go into v1.2.0").commit({messageDisplay: false});
  feature4.merge(develop);

  support_11x.commit({message: "Start v1.1.2-rc Release Candidate builds", tag: "v1.1.2-rc", tagColor: 'gray'})
  support_11x.commit(bugfixCommit).commit({dotStrokeWidth: 10, message: "Release v1.1.2", tag: "v1.1.2"});
  support_11x.merge(develop);
  develop.commit({messageDisplay: false});

  var feature5 = gitGraph.branch({parentBranch: develop, name: "feature/5", column: featureColor});
  develop.commit({messageDisplay: false});
  feature5.commit("Another feature to go into v1.2.0").commit({messageDisplay: false});
  feature5.merge(develop);

  support_11x.commit({message: "Start v1.1.3-rc Release Candidate builds", tag: "v1.1.3-rc", tagColor: 'gray'})
  support_11x.commit(bugfixCommit).commit({dotStrokeWidth: 10, message: "Release v1.1.3 tagged", tag: "v1.1.3"});
  support_11x.merge(develop);
  develop.commit({messageDisplay: false});

  var release_120 = gitGraph.branch({parentBranch: develop, name: "release/v1.2.0", column: releaseColor});
  release_120.commit({message: "Start v1.2.0-rc Release Candidate builds", tag: "v1.2.0-rc", tagColor: 'gray'})
  release_120.commit(stabilizationCommit);
  release_120.merge(develop).merge(staging, {dotStrokeWidth: 10, message: "Release v1.2.0 tagged", tag: "v1.2.0"});
  develop.commit({messageDisplay: false});
}

$(document).ready(initBranching);



