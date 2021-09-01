let Utils = {
    validate(text, rule) {
        return (new RegExp(rule)).test(text);
    },
    getCurrentTime() {
    	return (new Date()).toISOString().substr(11 , 5);
    }
}

//-----------------------------------------------------------------------------

function UI() {
	this.timeInterval = null;
	try {
	    this.socket = new Socket();
	    this.socket.setContext(this);
	    this.hookEvents();
	} catch(e) {
		console.log("Error in conncetion");
	}
}

//-----------------------------------------------------------------------------

UI.prototype.swapFaces = function() {

    if (this.isFaceVisible("joinFace")) {
        this.setFaceHidden("joinFace");
        this.setFaceVisible("chatFace");
        this.setFaceVisible("liveUsersFace");
    } else {
        this.setFaceHidden("chatFace");
        this.setFaceHidden("liveUsersFace");
        this.setFaceVisible("joinFace");
    }
}

//-----------------------------------------------------------------------------

UI.prototype.isFaceVisible = function(id) {
    return (document.getElementById(id).style["display"] === "none") ? false : true;
}

//-----------------------------------------------------------------------------

UI.prototype.setFaceVisible = function(id) {
    document.getElementById(id).style["display"] = "";
}

//-----------------------------------------------------------------------------

UI.prototype.setFaceHidden = function(id) {
    document.getElementById(id).style["display"] = "none";
}

//-----------------------------------------------------------------------------

UI.prototype.joinBtn = function() {
    document.getElementById("joinBtn").addEventListener("click", () => {
        let name = document.getElementById("username").value.trim();
        let channelName = document.getElementById("channelName").value.trim();
        if (Utils.validate(name, "^[a-zA-Z]+ *( *[a-zA-Z]+)") &&
            Utils.validate(channelName, "^[a-zA-Z0-9]+$")) {
            this.socket.joinChannel(channelName , name);
        } else {
        	alert("Bad inputs entered");
        }
    });
}

//-----------------------------------------------------------------------------

UI.prototype.sendBtn = function() {
	document.getElementById("sendBtn").addEventListener("click" , () => {
        let textArea = document.getElementById("messageInput");
		let message  = textArea.value.trim();
		if(message === "") return;
		message = message.replace(/\n\r?/g, "<br />");
        textArea.value = "";
		clearInterval(this.timeInterval);
		this.startTimer(300);
		this.socket.writeMessage(message);
	});
}

//-----------------------------------------------------------------------------

UI.prototype.addLeftMessage = function(message , name) {
	document.getElementById("messagesHolder").innerHTML += `
        <div class="msg left-msg">
            <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${name}</div>
                    <div class="msg-info-time">${Utils.getCurrentTime()}</div>
                </div>
                <div class="msg-text">
                    ${message}
                </div>
            </div>
        </div>
	`
}

//-----------------------------------------------------------------------------

UI.prototype.addRighMessage = function(message , name) {
	document.getElementById("messagesHolder").innerHTML += `
        <div class="msg right-msg">
            <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${name}</div>
                    <div class="msg-info-time">${Utils.getCurrentTime()}</div>
                </div>
                <div class="msg-text">
                    ${message}
                </div>
            </div>
        </div>
    `
}

//-----------------------------------------------------------------------------

UI.prototype.logout = function() {
	this.socket.close();
	try {
	    this.socket = new Socket();
	    this.socket.setContext(this);
	} catch(e) {
		console.log("Error in conncetion");
	}
}

//-----------------------------------------------------------------------------

UI.prototype.logoutBtn = function() {
	document.getElementById("logoutSpan").addEventListener("click" , () => {
		clearInterval(this.timeInterval);
		this.logout();
		this.swapFaces();
	});
}

//-----------------------------------------------------------------------------

UI.prototype.addLiveUsersName = function(members) {
	let table = document.getElementById("liveUsers");
	table.innerHTML = "";
	members.forEach((member) => {
		table.innerHTML += `
			<tr>
				<td>${member}</td>
			</tr>
		`
	})
}

//-----------------------------------------------------------------------------

UI.prototype.addLiveUsersCount = function(count , channel) {
	document.getElementById("usersCount").innerHTML = `Live users ( ${channel} ) : ${count}`;
}

//-----------------------------------------------------------------------------

UI.prototype.startTimer = function(duration) {
    let timer = duration, minutes, seconds , display = document.getElementById("logoutSpan");
    this.timeInterval = setInterval(() => {
    	console.log("live pulse");
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `Logout (${minutes + ":" + seconds})`;

        if (--timer < 0) {
        	clearInterval(this.timeInterval)
        	this.logout();
        	this.swapFaces();
        }
    }, 1000);
}

//-----------------------------------------------------------------------------

UI.prototype.keyEvents = function() {
	let textArea = document.getElementById("messageInput");
	textArea.addEventListener("keydown" , (event) => {
		if(event.keyCode === 13 && !event.altKey) {
			console.log("textarea")
			event.preventDefault();
			document.getElementById("sendBtn").click();
		}
		if(event.keyCode === 13 && event.altKey) {
			textArea.value += "\n";
		}
	});
	document.getElementById("joinFace").addEventListener("keydown" , (event) => {
		if(event.keyCode === 13) {
			console.log("joinFace")
			document.getElementById("joinBtn").click();
		}		
	})
}

//-----------------------------------------------------------------------------

UI.prototype.hookEvents = function() {
    this.joinBtn();
    this.sendBtn();
    this.logoutBtn();
    this.keyEvents();
}



let ui = new UI();