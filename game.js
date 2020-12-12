var qulist=[];
var anlist=[];
function restart(){
	removeblack();
	document.getElementById("cards").innerHTML="";
	qulist=qlist.slice();
	anlist=alist.slice();
	document.body.className="start";
	printArea.start();
}
function start(){
	document.body.className="started";
	document.getElementById("whitecount").innerHTML=anlist.length;
	document.getElementById("blackcount").innerHTML=qulist.length;
}
function white(){
	var index = Math.floor( Math.random()*anlist.length );
	var an=anlist[index];
	anlist.splice(index,1);
	document.getElementById("cards").innerHTML+='<div class="card">'+an+'<button onclick="removewhite(this);return false;">o weka e lipu ni</button><button onclick="print(this,\'white\');return false;">o pana sitelen e ni</button></div>';
	document.getElementById("whitecount").innerHTML=anlist.length;
}
function black(){
	document.getElementById("gamearea").className="showblack";
	var index = Math.floor( Math.random()*qulist.length );
	if (qulist[index].includes("[")){
	var qu=qulist[index].split("[")[0];
	var quins=""+qulist[index].split("[")[1].split("]")[0];
	}else{
		var qu=qulist[index];
		var quins="";
	}
	qulist.splice(index,1);
	document.getElementById("blackcardq").innerHTML=qu;
	if (quins.length){document.getElementById("blackcardq").innerHTML+='<br><div id="ins">'+quins+'</div>';}
	document.getElementById("blackcount").innerHTML=qulist.length;
}
function removeblack(){
	document.getElementById("gamearea").className="noshow";
}
function removewhite(el){
	el.parentNode.remove();
}

function print(el,mode){
	var eltext=el.parentNode.innerText.split("\n")[0];
	if (mode=="black"){		
		try{
			var ins=document.getElementById("ins").innerText;
		}catch(e){
			var ins="";
		}
	}
	var radius=92;
	ctx=printArea.context;
	ctx.lineJoin="round";
	ctx.lineWidth=radius;
	ctx.beginPath();
	ctx.moveTo(radius/2,radius/2);
	ctx.lineTo(radius/2,600-radius/2);
	ctx.lineTo(384-radius/2,600-radius/2);
	ctx.lineTo(384-radius/2,radius/2);
	ctx.lineTo(radius/2,radius/2);
	ctx.closePath();
	ctx.stroke();
	if (mode=="black"){ctx.fillStyle="#000000";ctx.strokeStyle="#000000";}else{ctx.fillStyle="#ffffff";ctx.strokeStyle="#ffffff";}
	ctx.lineWidth=radius-6;
	ctx.stroke();
	ctx.fill();
	ctx.moveTo(0,0);
	ctx.font = "36px Arial";
	if (mode=="black"){ctx.fillStyle="#ffffff";}else{ctx.fillStyle="#000000";}
	tlines=getLines(ctx,eltext,280);
	for(i=0;i<tlines.length;i++){
		ctx.fillText(tlines[i],radius/3,radius/1.5+i*36);
	}
	if(mode=="black"){
		if (ins.length>0){
			tlines2=getLines(ctx,ins,275);
			ctx.lineWidth=radius-40;
			ctx.fillStyle="#ffffff";ctx.strokeStyle="#ffffff";
			ctx.beginPath();
			ctx.moveTo(radius/2,radius/1.5+(i+1)*36);
			ctx.lineTo(radius/2,radius/1.5+(i+1+tlines2.length)*36);
			ctx.lineTo(radius/2+280,radius/1.5+(i+1+tlines2.length)*36);
			ctx.lineTo(radius/2+280,radius/1.5+(i+1)*36);
			ctx.lineTo(radius/2,radius/1.5+(i+1)*36);
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
			ctx.fillStyle="#000000";
			for (var j=0;j<tlines2.length;j++){
				ctx.fillText(tlines2[j],radius/3,radius+(i+1+j)*36);
			}
		}
	}
	var img    = printArea.canvas.toDataURL("image/png");
	var dummy=document.createElement("a");
	dummy.setAttribute("href",img);
	dummy.setAttribute("download",mode+"_card.png");
	dummy.setAttribute("target","_blank");
	dummy.style.display="none";
	document.body.appendChild(dummy);
	dummy.click();
	document.body.removeChild(dummy);

}

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}


var printArea={
	canvas:document.createElement("canvas"),
	start:function(){
		this.canvas.width=384;
		this.canvas.height=600;
		this.context=this.canvas.getContext("2d");
		    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

	}
}