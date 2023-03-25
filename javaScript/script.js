import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, push ,ref , onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://playgound-3ef44-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings) // initializeApp connects my project with the database

const database = getDatabase(app) 

// setting the reference
const shoppingListInDB = ref(database,"shoppingList") // I created a refernce for my database and i gave it a name of shoppingList

let bottom = document.getElementById("add-button")
let shoppingList = document.getElementById('To-do-list')


bottom.addEventListener("click",() => {
    createShoppingList()
    clearInput("input-field")    

})

onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let itemsInShoppingList = Object.entries(snapshot.val())
        clearShoppingList()

        for(let i of itemsInShoppingList){
        
            appendShoppingList(i)
        }

    }else {
        shoppingList.innerHTML = "no items here... yet"
    }
    
}) // onValue is ruining whenever i have a change into my database when I reload the page go to the shoppingListInDB and call a function which takes a snapshot as an arguments : snapshot is the object in my database


function clearInput(id){
    document.getElementById(id).value = "" // i just mad the input filed clear
}


function createShoppingList(){
    let item = document.getElementById("input-field").value
    appendShoppingList(item)
    push(shoppingListInDB, item) // I pushed the item into the shoppingListInDB database 
}


function appendShoppingList(itemName){
    let currentItemID = itemName[0]
    let currentItemValue = itemName[1]

    let element = document.createElement('div')
    let deleteIcon = document.createElement('i')
    deleteIcon.setAttribute('class','fa-solid fa-trash')
    element.textContent =  currentItemValue
    shoppingList.appendChild(element)
    element.appendChild(deleteIcon)

    // delete an item when it's been double clicked
    deleteIcon.addEventListener("dblclick", function(){
        let exactLocationOfItem = ref(database ,`shoppingList/${currentItemID}`)
        remove(exactLocationOfItem)
        })
}


function clearShoppingList(){
    shoppingList.innerHTML = ""

}