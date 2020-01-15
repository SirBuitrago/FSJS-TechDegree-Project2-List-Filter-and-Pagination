/******************************************
Brian Buitrago
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

"use strict";

//Here I declare global variables to store the DOM elements
const studentList = document.getElementsByClassName("student-item cf");

const pageItems = 10;
const page = Math.ceil(studentList.length / pageItems);

//This function is simply to hide or display a set of 10 students that are suppose to show for each page link. The functions loops through the Student List.
const showPage = (studentList, page) => {
  let startIndex = page * pageItems - pageItems;
  let endIndex = page * pageItems;

  for (let i = 0; i < studentList.length; i += 1) {
    if (i >= startIndex && i <= endIndex) {
      studentList[i].style.display = "block";
    } else {
      studentList[i].style.display = "none";
    }
  }
};

showPage(studentList, 1);

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = studentList => {
  const pageNumber = Math.ceil(studentList.length / pageItems);
  const div = document.createElement("div");
  div.setAttribute("class", "pagination");
  document.body.appendChild(div);
  const ul = document.createElement("ul");
  div.appendChild(ul);
  for (let i = 0; i < pageNumber; i += 1) {
    if (i != pageNumber) {
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
};

appendPageLinks(studentList);

//Dynamic search form, to look for a specific student
const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.setAttribute("class", "searchInput");
searchBar.innerText = "Search for a Student";
document.body.appendChild(searchBar);

//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If its not on par with that grade, then please reject this project for resubmission.
