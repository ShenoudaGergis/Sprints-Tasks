let timeInterval;

function swapScreens() {
    let logScreen  = document.getElementById("logScreen");
    let chatScreen = document.getElementById("chatScreen");

    if(logScreen.className.split(" ").findIndex((i) => {
        return i === "d-none";}) !== -1) {    //means that the logScreen found

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



let UI = {
    socket : null,
    onJoin : function() {
        console.log("join!!");
    }

}

//-----------------------------------------------------------------------------




let Utils = {
    validate(text , rule) {
        return (new RegExp(rule)).test(text);
    }
}

//-----------------------------------------------------------------------------

function UI() {
    this.socket = new Socket();
}

UI.prototype.swapFaces = function() {
    
    if(this.isFaceVisible("joinFace")) {
        this.setFaceHidden("joinFace");
        this.setFaceVisible("chatFace");
        this.setFaceVisible("liveUsersFace");
    } else {
        this.setFaceHidden("chatFace");
        this.setFaceHidden("liveUsersFace");
        this.setFaceVisible("joinFace");
    }
}

let UI = {
    socket : new Socket,
    swapFaces : function() {
        if(this.isFaceVisible("joinFace")) {
            this.setFaceHidden("joinFace");
            this.setFaceVisible("chatFace");
            this.setFaceVisible("liveUsersFace");
        } else {
            this.setFaceHidden("chatFace");
            this.setFaceHidden("liveUsersFace");
            this.setFaceVisible("joinFace");
        }
    },
    isFaceVisible : function(id) {
        return (document.getElementById(id).style["display"] === "none") ? false : true; 
    },
    setFaceVisible : function(id) {
        document.getElementById(id).style["display"] = "";
    },
    setFaceHidden : function(id) {
        document.getElementById(id).style["display"] = "none";        
    },
    joinBtn : function() {
        document.getElementById("joinBtn").addEventListener("click" , () => {
            let name = document.getElementById("username").value.trim();
            let channelName = document.getElementById("channelName").value.trim();
            if(Utils.validate(name , "^[a-zA-Z]+ *[a-zA-Z]+$") && 
               Utils.validate(channelName , "^[a-zA-Z0-9]+$")) {

                console.log(name , channelName);
            } else {

            }
        });
    },
    hookEvents : function() {
        this.joinBtn();
    }
}



UI.hookEvents();



            <div class="msg left-msg">
                <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)"></div>
                <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">BOT</div>
                        <div class="msg-info-time">12:45</div>
                    </div>
                    <div class="msg-text">
                        Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
                    </div>
                </div>
            </div>
            <div class="msg right-msg">
                <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)"></div>
                <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">Sajad</div>
                        <div class="msg-info-time">12:46</div>
                    </div>
                    <div class="msg-text">
                        You can change your name in JS section!
                    </div>
                </div>
            </div>

