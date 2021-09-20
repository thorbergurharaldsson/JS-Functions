
// An array for contacts in the contact list
let contacts = [
]

// I call this function when ever I make changes to the contact list to clear the table and display an updated version of the table
modifyTable = () => {

    // TODO
    // Add functionality to clear the table before displaying the updated contactlist

    // I loop through the array using an arr.forEach
    contacts.forEach(person => {
        const table = document.getElementById("contactList"); // find the table
        const newRow = table.insertRow(-1); // instert a new row to the bottom of the list
        let nameCell = newRow.insertCell(0); // Create a cell for the name on the first index of the table row
        let emailCell = newRow.insertCell(1); // Create a cell for the email on the second index of the table row
        let phoneCell = newRow.insertCell(2); // Create a cell for the phone on the third index of the table row
        let companyCell = newRow.insertCell(3); // Create a cell for the company on the forth index of the table row
        let editCell = newRow.insertCell(4); // Create a cell for the edit/delete functions on the fifth index of the table row

        // Insterting each value to the innerHTML of each corresponding cell
        nameCell.innerHTML = person.name
        emailCell.innerHTML = person.email
        phoneCell.innerHTML = person.phone
        companyCell.innerHTML = person.company
        editCell.innerHTML = `<a href="#" onclick="removeContact(this)"><i class="far fa-trash-alt"></i></a>
                              <a href="#" onclick="editContact(this)"><i class="far fa-edit"></i></a>`
    })
}



// A function to add a contact to the contact list
addContact = (name, email, phone = "", company = "") => {
    const exists = contacts.some(person => person.email === email) // Checks if the contact exists, using the email as a uid
    // if the contact does not exist then push the contact to the array
    if (!exists) {
        contacts.push(
            {
                name: name,
                email: email,
                phone: phone,
                company: company
            }
        )
        modifyTable() // Runs the modifyTable() function to edit the contact table in index.html
    } else { // shows an alert and logs to the console if the contact exists
        alert("There is a contact with that email")
        console.log("There is already a contact with that email")
    }
}


removeContact = (row) => {
    const table = document.getElementById("contactList");
    const rowDel = row.parentNode.parentNode.rowIndex;
    table.deleteRow(rowDel)
}
