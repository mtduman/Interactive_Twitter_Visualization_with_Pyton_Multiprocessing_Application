
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
				words[ii].word =  d["word"] +"_"+ii;
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
			
			var html = "Active Filter.........................: " + data["t_filter"] + 
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



$(document).ready(function(){
	$("#btn-save").click(function(){
 	 var text = $("#textarea").val();
 	 var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
	 saveAs(blob, "Deneme10.txt");
  });
});

var words = [] ;
var words_refresh = [] ;

run()

function run() {
queue()
 .defer(d3.json, "tweet_word.txt")
  .await(processData);


}


//
//queue()
// .defer(d3.json, "tweet_word.txt")
//  .await(processData);










//vis.update(getWords(i ++ % words.length,words))
//window.location.reload();


//alert(" word" +words[ii].word + ii)
//alert(" word" +words[ii].word);
//alert(" word" + d["word"] + ii)



//var words = JSON.parse("tweet_word.txt");

//d3.json("tweet_word.txt", function(error, words) {
//		alert("icerde"+ error +words.word)
//	});

//var deneme = run_refresh(words);
//alert("en basta"+ words.length + " == "+ deneme.length)


//	d3.json("tweet_word.txt", function(data) {
//	words_refresh = data.map(function(d) { return [ +d["word"], +d["weight"] ]; });
//});
//alert("en basta"+ words.length + " == "+ words_refresh.length)



//alert("shownewwords " + words[0].word +","+ words[0].weight +"," +words[0].size)



//function wordsrefresh(errors, words_refresh) {
////	alert("words_refresh func ")
//
////	for(var i=0; i< words_refresh.length; i++){
////		if (i <1) {
////			alert("eveeeyt" + words_refresh[i].word);
////		};
////	}
//	
////	alert("geldi update"+ words.length + " == "+ words_refresh.length)
//	for(var i=0; i< words.length; i++){
//		if (i < 5) {
//			words[i].word = words_refresh[50-i].word
//			
//		};
//	}
//	return words_refresh
//	
////	var words = words_refresh
////	alert("words_refresh " + words[0].word +","+ words[0].weight +"," +words[0].size)
//
//}
//
//
//function run_refresh(words) {
//	queue()
//	 .defer(d3.json, "tweet_word_copy.txt")
//	  .await(wordsrefresh);
//
//	 
////	alert("geldi refresh" + words.length + " == "+ words_refresh.length)
//	
////	alert("words_refresh" +words_refresh);
////	
////
////	 alert("await sonras 2");
//	return words_refresh
//}
//



//.defer(d3.json, "https://raw.githubusercontent.com/mtduman/DSC520/master/tweet_word.txt")
//.defer(d3.json, "http://localhost:8055/tweet_word.txt")
//.defer(d3.json, "http://www.cis.umassd.edu/~dkoop/dsc530/a3/trips.json")
//https://raw.githubusercontent.com/mtduman/DSC520/master/tweet_word.txt
//.defer(d3.json, "file:///Users/ekinezgi/Documents/UmassD/DSC520/Project/tweet_word.txt")




//alert("words" + words);


//alert(twData.length)


//for(var i=0; i< twData.length; i++){
//	kel = kel + "," +twData[i].word;
////	document.write(twData[i].word +"***"+ twData[i].size + "===");
//}
//var words = kel ;
//alert(kel);

//alert(errors)
//document.write("data[0]");
//	alert("dur 1")







//Some sample data - http://en.wikiquote.org/wiki/Opening_lines

//Prepare one of the sample sentences by removing punctuation,
//creating an array of words and computing a random size attribute.
//function getWords(i, words) {
//
//	return words
//  .map(function(d) {
//      return {text: d.word, size: d.weight};
//  })

	
//	return kel
//  .replace(/[!\.:;\?]/g, '')
//  .split(',')
//  .map(function(d) {
//      return {text: d, size: 10 + Math.random() * 60};
//  })
	

//  return words[i]
//          .replace(/[!\.,:;\?]/g, '')
//          .split(' ')
//          .map(function(d) {
//              return {text: d, size: 10 + Math.random() * 60};
//          })
//}




//var words = ["deneme bir birinci",
//           "akin arada alina iki ikinci",
//           "uc ucuncu faulkner 3" ] 

//var words = [
//          "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.",
//          "The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.",
//          "When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.",
//          "It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love."
//      ]

