/******************************************
Brian Buitrago
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//I add global variables that store the DOM elements
const studentList = document.getElementsByClassName("student-item cf");
const pageItems = 10;

/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

const showPage = (list, page) => {
  let startIndex = page * pageItems - pageItems;
  let endIndex = page * pageItems;

  for (let i = 0; i < list.length; i += 1) {}
};

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = () => {};

// Remember to delete the comments that came with this file, and replace them with your own code comments.

//Thank you for taking a look at my code. I am going for the "Exceeds Expectations" grade. If its not on par with that grade, then please reject this project for resubmission.
