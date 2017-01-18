function twWordCloud(twData) {

//	twData.forEach(function(d) {
//		document.write(d.word); 
//		document.write(d.weight)
//	  });

//	alert(twData.length)

	
  var fill = d3.scale.category20();
  var data = [{word:"Hello",weight:21},{word:"World",weight:50},{word:"Normally",weight:25},{word:"You",weight:15},{word:"Want",weight:30},{word:"More",weight:12},{word:"Words",weight:8},{word:"But",weight:18},{word:"Who",weight:22},{word:"Cares",weight:27}];

d3.layout.cloud().size([800, 500])
//      .words(data.map(function(d) {
//    	  document.write(d.word);  
//        return {text: d.word, size: d.weight};
//      }))
      .words(twData.map(function(d) {
        return {text: d.word, size: d.weight};
      }))
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
      d3.select("body").append("svg")
        .attr("width", 950)
        .attr("height", 600)
      .append("g")
        .attr("transform", "translate(150,150)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {

          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
//  function drawUpdate(words){
//   d3.layout.cloud().size([500, 500])
//      .words(words)
//      .padding(5)
//      .rotate(function() { return ~~(Math.random() * 2) * 90; })
//      .font("Impact")
//      .fontSize(function(d) { return d.size; })
//      .start();


//      d3.select("svg")
//      .selectAll("g")
//        .attr("transform", "translate(150,150)")
//      .selectAll("text")
//        .data(words).enter().append("text")
//        .style("font-size", function(d) { return d.size + "px"; })
//        .style("font-family", "Impact")
//        .style("fill", function(d, i) { return fill(i); })
//
//        .attr("transform", function(d) {
//
//          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//        })
//        .text(function(d) { return d.text; });



//  }
//
//  setInterval(function () { 
//        var d_new = data;
//        d_new.push({word:randomWord(),weight:randomWeight()});
//
//         drawUpdate(d_new.map(function(d) {
//        return {text: d.word, size: d.weight};
//      }));
//      }, 1500);
//
//  function randomWord() {
//          var text = "";
//          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//
//          for( var i=0; i < 5; i++ )
//              text += possible.charAt(Math.floor(Math.random() * possible.length));
//
//          return text;
//      }
//      function randomWeight(){
//        var r = Math.round(Math.random() * 100);
//        return r;
//      }
}


  function processData(errors, twData) {
//		 alert(errors)
//		 document.write("data[0]");


		 	twWordCloud(twData);
	 }

	 
	// alert(twData[1][1]);  

	 queue()
	//  .defer(d3.json, "http://www.cis.umassd.edu/~dkoop/dsc530/a3/trips.json")
	  .defer(d3.json, "http://localhost:8075/tweet_word.txt")
	//  .defer(d3.json, "file:///Users/ekinezgi/Documents/UmassD/DSC520/Project/tweet_word.txt")
	   .await(processData);

  
  
  