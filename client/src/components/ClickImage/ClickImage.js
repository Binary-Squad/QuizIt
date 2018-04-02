import React from "react";
import "./ClickImage.css";

function returnClass(dead,id,currentChoice,wrong,wrongStreak,lunatic){
	var tempString = "click-image animated"
	if(lunatic==="true"){
		tempString += " rotate360 infinite"
	}
	else{
		if(dead==="true"){
			tempString += " bounceIn"
		}
		else if(id===currentChoice && wrong==="true"){
			tempString += " bounceOutCustom"
		}
		else if(wrongStreak.includes(id)){
			tempString += " bounceOutCustom"	
		}
	}
	console.log(tempString);
	return tempString
}

const ClickImage = props => (
	<div {...props} 
		className={returnClass(props.dead,props.id,props.currentchoice,props.wrong,props.wrongstreak,props.lunatic)}
		id={props.id}>
	</div>
)

export default ClickImage;