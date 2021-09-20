

let contacts = [
]


modifyTable = () => {
    contacts.forEach(person => {



        if (contacts.includes(person.email)) {
            console.log(person.email)
        }
        const table = document.getElementById("contactList");
        const newRow = table.insertRow(-1);
        let nameCell = newRow.insertCell(0);
        let emailCell = newRow.insertCell(1);
        let phoneCell = newRow.insertCell(2);
        let companyCell = newRow.insertCell(3);
        let editCell = newRow.insertCell(4);

        nameCell.innerHTML = person.name
        emailCell.innerHTML = person.email
        phoneCell.innerHTML = person.phone
        companyCell.innerHTML = person.company
        editCell.innerHTML = `<a href="#" onclick="removeContact(this)"><i class="far fa-trash-alt"></i></a>`
    })
    console.log(contacts)
}




addContact = (name, email, phone = "", company = "") => {
    const exists = contacts.some(person => person.email === email)
    if (!exists) {
        contacts.push(
            {
                name: name,
                email: email,
                phone: phone,
                company: company
            }
        )
        modifyTable()
    } else {
        alert("There is a contact with that email")
        console.log("There is already a contact with that email")
    }
}


removeContact = (row) => {
    const table = document.getElementById("contactList");
    const rowDel = row.parentNode.parentNode.rowIndex;
    table.deleteRow(rowDel)
}
