function Data() {  }

//---------------------------------------------------------------------------------------

/*
	each entry consists of a key that is a string of number starts from zero,
	and a value which will be an array of objects each one of them will represent either
	a task or a priority as in :
		{"task" : "this is a task"}
		or
		{"priority" : "high"}
*/

Data.prototype.setItem = function(key , value) {
	window.localStorage.setItem(key , JSON.stringify(value));
}

//---------------------------------------------------------------------------------------

Data.prototype.getItem = function(key) {
	return JSON.parse(window.localStorage.getItem(key));
}

//---------------------------------------------------------------------------------------

Data.prototype.removeItem = function(key) {
	console.log(typeof key , key);
	window.localStorage.removeItem(key);
}

//---------------------------------------------------------------------------------------

Data.prototype.clearAllItems = function() {
	window.localStorage.clear();
}

//---------------------------------------------------------------------------------------

Data.prototype.getAllItems = function() {
	let data = {};
	Object.keys(window.localStorage).forEach((key) => {
		data[key] = this.getItem(key);
	});
	return data;
}

//---------------------------------------------------------------------------------------

Data.prototype.getNextKey = function() {
	return (window.localStorage.length === 0) ? 
		0 : 
		parseInt(Math.max(...Object.keys(window.localStorage))) + 1;

}


//---------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------

function UI() {
	this.db = new Data();
	this.addStaticControllers();
}

//---------------------------------------------------------------------------------------

UI.prototype.addBtn = function() {
	let {task , priority} = this.getEntryData();
	let nextKey = this.db.getNextKey() , data = [{"task" : task} , {"priority" : priority}];
	console.log(nextKey);
	if(task.trim().length !== 0) {
		this.db.setItem(nextKey , data);
		this.drawRow(nextKey , data);
	}
}

//---------------------------------------------------------------------------------------

UI.prototype.getEntryData = function() {
	let task = document.querySelector("#taskName").value;
	let priority = document.querySelector("#taskPriority").value;
	return {task , priority};
}

//---------------------------------------------------------------------------------------

UI.prototype.drawRow = function(key , item = []) {
	let table    = document.querySelector(".table");
	let rowCount = table.rows.length;
	let newRow   = table.insertRow(rowCount);

	newRow.insertCell().innerHTML = key;
	newRow.insertCell().innerHTML = item[0]["task"];
	newRow.insertCell().innerHTML = item[1]["priority"];
	newRow.insertCell().innerHTML = 
	`
		<button id="moveUp" type="button" class="btn btn-sm btn-outline-primary">\u{2191}</button>
		<button id="moveDown" type="button" class="btn btn-sm btn-outline-primary">\u{2193}</button>
	`;
	newRow.insertCell().innerHTML = 
	`
		<button id="edit" type="button" class="btn btn-warning">Edit</button>
		<button id="delete" type="button" class="btn btn-danger">Delete</button>
		<button id="save" type="button" class="btn btn-success d-none">Save</button>
		<button id="cancel" type="button" class="btn d-none">Cancel</button>
	`;

	newRow.cells[4].childNodes[1].addEventListener("click" , () => {this.editBtn(newRow)});
	newRow.cells[4].childNodes[3].addEventListener("click" , () => {this.deleteBtn(newRow)});
	newRow.cells[4].childNodes[5].addEventListener("click" , () => {this.saveBtn(newRow)});
	newRow.cells[4].childNodes[7].addEventListener("click" , () => {this.cancelBtn(newRow)});


}

//---------------------------------------------------------------------------------------

UI.prototype.drawCachedTable = function() {
	let data = this.db.getAllItems();
	Object.getOwnPropertyNames(data).forEach((key) => {
		this.drawRow(key , data[key]);
	})
}

//---------------------------------------------------------------------------------------

UI.prototype.addStaticControllers = function() {
	document.querySelector("#add").addEventListener("click" , () => this.addBtn());
	document.querySelector("#clear").addEventListener("click" , () => this.clearBtn());
	window.onload = () => this.drawCachedTable();
}

//---------------------------------------------------------------------------------------

UI.prototype.deleteBtn = function(row) {
	this.db.removeItem(row.cells[0].innerHTML);
	row.remove();
}

//---------------------------------------------------------------------------------------

UI.prototype.editBtn = function(row) {
	row.cells[4].childNodes[1].disabled = true;
	row.cells[4].childNodes[5].className = "btn btn-success";
	row.cells[4].childNodes[7].className = "btn";

	row.cells[1].innerHTML = `<input type="text" class="form-control" placeholder="${this.db.getItem(row.cells[0].innerHTML)[0]["task"]}" />`;
	row.cells[2].innerHTML = 
	`<select class="form-control">
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
    </select>`
}

//---------------------------------------------------------------------------------------

UI.prototype.saveBtn = function(row) {
	let newTask = row.cells[1].childNodes[0].value.trim();
	let newPriority = row.cells[2].childNodes[0].value;
	let id = row.cells[0].innerHTML

	if(newTask) {
		this.db.setItem(id , [{"task":newTask} , {"priority":newPriority}]);
		this.cancelBtn(row);
	} else {
		let oldPlaceholder = row.cells[1].childNodes[0].placeholder;
		row.cells[1].childNodes[0].placeholder = "Please fill in a task";
		setTimeout(() => {
			row.cells[1].childNodes[0].placeholder = oldPlaceholder;
		} , 2500);
	}
}

//---------------------------------------------------------------------------------------

UI.prototype.cancelBtn = function(row) {
	row.cells[4].childNodes[5].className = "btn btn-success d-none";
	row.cells[4].childNodes[7].className = "btn d-none";
	row.cells[4].childNodes[1].disabled  = false;


	let item = this.db.getItem(row.cells[0].innerHTML);
	row.cells[1].innerHTML = item[0]["task"]; 
	row.cells[2].innerHTML = item[1]["priority"];
}

//---------------------------------------------------------------------------------------

UI.prototype.clearBtn = function() {
	this.db.clearAllItems();
	let tableHeaderRowCount = 1;
	let table = document.querySelector(".table");
	let rowCount = table.rows.length;
	for (let i = tableHeaderRowCount; i < rowCount; i++) {
	    table.deleteRow(tableHeaderRowCount);
	}
}

let ui = new UI();
// document.querySelector("#date").value = "2013-02-05";