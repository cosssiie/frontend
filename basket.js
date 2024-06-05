// збільшення/зменшення кількості товару

let itemQuantities = document.querySelectorAll(".item-quantity");

itemQuantities.forEach(function (itemQuantity) {
    let plus = itemQuantity.parentElement.querySelector(".add");
    let minus = itemQuantity.parentElement.querySelector(".supply");

    plus.addEventListener('click', function () {
        let newQuantity = Number(itemQuantity.textContent) + 1;
        itemQuantity.textContent = newQuantity;
        minus.classList.remove('disabled');
        updateQuantityInSections(itemQuantity.closest('li').querySelector('.item-name').textContent.trim(), newQuantity);
    });

    minus.addEventListener('click', function () {
        let currentQuantity = Number(itemQuantity.textContent);
        if (currentQuantity > 1) {
            let newQuantity = currentQuantity - 1;
            itemQuantity.textContent = newQuantity;
            updateQuantityInSections(itemQuantity.closest('li').querySelector('.item-name').textContent.trim(), newQuantity);
        }
        if (Number(itemQuantity.textContent) === 1) {
            minus.classList.add('disabled');
        }
    });

    if (Number(itemQuantity.textContent) === 1) {
        minus.classList.add('disabled');
    }
});

function updateQuantityInSections(itemName, newQuantity) {
    updateItemQuantity(itemName, newQuantity, remainingItems);
    updateItemQuantity(itemName, newQuantity, boughtItems);
}

function updateItemQuantity(itemName, newQuantity, section) {
    let items = section.querySelectorAll('li');
    items.forEach(item => {
        if (item.textContent.includes(itemName)) {
            let badge = item.querySelector('.badge');
            if (badge) {
                badge.textContent = newQuantity;
            }
        }
    });
}






// Видалити товар зі списку

let itemToDelete = document.querySelectorAll(".cancel");

itemToDelete.forEach(function (cancelButton) {
    cancelButton.addEventListener('click', function () {
        let listItem = this.closest('li');
        let itemName = listItem.querySelector('.item-name').textContent.trim();
        
        removeListItem(listItem);

        removeItemFromSection(itemName, remainingItems);

        removeItemFromSection(itemName, boughtItems);
    });
});

function removeListItem(listItem) {
    let hrElement = listItem.previousElementSibling;
    if (hrElement && hrElement.tagName.toLowerCase() === 'hr') {
        hrElement.remove();
    }
    listItem.remove();
}

function removeItemFromSection(itemName, section) {
    let items = section.querySelectorAll('li');
    items.forEach(item => {
        if (item.textContent.includes(itemName)) {
            let badge = item.querySelector('.badge');
            if (badge) badge.remove();
            item.remove();
        }
    });
}


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
                updateItemName(originalName, newName);
            }
        });
    });
});


function updateItemName(originalName, newName) {
    let remainingItems = document.getElementById("remainingItems");
    let items = remainingItems.querySelectorAll('li');
    items.forEach(item => {
        if (item.textContent.includes(originalName)) {
            item.innerHTML = item.innerHTML.replace(originalName, newName);
        }
    });
}




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