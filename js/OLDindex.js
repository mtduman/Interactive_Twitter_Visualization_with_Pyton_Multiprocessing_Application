//function createUSMap(divId, usMap, trips) {
function twWordCloud(twData) {
//	alert(twData)

	for(var i=0; i< twData.length; i++){
		document.write(twData[i].text +"***"+ twData[i][1] + "===")
	}
	
//  var commentlist=[];
//  var msg =""	
//  twData.forEach(function(tw) {
//	     tw.map(function(d)   
//		 document.write(d.text); )
////		 msg = msg + "{'text':'" + d.text +"','size':" +d.size +"},"
////		 commentlist=d
//  } )
  document.write("denememeeme")
//  document.write(commentlist)
  
//  var file_path = "http://localhost:8075/tweet_word.txt"
//  var field1=[];
//  var field2=[];
//  document.write("XXXXXXXdenememeeme")
//
//  d3.csv(file_path,function(csv){
//            csv.map(function(d){
//                field1.push(d.text);
//                field2.push(d.size);
//            })
//            //called after the AJAX is success
//            document.write(field1);
//            document.write("field2);
//            document.write("field1",field1[0]);
//        });
  
  
  var fill = d3.scale.category20();
  var frequency_list = [{"text":"study","size":40},{"text":"motion","size":15},{"text":"forces","size":10},{"text":"electricity","size":15},{"text":"movement","size":10},{"text":"relation","size":5},{"text":"things","size":10},{"text":"force","size":5},{"text":"ad","size":5},{"text":"energy","size":85},{"text":"living","size":5},{"text":"nonliving","size":5},{"text":"laws","size":15},{"text":"speed","size":45},{"text":"velocity","size":30},{"text":"define","size":5},{"text":"constraints","size":5},{"text":"universe","size":10},{"text":"physics","size":120},{"text":"describing","size":5},{"text":"matter","size":90},{"text":"physics-the","size":5},{"text":"world","size":10},{"text":"works","size":10},{"text":"science","size":70},{"text":"interactions","size":30},{"text":"studies","size":5},{"text":"properties","size":45},{"text":"nature","size":40},{"text":"branch","size":30},{"text":"concerned","size":25},{"text":"source","size":40},{"text":"google","size":10},{"text":"defintions","size":5},{"text":"two","size":15},{"text":"grouped","size":15},{"text":"traditional","size":15},{"text":"fields","size":15},{"text":"acoustics","size":15},{"text":"optics","size":15},{"text":"mechanics","size":20},{"text":"thermodynamics","size":15},{"text":"electromagnetism","size":15},{"text":"modern","size":15},{"text":"extensions","size":15},{"text":"thefreedictionary","size":15},{"text":"interaction","size":15},{"text":"org","size":25},{"text":"answers","size":5},{"text":"natural","size":15},{"text":"objects","size":5},{"text":"treats","size":10},{"text":"acting","size":5},{"text":"department","size":5},{"text":"gravitation","size":5},{"text":"heat","size":10},{"text":"light","size":10},{"text":"magnetism","size":10},{"text":"modify","size":5},{"text":"general","size":10},{"text":"bodies","size":5},{"text":"philosophy","size":5},{"text":"brainyquote","size":5},{"text":"words","size":5},{"text":"ph","size":5},{"text":"html","size":5},{"text":"lrl","size":5},{"text":"zgzmeylfwuy","size":5},{"text":"subject","size":5},{"text":"distinguished","size":5},{"text":"chemistry","size":5},{"text":"biology","size":5},{"text":"includes","size":5},{"text":"radiation","size":5},{"text":"sound","size":5},{"text":"structure","size":5},{"text":"atoms","size":5},{"text":"including","size":10},{"text":"atomic","size":10},{"text":"nuclear","size":10},{"text":"cryogenics","size":10},{"text":"solid-state","size":10},{"text":"particle","size":10},{"text":"plasma","size":10},{"text":"deals","size":5},{"text":"merriam-webster","size":5},{"text":"dictionary","size":10},{"text":"analysis","size":5},{"text":"conducted","size":5},{"text":"order","size":5},{"text":"understand","size":5},{"text":"behaves","size":5},{"text":"en","size":5},{"text":"wikipedia","size":5},{"text":"wiki","size":5},{"text":"physics-","size":5},{"text":"physical","size":5},{"text":"behaviour","size":5},{"text":"collinsdictionary","size":5},{"text":"english","size":5},{"text":"time","size":35},{"text":"distance","size":35},{"text":"wheels","size":5},{"text":"revelations","size":5},{"text":"minute","size":5},{"text":"acceleration","size":20},{"text":"torque","size":5},{"text":"wheel","size":5},{"text":"rotations","size":5},{"text":"resistance","size":5},{"text":"momentum","size":5},{"text":"measure","size":10},{"text":"direction","size":10},{"text":"car","size":5},{"text":"add","size":5},{"text":"traveled","size":5},{"text":"weight","size":5},{"text":"electrical","size":5},{"text":"power","size":5}];


  // d3.layout.cloud().size([800, 300])
  //     .words(frequency_list)
  //     // .words([
  //     //   "Hello", "world", "normally", "you", "want", "more", "words",
  //     //   "than", "this"].map(function(d) {
  //     //   return {text: d, size: 10 + Math.random() * 90};
  //     // }))
  //     .rotate(0)
  //     // .rotate(function() { return ~~(Math.random() * 2) * 90; })
  //     // .font("Impact")
  //     .fontSize(function(d) { return d.size; })
  //     .on("end", draw)
  //     .start();

  var layout = d3.layout.cloud()
    .size([800, 500])
//    .words(twData.map(function(d) {document.write(d.text +"+"); return {text: d.text, size: 10 + Math.random() * 90 };  } ))
    .words(twData.map(function(d) {document.write(d.text +"+"); return {text: d.text, size: d.size };  } ))
    .padding(5)
//    .rotate(0)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
//    .fontSize(twData.map(function(d) { document.write(d.size +"-"); return d.size;  } ))
    .fontSize(function(d) { document.write(d.text +"****" +d.size+"=="); return d.size; })
    .on("end", draw);

  layout.start();
 
  
  
  function draw(words) {
	  d3.select("body").append("svg")
	      .attr("width", layout.size()[0])
	      .attr("height", layout.size()[1])
	    .append("g")
	      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
	    .selectAll("text")
	      .data(twData)
	    .enter().append("text")
	      .style("font-size", function(d) { return d.size + "px"; })
	      .style("font-family", "Impact")
	      .style("fill", function(d, i) { return fill(i); })
	      .attr("text-anchor", "middle")
	      .attr("transform", function(d) {
	        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	      })
	      .text(function(d) { document.write(d.text +","); return d.text; });
	 
   }
}

  // function draw(words) {
  //   d3.select("body").append("svg")
  //       .attr("width", 960)
  //       .attr("height", 600)
  //     .append("g")
  //     // without the transform, words words would get cutoff to the left and top, they would
  //      // appear outside of the SVG area
  //       // .attr("transform", "translate(150,150)")
  //       .attr("transform", "translate(320,200)")
  //     .selectAll("text")
  //       .data(words)
  //     .enter().append("text")
  //       .style("font-size", function(d) { return d.size + "px"; })
  //       .style("font-family", "Impact")
  //       .style("fill", function(d, i) { return fill(i); })
  //       // .attr("text-anchor", "middle")
  //       // .attr("transform", function(d) {
  //         // return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
  //       // })
  //       .attr("transform", function(d) {
  //           return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
  //        })
  //       .text(function(d) { return d.text; });

 function processData(errors, twData) {
//	 alert(errors)
//	 document.write("data[0]");


	 	twWordCloud(twData);
 }

 
// alert(twData[1][1]);  

 queue()
//  .defer(d3.json, "http://www.cis.umassd.edu/~dkoop/dsc530/a3/trips.json")
  .defer(d3.csv, "http://localhost:8075/tweet_word.txt")
//  .defer(d3.json, "file:///Users/ekinezgi/Documents/UmassD/DSC520/Project/tweet_word.txt")
   .await(processData);
 

