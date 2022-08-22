//Role = ["SuperAdmin", "Admin", "Subscriber"];

function createTable(arr) {
        
    DOM("load").innerHTML = "Refresh Data";

    let table = "<table id='table_data'>" +
                    " <tbody> <tr id = 'heading'>" +
                        "<th> First Name </th>" +
                        "<th> Middle Name </th>" +
                        "<th> Last Name </th>" +
                        "<th> Email </th>" +
                        "<th> Phone Number </th>" +
                        "<th> Role </th>" +
                        "<th> Address </th>" +
                        //"<th> D.O.B. </th>" +
                    "</tr>";

    let count = 0;

    for(let i of arr) {
        table += "<tr id="+i.id+">" +
                    "<td><div contenteditable='false'>" +i.firstName+  "</div></td>" +
                    "<td><div contenteditable='false'>" +i.middleName+ "</div></td>" + 
                    "<td><div contenteditable='false'>" +i.lastName+ "</div></td>" +
                    "<td><div contenteditable='false'>" +i.email+ "</div></td>" +
                    "<td><div contenteditable='false'>" +i.phone+ "</div></td>" +
                    "<td><div contenteditable='false'>" +i.role+ "</div></td>" +
                    //"<form> <select> <option value=" +"SuperAdmin"+">" +Role[0]+"</option>" + 
                    //"<option value=" +"Admin"+">" +Role[1]+"</option>" +
                    //"<option value=" +"Subscriber"+">" +Role[2]+"</option>" +
                    //"</select> </form>" +                    
                    "<td><div contenteditable='false'>" +i.address+ "</div></td>" +                        
                    "<td>" + 
                    "<input type='button' id="+"edit_button"+count+" value='Edit' onclick="+"edit_row(this,"+count+")>" + 
                    "<input type='button' id="+"delete_button"+count+" value='Delete' onclick="+"delete_row(this)>" +  
                    //"<input type='button' id="+"save_button"+count+" value='Save' class='save'>" +
                    //"<input type='button' id="+"cancel_button"+count+" value='Cancel' class='cancel'>" +                            
                    "</td>" +                          
                "</tr>";                        

            count++;
        } 
                            
    DOM('divison').innerHTML = table + "</tbody>";         
} 

const showTable = async () => {
    await axios.get('http://localhost:3000/details')
        .then(res => {
            let arr = res.data.details;
            createTable(arr);
        })
        .catch(err => {
            console.log(err);
        })
}

const delete_row = async (obj) => {
    let ele = obj.parentElement.parentElement;
    let id = ele.id;
    ele.style.display = 'none';
    console.log(id);
    await axios.delete(`http://localhost:3000/details/${id}`, {
        headers: {},
        data: {}
        
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
}

const edit_row = async (obj, no) => {
    
    hide(no);
    let save = document.createElement("button");
    save.innerText = "Save";
    save.id = "save";

    let cancel = document.createElement("button");
    cancel.innerText = "Cancel";
    cancel.id = "cancel";

    obj.parentElement.prepend(save, cancel); 
    
    let ele = obj.parentElement.parentElement;
    let id = ele.id;
    console.log(`id is ${id}`);

    ele.style.backgroundColor = '#FFFF00';
    let list = ele.childNodes;
    for (let m = 0; m < 7; m++) 
        list[m].childNodes[0].contentEditable = "true";

        save.addEventListener('click', async () => {
            await axios.patch(`http://localhost:3000/details/${id}`, {
                firstname: list[0].childNodes[0].innerText,
                middlename: list[1].childNodes[0].innerText,
                lastname: list[2].childNodes[0].innerText,
                email: list[3].childNodes[0].innerText,
                phone: list[4].childNodes[0].innerText,
                role: list[5].childNodes[0].innerText,
                address: list[6].childNodes[0].innerText
            })
                .then(res => {
                    // console.log(res.data.details))
                    for (i of res.data.details) {
                        if (i.id === id) {
                            list[0].childNodes[0].innerText = i.firstName;
                            list[1].childNodes[0].innerText = i.middleName;
                            list[2].childNodes[0].innerText = i.lastName;
                            list[3].childNodes[0].innerText = i.email;
                            list[4].childNodes[0].innerText = i.phone;
                            list[5].childNodes[0].innerText = i.role;
                            list[6].childNodes[0].innerText = i.address;
                        }
                    }                    
                    ele.style.backgroundColor = 'white';
                    show(no);
                    save.style.display = 'none';
                    cancel.style.display = "none";
                    
                    for (let m = 0; m < 7; m++)
                        list[m].childNodes[0].contentEditable = "false";
                    
                    // tablefunc(arr)
                })

                .catch(err => {
                    console.log(err);
                })
        })

        cancel.addEventListener('click', async () => {
            await axios.get(`http://localhost:3000/details/${id}`)
                .then(res => {
                    res = res.data;                    
                    list[0].childNodes[0].innerText = res.firstName;
                    list[1].childNodes[0].innerText = res.middleName;
                    list[2].childNodes[0].innerText = res.lastName;
                    list[3].childNodes[0].innerText = res.email;
                    list[4].childNodes[0].innerText = res.phone;
                    list[5].childNodes[0].innerText = res.role;
                    list[6].childNodes[0].innerText = res.address;

                    ele.style.backgroundColor = 'white';
                    show(no);
                    save.style.display = 'none';
                    cancel.style.display = "none"
                    
                    for (let m = 0; m < 7; m++) 
                        list[m].childNodes[0].contentEditable = "false";                   
                })

                .catch(err => {
                    console.log(err);
                })
        })    
}

function DOM(id) {
    return(document.getElementById(id));
}    

function hide(no) {
    DOM("edit_button"+no).style.display = 'none';
    DOM("delete_button"+no).style.display = 'none';
}

function show(no) {
    DOM("edit_button"+no).style.display = 'inline-block';
    DOM("delete_button"+no).style.display = 'inline-block';
}

function today() {
    DOM("date_time").innerHTML = Date();
}