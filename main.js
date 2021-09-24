// An array for contacts in the contact list
let contacts = [
  {
    "name": "Whitney Nuschke",
    "email": "wnuschke0@weather.com",
    "phone": "165-273-9756",
    "company": "Waelchi LLC"
  }, {
    "name": "Carine Heinl",
    "email": "cheinl1@examiner.com",
    "phone": "563-840-0935",
    "company": "Hills, Renner and Kreiger"
  }, {
    "name": "Alvie Everson",
    "email": "aeverson2@woothemes.com",
    "phone": "185-995-2022",
    "company": "Prohaska and Sons"
  }, {
    "name": "Minnnie Worham",
    "email": "mworham3@a8.net",
    "phone": "173-959-0461",
    "company": "Larkin, Mertz and Heller"
  }, {
    "name": "Maurie Ivison",
    "email": "mivison4@umn.edu",
    "phone": "917-951-7515",
    "company": "Leuschke Inc"
  }
];

// I call this function when ever I make changes to the contact list to clear the table and display an updated version of the table
modifyTable = () => {
  const table = document.getElementById("contactList"); // find the table

  // Clears the table before adding the updated array
  while (table.rows.length > 1) table.rows[1].remove();

  // I loop through the array using an array.forEach to add each contact as a row in the html table
  contacts.forEach((person) => {
    const table = document.getElementById("contactList"); // find the table
    const newRow = table.insertRow(-1); // instert a new row to the bottom of the list
    let nameCell = newRow.insertCell(0); // Create a cell for the name on the first index of the table row
    let emailCell = newRow.insertCell(1); // Create a cell for the email on the second index of the table row
    let phoneCell = newRow.insertCell(2); // Create a cell for the phone on the third index of the table row
    let companyCell = newRow.insertCell(3); // Create a cell for the company on the forth index of the table row
    let editCell = newRow.insertCell(4); // Create a cell for the edit/delete functions on the fifth index of the table row

    // Insterting each value to the innerHTML of each corresponding cell
    nameCell.innerHTML = person.name;
    emailCell.innerHTML = person.email;
    phoneCell.innerHTML = person.phone;
    companyCell.innerHTML = person.company;
      // adds two buttons for delete/edit - These buttons call functions removeContact() and openModal()
    editCell.innerHTML = `<a href="#" onclick="removeContact(this)"><i class="far fa-trash-alt"></i></a>
                            <a href="#" onclick="openModal(this)"><i class="far fa-edit"></i></a>`;
  });
};

// A function to add a contact to the contact list
addContact = (name, email, phone = "", company = "") => {
  //Check if name and email are empty or undifined
  if (name == "" || name == undefined || email == "" || email == undefined) {
    console.log("Name and email are required");
    alert("Name and email are required");
    return;
  }
  // Checks if the contact exists, using the email as a uid
  const exists = contacts.some((person) => person.email === email);

  // if the contact does not exist then push the contact to the array
  if (!exists) {
    contacts.push({
      name: name,
      email: email,
      phone: phone,
      company: company,
    });
    modifyTable(); // Runs the modifyTable() function to edit the contact table in index.html
  } else {
    // shows an alert and logs to the console if the contact exists
    alert("There is a contact with that email");
    console.log("There is already a contact with that email");
  }
};

// A function to remove contact from the contact list
removeContact = (btnClicked) => {
  const row = btnClicked.parentNode.parentNode; //btnClicked returns the innerHTML for the <a> tag, using .parentNode to get next element up, td than tr
  const cells = row.getElementsByTagName("td"); // Getting all the cells in the row
  const personEmail = cells[1].innerText; // Assigning the value of the second cell to const personEmail

  contacts = contacts.filter((person) => person.email !== personEmail); // filtering the selected personEmail out of the array

  modifyTable(); // Runs the modifyTable() function to edit the contact table in index.html
};

// Closes/hides the modal by removing the class is-open from it
closeModal = () => {
  //Gets the modal container and assigns it to const modal
  const modal = document.querySelector(".modal-container");
  
  modal.classList.remove("is-open");
};

// Opens a modal with a form for editing a contact in the selected line
openModal = (editBtn) => {

  //Gets the modal container and assigns it to const modal
  const modal = document.querySelector(".modal-container");

  // Adds css class is-open to show the modal
  modal.classList.add("is-open");

  // Get the selected row
  const row = editBtn.parentNode.parentNode;
  const cells = row.getElementsByTagName("td"); // get all the cells from the row

  // Get the values from each cell
  const nameValue = cells[0].innerText;
  const emailValue = cells[1].innerText;
  const phoneValue = cells[2].innerText;
  const companyValue = cells[3].innerText;

  // inserts html for the form in the modal with the values for the selected user predefined in the input fields
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Edit contact</h2>
      <form class="contactForm">
        <label for="editName">Name: </label><br />
        <input type="text" id="editName" name="editName" value="${nameValue}"/><br />
        <label for="editEmail">Email: </label><br />
        <input type="email" id="editEmail" name="editEmail" value="${emailValue}" /><br />
        <label for="editPhone">Phone: </label><br />
        <input type="tel" id="editPhone" name="editPhone" value="${phoneValue}"/><br />
        <label for="editCompany">Company: </label><br />
        <input type="text" id="editCompany" name="editCompany" value="${companyValue}"/><br /><br />
        ${ /* The submit button uses editContact(), it takes in the value of current email to search for in the array in case the email is changed */'' }
        ${ /* Also takes in all the values in the input fields, it then runs closeModal() to close the modal after submitting the change */'' }
        <button
          type="button"
          onclick="editContact('${emailValue}',document.getElementById('editName').value,document.getElementById('editEmail').value,document.getElementById('editPhone').value,document.getElementById('editCompany').value), closeModal()"
        >
          Edit Contact</button
        ><br /><br />
      </form>

      <button id="close" onclick="closeModal()">Close</button>
    </div>`
};

// Takes in contact current email to use to search the array for the user, it then takes in each value to edit
editContact = (currentEmailasUID, name, email, phone, company) => {

  // Finds the contact in the array contacts
  contacts.find((person) => {
    // Edit the matching contact
    if (person.email === currentEmailasUID) {
      // checks if value is not undefined then assign the value to the contacts value
      if (name != undefined) { person.name = name }
      if (email != undefined) { person.email = email }
      if (phone != undefined) { person.phone = phone }
      if (company != undefined) { person.company = company }
    }
  });

  modifyTable(); // Runs the modifyTable() function to edit the contact table in index.html
}