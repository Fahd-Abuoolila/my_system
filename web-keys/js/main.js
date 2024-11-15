let w_name = document.getElementById('w_name');
let w_address = document.getElementById('w_address');
let w_date = document.getElementById('w_date');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
//create product

let database;
if(localStorage.product !=null){
    database = JSON.parse(localStorage.product);
}else{
    database = [];
}

submit.onclick = function(){
    let newpro = {
        w_name:w_name.value.toLowerCase(),
        w_address:w_address.value,
        w_date:w_date.value,
    }

    if(w_name.value !=''&& w_address.value != ''&& w_date.value!=''){
        if(mood === 'create'){
            if(newpro.count >0){
                database.push(newpro);
            }else{
                database.push(newpro);
            }
        }else{
            database[ tmp ] = newpro;
            mood = 'create';
            submit.innerHTML = 'add to list';
        }
        clearData();
    }
    //save localstorage
    localStorage.setItem('product',  JSON.stringify(database));
    showData()
}


//clear inputs
function clearData(){
    w_name.value = '';
    w_address.value = '';
    w_date.value = '';
}

//read
function showData()
{
    let table ='';
    for(let i = 0; i < database.length;i++){

        table += `
        <tr>
            <td>${i+1}</td>
            <td>${database[i].w_name}</td>
            <td><a href="${database[i].w_address}" target="_blank">${database[i].w_address}</a></td>
            <td>${database[i].w_date}</td>
            <td id="delete"><button class="btn btn-outline-warning" onclick="deleteData(${i})" id="delete">delete</button></td>
            <td id="update"><button class="btn btn-outline-primary" onclick="updateData(${i})" id="update">update</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
}
showData()
//delete
function deleteData(i){
    database.splice(i,1);
    localStorage.product = JSON.stringify(database);
    showData()
}
//update
function updateData(i){
    w_name.value = database[i].w_name;
    w_address.value = database[i].w_address;
    w_date.value = database[i].w_date;
    submit.innerHTML = 'return save';
    mood = 'update';
    tmp = i; 
    scroll({
        top:0,
        left:0,
        behavior:'smooth',
    })
}


let searchMood = 'name';

function getSearchMood(id){
    let searchinp = document.getElementById('searchinp');
    if(id == 'searchName'){
        searchMood = 'name';
        searchinp.placeholder = 'search by name';
    }else{
        searchMood = 'date';
        searchinp.placeholder = 'search by date';
    }
    searchinp.focus();
}

function searchdata(){
    var searchvalue = document.getElementById("searchinp").value;
    let table ='';
    if(searchMood == 'name'){
        for(let i = 0; i < database.length;i++){
            if(database[i].w_name.includes(searchvalue)){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${database[i].w_name}</td>
                    <td><a href="${database[i].w_address}" target="_blank">${database[i].w_address}</a></td>
                    <td>${database[i].w_date}</td>
                    <td id="delete"><button class="btn btn-outline-warning" onclick="deleteData(${i})" id="delete">delete</button></td>
                    <td id="update"><button class="btn btn-outline-primary" onclick="updateData(${i})" id="update">update</button></td>
                </tr>
                ` 
            }
        }
    }else{
        for(let i = 0; i < database.length;i++){
            if(database[i].w_date.includes(searchvalue)){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${database[i].w_name}</td>
                    <td><a href="${database[i].w_address}" target="_blank">${database[i].w_address}</a></td>
                    <td>${database[i].w_date}</td>
                    <td id="delete"><button class="btn btn-outline-warning" onclick="deleteData(${i})" id="delete">delete</button></td>
                    <td id="update"><button class="btn btn-outline-primary" onclick="updateData(${i})" id="update">update</button></td>
                </tr>
                ` 
            }
        }
    }
    if(searchvalue = ''){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${database[i].w_name}</td>
                <td><a href="${database[i].w_address}" target="_blank">${database[i].w_address}</a></td>
                <td>${database[i].w_date}</td>
                <td id="delete"><button class="btn btn-outline-warning" onclick="deleteData(${i})" id="delete">delete</button></td>
                <td id="update"><button class="btn btn-outline-primary" onclick="updateData(${i})" id="update">update</button></td>
            </tr>
        ` 
    }
    document.getElementById('tbody').innerHTML = table;
}









// export to xslx
function ExportToXLSX(type, fn, dl){
    var elt = document.getElementById('table');
    var wb = XLSX.utils.table_to_book(elt,{sheet: "sheet1"});
    return dl ?

    XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64'}) :
    XLSX.writeFile(wb, fn || ('fahd.' + (type || 'xls')));
}