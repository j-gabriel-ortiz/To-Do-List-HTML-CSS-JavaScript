/* Variables */
"use strict";

const switchStyle = document.querySelector(".btn-style");
const inputHw = document.querySelector("#inp-homework");
const hwList = document.querySelector(".homework-list");
const emptyAlert = document.getElementById("alert-empty");


switchStyle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if(className == "light-theme") {
        this.textContent = "Dark";
    } else {
        this.textContent = "Light";
    }

});


document.addEventListener("keydown", function(event) {
    if (inputHw.value != "" && event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    if (inputHw.value == "" || /^\s+$/.test(inputHw.value)) {
        emptyAlert.style.display = "block";
    } else {       
        emptyAlert.style.display = "none";
        //Elemento li
        const listItem = document.createElement("li"); 
        listItem.classList.add("item-list");
        listItem.textContent = inputHw.value;

        //Elemento button
        const btnList = document.createElement("span");
        btnList.textContent = "\u00D7";
        btnList.classList.add("btn-remove-item");
        
        listItem.appendChild(btnList);
        hwList.appendChild(listItem);
        inputHw.value = "";
        saveData();
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
  saveData();
}, false);

function saveData() {
    localStorage.setItem("data", hwList.innerHTML);
}

function showData() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        hwList.innerHTML = savedData;
    }
}

showData();

hwList.addEventListener("click", function (ev) {
    if (ev.target.classList.contains("btn-remove-item")) {
        const listItem = ev.target.parentElement;
        listItem.remove();
        saveData(); 
    }
}, false);
