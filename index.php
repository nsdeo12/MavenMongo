<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>LCA Visualisation</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>

<body>
	<h1>LCA Visualisation</h1>
    <p>
        <label for="input" 
                style="display: inline-block; width: 200px; text-align: right">
                tree threshold
        </label>	
        <input type="range" min="0" max="600" step ="10" id="treeinput">
        
        <label for="input" 
                style="display: inline-block; width: 200px; text-align: right">
                mid point threshold
        </label>
        <input type="range" min="0" max="100" step ="1" id="input">
    
        <label for="input" 
                style="display: inline-block; width: 200px; text-align: right">
                End point threshold
        </label>
        <input type="range" min="0" max="100" step ="1" id="input2">
    </p>
	<!-- load the d3.js library -->	
	<script src="d3.js"></script>
	<script src="script.js"></script>

</body>
</html>
