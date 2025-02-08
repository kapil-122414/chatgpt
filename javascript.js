let prompt = document.querySelector("#prompt");
let container = document.querySelector(".container")
let btn = document.querySelector("#btn");
let chatcontainer = document.querySelector(".chat-container")
let usermessage = null;
let Apiurl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDg6qbmcbwqRs07i44sLyizLGZdnTmzQbc';

function creatchatbox(html, className) {
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}


async function getApiResponse(aichatbox) {
    let textelement = aichatbox.querySelector(".text");

    try {
        let response = await fetch(Apiurl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ "parts": [{ text: usermessage }] }]
            })
        })
        let data = await response.json();

        let apiresponse = data?.candidates[0].content.parts[0].text;

        textelement.innerText = apiresponse;

    }
    catch (error) {
        console.log(error);
    }
    finally {
        aichatbox.querySelector(".loading").style.display = "none";

    }
}



function showloading() {

    let html = `<div class="img">
                <img src="robot-161367_1280.png" alt="" width="50px" height="50px">
            </div>
            <img class="loading" src="loding1.png" alt="Loading" height="50px"   mix-blend-mode: "color-burn">
            <p class ="text"> </p>`;
    let aichatbox = creatchatbox(html, "ai-chat-box");
    chatcontainer.appendChild(aichatbox);
    getApiResponse(aichatbox)
}





btn.addEventListener("click", () => {
    usermessage = prompt.value;
    if (usermessage == "") {
        container.style.display = "flex";

    } {
        container.style.display = "none";
    }
    console.log(usermessage);
    if (!usermessage) return;
    let html = ` <div class="img">
                <img src="user-297330_1280.png" alt="" width="50px" height="50px">
            </div>

            <p class="text"></p>`;

    let userchatbox = creatchatbox(html, "user-chat-box");
    userchatbox.querySelector(".text").innerText = usermessage;
    chatcontainer.appendChild(userchatbox);
    prompt.value = "";
    setTimeout(showloading, 500);


});


