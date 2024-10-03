
function showTeacherInfo(photo, first_name, last_name, course, country, city, email, phone, age, gender) {
  document.getElementById('teacher-photo').src = photo;
  document.getElementById('teacher-name').textContent = `${first_name} ${last_name}`;
  document.getElementById('teacher-specialty').textContent = course;
  document.getElementById('teacher-location').textContent = `${country} ${city}`;
  document.getElementById('teacher-email').textContent = email;
  document.getElementById('teacher-email').href = `mailto:${email}`;
  document.getElementById('teacher-phone').textContent = phone;
  document.getElementById('teacher-age').textContent = `Age: ${age}`;
  document.getElementById('teacher-gender').textContent = `Gender: ${gender}`;

  document.getElementById('teacherModal').style.display = 'block';
}

function closeTeacherInfo() {
  document.getElementById('teacherModal').style.display = 'none';
}

const teacherModal = document.getElementById("teacherAddModal");
const teacherAddBtn = document.querySelectorAll(".add-teacher");
const teacherCloseBtn = document.querySelector(".teacher-close-btn");

teacherAddBtn.forEach(btn => {
  btn.onclick = function () {
    teacherModal.style.display = "block";
  }
});

teacherCloseBtn.onclick = function () {
  teacherModal.style.display = "none";
}



// Завдання 1. Відобразити масив об’єктів викладачів отриманий у
// лабораторній роботі №3 на html сторінці з лабораторної роботи №2 та
// реалізувати функціональність перегляду інформації про викладача та
// додавання у список вибраних (favorites).

let allTeachers = [];
const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Literature',
  'Computer Science',
  'Art',
  'Physical Education'
];

async function fetchUsers() {
  try {
    const response = await fetch('https://randomuser.me/api/?results=50');
    const data = await response.json();
    const users = data.results;

    allTeachers = users.map(teacher => ({
      first_name: `${teacher.name.first}`,
      last_name: `${teacher.name.last}`,
      course: subjects[Math.floor(Math.random() * subjects.length)],
      country: teacher.location.country,
      city: teacher.location.city,
      email: teacher.email,
      phone: teacher.phone,
      age: teacher.dob.age,
      gender: teacher.gender,
      picture_thumbnail: teacher.picture.large,
      picture_large: teacher.picture.large,
      favorite: Math.random() > 0.5
    }));

    currentPage = 1;
    displayTeachers(allTeachers);

  } catch (error) {
    console.error('Помилка при отриманні користувачів:', error);
  }
}

fetchUsers();


function generateTeacherCards(teachers) {
  const teachersList = document.querySelector('.teachers-list');
  teachersList.innerHTML = '';

  teachers.forEach(teacher => {
    const teacherCard = document.createElement('div');
    teacherCard.classList.add('teacher-card');

    teacherCard.setAttribute('onclick',
      `showTeacherInfo('${teacher.picture_large}', '${teacher.first_name}','${teacher.last_name}', '${teacher.course}', '${teacher.country}','${teacher.city}','${teacher.email}','${teacher.phone}','${teacher.age}', '${teacher.gender}')`
    );

    teacherCard.innerHTML = `
            <img class="photo" src="${teacher.picture_large}" alt="Teacher Photo">
            <div class="teachersName">
                <h3>${teacher.first_name}<br>${teacher.last_name}</h3>
            </div>
            <p><span class="country">${teacher.country}</span></p>
        `;

    teachersList.appendChild(teacherCard);
  });
}


// Завдання 2. Додати на html сторінку можливість фільтрації викладачів на
// сторінці по країні, віку, статі та тих, що є у списку вибраних (country, age,
// gender, favorite. 


const countrySelect = document.getElementById('region');

const countries = [
  "Ukraine", "USA", "UK", "Germany", "France", "Canada", "Australia", "Brazil", "India",
  "China", "Japan", "South Africa", "Argentina", "Mexico", "Italy", "Spain"
];

function populateCountries() {
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  });
}

window.addEventListener('DOMContentLoaded', populateCountries);


document.getElementById('age').addEventListener('change', filterTeachers);
document.getElementById('region').addEventListener('change', filterTeachers);
document.getElementById('sex').addEventListener('change', filterTeachers);
document.getElementById('only-photo').addEventListener('change', filterTeachers);
document.getElementById('only-favorites').addEventListener('change', filterTeachers);


function filterTeachers() {
  const selectedAge = document.getElementById('age').value;
  const selectedCountry = document.getElementById('region').value;
  const selectedSex = document.getElementById('sex').value;
  const onlyWithPhoto = document.getElementById('only-photo').checked;
  const onlyFavorites = document.getElementById('only-favorites').checked;

  filteredTeachers = allTeachers.filter(teacher => {
    let matches = true;

    if (selectedAge !== 'select') {
      const ageRanges = {
        '18-30': [18, 30],
        '31-40': [31, 40],
        '41-50': [41, 50],
        '51+': [51, 100]
      };
      const [minAge, maxAge] = ageRanges[selectedAge];
      matches = matches && teacher.age >= minAge && teacher.age <= maxAge;
    }

    if (selectedCountry !== 'select') {
      matches = matches && teacher.country.toLowerCase().includes(selectedCountry.toLowerCase());
    }

    if (selectedSex !== 'select') {
      matches = matches && teacher.gender.toLowerCase() === selectedSex.toLowerCase();
    }

    if (onlyWithPhoto) {
      matches = matches && teacher.picture_thumbnail !== '';
    }

    if (onlyFavorites) {
      matches = matches && teacher.favorite;
    }

    return matches;
  });

  currentPage = 1;
  displayTeachers(filteredTeachers);
}

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayTeachers(filteredTeachers);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayTeachers(filteredTeachers);
  }
});

