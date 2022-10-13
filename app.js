
let dataSet = [
    ['1', 'Nambi Rajan', '22', 'Javascript', 'Qantler', 'Trainee', '<button class="btn btn-warning " data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onclick="onUpdate(this)">Update</button>', '<button onclick="onDelete(this)" class="btn btn-danger">Delete</button>'],
    ['2', 'Nantha Kumar', '21', 'Javascript', 'Qantler', 'Trainee', '<button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onclick="onUpdate(this)">Update</button>', '<button onclick="onDelete(this)" class="btn btn-danger">Delete</button>'],
    ['3', 'Sanjivi Kumar', '21', 'Javascript', 'Qantler', 'Trainee', '<button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onclick="onUpdate(this)">Update</button>', '<button onclick="onDelete(this)" class="btn btn-danger">Delete</button>']];

$(document).ready(function () {
    $('#example').DataTable({
        data: dataSet, columns: [
            { title: 'ID' },
            { title: 'Name' },
            { title: 'Age' },
            { title: 'Skill' },
            { title: 'Address' },
            { title: 'Designation' },
            { title: 'Update' },
            { title: 'Delete' },
        ],
    });
});


function readFormData () {
    
    let formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["age"] = document.getElementById("age").value;
    formData["skill"] = document.getElementById("skill").value;
    formData["address"] = document.getElementById("address").value;
    formData["designation"] = document.getElementById("designation").value;

    return formData;
}

let previousId = 1;
 previousId = dataSet[dataSet.length - 1][0];


function addEmployee(data) {

    previousId = parseInt(previousId) + 1;

    let table = $('#example').DataTable();

    const dynamicValue = [
        `${parseInt(previousId)}`,
        `${data.name}`,
        `${data.age}`,
        `${data.skill}`,
        `${data.address}`,
        `${data.designation}`,
        '<button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onclick="onUpdate(this)">Update</button>',
        '<button onclick="onDelete(this)" class="btn btn-danger">Delete</button>'
    ];

    table.row.add(dynamicValue).draw();
    dataSet.push(dynamicValue);
}

function onDelete(element) {

    let table = $("#example").DataTable()
    let tr = element.parentElement.parentElement
    let index = tr.firstChild.textContent
    // tr.remove()
    console.log(index);

    let removeIndex = parseInt(index) - 1;
    const removedArray = dataSet.splice(removeIndex, 1);
    console.log(removedArray);
    console.log(dataSet);
    table.clear();
    table.rows.add(dataSet).draw();
}

function onUpdate(element) {

    let tr = element.parentElement.parentElement
    const nodes = tr.childNodes

    let index = tr.firstChild.textContent
    console.log('index : ',index)

    const [id, name, age, skill, address, designation] = nodes;

    document.getElementById("name2").value = name.textContent;
    document.getElementById("age2").value = age.textContent;
    document.getElementById("skill2").value = skill.textContent;
    document.getElementById("address2").value = address.textContent;
    document.getElementById("designation2").value = designation.textContent;

    $('#updatebtn').click(function () {
        $("#staticBackdrop2").modal('hide');

        let updateIndex = dataSet.findIndex((items) => {

            return index == items[0];
        })
        console.log( updateIndex );
        const updatedName = document.getElementById("name2").value;
        const updatedAge = document.getElementById("age2").value;
        const updatedSkill = document.getElementById("skill2").value;
        const updatedAddress = document.getElementById("address2").value;
        const updatedDesignation = document.getElementById("designation2").value;

        const row = [
            `${id.textContent}`,
            `${updatedName}`,
            `${updatedAge}`,
            `${updatedSkill}`,
            `${updatedAddress}`,
            `${updatedDesignation}`,
            '<button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onclick="onUpdate(this)">Update</button>',
            '<button onclick="onDelete(this)" class="btn btn-danger">Delete</button>'

        ];
        dataSet[ updateIndex ] = row;
        // const deletedRow = dataSet.splice(updateIndex, 1, row);
        // console.log(deletedRow);
        console.log(dataSet);

        let table = $('#example').DataTable();
        table.clear();
        table.rows.add(dataSet).draw();
        
        
    });

}



function resetForm() {
    
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("skill").value = "";
    document.getElementById("address").value = "";
    document.getElementById("designation").value = "";
}


function validate() {

    isValid = true;

    if (document.getElementById("name").value == "") {
        isValid = false;
    }

    if (document.getElementById("age").value == "") {
        isValid = false;
    }

    if (document.getElementById("skill").value == "") {
        isValid = false;
    }

    if (document.getElementById("address").value == "") {
        isValid = false;
    }

    if (document.getElementById("designation").value == "") {
        isValid = false;
    }

    return isValid;
}

function onFormSubmit() {

    if (validate()) {

        let formData = readFormData();
        
        $('#staticBackdrop').modal('hide');
        addEmployee(formData);
        resetForm();
    } else {
        
        alert('Please Enter All Fields Correctly !');
    }
}

function onUpdatedValue(element) {

    let tr = element.parentNode.parentNode;
    tr = tr.querySelector('.modal-body').querySelectorAll('.row');
    const nodes = tr

    const [id, name, age, skill, address, designation] = nodes;


    resetForm()
}



	// const tBody = document.getElementsByTagName('tbody');
	// function creation(dataValues) {
	
	//     const idData = document.createElement('td').textContent = dynamicId;
	//     const nameData = document.createElement("td").textContent = datavalues.name;
	//     const ageData = document.createElement("td").textContent = datavalues.name;
	//     const skillData = document.createElement("td").textContent = datavalues.name;
	//     const addressData = document.createElement("td").textContent = datavalues.name;
	//     const designationData = document.createElement("td").textContent = datavalues.name;
	//     const addButton = document.createElement("td");
	//     addButton.innerHtml = '<button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onclick="onUpdate(this)">Update</button>';
	//     const closeButton = createElement("td");
	//     closeButton.innerHtml = '<button onclick = "onDelete(this)" class="btn btn-danger" > Delete</ >';
	
	//     const tr = document.createElement('tr');
	
	//     tr.appendChild(idData);
	//     tr.appendChild(nameData);
	//     tr.appendChild(ageData);
	//     tr.appendChild(skillData);
	//     tr.appendChild(addressData);
	//     tr.appendChild(designationData);
	//     tr.appendChild(addButton);
	//     tr.appendChild(closeButton);
	
	//     tBody.appendChild(tr);
	// }


