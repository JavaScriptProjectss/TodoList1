const ITEMS_CONTAINER = document.getElementById('items');
const ITEM_TEMPLATE = document.getElementById('itemsTemplate');
const ADD_BUTTON = document.getElementById('add');


let items = getItems(); // this is where we are calling or invoking the getItems function

function getItems() {
    // this value is holding all the todo items currently being held in local storage 
    // if there is currently nothing there you can put an || (an or statement) and then an empty array as a default value
    const value = localStorage.getItem('todo') || '[]';

    return JSON.parse(value);
}

// within this function we are passing the items array 
function setItems (items) {
    const itemsJson = JSON.stringify(items); //we are converting the items array back into JSON

    localStorage.setItem('todo', itemsJson);

}

// logic for adding a new item to the list
// using unshift allows us to add the item to the front of the array
// using push allows us to add the item to the end of the array
// description: "", completed: false  is our default



function addItem() 
{
    items.unshift({
        description: "",
        completed: false
    });

    setItems(items);  // we are calling the setItems function to update the local storage with the new items array

    // next we need to refresh the list once a new item has been added
    refreshList(); // we are calling the refreshList function to update the list
}

// the items array is being passed into the function as an argument
// the key it the item that you want to update, in this case its going to be either the description and/or the completed property
// the value it the new value that you want to set it to
function updateItem(item, key, value) {
 item[key] = value; 
 setItems(items); // we are calling the setItems function to update the local storage with the new items array
 refreshList(); // we are calling the refreshList function to update the list
} 


function refreshList() {

    // we want to sort the list, once the task is completed we want to push it to the bottom 
    items.sort((a, b) => {
        if (a.completed) {
            return 1;
        }
        if (b.completed) {
            return -1;
        }

        return a.description < b.description? -1 : 1;
    })




    ITEMS_CONTAINER.innerHTML = ''; // we are emptying the items container

    for (const item of items) {
        const itemElement = ITEM_TEMPLATE.content.cloneNode(true); // we are cloning the template
        const descriptionInput = itemElement.querySelector('.item-description');
        const completedInput = itemElement.querySelector('.item-completed');

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        // check local storage to see if the values are being stored 
        descriptionInput.addEventListener('change', () => {
            updateItem(item, 'description', descriptionInput.value);  // descrition is the argument being passed into the key
        
        completedInput.addEventListener('change', () => {
            updateItem(item, 'completed', completedInput.checked);  // completed is the argument being passed into the key
        });
        });

        ITEMS_CONTAINER.appendChild(itemElement);
    }
}
refreshList(); // we are calling the refreshList function to update the list


// making the add button functionality

ADD_BUTTON.addEventListener('click', () => {
    addItem(); // we are calling the addItem function
});
console.log(items);  