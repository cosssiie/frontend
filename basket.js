// збільшення/зменшення кількості товару

let itemQuantities = document.querySelectorAll(".item-quantity");

itemQuantities.forEach(function (itemQuantity) {
    let plus = itemQuantity.parentElement.querySelector(".add");
    let minus = itemQuantity.parentElement.querySelector(".supply");

    plus.addEventListener('click', function () {
        itemQuantity.textContent = Number(itemQuantity.textContent) + 1;
        minus.classList.remove('disabled');
    });

    minus.addEventListener('click', function () {
        if (Number(itemQuantity.textContent) > 1) {
            itemQuantity.textContent = Number(itemQuantity.textContent) - 1;
        }
        if (Number(itemQuantity.textContent) === 1) {
            minus.classList.add('disabled');
        }
    });

    if (Number(itemQuantity.textContent) === 1) {
        minus.classList.add('disabled');
    }
});


// Видалити товар зі списку

let itemToDelete = document.querySelectorAll(".cancel");

itemToDelete.forEach(function (cancelButton) {
    cancelButton.addEventListener('click', function () {
        let listItem = this.closest('li');
        let hrElement = listItem.previousElementSibling;
        if (hrElement && hrElement.tagName.toLowerCase() === 'hr') {
            hrElement.remove();
        }
        listItem.remove();
    });
});



// Редагування назви товару

let itemNames = document.querySelectorAll(".item-name");

itemNames.forEach(function (itemName) {
    itemName.addEventListener('click', function () {
        let originalName = this.textContent;
        let input = document.createElement('input');
        input.type = 'text';
        input.value = originalName;
        this.textContent = '';
        this.appendChild(input);
        input.focus();

        input.addEventListener('blur', function () {
            let newName = this.value.trim();
            let maxLength = 10;
            if (newName.length > maxLength) {
                newName = newName.slice(0, maxLength) + '...';
            }
            if (newName === '') {
                this.parentNode.textContent = originalName;
            } else {
                this.parentNode.textContent = newName;
            }
        });
    });
});




// Куплений/некуплений товар
document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', function () {
        let listItem = this.closest('li');
        listItem.classList.add('bought');
        this.style.display = 'none';
        listItem.querySelector('.unbuy-button').style.display = 'inline';
    });
});

document.querySelectorAll('.unbuy-button').forEach(button => {
    button.addEventListener('click', function () {
        let listItem = this.closest('li');
        listItem.classList.remove('bought');
        this.style.display = 'none';
        listItem.querySelector('.buy-button').style.display = 'inline';
    });
});





