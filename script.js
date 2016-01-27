/* global d3 */


// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 100},
	width = 1200 - margin.right - margin.left,
	height = 550 - margin.top - margin.bottom,
	tree_height = height -50,
    tree_width = width/3,
    barGraphRectWidth=300,
    barGraphRectHeight=500;

d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom);

d3.select("svg").append("g")
    .append("rect")
    .attr("id", "backgroundRect")
    .attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
    .attr("rx", 25);

//tree drawing starts
var tree = d3.layout.tree()
	.size([tree_height,tree_width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });


var treeg = d3.select("svg").append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", "main_tree");

// load the external data

d3.json("./treedata.json", function(error, json) {
  if (error) throw error;

  var nodes = tree.nodes(json),
      links = tree.links(nodes);

  var link = treeg.selectAll("path.link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = treeg.selectAll("g.node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  node.append("circle")
      .attr("r", 10).style('stroke','#000');

  node.append("text")
      .attr("dx", function(d) { return d.children ? -12 : 12; })
      .attr("dy", 3)
      .attr("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.name; });
});

// tree drawing ends


//Generation of Level 1 graph
var level1graph_container = d3.select("svg").append("g")
    .attr("transform", "translate(" + (margin.left+tree_width+100) + "," + margin.top + ")")
    .attr("id", "level1graph_container");

level1graph_container.append("rect")
    .attr("width", barGraphRectWidth)
    .attr("height", barGraphRectHeight)
    .attr("class", "bargraphRectangle")
    .attr("rx", 25);
        


// Generation of Level 2 graph
var level2graph_container = d3.select("svg").append("g")
    .attr("transform", "translate(" + (margin.left+tree_width+barGraphRectWidth+150) + "," + margin.top + ")")
    .attr("id", "level2graph_container");

level2graph_container.append("rect")
    .attr("width", barGraphRectWidth)
    .attr("height", barGraphRectHeight)
    .attr("class", "bargraphRectangle")
    .attr("rx", 25);
