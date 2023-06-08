// function nowTime() {
//     let now = new Date();
//     let month;
//     let day;
//     if (now.getMonth() < 10) {
//         month = `0${now.getMonth}`;
//     }
//     else {
//         month = now.getMonth;
//     }
//     if (now.getDay < 10) {
//         day = `0${now.getDay}`;
//     }
//     else {
//         day = now.getDay;
//     }
//     return(`${now.getFullYear()}-${month}-${day}T${now.getHours()}:${now.getMinutes()}`);
// }

function buttonPressed() {
    let textEl = document.querySelector("#blurBox1");
    let selectEl = document.querySelector("#blurBox2");
    let dateEl = document.querySelector("#blurBox3");

    let user = {
        name: textEl.value,
        room: selectEl.value,
        date: dateEl.value
    }
    fetch('http://127.0.0.1:8000/save',
    {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

function getUsers() {
    let container = document.querySelector("#list");
    
    fetch(`http://127.0.0.1:8000/db-users`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        for (let user of data) {
            let userItem = document.createElement("div");
            userItem.setAttribute("class", "user-item");
            container.appendChild(userItem);

            let userData = document.createElement("div");
            userData.setAttribute("class", "user-data");
            userData.textContent = `${user.id} ${user.room} ${user.name} - ${user.date}`;
            userItem.appendChild(userData);

            let delUser = document.createElement("div");
            delUser.setAttribute("class", "del-user");
            userItem.appendChild(delUser);

            let button = document.createElement("button");
            button.setAttribute("class", "return");
            button.setAttribute("onclick", "returnKey(this)");
            button.textContent = "Return";
            delUser.appendChild(button);

            let addLine = document.createElement("hr");
            addLine.setAttribute("class", "addLine");
            container.appendChild(addLine);
        }
    });
}


function returnKey() {
    let delEl = document.querySelector(".return");
    let revDiv = delEl.parentElement.parentElement;
    let fullStr = revDiv.querySelector(".user-data");
    revDiv.remove();
    delId = fullStr.textContent.split(" ")[0]
    // console.log(revDiv.textContent.split(" ")[0]);

    fetch(`http://127.0.0.1:8000/delete/${delId}`)
    .then(response => response.json())
    .then(data => console.log(data));

}
