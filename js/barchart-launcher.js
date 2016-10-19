if (!jQuery) {
    var jQuery = require('jquery');
}
if (!_) {
    var _ = require('underscore');
}

function makePhenotypeLandingGraph(data){
    var graphDiv = ".dove-container";
    var tree = new monarch.model.tree(data);
    
    // global_golr_conf, global_solr_url, and scigrap_url are global variables
    // set in webapp.js using puptent
    var builder = new monarch.builder.tree_builder(global_solr_url, global_scigraph_url, global_golr_conf,
            tree, bbop.monarch.phenotypeGeneGolrSettings);
    
    var initGraph = function(){ 
        jQuery("#graph-loader").hide();
        tree = builder.tree;
        var graphObject = 
            new monarch.dovechart(bbop.monarch.phenotypeLandingConfig, tree, graphDiv, builder);
        setMinHeightWidth(graphObject, graphDiv);
    };
    builder.build_tree(['HP:0000118'], initGraph);
    
}

function makeGeneDiseaseLandingGraph(data){
    var graphDiv = ".gene-disease-container";
    var tree = new monarch.model.tree(data);

    // global_golr_conf, global_solr_url, and scigrap_url are global variables
    // set in webapp.js using puptent
    var builder = new monarch.builder.tree_builder(global_solr_url, global_scigraph_url, global_golr_conf,
            tree, bbop.monarch.diseaseGeneGolrSettings);
    
    var initGraph = function(){
        jQuery("#second-loader").hide();
        tree = builder.tree;
        var graphObject = 
            new monarch.dovechart(bbop.monarch.geneLandingConfig, tree, graphDiv, builder);
        setMinHeightWidth(graphObject, graphDiv);
    };
    builder.build_tree(['DOID:4'], initGraph);
    
}

function makeGenotypeLandingGraph(data){

    var graphDiv = ".dove-container";
    var tree = new monarch.model.tree(data);
    
    // global_golr_conf, global_solr_url, and scigrap_url are global variables
    // set in webapp.js using puptent
    var builder = new monarch.builder.tree_builder(global_solr_url, global_scigraph_url, global_golr_conf,
            tree, bbop.monarch.phenotypeGenotypeGolrSettings);
    
    var initGraph = function(){ 
        jQuery("#graph-loader").hide();
        tree = builder.tree;
        var graphObject = 
            new monarch.dovechart(bbop.monarch.genotypeLandingConfig, tree, graphDiv, builder);
        setMinHeightWidth(graphObject,graphDiv);
    };
    builder.build_tree(['HP:0000118'], initGraph);
    
}

function makeModelLandingGraph(data){
    var graphDiv = ".dove-container";
    var tree = new monarch.model.tree(data);

    // global_golr_conf, global_solr_url, and scigrap_url are global variables
    // set in webapp.js using puptent
    var builder = new monarch.builder.tree_builder(global_solr_url, global_scigraph_url, global_golr_conf,
            tree, bbop.monarch.modelDiseaseGolrSettings);
    
    var initGraph = function(){
        jQuery("#graph-loader").hide();
        tree = builder.tree;
        var graphObject = 
            new monarch.dovechart(bbop.monarch.modelLandingConfig, tree, graphDiv, builder);
        setMinHeightWidth(graphObject, graphDiv);
    };
    builder.build_tree(['DOID:4'], initGraph);
    
}

function makeDiseaseLandingGraph(data){

    var graphDiv = ".dove-container";
    var tree = new monarch.model.tree(data);

    
    // global_golr_conf, global_solr_url, and scigrap_url are global variables
    // set in webapp.js using puptent
    var builder = new monarch.builder.tree_builder(global_solr_url, global_scigraph_url, global_golr_conf,
            tree, bbop.monarch.diseasePhenotypeGolrSettings);
    
    var initGraph = function(){ 
        jQuery("#graph-loader").hide();
        tree = builder.tree;
        var graphObject = 
            new monarch.dovechart(bbop.monarch.diseaseLandingConfig, tree, graphDiv, builder);
        setMinHeightWidth(graphObject,graphDiv);
    };
    builder.build_tree(['DOID:4'], initGraph);
    
}


/*
 * The following are functions for the legacy graphs and will be removed
 */

function makeHomePageGraph(data){

    var graphDiv = '.graph-container';
    this.makeTwoSizeGraph(data,graphDiv,
            bbop.monarch.homePageConfig,
            bbop.monarch.homePageConfigSmall,
            640,640)
}

function makeDiseaseGeneGraph(data){

    var graphDiv = ".disease-gene-container";
    this.makeTwoSizeGraph(data,graphDiv,
                          bbop.monarch.diseaseGeneConfig,
                          bbop.monarch.diseaseGeneConfigSmall,
                          1900,950)
}

