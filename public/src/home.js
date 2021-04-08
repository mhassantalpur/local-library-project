// helper sort function
function sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA,keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    }
    else if (obj[keyB] > obj[keyA]) {
      return 1;
    }
    else {
      return 0;
    }
  });
}

function getTotalBooksCount(books) {
  let totalBooks = 0;
  for (let book of books) {
    totalBooks++;
  }
  return totalBooks;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let totalBorrowed = 0;
  for (let i = 0; i < books.length; i++) {
    for (j = 0; j < books[i].borrows.length; j++) {
      if (books[i].borrows[j].returned === false) {
        totalBorrowed++;
      }
    }
  }
  return totalBorrowed;
}

function getMostCommonGenres(books) {
  const allGenres = books.reduce((acc, {genre}) => {
    if (acc[genre]) {
      acc[genre] += 1;
    }
    else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  const sortedGenres = sortObjectByValues(allGenres);
  
  // map through sortedGenres array
  // for every item/index in sortedGenres, create an object with
    // key = 'name': sortedGenre item
    // value = 'count': allGenres[item] <- value of every item in allGenre
  // then slice so array to list first 5 elements (objects) only
  let finalSortedArr = sortedGenres.map((item) => 
  ({name: item, count: allGenres[item]})).slice(0,5);

  return finalSortedArr;
}

function getMostPopularBooks(books) {
  const allPopularBooks = books.reduce((acc, {title}, counter) => {
    acc[title] = books[counter].borrows.length;
    counter++;
    return acc;
  }, {});

  const sortedBooks = sortObjectByValues(allPopularBooks);

  let formattedBooksArr = sortedBooks.map((item) => 
  ({name: item, count: allPopularBooks[item]})).slice(0,5);

  return formattedBooksArr;
}

function getMostPopularAuthors(books, authors) {
  const allAuthorsById = books.reduce((acc, {authorId}, counter, authorNumberToName) => {
    for (let i = 0; i < authors.length; i++) {
      if (books[counter].authorId === authors[i].id) {
        authorNumberToName = Object.values(authors[i].name).join(' ');
      }
    }
    if (acc[authorNumberToName]) {
      acc[authorNumberToName] += books[counter].borrows.length;
    }
    else {
      acc[authorNumberToName] = books[counter].borrows.length;
    }
    counter++;
    return acc;
  }, {});

  const sortedAuthors = sortObjectByValues(allAuthorsById);

  let formattedAuthorsArr = sortedAuthors.map((item) => 
  ({name: item, count: allAuthorsById[item]})).slice(0,5);

  return formattedAuthorsArr;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
  sortObjectByValues,
};
