let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes= document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let mood= 'create';
let tmp;

function getTotal(){
    if(price.value!=''){
        let result =( +price.value+  +taxes.value  +  +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
     } 
     else{
            total.innerHTML='';
            total.style.background ='#50071d';
        }
    }

//create product
let datapro=[];
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}
else{
    datapro=[];
}

submit.onclick=function(){
    let newpro={
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total: total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),


    }




    
if(title.value !='' && price.value!='' &&category.value!='' && newpro.count<100){
    if(mood==='create'){ 
    if(newpro.count>1){
    for(let i=0 ;i<newpro.count;i++){
        datapro.push(newpro);
    }

}else{
    datapro.push(newpro);
}

}else {
    datapro[tmp]=newpro;
    mood='create';
    submit.innerHTML='create';
    count.style.display='block'
}
clearData();
}
    localStorage.setItem('product'   , JSON.stringify(datapro) );
    
    showdata()

    }

//clear inputs
function clearData(){
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        category.value  ='';

}
//read


function showdata()

{
    getTotal()
    
    let table='';
    for(let i=0;i< datapro.length;i++){
        table +=`
        <tr>
        <th>${i+1}</th>
        <th>${datapro[i].title}</th>
        <th>${datapro[i].price}</th>
        <th>${datapro[i].taxes}</th>
        <th>${datapro[i].ads}</th>
        <th>${datapro[i].discount}</th>
        <th>${datapro[i].total}</th>
        <th>${datapro[i].category}</th>
        <th>
            <button  onclick="updateData(${i})"id="update">update</button>

        </th>
        <th> <button onclick="deleteData(${i})" id="delete">delete</button></th>
    </tr>
    `
        
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById('deleteall')
    if(datapro.length>0){
     btndelete.innerHTML= `<button onclick="deleteAll()" >Delete All (${datapro.length})</button>`
    }
    else{
        btndelete.innerHTML= '';
    }
    }
    
    {

}
showdata()

//delete
function deleteData(i){
datapro.splice(i,1)
localStorage.product =JSON.stringify(datapro);
showdata()
}
function deleteAll(){
    localStorage.clear
    datapro.splice(0)
    showdata()
}

//update
 
function updateData(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal()
    count.style.display='none';
    category.value =datapro[i].category;
    submit.innerHTML='update'
     mood= 'update';
     tmp=i;
     scroll({top:0,behavior:'smooth',})

}
    

//search
let searchmode='title';
function getSearchMode(id){
    let search =document.getElementById('search')
    if (id=='searchtitle'){
        searchmode='title';
        
    }
    else{
        searchmode='category';
        
    }
    search.placeholder='search By '+searchmode;
    search.focus()
    search.value='';
    

}


function searchData(value){
    let table='';
    for(let i=0 ; i<datapro.length;i++){
         if (searchmode=='title'){

    if(datapro[i].title.includes(value.toLowerCase())){
        table +=`
        <tr>
        <th>${i}</th>
        <th>${datapro[i].title}</th>
        <th>${datapro[i].price}</th>
        <th>${datapro[i].taxes}</th>
        <th>${datapro[i].ads}</th>
        <th>${datapro[i].discount}</th>
        <th>${datapro[i].total}</th>
        <th>${datapro[i].category}</th>
        <th>
            <button  onclick="updateData(${i})"id="update">update</button>

        </th>
        <th> <button onclick="deleteData(${i})" id="delete">delete</button></th>
    </tr>
    `
        
    }




}

else{
    
        if(datapro[i].category.includes(value.toLowerCase())){
            table +=`
            <tr>
            <th>${i}</th>
            <th>${datapro[i].title}</th>
            <th>${datapro[i].price}</th>
            <th>${datapro[i].taxes}</th>
            <th>${datapro[i].ads}</th>
            <th>${datapro[i].discount}</th>
            <th>${datapro[i].total}</th>
            <th>${datapro[i].category}</th>
            <th>
                <button  onclick="updateData(${i})"id="update">update</button>
    
            </th>
            <th> <button onclick="deleteData(${i})" id="delete">delete</button></th>
        </tr>
        `}
            




}
    }
document.getElementById('tbody').innerHTML=table;
}












//clean data