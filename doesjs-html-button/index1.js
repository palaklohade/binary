const cheerio = require("cheerio")
const axios = require("axios")
const userEmailP = document.getElementById('user_email');
userEmailP.textContent = urlParams.get('email');

document.getElementById('search-bar').addEventListener('input', function(event) {
    let allBoxes = document.getElementsByClassName('boxes');
    if(event.target.value === '') {
        for (const box in allBoxes) {
            if (Object.hasOwnProperty.call(allBoxes, box)) {
                const element = allBoxes[box];
                element.style.display = 'block'
            }
        }
    }
    else{
        for (const box in allBoxes) {
            if (Object.hasOwnProperty.call(allBoxes, box)) {
                const element = allBoxes[box];
                if(element.getElementsByClassName('teammembers')[0].textContent.toLowerCase().includes(event.target.value.toLowerCase())) {
                    element.style.display = 'block'
                }
                else{
                    element.style.display = 'none'
                }
            }
        }
    }
});

const leftSideContainer = document.getElementsByClassName('leftsideButtom')[0];
let dataList = [];
let selectedDiv = 0;
function addUntitledBox() {
    const container = document.querySelector('.leftsideButtom');
    const newBox = document.createElement('div');
    newBox.classList.add('boxes');
    newBox.classList.add('clickable-div');

    let EmpDetails = [];
    let userData = {
        "workSpaceText":'',
        "NOE":'0',
        "EmpDetails":EmpDetails
    }
    dataList.push(userData);
    newBox.setAttribute('data-info', dataList.length-1);
    selectDiv(newBox,dataList.length-1)
    newBox.style.marginLeft = "7px";
    newBox.style.marginBottom = "7px";

    //  box content
    const heading = document.createElement('h1');
    heading.textContent = 'In documentation';
    heading.style.fontFamily = 'Noto Sans'; 
    heading.style.fontSize = "20px";
    heading.style.paddingLeft = "20px";
    heading.style.paddingTop = "20px";
    newBox.appendChild(heading);

    newBox.addEventListener('click', function(event) {
        if (!event.target.classList.contains('teammembers') && !event.target.classList.contains('delete-button')) {
            const dataInfo = newBox.getAttribute('data-info');
            console.log(dataInfo);
            selectDiv(newBox,newBox.getAttribute('data-info'))
        }
      });

    const linkContainer = document.createElement('h2');

    const quillIcon = document.createElement('img');
    quillIcon.src = 'quill-drawing-a-line.png'; 
    quillIcon.height = 20;
    quillIcon.style.marginLeft = "-20px";
    quillIcon.alt = 'Document icon';

    const link = document.createElement('a');
    link.classList.add('teammembers');
    link.textContent = 'Untitled';
    link.style.marginLeft = "-8px";
    link.style.fontFamily = 'Noto Sans'; 
    link.setAttribute('contenteditable', 'true'); 

    linkContainer.appendChild(quillIcon);
    linkContainer.appendChild(link);
    linkContainer.classList.add('h2');
    newBox.appendChild(linkContainer);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.overflowX = "auto";
    buttonContainer.style.overflowY = "hidden";
    buttonContainer.style.whiteSpace = "nowrap";
    buttonContainer.style.width = "75vw";

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.border = "none";
    deleteButton.style.fontSize = "16px";
    deleteButton.style.marginLeft = "230px";
    deleteButton.style.padding = "6px";
    deleteButton.style.borderRadius = "12px";
    deleteButton.style.backgroundColor = "#87a2a1";

    deleteButton.addEventListener('click', () => {
        container.removeChild(newBox);
        
    });

    buttonContainer.appendChild(deleteButton);
    newBox.appendChild(buttonContainer);

    container.appendChild(newBox);


    return link;
}

function selectDiv(div,currentDivNum) {
    let allBoxes = document.getElementsByClassName('boxes');
    for (const box in allBoxes) {
        if (Object.hasOwnProperty.call(allBoxes, box)) {
            const element = allBoxes[box];
            if (element.getAttribute('data-info') == selectedDiv) {
                element.classList.remove('selected');
            }
        }
    }
    div.classList.add('selected');
    selectedDiv=currentDivNum;
    document.getElementById('user-input').value = dataList[selectedDiv]['workSpaceText'];
    document.getElementById('numEmployees').value = dataList[selectedDiv]['NOE'];
    generateFields();
    for (let i = 0; i < parseInt(dataList[selectedDiv]['NOE']); i++) {
        let empName = document.getElementById("employeeName"+i);
        let empExp = document.getElementById("employeeExpertise"+i);
        empName.value = dataList[selectedDiv]['EmpDetails'][i][0];
        empExp.value = dataList[selectedDiv]['EmpDetails'][i][1]; 
    }
}


const untitledLink = addUntitledBox();

function generateFields() {
    var numEmployees = document.getElementById("numEmployees").value;
    var fieldsContainer = document.getElementById("employeeFields");
    fieldsContainer.innerHTML = "";

    for (var i = 0; i < numEmployees; i++) {
        var nameLabel = document.createElement("label");
        nameLabel.textContent = "Name of Employee " + (i + 1) + ":";
        var nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.name = "employeeName" + i;
        nameInput.id = "employeeName" + i;
        nameInput.required = true;
        nameInput.style.marginTop = "12px";

        var expertiseLabel = document.createElement("label");
        expertiseLabel.textContent = "Expertise of Employee " + (i + 1) + ":";
        var expertiseInput = document.createElement("input");
        expertiseInput.type = "text";
        expertiseInput.name = "employeeExpertise" + i;
        expertiseInput.id = "employeeExpertise" + i;
        expertiseInput.required = true;

        fieldsContainer.appendChild(nameLabel);
        fieldsContainer.appendChild(nameInput);
        fieldsContainer.appendChild(document.createElement("br"));
        fieldsContainer.appendChild(expertiseLabel);
        fieldsContainer.appendChild(expertiseInput);
        fieldsContainer.appendChild(document.createElement("br"));
    }
}

function showToast(cont) {
    var toast = document.getElementById("toast");
    toast.className = "toast show";
    toast.textContent = cont;
    setTimeout(function(){
      toast.className = toast.className.replace("show", "");
    }, 3000); 
  }

document.getElementById("submitButton").addEventListener("click", function (event) {
    event.preventDefault();
    dataList[selectedDiv]['workSpaceText'] = document.getElementById('user-input').value;
    let NOE = document.getElementById('numEmployees').value;
    dataList[selectedDiv]['NOE'] = NOE;
    
    for (let i = 0; i < parseInt(NOE); i++) {
        let empName = document.getElementById("employeeName"+i);
        let empExp = document.getElementById("employeeExpertise"+i);
        let empDetail = [];
        empDetail.push(empName.value);
        empDetail.push(empExp.value)
        dataList[selectedDiv]['EmpDetails'].push(empDetail);
    }
    showToast("Submitted");
    document.getElementById("employeeForm").dispatchEvent(new Event('submit'));
});























