const reservationForm = document.querySelector("#reservationForm");
const returnDateContainer = document.querySelector("#returnDateContainer");
const isReturnRadioYes = document.querySelector("#isReturnYes");
const isReturnRadioNo = document.querySelector("#isReturnNo");
const reservationsTableBody = document.querySelector("#reservationsTableBody");
const searchBody = document.querySelector("#search");
const searchButton = document.querySelector("#searchButton");
const returnDatecon = document.querySelector("#returnDatecon");
let noData = document.querySelector("#noData");
noData.style.display = "none";



var reservations = JSON.parse(localStorage.getItem("localData")) || [];

renderReservations();

isReturnRadioYes.addEventListener("change", () => {
  if (isReturnRadioYes.checked) {
    returnDateContainer.style.display = "block";
    returnDatecon.style.display = "block";

  } 
});
isReturnRadioNo.addEventListener("change", () => {
  if(isReturnRadioNo.checked){
    returnDateContainer.style.display = "none";
    returnDatecon.style.display = "none";
  }
})

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const reservationId = document.querySelector("#reservationId").value;
  const carName = document.querySelector("#carName").value;
  const carId = document.querySelector("#carId").value;
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  let bookingFromDate = document.querySelector("#bookingFromDate").value;
  let bookingToDate = document.querySelector("#bookingtoDate").value;
  const source = document.querySelector("#source").value;
  const destination = document.querySelector("#destination").value;
  const isReturn = document.querySelector("#isReturnYes").checked;
  const isChildPassenger = document.querySelector("#isChildPassenger").checked;
  let returnDate = null;
  if (isReturn) {
    returnDate = document.querySelector("#returnDate").value;
  }

  // Check if reservation ID is unique
  reservations.forEach((reservation) => {
    if (reservation.reservationId === reservationId) {
        reservationForm.reset()
        alert("Reservation ID must be unique. Please enter a different ID.");
        reservationForm.removeEventListener();
    }
  });

  // Check if all required fields are filled
  // validations 
  if (!reservationId || !carName || !source || !destination || !bookingFromDate || !bookingToDate || !carId || !firstName || !lastName) {
    if (!reservationId) {
      document.getElementById("reservationId").style.borderColor = "red";
    }
    if (!carName) {
      document.getElementById("carName").style.borderColor = "red";
    }
  
   
    if (!bookingFromDate) {
       document.getElementById("bookingFromDate").style.borderColor = "red";
    }
    if (!bookingToDate) {
      document.getElementById("bookingToDate").style.borderColor = "red";
    }
    if (!carId) {
      document.getElementById("carId").style.borderColor = "red";
    }
    if (!firstName) {
      document.getElementById("firstName").style.borderColor = "red";
    }
    if (!lastName) {
      document.getElementById("lastName").style.borderColor = "red";
    }
   

    alert("All fields except Return Date are mandatory. Please fill in the missing fields.");
    return;
  }
  

  // Remove red border from fields
  document.getElementById("reservationId").style.border.Color = "";
  document.getElementById("carName").style.border.Color = "";
  document.getElementById("carId").style.border.Color = "";
  document.getElementById("firstName").style.border.Color = "";
  document.getElementById("lastName").style.border.Color = "";
 


  const reservation = {
    reservationId,
    carName,
    carId,
    firstName,
    lastName,
    bookingFromDate,
    bookingToDate,
    source,
    destination,
    isReturn,
    returnDate,
    isChildPassenger
    
  };
 
  // console.log(reservations);
  reservations.push(reservation);
  localStorage.setItem("localData", JSON.stringify(reservations));
  renderReservations();
  document.getElementById("reservationForm").style.display = "none";
  reservationForm.reset();
  document.getElementById("searchButton").disabled = false;
  document.getElementById("searchButton").style.opacity = 1.0;
  
});

