let c = document.getElementById("cnv");

let ctx = c.getContext("2d");

let spd = 300; //speed of the lift (in milliseconds)

let max_floor = 5; //max floor

set_indicator(parseInt(document.getElementById("ind").innerHTML));

ctx.fillStyle = "#AAAAAA";
ctx.fillRect(0, 0, Math.floor(0.18*c.width), c.height);
ctx.fillRect(Math.floor(0.82*c.width), 0, Math.floor(0.82*c.width), c.height);

const delay = millis => new Promise((resolve, reject) => {
  setTimeout(_ => resolve(), millis)
});

//You can change what it displays on the indicator
function set_indicator(floor_id){
	if(floor_id == 1){
		document.getElementById("indicator").innerHTML = "G";
	}

	if(floor_id == 2){
		document.getElementById("indicator").innerHTML = "1";
	}		

	if(floor_id == 3){
		document.getElementById("indicator").innerHTML = "2";
	}

	if(floor_id == 4){
		document.getElementById("indicator").innerHTML = "3";
	}

	if(floor_id == 5){
		document.getElementById("indicator").innerHTML = "4";
	}
}

async function goto(floor_id){
	await delay(100);

	ctx.fillStyle = "#999999";
	ctx.fillRect( Math.floor(0.18*c.width), 0, Math.floor(0.322*c.width), c.height);
	ctx.fillRect( Math.floor(0.504*c.width), 0, Math.floor(0.322*c.width), c.height);

	await delay(200); //Delay after doors have been closed

	let current_flr = parseInt(document.getElementById("ind").innerHTML);

	while(current_flr < floor_id){
		await delay(spd);
		current_flr = parseInt(document.getElementById("ind").innerHTML);
		current_flr++;
		document.getElementById("ind").innerHTML = current_flr;
		set_indicator(current_flr);
	}

	while(current_flr > floor_id){
		await delay(spd);
		current_flr = parseInt(document.getElementById("ind").innerHTML);
		current_flr--;
		document.getElementById("ind").innerHTML = current_flr;
		set_indicator(current_flr);
	}

	if(parseInt(document.getElementById("ind").innerHTML) <= 0){
		document.getElementById("ind").innerHTML = 1;
	}

	if(parseInt(document.getElementById("ind").innerHTML) > max_floor){
		document.getElementById("ind").innerHTML = max_floor;
	}

	await delay(1000); //Delay after arrived at the floor

	ctx.fillStyle = "#ffffff";
	ctx.fillRect( Math.floor(0.18*c.width), 0, Math.floor(0.322*c.width), c.height);
	ctx.fillRect( Math.floor(0.504*c.width), 0, Math.floor(0.322*c.width), c.height);

}
