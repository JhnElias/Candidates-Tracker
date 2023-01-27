let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const downloadBtn = document.getElementById("download-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") ) //everytime we open the extension, we need to see what we have saved before,
// so this object gets the string my leads from localstorage, makes it again an array and assign it to our variable 


if (leadsFromLocalStorage) { // checks if localstorage is emty, if it is not
    myLeads = leadsFromLocalStorage   // it assigns to myLeads the values that has to showcased
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
` //it adds the items in an unordered list of items
}
ulEl.innerHTML=listItems //uses innerHTML so that we that it showcases at "index.html" an unordered list of items
}


inputBtn.addEventListener("click", function() {  //this is an event listener, when the button is clicked, the function beggins running.
    myLeads.push(inputEl.value) //takes the value from the input field and pushes it to the last place of myLeads array
    inputEl.value='' //this is for cleaning the value of the input field in every button hit.
    localStorage.setItem("myLeads", JSON.stringify(myLeads) ) // the links need to be saved in localstorage. Local storage accepts only strings and not arrays...
    // so JSON.stringify(myLeads) saves into a local storage the array as a string
    render(myLeads)
})

deleteBtn.addEventListener("dblclick", function() {  //listens for double clicks
    localStorage.clear()    // cleans the local storage
    myLeads = []            // cleans myLeads
    render(myLeads)
})

tabBtn.addEventListener("click", function(){  
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){ // this line uses google API(chrome.tabs.) to query google to: give us the
        // link from the active tab that we are using (currentWindow is telling that we need the link from the page that we have our extension open)
        myLeads.push(tabs[0].url) //this is how google documentation specifies how to take the url from the tab
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

        const blob= new Blob(newLeads,{type:"octet-stream"}) //  creates a blob object and assigns it the array
        // and the type of the file that is going be downloaded

        const href= URL.createObjectURL(blob) // creates a URL for our blob

        const a=Object.assign(document.createElement("a"),{  //dom API 
            href,
            style:"display:none",
            download: name="Data.txt"
        })
        document.body.appendChild(a); //this appends a tag to the document so that the user be able to click on it

        a.click() //it trigers the download of the file
        URL.revokeObjectURL(href)// this is an API wich revokes the URL we created so that the user doesnt have any memory leaks
        a.remove() //removes the a tag from the document
    }
    )

   