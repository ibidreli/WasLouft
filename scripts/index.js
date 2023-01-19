var locationCheckedCheckboxes = [];
var genreCheckedCheckboxes = [];
var arrayWithAllIds = [];

var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

document.addEventListener("DOMContentLoaded", function () {
   document.getElementById('navbar_top').classList.add('fixed-top');


   xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
         var allConcerts = JSON.parse(this.responseText);

         console.log(allConcerts)

         var beforeDate = ""
         var dateCurrent = new Date();
         var locationArray = [];
         var genreArray = [];
         htmlEntryMobileComplete = ''
         htmlEntryComplete = ''
         var numberOfDate = 0;
         var firstEvent = true
         for (let i = 0; i < allConcerts.length; i++) {
            let specConcert = allConcerts[i];
            var dateEvent = new Date(specConcert.date);
            dateCurrent.setHours(0, 0, 0, 0);
            dateEvent.setHours(0, 0, 0, 0);

            if (dateCurrent <= dateEvent) {
               locationArray.push(specConcert.location_name);
               genreArray.push(specConcert.genre);
               var dateEventConvert = String(dateEvent.getDate()).padStart(2, '0') + "." + String(dateEvent.getMonth() + 1).padStart(2, '0') + "." + dateEvent.getFullYear();
               htmlEntryMobile = ''
               htmlEntry = ''
               if (firstEvent == true) {
                  var dateParts = dateEventConvert.split(".");
                  var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0] + 1);
                  dateObject = dateObject.toISOString().slice(0, 10);
                  document.getElementById("startDate").value = dateObject
                  firstEvent = false
               }

               dateEntry = `<p id="date${numberOfDate}" class="fs-3">${dateEventConvert}</p>`
               arrayWithAllIds.push({
                  "id": "date" + numberOfDate,
                  "date": dateEventConvert
               })

               
               var clubList = ["Bierhübeli", "Circle", "CLub du Theatre", "Dachstock", "ISC", "Karma", "Kapitel", "Le Ciel", "Maia", "Gaskessel"];
               var locationString = `<h4 id="locationText" class="card-subtitle mb-1">${specConcert.location_name.toUpperCase()}</h4>`
               var locationStringMobile = `<h4 class="card-subtitle mb-1">${specConcert.location_name.toUpperCase()}</h4>`
               
               for (let element of clubList) {
                  if(element.toUpperCase()==specConcert.location_name.toUpperCase()){
                     element = element.replace(" ","")
                     locationString = `<a id="link" class="link-light" href="clubs.html?accordion=`+ element +`"><h4 id="locationText" class="card-subtitle mb-1">${specConcert.location_name.toUpperCase()}</h4></a>`
                     locationStringMobile = `<a id="link" class="link-light" href="clubs.html?accordion=`+ element +`"><h4 class="card-subtitle mb-1">${specConcert.location_name.toUpperCase()}</h4></a>`    
                 }
              }


               htmlEntryCom = `
               <div id="card" class="card text-white bg-black mb-3"
               <div class="card-body">
               <div class="d-flex justify-content-between">
               <div class="d-flex justify-content-start">
               <h3 class="card-title">${specConcert.event_name.toUpperCase()}</h3>
               `+ locationString +`
               </div>
               <a target="_blank" rel="noopener noreferrer" href="${specConcert.ticket_link}">
               <span style="font-size: 40px; color: white;">
                  <i class="fa-solid fa-ticket"></i>
               </span>
               </a>
               </div>
               <div class="d-flex justify-content-between">
               <div class="d-flex justify-content-start">
               <h3 class="card-subtitle mb-1">${specConcert.artist.toUpperCase()}</h4>
               <h4 id="locationText2" class="card-subtitle mb-1">${specConcert.genre.toUpperCase()}</h4>
               </div>
               <a target="_blank" rel="noopener noreferrer" href="${specConcert.detail_link}">
               <span style="font-size: 40px; color: white;">
                  <i class="fa-solid fa-circle-info"></i>
               </span>
               </a>    
               </div> 
               </div>
               </div>`

               htmlEntryMobileCom = `
               <div id="card" class="card text-white bg-black mb-3"
               <div class="card-body">
               <h3 class="card-title">${specConcert.event_name.toUpperCase()}</h3>
               `+ locationStringMobile +`
               <h3 class="card-subtitle mb-1">${specConcert.artist.toUpperCase()}</h4> 
   
               
               <h4 class="card-subtitle mb-1">${specConcert.genre.toUpperCase()}</h4>

               <div class="d-flex justify-content-start">
               <a id="infoIcon" target="_blank" rel="noopener noreferrer" href="${specConcert.detail_link}">
               <span style="font-size: 35px; color: white;">
                  <i class="fa-solid fa-circle-info"></i>
               </span>
               </a> 

               <a target="_blank" rel="noopener noreferrer" href="${specConcert.ticket_link}">
               <span style="font-size: 40px; color: white;">
                  <i class="fa-solid fa-ticket"></i>
               </span>
               </a>
               </div>
               

               
               <div class="d-flex justify-content-start">  
               </div>
               </div>
               </div>
               `

               htmlEntry = dateEntry + htmlEntryCom
               htmlEntryMobile = dateEntry + htmlEntryMobileCom

               //document.getElementById("concertsHtml").innerHTML += htmlEntry;
               htmlEntryMobileComplete += htmlEntryMobile;
               htmlEntryComplete += htmlEntry;
               numberOfDate += 1
            }
            beforeDate = dateEventConvert;
         }
         if (document.body.clientWidth < 460) {
            document.getElementById("concertsHtml").innerHTML = htmlEntryMobileComplete;
         }
         else {
            document.getElementById("concertsHtml").innerHTML = htmlEntryComplete;
         }

         window.addEventListener('resize', function (event) {
            if (document.body.clientWidth < 460) {
               document.getElementById("concertsHtml").innerHTML = htmlEntryMobileComplete;
            }
            else {
               document.getElementById("concertsHtml").innerHTML = htmlEntryComplete;
            }

         }, true);

         document.getElementById('link').onclick = function() {
            document.getElementById("Bierhübeli").click()
         };

         document.getElementById("locationModal").innerHTML = "";
         document.getElementById("genreModal").innerHTML = "";

         //Location Filter
         var array = (Array.from(new Set(locationArray)))
         i = 0
         array.forEach((element) => {
            var numOf = locationArray.filter(x => x === element).length;
            htmlEntry = `
            <div id="checkLocation" class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedLocation${i}" checked>
            <label class="form-check-label" for="flexCheckCheckedLocation${i}">(${numOf}) ${element}</label>
            </div>`
            document.getElementById("locationModal").innerHTML += htmlEntry;
            i += 1;
         })

         //Genre Filter
         var array = (Array.from(new Set(genreArray)))
         i = 0
         array.forEach((element) => {
            var numOf = genreArray.filter(x => x === element).length;
            htmlEntry = `
            <div id="checkGenre" class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedGenre${i}" checked>
            <label class="form-check-label" for="flexCheckCheckedGenre${i}">(${numOf}) ${element}</label>
            </div>`
            document.getElementById("genreModal").innerHTML += htmlEntry;
            i += 1;
         })

         // Function to save the checked checkboxes
         function saveCheckedCheckboxes(target) {
            if (target == "Location") {
               locationCheckedCheckboxes = [];
               for (var i = 0; i < locationCheckboxes.length; i++) {

                  // Check if the checkbox is checked
                  if (locationCheckboxes[i].checked) {
                     // Add the value of the checked checkbox to the array
                     locationCheckedCheckboxes.push("True");
                  }
                  else {
                     locationCheckedCheckboxes.push("False");
                  }
               }
            }
            else {
               genreCheckedCheckboxes = [];
               for (var i = 0; i < genreCheckboxes.length; i++) {

                  // Check if the checkbox is checked
                  if (genreCheckboxes[i].checked) {
                     // Add the value of the checked checkbox to the array
                     genreCheckedCheckboxes.push("True");
                  }
                  else {
                     genreCheckedCheckboxes.push("False");
                  }
               }
            }

            // Loop through the checkboxes
         }
         function reupdateCheckedCheckboxes(target) {
            if (target == "Location") {
               for (var i = 0; i < locationCheckboxes.length; i++) {
                  if (locationCheckedCheckboxes[i] == "True") {
                     // Add the value of the checked checkbox to the array
                     locationCheckboxes[i].checked = true;
                  }
                  else {
                     locationCheckboxes[i].checked = false;
                  }
               }
            }
            else {
               for (var i = 0; i < genreCheckboxes.length; i++) {
                  if (genreCheckedCheckboxes[i] == "True") {
                     // Add the value of the checked checkbox to the array
                     genreCheckboxes[i].checked = true;
                  }
                  else {
                     genreCheckboxes[i].checked = false;
                  }
               }
            }
         }

         function filterCheckboxes(target) {
            var filterList = [];

            for (var i = 0; i < genreCheckboxes.length; i++) {
               if (genreCheckboxes[i].checked == "") {
                  var labelGenre = document.querySelector('label[for="flexCheckCheckedGenre' + String(i) + '"]');
                  var labelGenreSplit = labelGenre.innerHTML.split(' ');

                  filterList.push(labelGenreSplit[1]);
               }
            }
            for (var i = 0; i < locationCheckboxes.length; i++) {
               if (locationCheckboxes[i].checked == "") {
                  var labelLocation = document.querySelector('label[for="flexCheckCheckedLocation' + String(i) + '"]');
                  var labelLocationSplit = labelLocation.innerHTML.split(' ');

                  filterList.push(labelLocationSplit[1]);

               }
            }

            const cards = document.querySelectorAll('.card'); // select all the cards

            var i = 0
            cards.forEach(card => {
               let dateVar = document.getElementById("date" + String(i))
               let cardText = card.textContent.toLowerCase(); // get the text content of the card and convert it to lowercase
               let shouldHide = false; // flag to determine whether the card should be hidden or no


               // loop through the filter words
               for (let i = 0; i < filterList.length; i++) {
                  if (cardText.includes(filterList[i].toLowerCase())) { // check if the card text includes the filter word
                     shouldHide = true; // if it does, set the flag to true
                     break; // no need to check the other filter words
                  }
               }
               if (shouldHide) { // if the flag is true, hide the card
                  card.style.display = 'none';
                  dateVar.style.display = 'none';
               } else { // if the flag is false, show the card
                  card.style.display = 'block';
                  dateVar.style.display = 'block';
               }
               i += 1
            });

         }




         // Attach the saveCheckedCheckboxes function to the modal's "Save" button
         var openButtonLocation = document.getElementById("location_open")
         openButtonLocation.addEventListener('click', function () {
            saveCheckedCheckboxes("Location");
         });

         var saveButtonLocation = document.getElementById("location_save")
         saveButtonLocation.addEventListener('click', function () {
            saveCheckedCheckboxes("Location");
            filterCheckboxes("Location")

            $('#locationsModal').modal('toggle');
         });

         var closeButtonLocation = document.getElementById("location_close")
         closeButtonLocation.addEventListener('click', function () {
            reupdateCheckedCheckboxes("Location");
         });

         var backButton = document.getElementById("backButton")
         backButton.addEventListener('click', function () {
            var liveDate = document.getElementById("startDate").value
            var dateParts = liveDate.split("-");
            var dateString = dateParts[2] + "." + dateParts[1] + "." + dateParts[0]
            let obj = arrayWithAllIds.find(o => o.date === dateString);
            var date = obj.date
            var number = parseInt(obj.id.replace('date', ''))
            var notFound = true
            while (number >= 1 && notFound) {
               number -= 1
               if (document.getElementById("date" + number).innerHTML != date) {
                  notFound = false
                  var access = document.getElementById("date" + number);
                  const yOffset = -130;
                  const y = access.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
               }
            }
         });

         var frontButton = document.getElementById("frontButton")
         frontButton.addEventListener('click', function () {
            var liveDateFront = document.getElementById("startDate").value
            var datePartsFront = liveDateFront.split("-");
            var dateStringFront = datePartsFront[2] + "." + datePartsFront[1] + "." + datePartsFront[0]
            let objFront = arrayWithAllIds.find(o => o.date === dateStringFront);
            var dateFront = objFront.date
            var numberFront = parseInt(objFront.id.replace('date', ''))
            var notFoundFront = true
            while (numberFront <= arrayWithAllIds.length - 2 && notFoundFront) {
               numberFront += 1
               if (document.getElementById("date" + numberFront).innerHTML != dateFront) {
                  notFoundFront = false
                  var access = document.getElementById("date" + numberFront);
                  const yOffset = -130;
                  const yFront = access.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: yFront, behavior: 'smooth' });
               }
            }
         });


         var saveButtonCalendar = document.getElementById("calendar_genre")
         saveButtonCalendar.addEventListener('click', function () {
            var liveDate = document.getElementById("startDate").value
            var eventIsFound = false

            do {
               var dateParts = liveDate.split("-");
               var dateString = dateParts[2] + "." + dateParts[1] + "." + dateParts[0]
               let obj = arrayWithAllIds.find(o => o.date === dateString);
               try {
                  var date = obj.date
               } catch (error) {
               }
               if (date == dateString) {
                  eventIsFound = true
                  var number = 0
                  notFound = true
                  do {
                     if (document.getElementById("date" + number).innerHTML == date) {
                        notFound = false
                        var access = document.getElementById("date" + number);
                        const yOffset = -130;
                        const yFront = access.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: yFront, behavior: 'smooth' });
                     }
                     number += 1
                  } while (notFound == true);
               }
               else {
                  var dateType = new Date(liveDate)
                  dateType.setDate(dateType.getDate() + 1);
                  liveDate = dateType.toISOString().slice(0, 10);
               }
            } while (eventIsFound == false);
            $('#calandersModal').modal('toggle');
         });

         // Get the modal element
         var locationModal = document.getElementById('locationModal');

         // Get the checkboxes in the modal
         var locationCheckboxes = locationModal.querySelectorAll('input[type="checkbox"]');

         // Attach the saveCheckedCheckboxes function to the modal's "Save" button
         var openButtonGenre = document.getElementById("genre_open")
         openButtonGenre.addEventListener('click', function () {
            saveCheckedCheckboxes("Genre");
         });

         var saveButtonGenre = document.getElementById("genre_save")
         saveButtonGenre.addEventListener('click', function () {
            saveCheckedCheckboxes("Location");
            filterCheckboxes("Genre")

            $('#genresModal').modal('toggle');
         });

         var closeButtonGenre = document.getElementById("genre_close")
         closeButtonGenre.addEventListener('click', function () {
            reupdateCheckedCheckboxes("Genre");
         });

         // Get the modal element
         var genreModal = document.getElementById('genreModal');

         // Get the checkboxes in the modal
         var genreCheckboxes = genreModal.querySelectorAll('input[type="checkbox"]');
      }
   });

   xhr.open("GET", "https://concerts-3b74.restdb.io/rest/concerts?q={}");
   xhr.setRequestHeader("content-type", "application/json");
   xhr.setRequestHeader("x-apikey", "63583915626b9c747864aef9");
   xhr.setRequestHeader("cache-control", "no-cache");

   xhr.send(data);

   window.addEventListener('scroll', function () {
      if (document.getElementById('rtlNav').className !== 'activeClass') {
         if (window.scrollY > 2) {
            document.getElementById('navbar_top').classList.add('fixed-top');
            var addNew = true;
            arrayWithAllIds.forEach(function (item) {
               var element = document.getElementById(item.id);
               var position = element.getBoundingClientRect();

               // checking whether fully visible
               if (position.top - 126 >= 0 && position.bottom <= window.innerHeight && addNew) {
                  var dateParts = item.date.split(".");

                  var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0] + 1);

                  dateObject = dateObject.toISOString().slice(0, 10);

                  document.getElementById("startDate").value = dateObject
                  addNew = false;
               }
            });
         }
      }
   });
});