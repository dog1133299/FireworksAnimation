var canvas=document.getElementById('canvas');
var ctx=canvas.getContext("2d");
	var cw=window.innerWidth;
	var ch=window.innerHeight;
	canvas.width=cw;
	canvas.height=ch;
var mx;
var my;
var drawTimer=setInterval(draw,30); 
var autoDrawTimer=setInterval(autoDraw,500); 
var fireworks=[];
function random(min,max) {
	return Math.random()*(max-min)+min;
}
function deg(d){
	return (d/180)*Math.PI;
}
function firework(mx,my){
	this.x=mx;
	this.y=my;
	this.particle=[];
	this.timer=0;
	this.dead=false;
	this.colorH=random(0,360); 
	for (var i = 0; i < 40; i++) {
		var p=new FireworkParticle(this.x,this.y);
		this.particle.push(p);
			//console.log(this.particle.length);
	}
	 
	this.drawParticle=function(){
			//console.log(this.particle.length);

		for (var i = 0; i < this.particle.length; i++) {
			//console.log(this.particle[i].x+" 1"+this.particle[i].y);
			
			ctx.beginPath(); 
			ctx.moveTo(this.particle[i].x,this.particle[i].y);
			ctx.lineTo(this.particle[i].x+Math.cos(deg(this.particle[i].angle))*this.particle[i].speed,this.particle[i].y+Math.sin(deg(this.particle[i].angle))*this.particle[i].speed+0.3);
			ctx.lineWidth=2;
			ctx.strokeStyle="hsl("+this.colorH+",100%,"+this.particle[i].colorL-- +"%)";
			ctx.stroke();
			ctx.closePath();

			this.particle[i].x=this.particle[i].x+Math.cos(deg(this.particle[i].angle))*this.particle[i].speed;
			this.particle[i].y=this.particle[i].y+Math.sin(deg(this.particle[i].angle))*this.particle[i].speed+0.1;
		
		}	
		this.timer++;
		if (this.timer>30) {
			this.dead=true;
		}
	};
}

function FireworkParticle(fx,fy){

	this.x=fx;
	this.y=fy;
	this.speed=random(2,6);
	this.angle=random(1,360);
	this.colorL=random(80,100);

	//console.log(this.x+" "+this.y); 

}

function draw(){ 
	var tmp=fireworks.length;
	for (var i = 0; i < tmp; i++) {
		fireworks[i].drawParticle();
		if (fireworks[i].dead) {
			fireworks.shift();
			i--;
			tmp--; 
		}
			//console.log("fill");
	}

	
	ctx.save();
	ctx.fillStyle="rgba(0,0,0,0.3)"
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.restore();

}
function autoDraw(){
if (fireworks.length<12) {
	var ax=random(0,canvas.width);
	var ay=random(0,canvas.height);

	var f=new firework(ax,ay);
	fireworks.push(f);
}
}
canvas.addEventListener("click",function(e){
	e.preventDefault();
	mx=e.clientX-canvas.offsetLeft;
	my=e.clientY-canvas.offsetTop;
	ctx.beginPath();
	ctx.arc(mx,my,5,0,Math.PI*2);
	ctx.fillStyle="white";
	ctx.fill();
	ctx.closePath();
	if (fireworks.length<12) {
	var f=new firework(mx,my);
	fireworks.push(f);
	console.log(fireworks.length);
	}
});