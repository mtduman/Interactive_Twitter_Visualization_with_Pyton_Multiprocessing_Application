function twWordCloud(divId, twData) {

  var fill = d3.scale.category20();
  var color = d3.scale.linear()
//  .domain([0,1,2,3,4,5,6,10,15,20,80])
  .domain([0,1,2,3,4,5,6,10,11,12])
  .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

  
d3.layout.cloud().size([800, 500])
      .words(twData.map(function(d) {
        return {text: d.word, size: d.weight};
      }))
//      .padding(5)
//      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .rotate(0)
//      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
      d3.select("body").append("svg")
        .attr("width", 850)
        .attr("height", 350)
        .attr("class", "wordcloud")
      .append("g")
//        .attr("transform", "translate(150,150)")
        .attr("transform", "translate(425,175)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
//        .style("font-family", "Impact")
        .style("fill", function(d, i) { return color(i); })
//        .attr("text-anchor", "middle")
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
	  .defer(d3.json, "http://localhost:8025/tweet_word.txt")
	//  .defer(d3.json, "file:///Users/ekinezgi/Documents/UmassD/DSC520/Project/tweet_word.txt")
	   .await(processData);

  
  
  