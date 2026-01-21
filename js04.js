"use strict";
/*    JavaScript 7th Edition
      Chapter 4
      Chapter case

      Tuba Farm Equipment
      Variables and functions
      Author: Alexander Frieders
      Date:   1/21/2026

      Filename: js04_fixed.js
 */


/* global variables tracking status of each form section */
let acresComplete = true;
let cropsComplete = true;
let monthsComplete = true;
let fuelComplete = true;

/* global variables referencing sidebar h2 and p elements */
let messageHeadElement = document.getElementById("messageHead");
let messageElement = document.getElementById("message");

/* global variables referencing fieldset elements */
let acresFieldset = document.getElementsByTagName("fieldset")[0];
let cropsFieldset = document.getElementsByTagName("fieldset")[1];
let monthsFieldset  = document.getElementsByTagName("fieldset")[2];
let fuelFieldset = document.getElementsByTagName("fieldset")[3];

/* global variables referencing text input elements */
let monthsBox = document.forms[0].months;
let acresBox = document.forms[0].acres;

/* Tractor Model Descriptions */
let E3250Desc = "A workhorse for a small farm or a big backyard. A medium- to heavy-duty tractor that can haul whatever you throw at it year-round.";
let E2600Desc = "Perfect for a small farm, or just a big backyard. A light- to medium-duty tractor that can make short work of most any chore.";
let W1205Desc = "Can't be beat for the general tasks of a large farm. Medium- to heavy-duty muscle that's there then you need it.";
let W2500Desc = "Our heavy-duty tractor designed especially for the needs of wheat, corn, and soy farmers. A reliable piece of equipment that you can turn to all year long.";
let W2550Desc = "Our heavy-duty tractor for general use. A reliable piece of equipment that you can turn to all year long.";

/* create event listeners when page finishes loading */
window.addEventListener("load", createEventListeners);

/* create event listeners for all input elements */
function createEventListeners() {   
   acresBox.value = ""; // clear acres text box on page load
   monthsBox.value = ""; // clear months text box on page load

   acresBox.addEventListener("input", verifyAcres); 
   
   let cropsBox;
   for (let i = 0; i < 7; i++) {
      cropsBox = cropsFieldset.getElementsByTagName("input")[i];
      cropsBox.checked = false;      
      cropsBox.addEventListener("click", verifyCrops); 
   }
   
   monthsBox.addEventListener("input", verifyMonths); 

   let fuelBox;
   for (let i = 0; i < 3; i++) {
      fuelBox = fuelFieldset.getElementsByTagName("input")[i];     
      fuelBox.addEventListener("click", verifyFuel); 
   }
}



/* verify acres text box entry is a positive number */
function verifyAcres() {
   let acres = parseFloat(acresBox.value);
   if (!isNaN(acres) && acres > 0) {
      acresComplete = true;
      messageElement.innerHTML = "";
   } else {
      acresComplete = false;
      messageElement.innerHTML = "Enter a positive acreage";
      messageHeadElement.innerHTML = "";
   }
   testFormCompleteness();
}

/* verify at least one crops checkbox is checked */
function verifyCrops() {
   let cropInputs = cropsFieldset.getElementsByTagName("input");
   cropsComplete = false;
   for (let i = 0; i < cropInputs.length; i++) {
      if (cropInputs[i].checked) {
         cropsComplete = true;
         break;
      }
   }
   testFormCompleteness();
}

/* verify months text box entry is between 1 and 12 */
function verifyMonths() {
   let months = parseInt(monthsBox.value, 10);
   if (!isNaN(months) && months >= 1 && months <= 12) {
      monthsComplete = true;
      messageElement.innerHTML = "";
   } else {
      monthsComplete = false;
      messageElement.innerHTML = "Enter months between 1 and 12";
      messageHeadElement.innerHTML = "";
   }
   testFormCompleteness();
}

/* verify that a fuel option button is selected */
function verifyFuel() {
   let fuelInputs = fuelFieldset.getElementsByTagName("input");
   fuelComplete = false;
   for (let i = 0; i < fuelInputs.length; i++) {
      if (fuelInputs[i].checked) {
         fuelComplete = true;
         break;
      }
   }
   testFormCompleteness();
}

/* check if all four form sections are completed */
function testFormCompleteness() {
   if (acresComplete && cropsComplete && monthsComplete && fuelComplete) {
      createRecommendation();
   }
}

/* generate tractor recommendation based on user selections */
function createRecommendation() {
   let acres = parseFloat(acresBox.value);
   let months = parseInt(monthsBox.value, 10);
   if (isNaN(acres)) acres = 0;
   if (isNaN(months)) months = 0;

   if (acres <= 5000) { // 5000 acres or less, no crop test needed
      if (months >= 10) { // 10+ months of farming per year
         messageHeadElement.innerHTML = "E3250";
         messageElement.innerHTML = E3250Desc;      
      } else { // 9 or fewer months per year
         messageHeadElement.innerHTML = "E2600";
         messageElement.innerHTML = E2600Desc;           
      }
   } else { // more than 5000 acres
      if (months <= 9) { // 9 or fewer months per year, no crop test needed
         messageHeadElement.innerHTML = "W1205";
         messageElement.innerHTML = W1205Desc;
      } else { // 10+ months of farming per year
         if (document.getElementById("wheat").checked || document.getElementById("corn").checked || document.getElementById("soy").checked) {
            messageHeadElement.innerHTML = "W2500";
            messageElement.innerHTML = W2500Desc;
         } else {
            messageHeadElement.innerHTML = "W2550";
            messageElement.innerHTML = W2550Desc;
         }
      }
   }
   
   if (document.getElementById("E85").checked) { // add suffix to model name based on fuel choice
      messageHeadElement.innerHTML += "E";
   } else if (document.getElementById("biodiesel").checked) {
      messageHeadElement.innerHTML += "B";
   } else if (document.getElementById("diesel").checked) {
      messageHeadElement.innerHTML += "D";  
   }
}
