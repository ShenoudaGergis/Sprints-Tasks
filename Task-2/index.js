/*
	"Author" : Kirollos Shenouda
	"Email" : kirollos.shenouda.gergis@gmail.com
	"references" : https://www.allure.com/story/zodiac-sign-personality-traits-dates
*/

function Planets(password) {
	this.password = password;
	this.name     = "";
	this.year 	  = 0;
	this.month    = 0;
	this.years = {
		1  : 31,
		2  : 28,
		3  : 31,
		4  : 30,
		5  : 31,
		6  : 30,
		7  : 31,
		8  : 31,
		9  : 30,
		10 : 31,
		11 : 30,
		12 : 31  
	};
	this.zodiac = {
		"aries"   	  : [3 , 21 , 4 , 19  ],
		"taurus" 	  : [4 , 20 , 5 , 20  ],
		"gemini" 	  : [5 , 21 , 6 , 20  ],
		"cancer" 	  : [6 , 21 , 7 , 22  ],
		"leo"	      : [7 , 23 , 8 , 22  ],
		"virgo"  	  : [8 , 23 , 9 , 22  ],
		"libra"  	  : [9 , 23 , 10 , 22 ],
		"scorpio"	  : [10 , 23 , 11 , 21],
		"sagittarius" : [11 , 22 , 12 , 21],
		"capricorn"   : [12 , 22 , 1 , 19 ],
		"aquarius"    : [1 , 20 , 2 , 18  ],
		"pisces"      : [2 , 19 , 3 , 20  ]
	}
}

//---------------------------------------------------------------------------------------

Planets.prototype.isTextEmpty = function(text) {
	return (text === null) ? true : text.trim().length === 0
}

//---------------------------------------------------------------------------------------

Planets.prototype.isTextNumber = function(text) {
	if(this.isTextEmpty(text)) return false;
	return (new RegExp("^[0-9]+$").test(text.trim())) 
} 

//---------------------------------------------------------------------------------------

Planets.prototype.extractNumber = function(text) {
	if(!this.isTextNumber(text)) return null;
	return Number.parseInt(text.trim());
}

//---------------------------------------------------------------------------------------

Planets.prototype.checkRange = function(text , from , to) {
	if((text = this.extractNumber(text)) === null) return null;
	return (text >= from && text <= to) ? text : null;
}

//---------------------------------------------------------------------------------------

Planets.prototype.promptName = function() {
	let name;
	while(this.isTextEmpty(name = prompt("Please enter your name")));
	this.name = name;
}

//---------------------------------------------------------------------------------------

Planets.prototype.promptPassword = function() {
	let tries = 0;
	while(tries !== 3) {
		let input = this.extractNumber(prompt(`Please enter your password - ${tries + 1}`));
		if(input != this.password) {
			tries++;
		} else return true;
	}
	alert("Sorry you have reached the maximum password tries");
	return false;
}

//---------------------------------------------------------------------------------------

Planets.prototype.promptMonth = function() {
	let month;
	while(!(month = this.checkRange(prompt("Please enter your birth month") , 1 , 12)));
	return this.month = month;
}

//---------------------------------------------------------------------------------------

Planets.prototype.promptDay = function(month) {
	let day;
	while(!(day = this.checkRange(prompt("Please enter your birth day") , 1 , this.years[month])));
	return this.day = day;
}

//---------------------------------------------------------------------------------------

Planets.prototype.getZodiac = function() {
	let z = null;
	Object.getOwnPropertyNames(this.zodiac).forEach((key) => {
		let range = this.zodiac[key];
		if(this.month == range[0]) {
			if(this.day >= range[1]) z = key;
		}
		if(this.month == range[2]) {
			if(this.day <= range[3]) z = key;
		}
	});
	confirm("Your zodiac is " + z);
}

//---------------------------------------------------------------------------------------

Planets.prototype.run = function() {
	this.promptName();
	if(!this.promptPassword()) return;
	this.promptDay(this.promptMonth());
	this.getZodiac();
}

//---------------------------------------------------------------------------------------

let p = new Planets(123);
p.run();