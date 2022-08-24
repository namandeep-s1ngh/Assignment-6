const showTable = async () => {
    await fetch('http://localhost:3000/details') 
        .then(res => {
            return res.json();
        })       
            .then(res => {
                CRUD.prototype.createTable(res.details);
            })
        .catch(err => {
            console.log(err);
        })
}

interface create_table {            
    createTable(arr: any): void;
}

interface delete_row_table {        
    delete_row(obj: HTMLElement): void;
}

interface edit_row_table {                                                                                                             //save and cancel operations will also be defined here. 
    edit_row(obj: HTMLElement, n: number): void;
}

enum Role {SuperAdmin, Admin, Subscriber};

class CRUD implements create_table, delete_row_table, edit_row_table {

    createTable(arr: any) : void {
            
        DOM("load").innerHTML = "Refresh Data";

        let table: string = "<table id='table_data'>" +
                                " <tbody> <tr id = 'heading'>" +
                                    "<th> First Name </th>" +
                                    "<th> Middle Name </th>" +
                                    "<th> Last Name </th>" +
                                    "<th> Email </th>" +
                                    "<th> Phone Number </th>" +
                                    "<th> Role </th>" +
                                    "<th> Address </th>" +
                                "</tr>";

        let count: number = 0;

        for(let i of arr) {

            table += "<tr id="+i.id+">" +
                        "<td><div contenteditable='false'>" +i.firstName+  "</div></td>" +
                        "<td><div contenteditable='false'>" +i.middleName+ "</div></td>" + 
                        "<td><div contenteditable='false'>" +i.lastName+ "</div></td>" +
                        "<td><div contenteditable='false'>" +i.email+ "</div></td>" +
                        "<td><div contenteditable='false'>" +i.phone+ "</div></td>" +
                        "<td><div contenteditable='false'>" +Role[i.role]+ "</div></td>" + 
                        //"<form> <select> <option value=" +"SuperAdmin"+">" +Role[0]+"</option>" + 
                        //"<option value=" +"Admin"+">" +Role[1]+"</option>" +
                        //"<option value=" +"Subscriber"+">" +Role[2]+"</option>" +
                        //"</select> </form>" +  "</div></td>" +                
                        //"<td><div contenteditable='false'>" +i.address+                        
                        "<td>" + 
                        "<input type='button' id="+"edit_button"+count+" value='Edit' onclick="+"CRUD.prototype.edit_row(this,"+count+")>" + 
                        "<input type='button' id="+"delete_button"+count+" value='Delete' onclick="+"CRUD.prototype.delete_row(this)>" +  
                        //"<input type='button' id="+"save_button"+count+" value='Save' class='save'>" +
                        //"<input type='button' id="+"cancel_button"+count+" value='Cancel' class='cancel'>" +                            
                        "</td>" +                          
                    "</tr>";                        

                count++;
        }       
                            
        DOM("divison").innerHTML = table + "</table>";        
    }      


    async delete_row (obj) {
        let ele = obj.parentElement.parentElement;
        let id = ele.id;
        ele.style.display = 'none';
        console.log(id);
        await fetch(`http://localhost:3000/details/${id}`, {
            headers: {},      
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    async edit_row(obj, no) {
    
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
                await fetch(`http://localhost:3000/details/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    firstName: list[0].childNodes[0].innerText,
                    middleName: list[1].childNodes[0].innerText,
                    lastName: list[2].childNodes[0].innerText,
                    email: list[3].childNodes[0].innerText,
                    phone: list[4].childNodes[0].innerText,
                    role: list[5].childNodes[0].innerText,
                    address: list[6].childNodes[0].innerText
                }), 
                headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                .then(res => {
                    return(res.json());                                        
                })
                    .then(res => {
                        // console.log(res));
                        for (let i of res) {
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
                    })
    
                .catch(err => {
                    console.log(err);
                })
            })
        
            cancel.addEventListener('click', async () => {
                await fetch(`http://localhost:3000/details/${id}`)
                    .then(res => {
                        return(res.json());                                        
                    })
                        .then(res => {
                            //console.log(res.firstName); 
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
                            cancel.style.display = "none";
                            
                            for (let m = 0; m < 7; m++) 
                                list[m].childNodes[0].contentEditable = "false";   
                        })
    
                    .catch(err => {
                        console.log(err);
                    })             
            })   
    }
}

function DOM(id: string): HTMLElement {
    return(document.getElementById(id));
}

function hide(no: number): void {
    DOM("edit_button"+no).style.display = 'none';
    DOM("delete_button"+no).style.display = 'none';
}

function show(no: number): void {
    DOM("edit_button"+no).style.display = 'inline-block';
    DOM("delete_button"+no).style.display = 'inline-block';
}

function today(): void {
    DOM("date_time").innerHTML = Date();
}


