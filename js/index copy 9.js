
function wordCloud(selector) {

    var fill = d3.scale.category20();

    //Construct the word cloud's SVG element
    var svg = d3.select(selector).append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .append("g")
        .attr("transform", "translate(250,250)");


    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });

        //Entering and existing words
        cloud
            .transition()
                .duration(400)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }

    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {

        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function(words) {
            d3.layout.cloud().size([500, 500])
                .words(words)
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, words) {
	

	ii = -1;
	d3.json("tweet_word.txt", function(error, data) {
		if (error) {
			alert("Error when refresh tweet_word.txt :"+ error);
		} else {	
			words_refresh = data.map(function(d) {
				ii = ii + 1;
				words[ii].word =  d["word"] ;
				words[ii].weight = d["weight"]  ;
	
	//			alert(words[ii].word +"  " + words[ii].weight +ii);
				
			} );
		}
	
	});

	UpdateTweetInfo()
	
//	 alert("wwww deneme");


	
//	return [ +d["word"], +d["weight"] ]; });
//});
	
    vis.update(words
    	    .map(function(d) {
    	        return {text: d.word, size: d.weight};
    	    }))

    	    
    setTimeout(function() {
    	showNewWords(vis, words)}, 5000)
}


function UpdateTweetInfo() {
	
	d3.json('TweeterSetup.txt', function(error, data) {
		if (error) {
			alert("Error when refresh TweeterSetup.txt :"+ error);
		} else {
			
			var html = "Twitter Screen Name...........: " + data["tscr_name"] +
				" <br />Active Filter.........................: " + data["t_filter"] + 
		   	    " <br />Recieved tweet....................: " + data["t_number"] ;
			document.getElementById("mydivInfo").innerHTML = html;	
		} 
	} );

}


function processData(errors, words) {

	
	//Create a new instance of the word cloud visualisation.
	var myWordCloud = wordCloud('#wordcloudshow');
	//Start cycling through the demo data
	showNewWords(myWordCloud,words);
	


}



//$(document).delegate("#btn-save", 'click', function(){
// 	 var text = $("#textarea").val();
// 	 var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
//	 saveAs(blob, "Deneme10.txt");
//  } );
//


////  This is for change filter from html
//$(document).ready(function(){
//	$("#btn-save").click(function(){
// 	 var text = $("#textarea").val();
// 	 var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
//	 saveAs(blob, "Deneme10.txt");
//  });
//});

var words = [] ;
var words_refresh = [] ;

run()

function run() {
queue()
 .defer(d3.json, "tweet_word.txt")
  .await(processData);
}


