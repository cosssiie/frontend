function showTeacherInfo(firstName, lastName, specialty, location, ageGender, email, phone, photo) {
    document.getElementById('teacher-name').textContent = `${firstName} ${lastName}`;
    document.getElementById('teacher-specialty').textContent = specialty;
    document.getElementById('teacher-location').textContent = location;
    document.getElementById('teacher-age-gender').textContent = ageGender;
    document.getElementById('teacher-email').textContent = email;
    document.getElementById('teacher-email').href = `mailto:${email}`;
    document.getElementById('teacher-phone').textContent = phone;
    document.getElementById('teacher-photo').src = photo;

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

