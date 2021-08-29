let timeInterval;

function swapScreens() {
	let logScreen  = document.getElementById("logScreen");
	let chatScreen = document.getElementById("chatScreen");

	if(logScreen.className.split(" ").findIndex((i) => {
		return i === "d-none";}) !== -1) {	//means that the logScreen found

		chatScreen.className += " d-none";
		lsClasses = logScreen.className.split(" ");
		lsClasses.splice(-1 , 1);
		logScreen.className = lsClasses.join(" ");

	} else {
		logScreen.className += " d-none";
		csClasses = chatScreen.className.split(" ");
		csClasses.splice(-1 , 1);
		chatScreen.className = csClasses.join(" ");
	}
}


function joinBtn() {
	console.log("joined !!");
	startTimer(120 , document.getElementById("timerSpan"));
	swapScreens();
}

function logoutBtn() {
	console.log("logged out !!");
	clearInterval(timeInterval);
	swapScreens();
}

function sendBtn() {
	console.log("sent !!");
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    display.textContent = " ";
    timeInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `Logout in ${minutes + ":" + seconds}`;

        if (--timer < 0) {
            logoutBtn();
        }
    }, 1000);
}

document.getElementById("joinBtn").addEventListener("click" , joinBtn);
document.getElementById("logoutBtn").addEventListener("click" , logoutBtn);
document.getElementById("sendBtn").addEventListener("click" , sendBtn);
