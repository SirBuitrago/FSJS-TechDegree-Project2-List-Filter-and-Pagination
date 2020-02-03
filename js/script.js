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

//Search form
const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.setAttribute("class", "searchInput");
const searchPlaceHolder = (searchBar.placeholder = "Search Students...");

//Search button
const searchButton = document.createElement("button");
searchButton.type = "button";
searchButton.setAttribute("class", "searchBtn");
searchButton.innerHTML = "Search";

//I append the search form and search button to the HTML document

const divHeader = document.querySelector(".page-header");
divHeader.appendChild(searchButton);
divHeader.appendChild(searchBar);

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

//The appendPageLinks function is to generate, append, and add functionality to the pagination buttons-by creating the necessary divs, ul and li elements to store the links, for the student list

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

//I build a function for the Search Form, in order to filter the students by letters or keywords

let noResults = document.querySelector(".noResults");
const searchResults = [];
const studentNames = document.querySelectorAll(".student-details > h3");
const searchValue = document.querySelector("input").value.toLowerCase();
const studentListParent = document.querySelector(".student-list");
const page = document.querySelector(".page");

const search = searchValue => {
  const term = event.target.value.toLowerCase();
  Array.from(studentList).forEach(function(studentNames) {
    const name = studentNames.firstElementChild.textContent;
    if (!term) {
      showPage(studentList, 1);
    } else {
      for (let i = 0; i < name.length; i++) {
        studentNames.style.display = "none";
        if (name.toLowerCase().indexOf(term) != -1) {
          studentNames.style.display = "block";
        }
      }
    }
  });
};

//I invoke my search function with the keyup event listner
searchBar.addEventListener("keyup", e => {
  search(searchValue);
});

//Added a click event listener to my search button
searchButton.addEventListener("click", e => {
  search(searchValue);
  console.log("This button is functional");
});

//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If its not on par with that grade, then please reject this project for resubmission.
