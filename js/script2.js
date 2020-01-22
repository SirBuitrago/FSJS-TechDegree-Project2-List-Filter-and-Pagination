const page = document.querySelector(".page");
const pageHeader = document.querySelector(".page-header");
const names = document.querySelectorAll(".student-details > h3");
const studentListParent = document.querySelector(".student-list");
const studentList = studentListParent.children;
const itemsPerPage = 10;
const startPage = 1;

/*
 * Takes a HTML element tagname as a parameter,
 * and will create and return that element.
 */
const createElement = elem => {
  const element = document.createElement(elem);
  return element;
};

/*
 * creates a search bar element,
 * added ability to filter student names.
 */
const addSearch = () => {
  const searchDiv = createElement("div");
  searchDiv.className = "student-search";

  const searchInput = createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search for students...";

  const searchBtn = createElement("button");
  searchBtn.textContent = "Search";

  pageHeader.appendChild(searchDiv);
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchBtn);
};

/*
 * Create the `showPage` function to hide all of the items in the
 * list except for the ten you want to show.
 */
const showPage = (list, page) => {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;

  // removes all students from list before updating with new students
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = "none";
  }

  // updates necessary students with display block to show pagination page.
  for (let i = startIndex; i < list.length; i++) {
    if (i < endIndex) {
      list[i].style.display = "block";
    }
  }
};

/*
 * Takes a event parameter from click,
 * removes the active class from the previous page click on the pagination bar,
 * and add active class to event target that was clicked
 */
const updateActivePage = (event, list) => {
  event.preventDefault();

  // gets current active pagination page and removes the active class.
  const prevPage = document.querySelector(".active");
  prevPage.className = "";

  // add the active class to the new event.target.
  const newPage = event.target;
  newPage.className = "active";

  // calls the showPage function with the updated active page.
  const pageNumber = newPage.textContent;
  showPage(list, pageNumber);
};

/*
 * Takes a search value as parameter from click/keyup event,
 * filters the students from the student list to a filtered List array
 * sets display for only students in the filteredList to show.
 */
const filterStudents = term => {
  // if the search is empty then render all students.
  if (!term) {
    addPagination(studentList);
  } else {
    const filteredList = [];
    let noResults = document.querySelector(".noResults");

    // remove no Results text if already exists.
    if (noResults) {
      noResults.parentNode.removeChild(noResults);
    }

    // loops thru names from studentList and push student that match into filterList to update pagination.
    names.forEach((name, i) => {
      name = name.textContent.toLowerCase();
      if (name.indexOf(term) > -1) {
        studentList[i].style.display = "block";
        filteredList.push(studentList[i]);
      } else {
        studentList[i].style.display = "none";
      }
    });

    // if filteredList return no students then display no results.
    if (filteredList.length === 0) {
      noResults = createElement("h2");
      noResults.textContent = "No Results Found";
      noResults.className = "noResults";
      page.insertBefore(noResults, studentListParent);
    } else {
      addPagination(filteredList);
    }
  }
};

/*
 * Create the `appendPageLinks function` to generate, append, and add
 * functionality to the pagination buttons.
 */
const addPagination = list => {
  //Sets pages variable by amount of student passed into function from list and the amount of items per page we want.
  let pages = Math.ceil(list.length / itemsPerPage);

  // if pages is equals to anything less than 1 then we make the pages variable equal to 1 via the startPage variable.
  if (pages < 1) {
    pages = startPage;
  }
  // selects the pagination element from the DOM
  const pagination = document.querySelector(".pagination");

  // remove pagination if already exists.
  if (pagination) {
    pagination.parentNode.removeChild(pagination);
  }

  //create the pagination div, list area for the pagination pages.
  const paginationDiv = createElement("div");
  const paginationUl = createElement("ul");
  paginationDiv.className = "pagination";
  pageHeader.parentNode.appendChild(paginationDiv);
  paginationDiv.appendChild(paginationUl);

  // makes necessary links for the pagination div.
  for (let i = 1; i <= pages; i++) {
    const paginationLi = createElement("li");
    const paginationA = createElement("a");
    paginationUl.appendChild(paginationLi);
    paginationLi.addEventListener("click", event =>
      updateActivePage(event, list)
    );
    paginationLi.appendChild(paginationA);
    paginationA.textContent = i;
    paginationA.href = "#";
  }

  //Sets first pagination link as active page.
  const firstLi = document.querySelector(".pagination > ul").firstElementChild;
  firstLi.firstElementChild.className = "active";

  // calls showPage function with list passed to addPagination and sets active page to first page of pagination.
  showPage(list, startPage);
};

/*
 * calls the addPagination function for the one set of students,
 * with the list of students as a paramenter.
 */
addSearch();
addPagination(studentList);

// Event listener to update the filteredList on each key.
document.querySelector("input").addEventListener("keyup", e => {
  // gets text value from the search input.
  const searchValue = document.querySelector("input").value.toLowerCase();

  // filter function takes the searchValue and filter the student by name with that value.
  filterStudents(searchValue);
});

//Event listener to search studentList on search button click.
document.querySelector("button").addEventListener("click", e => {
  // gets text value from the search input.
  const searchValue = document.querySelector("input").value.toLowerCase();

  // filter function takes the searchValue and filter the student by name with that value.
  filterStudents(searchValue);
});
