let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) //everytime we open the extension, we need to see what we have saved before,
// so this object gets the string my leads from localstorage, makes it again an array and assign it to our variable 


if (leadsFromLocalStorage) { //we check if localstorage is emty, if it is not
    myLeads = leadsFromLocalStorage   // we assign to myLeads the values that we want to showcase
    render(myLeads)
}


function render(leads){
let listItems=''
for (let i = 0; i < leads.length; i++) {
    listItems += ` 
    <li>
        <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
        </a>
    </li>
` //we add the items in an unordered list of items
}
ulEl.innerHTML=listItems //we use innerHTML so that we can showcase in index.html an unordered list of items
}


inputBtn.addEventListener("click", function() {  //this is an event listener, when the button is clicked, the function beggins running.
    myLeads.push(inputEl.value) //takes the value from the input field and pushes it to the last place of myLeads array
    inputEl.value='' //this is for cleaning the value of the input field in every button hit.
    localStorage.setItem("myLeads", JSON.stringify(myLeads) ) // the links need to be saved in localstorage. Local storage accepts only strings and not arrays...
    // so JSON.stringify(myLeads) saves into a local storage the array as a string
    render(myLeads)
})

deleteBtn.addEventListener("dblclick", function() {  //we listen fopr double clicks
    localStorage.clear()    //we clean the local storage
    myLeads = []            //we clean myLeads
    render(myLeads)
})

tabBtn.addEventListener("click", function(){  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ //we use google API(chrome.tabs.) to query google to: give us the
        // link from the active tab that we are using (currentWindow is telling that we need the link from the page that we have our extension open)
        myLeads.push(tabs[0].url) //this is how google documantation specifies how to take the url from the tab
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
    })
    

   