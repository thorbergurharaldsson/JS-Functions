// An array for contacts in the contact list
let contacts = [
  {
    name: "Þorbergur Haraldsson",
    email: "tobbergur@gmail.com",
    phone: "7736688",
    company: "Snerpa ehf",
  },
];

// I call this function when ever I make changes to the contact list to clear the table and display an updated version of the table
modifyTable = () => {
  const table = document.getElementById("contactList"); // find the table

  // Clears the table before adding the updated value
  while (table.rows.length > 1) table.rows[1].remove();

  // I loop through the array using an arr.forEach
  contacts.forEach((person) => {
    //Checks if contact exists using email as uid
    const exists = contacts.some((person) => person.email === email);
    // If the contact does not exist then add it to the table
    if (!exists) {
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
      editCell.innerHTML = `<a href="#" onclick="removeContact(this)"><i class="far fa-trash-alt"></i></a>
                              <a href="#" onclick="openModal()"><i class="far fa-edit"></i></a>`;
    }
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

  contacts = contacts.filter((person) => person.email !== personEmail); // filtering the selected personEmail from the array

  modifyTable();
};

editContact = (editBtn) => {
  const row = editBtn.parentNode.parentNode;
  const cells = row.getElementsByTagName("td");

  const nameValue = cells[0].innerText;
  const emailValue = cells[1].innerText;
  const phoneValue = cells[2].innerText;
  const companyValue = cells[3].innerText;

  modifyTable();
};

const modal = document.querySelector(".modal-container");
const closeButton = document.getElementById("close");
const modalTriggers = document.querySelectorAll("[data-trigger]");

openModal = () => {
  modal.classList.add("is-open");
};
closeModal = () => {
  modal.classList.remove("is-open");
};
modalTriggers.forEach(function (item) {
  item.addEventListener("click", openModal);
});

closeButton.addEventListener("click", closeModal);
