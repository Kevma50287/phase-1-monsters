/////////////////    DELIVERABLES   ///////////////////
// When the page loads, show the first 50 monsters. 
// Each monster's name, age, and description should be shown.


// Above your list of monsters, you should have a form to create a new monster. 
// You should have fields for name, age, and description, and a 'Create Monster Button'. 
// When you click the button, the monster should be added to the list and saved in the API.


// At the end of the list of monsters, show a button. When clicked, 
// the button should load the next 50 monsters and show them.

/////////////////////////////////////////////////////////


document.addEventListener('DOMContentLoaded', () => {
    const monsterContainer = document.getElementById('monster-container')
    const MonFormContainer = document.getElementById('create-monster')
    const url = 'http://localhost:3000/monsters'

    // create the monsterform, form elements
    const monsterForm = document.createElement('form')
    monsterForm.id = 'monster-form'

    const MonNameLabel = document.createElement('label')
    MonNameLabel.for = 'name'
    MonNameLabel.textContent = 'Enter New Monster Name: '
    const MonNameInput = document.createElement('input')
    MonNameInput.id = 'name'
    MonNameInput.type = 'text'

    const MonAgeLabel = document.createElement('label')
    MonAgeLabel.for = 'age'
    MonAgeLabel.textContent = 'Enter New Monster Age: '
    const MonAgeInput = document.createElement('input')
    MonAgeInput.id = 'age'
    MonNameInput.type = 'number'

    const MonDescriptionLabel = document.createElement('label')
    MonDescriptionLabel.for = 'description'
    MonDescriptionLabel.textContent = 'Enter New Monster Description: '
    const MonDescriptionInput = document.createElement('input')
    MonDescriptionInput.id = 'description'
    MonNameInput.type = 'text'

    //CreateButton properties
    const CreateButton = document.createElement('button')
    CreateButton.type = 'submit'
    CreateButton.form = 'monster-form'
    CreateButton.value = 'Submit'
    CreateButton.textContent = 'Create a Monster!'
    CreateButton.style.margin = '10px 0px'

    //////////////////////////// SERVER CODE ///////////////////////////

    // Submit functionality for create button
    monsterForm.addEventListener('submit', (e) => {
        e.preventDefault()
        AddMonster()
        monsterForm.reset()
    })

    // Function to add monster
    const AddMonster = async () => {
        let fetchObj = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name:`${monsterForm.name.value}`,
                age:`${monsterForm.age.value}`,
                description:`${monsterForm.description.value}`,
            })}
        fetchEdits(fetchObj)
    }

    // async await function for POST, PATCH, DELETE
    // takes a function fetchObj and returns the data
    const fetchEdits = async (fetchObj) => {
        const response = await fetch(url, fetchObj)
        const data = await response.json()
        return data
    }

    //////////////////////////////////////////////////////////////////

    // append elements to monsterForm
    monsterForm.append(MonNameLabel, MonNameInput, MonAgeLabel, MonAgeInput, MonDescriptionLabel, MonDescriptionInput, CreateButton)
    // change all elements to display block
    monsterForm.childNodes.forEach((element) => {element.style.display = 'block'})
    // append to DOM
    MonFormContainer.append(monsterForm)


    //async await GET fetch
    const GETfetch = async () => {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } 


    // Function to render one Monster onto the page
    // We need (h2 - Name, h4 - Age, p - description, and div - block layout)
    const renderMonster = (monster) => {
        let h2 = document.createElement('h2')
        h2.textContent = monster.name
        let h4 = document.createElement('h4')
        h4.textContent = `Age: ${monster.age}`
        let p = document.createElement('p')
        p.textContent = monster.description
        let div = document.createElement('div')
        div.style.border = '2px solid black'
        div.append(h2, h4, p)
        monsterContainer.append(div)
    }

   

     
    /*  ////////////////////////////////////////////////////////
    PERSONAL NOTE
        // To get the data from an async function, we need another async function. 
        For example:

                const getData = async  () => {
                    console.log(await GETfetch())}
                getData()

    
    ////////////////////////////////////////////////////////  */



    //currentPage, value changes when we click the forward and backward buttons
    let currPage = 1

    //add a forward and backwards button
    const backbtn = document.getElementById('back')
    const fwdbtn = document.getElementById('forward')

    //Can't go less than page 1
    backbtn.addEventListener('click', () => {
        if (currPage > 1){
            currPage--
            clearDivs()
            Load50Monsters(currPage)
        }
    })

    //Can't go above max page
    fwdbtn.addEventListener('click', async () => {
        let checkArrLen = await GETfetch()
        let maxPage = Math.floor(checkArrLen.length / 50)
        if (currPage < maxPage){
            currPage ++
            clearDivs()
            Load50Monsters(currPage)
        }
    })
    
    //clear monsters on the page
    const clearDivs = () => {
        while (monsterContainer.firstChild){
            monsterContainer.firstChild.remove()
        }
    }

    //Load 50 monsters onto page based on currPage variable
    const Load50Monsters = async (currPage) => {
        const monsterArr = await GETfetch() 
        for (let index = 50*(currPage-1); index < (50*currPage); index++) {
            renderMonster(monsterArr[index])
        }
    }

    //initiate first 50 monsters on page load
    Load50Monsters(currPage)

    


})