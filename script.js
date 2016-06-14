/* global d3 */


// ************** Dataset ****************
var datasetP1 = [
  {name: "Human",    value:  4},
  {name: "Health",    value:  98},
  {name: "Wealth",     value: 15},
  {name: "One",   value: 65},
  {name: "for", value: 22},
  {name: "the",     value: 8},
  {name: "world",   value: 34},
  {name: "frankly", value: 45},
  {name: "my", value: 1},
  {name: "dear",     value: 81},
  {name: "eye",   value: 32},
  {name: "dont", value: 41},
  {name: "give", value: 20},
  {name: "a",     value: 80},
  {name: "dollar",   value: 78},
  {name: "to", value: 49},
  {name: "rich", value: 12},
  {name: "pound",     value: 42},
  {name: "rupee",   value: 7},
  {name: "there", value: 23},
  {name: "Hola",     value: 62}
];
var datasetP1End = [
  {name: "Once",    value:  4},
  {name: "Upon",    value:  48},
  {name: "A",     value: 15},
  {name: "Time",   value: 25},
  {name: "In", value: 22},
  {name: "IISc",     value: 8},
  {name: "Blore",   value: 34},
  {name: "there", value: 45},
  {name: "was", value: 1},
  {name: "conference",     value: 18},
  {name: "where",   value: 12},
  {name: "PhD", value: 41},
  {name: "student", value: 20},
  {name: "participate",     value: 34},
  {name: "He",   value: 8},
  {name: "got", value: 49},
  {name: "cookies", value: 12},
  {name: "pastry",     value: 42},
  {name: "dosa",   value: 7},
  {name: "roti", value: 23},
  {name: "curry",value: 62}
];

// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 100},
	width = 1200 - margin.right - margin.left,
	height = 550 - margin.top - margin.bottom,
	tree_height = height -50,
    tree_width = width/3,
    barGraphRectWidth=300,
    barGraphRectHeight=500,
    barHeight=20,
    barGraphWidth=240,
    barGraphHeight=450;

d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom);

d3.select("svg").append("g")
    .append("rect")
    .attr("id", "backgroundRect")
    .attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
    .attr("rx", 25);

makeTree(40);
// tree drawing ends

//Generation of Level 1 graph
var level1graph_container = d3.select("svg").append("g")
    .attr("transform", "translate(" + (margin.left+tree_width+100) + "," + margin.top + ")")
    .attr("id", "level1graph_container");

d3.select("svg").append("text")
    .attr("transform", "translate(" + (margin.left+tree_width+100+100) + ",18)")
    .html("Mid Point")

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
d3.select("svg").append("text")
    .attr("transform", "translate(" + (margin.left+tree_width+barGraphRectWidth+150+100) + ",18)")
    .html("End Point")
    
    
makeGraph(datasetP1,"#level1graph_container",20);
makeGraph(datasetP1End,"#level2graph_container",10);   

/* ********** function to make tree *********** */
function makeTree(threshold)
{
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
	  console.log(json);
	  for(i = 0; i<json.children.length; i++)
	  {
	  	console.log(json.children[i].name);
	  	for(j=0; j<json.children[i].children.length; j++)
	  	{
	  		console.log(" "+json.children[i].children[j].name);
	  		if(json.children[i].children[j].children) {
		  		for(k=0; k<json.children[i].children[j].children.length; k++)
		  		{
		  			if(json.children[i].children[j].children[k].value > threshold)
		  				console.log("  "+json.children[i].children[j].children[k].name+" "+json.children[i].children[j].children[k].value);
		  			else {
			  				json.children[i].children[j].children.splice(k,1);
			  				k--;
			  				console.log("    THRESHOLD");
		  				 }
		  		}
	  		}
	  	}
	  }
	  
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
}
/* ********** function to make tree ends******* */

/* ********** function to make graph ********** */
function makeGraph(dataSet,graphContainer,threshold) {
    dataSet.sort(function(a,b) {return b.value-a.value});        
    var xscale = d3.scale.linear()
        .domain([0, d3.max(dataSet, function(d){return d.value})])
        .range([0,barGraphWidth]);

    var xAxis = d3.svg.axis()
        .scale(xscale)
        .orient("top");
        
    var yscale = d3.scale.ordinal()
        .domain(dataSet.map(function(d) { if(d.value>threshold) return d.name; }))
        .rangeRoundBands([0,barGraphHeight],0.1,0);
    var yAxis = d3.svg.axis()
        .scale(yscale)
        .orient("left");

    var chart = d3.select(graphContainer)
        .append("g")
        .attr("transform", "translate(50,30)")
        .attr("id","grapha")
        .attr("width", barGraphWidth);

    var bar = chart.selectAll("rect")
        .data(dataSet.filter(function(d){return d.value>threshold}))
    .enter().append("rect")
        .attr("width", 0)
        .attr("height", yscale.rangeBand())
        .attr('x',0)
        .attr('y',function(d,i){
            return yscale(d.name);
        })
        .attr("class", "barRectangles");
    bar.transition().duration(800)
        .attr("width", function(d) { return xscale(d.value); })
        .delay(function(d,i){
            return i*30;
        })
        .ease('back');

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 0 + ")")
        .call(xAxis);
    chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + 0 + ")")
        .call(yAxis);
}

/* ********** updating the graphs ************* */
d3.select("#level1graph_containera").remove();
d3.select("#input").on("input", function() {
  console.log(this.value);
  d3.select("#grapha").remove();
  makeGraph(datasetP1,"#level1graph_container",this.value);
});
/* ********** updating grpahs ends ************ */

/* ********** updating the tree  ************** */

d3.select("#treeinput").on("input", function() {
	console.log(this.value);
	d3.select("#main_tree").remove();
	makeTree(this.value);
})

/* ********** updating tree ends ************** */
