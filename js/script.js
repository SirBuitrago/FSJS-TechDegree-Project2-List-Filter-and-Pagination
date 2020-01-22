/******************************************
Brian Buitrago
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

"use strict";

//Here I declare global variables to store the DOM elements
const studentList = document.getElementsByClassName("student-item");
//This is variable stores how many students I want to show on each page
const pageItems = 10;

//I create a search form and button dynamically

const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.setAttribute("class", "searchInput");
searchBar.placeholder = "Search Students...";

const searchButton = document.createElement("button");
searchButton.type = "button";
searchButton.setAttribute("class", "searchBtn");
searchButton.innerHTML = "Search";

//I append the search form and search button to the HTML document

const divHeader = document.querySelector(".page-header");
divHeader.appendChild(searchButton);
divHeader.appendChild(searchBar);

//I build a function for the Search Form, in order to filter the students by letters or keywords
const searchResults = [];
const names = document.querySelectorAll(".student-details > h3");

const search = () => {
  const term = event.target.value.toLowerCase();
  searchResults.length = 0;
  Array.from(studentList).forEach(function(studentList) {
    const name = studentList.firstElementChild.textContent;
    for (let i = 0; i <= name.length; i++) {
      if (name.toLowerCase().indexOf(term) != -1) {
        studentList.style.display = "block";
        searchResults.push(i);
      } else {
        studentList.style.display = "none";
        searchResults.push(i);
      }
    }
  });
};

//This function is simply to hide or display a set of 10 students that are suppose to show for each page link. The functions loops through the Student List.
const showPage = (studentList, page) => {
  let startIndex = page * pageItems - pageItems;
  let endIndex = page * pageItems;

  for (let i = 0; i < studentList.length; i++) {
    if (i >= startIndex && i < endIndex) {
      studentList[i].style.display = "block";
    } else {
      studentList[i].style.display = "none";
    }
  }
};

//Call on the ShowPage Function with the necessary parameters
showPage(studentList, 1);

//The appendPageLinks function is to generate, append, and add functionality to the pagination buttons-by creating the necessary divs, ul and li elements to store the links

const pageDiv = document.querySelector(".page");

const appendPageLinks = studentList => {
  const pageLength = Math.ceil(studentList.length / pageItems);
  const paginationDiv = document.createElement("div");
  paginationDiv.className = "pagination";
  pageDiv.appendChild(paginationDiv);
  const ul = document.createElement("ul");
  paginationDiv.appendChild(ul);
  for (let i = 0; i < pageLength; i++) {
    if (i != pageLength) {
      let li = document.createElement("li");
      ul.appendChild(li);
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = i + 1;
      if (i === 0) {
        a.setAttribute("class", "active");
      }
      li.appendChild(a);
    }
  }

  //Click event listener to loop through all the page links and bring up the associated number of students for the active page number

  const clicked = document.querySelectorAll("a");

  for (let i = 0; i < clicked.length; i++) {
    clicked[i].addEventListener("click", event => {
      const prevPage = document.querySelector(".active");
      prevPage.className = "";

      const newPage = event.target;
      newPage.className = "active";

      const pageNumber = newPage.textContent;
      showPage(studentList, pageNumber);
    });
  }
};

//Call on the appendPageLinks function with the studentList variable as the parameter
appendPageLinks(studentList);

//I invoke my search function with the keyup event listner
searchBar.addEventListener("keyup", () => {
  search();
});

//Added an event listener to my search button
searchButton.addEventListener("click", () => {
  //search();
  console.log("This button is functional");
});

//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If its not on par with that grade, then please reject this project for resubmission.