function renderReservations(searchData) {
  let rows = "";


  if(searchData === undefined){
    reservations.forEach((reservation, index) => {
    
        rows += `
        <tr>
            <td>${reservation.reservationId}</td>
            <td>${reservation.carName}</td>
            <td>${reservation.carId}</td>
            <td>${reservation.firstName}</td>
            <td>${reservation.lastName}</td>
            <td>${reservation.bookingFromDate}</td>
            <td>${reservation.bookingToDate}</td>
            <td>${reservation.source}</td>
            <td>${reservation.destination}</td>
            <td>${reservation.returnDate || "-"}</td>
            <td>${reservation.isChildPassenger}</td>
            <td>
            <button class="editButton" onclick="editReservation(${index})">Edit</button>
            <button class="deleteButton" onclick="deleteReservation(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
  }
  else {

    // console.log("REACHED")

    reservations.forEach((reservation, index) => {
        console.log(reservation);
        if ((reservation.reservationId).includes(searchData) || (reservation.carName).includes(searchData) || (reservation.firstName).includes(searchData)) {
            rows += `
            <tr>
                <td>${reservation.reservationId}</td>
                <td>${reservation.carName}</td>
                <td>${reservation.carId}</td>
                <td>${reservation.firstName}</td>
                <td>${reservation.lastName}</td>
                <td>${reservation.bookingFromDate}</td>
                <td>${reservation.bookingToDate}</td>
                <td>${reservation.source}</td>
                <td>${reservation.destination}</td>
                <td>${reservation.returnDate || "-"}</td>
                <td>${reservation.isChildPassenger}</td>
                <td>
                <button id="edit" onclick="editReservation(${index})">Edit</button>
                <button id="del" onclick="deleteReservation(${index})">Delete</button>
                </td>
            </tr>
            `;
        }
        else {
          document.getElementById("seachingReservations").innerHTML = "NO Data Found";
        }
    });
    
  }
  reservationsTableBody.innerHTML = rows;
  if(reservations.length === 0) {
    noData.style.display = "block";
  }
  else {
    noData.style.display ="none";
  }
}

function editReservation(index) {
    
    document.getElementById("addResHeading").innerHTML = "Updating Reservation";
    
    const reservation = reservations[index];
    

    document.querySelector("#reservationId").value = reservation.reservationId;
    document.querySelector("#carName").value = reservation.carName;
    document.querySelector("#carId").value = reservation.carId
    document.querySelector("#firstName").value = reservation.firstName
    document.querySelector("#lastName").value = reservation.lastName
    document.querySelector("#bookingFromDate").value = reservation.bookingFromDate
    document.querySelector("#bookingtoDate").value = reservation.bookingToDate
    document.querySelector("#source").value = reservation.source;
    document.querySelector("#destination").value = reservation.destination;
    document.querySelector("#isReturnYes").checked = reservation.isReturn;
    document.querySelector("#returnDateContainer").value = reservation.returnDateContainer;
    document.querySelector("#returnDatecon").value = reservation.returnDatecon;
    
    document.querySelector("#isChildPassenger").checked = reservation.isChildPassenger;
    if (reservation.isReturn) {
      returnDateContainer.style.display = "block";
      returnDatecon.style.display = "block";
      document.querySelector("#returnDate").value = reservation.returnDate;
    }
     else {
      returnDateContainer.style.display = "none";
    }
    
    
   
    reservations.splice(index, 1);
    showForm();
  }
  
  function deleteReservation(index) {
    alert("Are you want to Delete...")
    reservations.splice(index, 1);
    localStorage.setItem("localData", JSON.stringify(reservations));
    
    renderReservations();
  }

  function showForm() {
    document.getElementById("reservationForm").style.display = "inline-block";
    document.getElementById("addResHeading").style.display = "block";
    disableButton();
    disableSearchButton();
    
  }

  function disableButton() {
    for (let i=0;i<document.getElementsByClassName("deleteButton").length;i++){
      document.getElementsByClassName("editButton")[i].disabled = true;
      document.getElementsByClassName("deleteButton")[i].disabled = true;
      document.getElementsByClassName("deleteButton")[i].style.opacity = 0.3;
      document.getElementsByClassName("editButton")[i].style.opacity = 0.3;
    } 
  }
  function enableButton() {
    for (let i=0;i<document.getElementsByClassName("deleteButton").length;i++){
      document.getElementsByClassName("editButton")[i].disabled = false;
      document.getElementsByClassName("deleteButton")[i].disabled = false;
      document.getElementsByClassName("deleteButton")[i].style.opacity = 1.0;
      document.getElementsByClassName("editButton")[i].style.opacity = 1.0;
    } 
  }
  function disableSearchButton() {
    document.getElementById("searchButton").disabled = true;
    document.getElementById("searchButton").style.opacity = 0.3;
  }
  function enableSearchButton() {
    document.getElementById("searchButton").disabled = false;
    document.getElementById("searchButton").style.opacity = 1.0;
  }
  function closeForm() {
    document.getElementById("reservationForm").style.display = "none";

    enableButton();
    enableSearchButton();
  }

  function searchButtonClicked() {
    renderReservations(searchBody.value);

  }