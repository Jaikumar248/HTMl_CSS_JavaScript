const createCard = (reservationId, bookingFromDate, bookingToDate) => {
    const card = document.createElement("div");
    card.style.width = "250px";
    card.style.height = "300px";
    card.style.margin = "10px";
    card.style.border = "1px solid gray";
    card.style.display = "inline-block";
    card.style.textAlign = "center";
  
    const carImage = document.createElement("img");
    carImage.src = "https://imgd.aeplcdn.com/370x208/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-15.jpeg?isig=0&q=75";
    carImage.style.width = "100%";
    carImage.style.height = "200px";
  
    const reservationIdContainer = document.createElement("div");
    reservationIdContainer.innerHTML = "Reservation ID : " + reservationId;
    const bookingFromDateContainer = document.createElement("div");
    bookingFromDateContainer.innerHTML = "Booking From Date :" + bookingFromDate;
    const bookingToDateContainer = document.createElement("div");
    bookingToDateContainer.innerHTML = "Booking To Date:" + bookingToDate;
  
    card.appendChild(carImage);
    card.appendChild(reservationIdContainer);
    card.appendChild(bookingFromDateContainer);
    card.appendChild(bookingToDateContainer);
  
    cardContainer.appendChild(card);
  };
  
  
  const cardContainer = document.getElementById("cardContainer");
  
  const reservationData = JSON.parse(localStorage.getItem("localData")) || [];
  console.log(reservationData);
  
  reservationData.forEach(data => {
    createCard(data.reservationId, data.bookingFromDate, data.bookingToDate);
    console.log(reservationData)
  });
  
  
  
  