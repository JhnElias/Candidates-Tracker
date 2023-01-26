let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const downloadBtn = document.getElementById("download-btn")

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
    
    downloadBtn.addEventListener("click", function(){
        let newLeads=[]
        let simpleLead=''
        for(let i=0;i<myLeads.length;i++){
            simpleLead=myLeads[i]+'\n'
            newLeads.push(simpleLead)
        } //the above is for the code to shown one line after the other

        const blob= new Blob(newLeads,{type:"octet-stream"}) // we create a blob object and we assign it the array that we want
        // and the type we want the file to be downloaded

        const href= URL.createObjectURL(blob) // creates a URL for our blob

        const a=Object.assign(document.createElement("a"),{  //dom API 
            href,
            style:"display:none",
            download: name="Data.txt"
        })
        document.body.appendChild(a); //this appened a tag to the togumend so taht we be able to click on it

        a.click() //it trigers the download of the file
        URL.revokeObjectURL(href)// this is an API wich revokes the URL we created so that we dont have any memory leaks
        a.remove() //removes the a tag from the document
    }
    )

   