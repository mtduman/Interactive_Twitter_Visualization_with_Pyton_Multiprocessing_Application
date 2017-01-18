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
                .duration(600)
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

//Some sample data - http://en.wikiquote.org/wiki/Opening_lines

//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
//function getWords(i, words) {
//
//	return words
//    .map(function(d) {
//        return {text: d.word, size: d.weight};
//    })

	
//	return kel
//    .replace(/[!\.:;\?]/g, '')
//    .split(',')
//    .map(function(d) {
//        return {text: d, size: 10 + Math.random() * 60};
//    })
	

//    return words[i]
//            .replace(/[!\.,:;\?]/g, '')
//            .split(' ')
//            .map(function(d) {
//                return {text: d, size: 10 + Math.random() * 60};
//            })
//}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, words) {

    vis.update(words
    	    .map(function(d) {
    	        return {text: d.word, size: d.weight};
    	    }))

//    vis.update(getWords(i ++ % words.length,words))
    setTimeout(function() { showNewWords(vis, words)}, 10000)
}

 var words = []
 
// var words = ["deneme bir birinci",
//              "akin arada alina iki ikinci",
//              "uc ucuncu faulkner 3" ] 

//var words = [
//             "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.",
//             "The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.",
//             "When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.",
//             "It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love."
//         ]


function processData(errors, words) {
	
	      
//	 alert("words" + words);
	 
	 
//	alert(twData.length)
	
	
//	for(var i=0; i< twData.length; i++){
//		kel = kel + "," +twData[i].word;
////		document.write(twData[i].word +"***"+ twData[i].size + "===");
//	}
//	var words = kel ;
//	alert(kel);
	
//	 alert(errors)
//	 document.write("data[0]");
//		alert("dur 1")


	 
	//Create a new instance of the word cloud visualisation.
	var myWordCloud = wordCloud('body');

	
	//Start cycling through the demo data
	showNewWords(myWordCloud,words);

}


// alert(twData[1][1]);  

queue()
 .defer(d3.json, "tweet_word.txt")
  .await(processData);

//.defer(d3.json, "https://raw.githubusercontent.com/mtduman/DSC520/master/tweet_word.txt")
//.defer(d3.json, "http://localhost:8055/tweet_word.txt")
//.defer(d3.json, "http://www.cis.umassd.edu/~dkoop/dsc530/a3/trips.json")
//https://raw.githubusercontent.com/mtduman/DSC520/master/tweet_word.txt
//.defer(d3.json, "file:///Users/ekinezgi/Documents/UmassD/DSC520/Project/tweet_word.txt")