fetchUsers().then(() => {
  filteredTeachers = [...allTeachers];
  displayTeachers(filteredTeachers);
});




// Завдання 3. Додати на html сторінку до блоку статистики можливість
// сортування за ім’ям, спеціальністю, країною, та віком (full_name, course,
// age, b_day, country). Змінювати сортування по кліку на заголовок таблиці.

document.getElementById('nameHeader').addEventListener('click', () => sortTable('first_name'));
document.getElementById('specialtyHeader').addEventListener('click', () => sortTable('course'));
document.getElementById('ageHeader').addEventListener('click', () => sortTable('age', true));
document.getElementById('genderHeader').addEventListener('click', () => sortTable('gender'));
document.getElementById('countryHeader').addEventListener('click', () => sortTable('country'));

let currentSortColumn = '';
let currentSortOrder = 'asc';

function generateStatisticsTable(teachers) {
  const tbody = document.querySelector('.statistics tbody');
  tbody.innerHTML = '';

  teachers.forEach(teacher => {
    const row = document.createElement('tr');

    row.innerHTML = `
          <td>${teacher.first_name} ${teacher.last_name}</td>
          <td>${teacher.course}</td>
          <td>${teacher.age}</td>
          <td>${teacher.gender}</td>
          <td>${teacher.country}</td>
      `;

    tbody.appendChild(row);
  });
}

generateStatisticsTable(allTeachers);



function sortTable(column, isNumeric = false) {
  if (currentSortColumn === column) {
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
  } else {
    currentSortOrder = 'asc';
    currentSortColumn = column;
  }

  const sortedData = [...allTeachers].sort((a, b) => {
    let aValue = a[column];
    let bValue = b[column];

    if (isNumeric) {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    } else {
      aValue = aValue.toString().toLowerCase();
      bValue = bValue.toString().toLowerCase();
    }

    if (currentSortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  generateStatisticsTable(sortedData);

}




//Завдання 4 Додати на html сторінку функціональність пошуку по викладачах
//за параметрами: ім’я, коментар та вік (name, note, age) 
function searchTeachers() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();

  filteredTeachers = allTeachers.filter(teacher => {
    const fullNameMatches = `${teacher.first_name} ${teacher.last_name}`.toLowerCase().includes(searchQuery);
    const ageMatches = teacher.age.toString().includes(searchQuery);

    return fullNameMatches || ageMatches;
  });

  currentPage = 1;
  displayTeachers(filteredTeachers);

}

document.getElementById('searchBtn').addEventListener('click', searchTeachers);
document.getElementById('searchInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    searchTeachers();
  }
});





let currentPage = 1;
const itemsPerPage = 10;
let filteredTeachers = [];


function updatePaginationControls(totalPages) {
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');
  const pageInfo = document.getElementById('page-info');

  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}


function displayTeachers(teachers) {
  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const teachersToDisplay = teachers.slice(startIndex, endIndex);

  generateTeacherCards(teachersToDisplay);
  generateStatisticsTable(teachersToDisplay);
  updatePaginationControls(totalPages);
}


// Завдання 5. Реалізувати функціонал форми додавання викладача
// (teach_add_popup) 

document.getElementById('teacherAddForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const first_name = document.getElementById('teacherFirstName').value.trim();
  const last_name = document.getElementById('teacherLastName').value.trim();
  const course = document.getElementById('teacherSpeciality').value;
  const country = document.getElementById('teacherCountry').value.trim();
  const city = document.getElementById('teacherCity').value.trim();
  const email = document.getElementById('teacherEmail').value.trim();
  const phone = document.getElementById('teacherPhone').value.trim();
  const dob = new Date(document.getElementById('teacherDob').value);
  const age = new Date().getFullYear() - dob.getFullYear();
  const gender = document.querySelector('input[name="teacherSex"]:checked').value;
  const picture_large = `https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;
  const picture_thumbnail = `https://randomuser.me/api/portraits/thumb/${gender === 'male' ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;

  const newTeacher = {
    first_name,
    last_name,
    course,
    country,
    city,
    email,
    phone,
    age,
    gender,
    picture_thumbnail,
    picture_large,
  };

  allTeachers.push(newTeacher);
  
  filteredTeachers = [...allTeachers];
  currentPage = 1;
  displayTeachers(filteredTeachers);

  document.getElementById('teacherAddForm').reset();
  const modal = document.getElementById('teacherAddModal');
  modal.style.display = 'none';
});





