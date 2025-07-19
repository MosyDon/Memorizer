//Globals
var currentTextInput;
var puzzleArrayData;
//Loads and creates Crossword
function initializeScreen(){
	var puzzleTable = document.getElementById("puzzle");
	puzzleArrayData = preparePuzzleArray();
	for ( var i = 0; i < puzzleArrayData.length ; i++ ) {
		var row = puzzleTable.insertRow(-1);
		var rowData = puzzleArrayData[i];
		for(var j = 0 ; j < rowData.length ; j++){
			var cell = row.insertCell(-1);
			if(rowData[j] != 0){ // if value inside box is not a 0 then a letter can be input
				var txtID = String('txt' + '_' + i + '_' + j);
				cell.innerHTML = '<input type="text" class="inputBox" maxlength="1" style="text-transform: lowercase" ' + 'id="' + txtID + '" onfocus="textInputFocus(' + "'" + txtID + "'"+ ')">';
			}else{
				cell.style.backgroundColor  = "black"; // if the value inside this tile is 0 then the box will be black
			}
		}
	}
	addHint();
}
//Adds the hint numbers
function addHint(){
	document.getElementById("txt_0_0").placeholder = "1";
	document.getElementById("txt_0_11").placeholder = "2";
	document.getElementById("txt_2_7").placeholder = "3";
	document.getElementById("txt_3_2").placeholder = "4";
	document.getElementById("txt_3_4").placeholder = "5";
	document.getElementById("txt_3_15").placeholder = "6";
	document.getElementById("txt_4_0").placeholder = "7";
	document.getElementById("txt_5_9").placeholder = "8";
	document.getElementById("txt_8_13").placeholder = "9";
	document.getElementById("txt_9_9").placeholder = "10";
	document.getElementById("txt_11_6").placeholder = "11";
}
//Stores ID of the selected cell into currentTextInput
function textInputFocus(txtID123){
	currentTextInput = txtID123;
}
//Returns Array
function preparePuzzleArray(){ // the values inside the boxes
var items = [	['w', 'a', 't', 'e', 'r', '-', 'b', 'u', 'f', 'f', 'a', 'l', 'o', 0, 0, 0],
				['a', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'e', 0, 0, 0, 0],
				['r', 0, 0, 0, 0, 0, 0, 'm', 'o', 'n', 'g', 'o', 'o', 's', 'e', 0],
				['t', 0, 'z', 0, 'b', 0, 0, 0, 0, 0, 0, 'p', 0, 0, 0, 'c'],
				['h', 'y', 'e', 'n', 'a', 0, 0, 0, 0, 0, 0, 'a', 0, 0, 0, 'h'],
				['o', 0, 'b', 0, 'b', 0, 0, 0, 0, 'g', 'i', 'r', 'a', 'f', 'f', 'e'],
				['g', 0, 'r', 0, 'o', 0, 0, 0, 0, 0, 0, 'd', 0, 0, 0, 'e'],
				[0, 0, 'a', 0, 'o', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 't'],
				[0, 0, 0, 0, 'n', 0, 0, 0, 0, 0, 0, 0, 0, 'l', 0, 'a'],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 'o', 's', 't', 'r', 'i', 'c', 'h'],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'o', 0, 0],
				[0, 0, 0, 0, 0, 0, 'p', 'a', 'n', 'g', 'o', 'l', 'i', 'n', 0, 0]
			];
return items;
}
//Clear All Button
function clearAllClicked(){
	currentTextInput = '';
	var puzzleTable = document.getElementById("puzzle");
	puzzleTable.innerHTML = '';
    initializeScreen();
}
//Check button
function checkClicked(){
	for ( var i = 0; i < puzzleArrayData.length ; i++ ) {
		var rowData = puzzleArrayData[i];
		for(var j = 0 ; j < rowData.length ; j++){
			if(rowData[j] != 0){
				var selectedInputTextElement = document.getElementById('txt' + '_' + i + '_' + j);
				if(selectedInputTextElement.value != puzzleArrayData[i][j]){
					selectedInputTextElement.style.backgroundColor = 'red'; //if its wrong
					
				}else{
					selectedInputTextElement.style.backgroundColor = 'white'; //if its correct
				}
			}
		}
	}
}
//Clue Button
function clueClicked(){
	if (currentTextInput != null){
		var temp1 = currentTextInput;
		var token = temp1.split("_");
		var row = token[1];
		var column = token[2];
		document.getElementById(temp1).value = puzzleArrayData[row][column];
		//checkClicked();
	}
}
//Solve Button
function solveClicked(){
	if (currentTextInput != null){
		var temp1 = currentTextInput;
		var token = temp1.split("_");
		var row = token[1];
		var column = token[2];
		
		// Print elements on top
		for(j = row; j >= 0; j--){
			if(puzzleArrayData[j][column] != 0){
				document.getElementById('txt' + '_' + j + '_' + column).value = puzzleArrayData[j][column];
				}else break;
		}
		// Print elements on right
		for(i = column; i< puzzleArrayData[row].length; i++){
			if(puzzleArrayData[row][i] != 0){
				document.getElementById('txt' + '_' + row + '_' + i).value = puzzleArrayData[row][i];
				}else break;
		}
		
		// Print elements below
		for(m = row; m< puzzleArrayData.length; m++){
			if(puzzleArrayData[m][column] != 0){
				document.getElementById('txt' + '_' + m + '_' + column).value = puzzleArrayData[m][column];
				}else break;
		}
		// Print elements on left
		for(k = column; k >= 0; k--){
			if(puzzleArrayData[row][k] != 0){
				document.getElementById('txt' + '_' + row + '_' + k).value = puzzleArrayData[row][k];
				}else break;
		}
		
		
	}
}