function makePhenotypeAnnotationGraph(data){

    var graphDiv = ".graph-container";
    this.makeTwoSizeGraph(data,graphDiv,
            bbop.monarch.homePageConfig,
            bbop.monarch.homePageConfig,
            1900,950)
}
                  
function makeDiseasePhenotypeGraph(data) {
    
    var graphDiv = ".disease-pheno-container";
    this.makeTwoSizeGraph(data,graphDiv,
            bbop.monarch.diseasePhenotypeConfig,
            bbop.monarch.diseasePhenotypeConfigSmall,
            1900,950)
}

function makePhenoGenoGraph(data) {
    
    var graphDiv = ".pheno-geno-container";
    this.makeTwoSizeGraph(data,graphDiv,
            bbop.monarch.genotypePhenotypeConfig,
            bbop.monarch.genotypePhenotypeConfigSmall,
            1900,950)
}

function makeTestGraph(data){
    
    var graphDiv = '.graph-container';
    this.makeResizableGraph(data,graphDiv,
            bbop.monarch.resizeConfig);
}

function makeTwoSizeGraph(data,graphDiv,largeConfig,smallConfig,width,height){

    var sizeTracker;
    var graphObject;
    var tree = new monarch.model.tree(data);
      
    //Check screen size on page load
    if (jQuery(window).width() > width && jQuery(window).height() > height){
        graphObject = 
            new monarch.dovechart(largeConfig, tree, graphDiv);
        sizeTracker = 'large';
    } else {
        graphObject = 
            new monarch.dovechart(smallConfig, tree, graphDiv);
        sizeTracker = 'small';
    }
    setMinHeightWidth(graphObject,graphDiv);
    
    window.addEventListener('resize', function(event){
 
        if (jQuery(window).width() > width && jQuery(window).height() > height && sizeTracker != 'large'){
            jQuery(graphDiv).children().remove();
            graphObject = 
                new monarch.dovechart(largeConfig, tree, graphDiv);
            setMinHeightWidth(graphObject,graphDiv);
            sizeTracker = 'large';
        } else if (jQuery(window).width() < width && jQuery(window).height() < height && sizeTracker != 'small') {
            jQuery(graphDiv).children().remove();
            graphObject = 
                new monarch.dovechart(smallConfig, tree, graphDiv);
            setMinHeightWidth(graphObject,graphDiv);
            sizeTracker = 'small';
        }
    });
}

function makeResizableGraph(data,graphDiv,config){
    
    var graphObject = new bbop.monarch.datagraph(config);
    graphObject.init(graphDiv,data);
    setMinHeightWidth(graphObject,graphDiv);
    
    window.addEventListener('resize', function(event){
        setMinHeightWidth(graphObject,graphDiv);   
    });
}

// Run all all landing pages.
function setMinHeightWidth (graphObject, div){

    var conf = graphObject.config

    // Figure out what mins we want.
    var minWidth = conf.width + conf.margin.left + conf.margin.right + 35;
    //var minHeight = conf.height + conf.margin.top + conf.margin.bottom;
    
    if( _.isEqual(jQuery(div).parent(),
              jQuery(div).parent('.panel.panel-default')) ){
        jQuery(div).parent().parent().css({
            "min-width": minWidth + "px"//,
            //"min-height": minHeight + "px"
        });
        jQuery(div).parent().css({
            "min-width": minWidth + "px"//,
            //"height": minHeight + 125 + "px"
        });
    }else{
        jQuery(div).parent().css({
        "min-width": minWidth + "px"//,
        //"height": minHeight + 125 + "px"
    });
    }
    jQuery(div).parent().parent().css({
    "min-width": minWidth + "px"//,
    //"height": minHeight + 125 + "px"
    });
}


if (typeof(loaderGlobals) === 'object') {
    loaderGlobals.makeDiseaseLandingGraph = makeDiseaseLandingGraph;
    loaderGlobals.makePhenotypeLandingGraph = makePhenotypeLandingGraph;
    loaderGlobals.makeGenotypeLandingGraph = makeGenotypeLandingGraph;
    loaderGlobals.makeGeneDiseaseLandingGraph = makeGeneDiseaseLandingGraph;
    loaderGlobals.makeModelLandingGraph = makeModelLandingGraph;
}
if (typeof(global) === 'object') {
    global.makeDiseaseLandingGraph = makeDiseaseLandingGraph;
    global.makePhenotypeLandingGraph = makePhenotypeLandingGraph;
    global.makeGenotypeLandingGraph = makeGenotypeLandingGraph;
    global.makeGeneDiseaseLandingGraph = makeGeneDiseaseLandingGraph;
    global.makeModelLandingGraph = makeModelLandingGraph;
}
