// збільшення/зменшення кількості товару

function addQuantityHandlers(item) {
    let itemQuantity = item.querySelector('.item-quantity');
    let plus = item.querySelector('.add');
    let minus = item.querySelector('.supply');

    plus.addEventListener('click', function () {
        let newQuantity = Number(itemQuantity.textContent) + 1;
        itemQuantity.textContent = newQuantity;
        minus.classList.remove('disabled');
        updateQuantityInSections(item.querySelector('.item-name').textContent.trim(), newQuantity);
    });

    minus.addEventListener('click', function () {
        let currentQuantity = Number(itemQuantity.textContent);
        if (currentQuantity > 1) {
            let newQuantity = currentQuantity - 1;
            itemQuantity.textContent = newQuantity;
            updateQuantityInSections(item.querySelector('.item-name').textContent.trim(), newQuantity);
        }
        if (Number(itemQuantity.textContent) === 1) {
            minus.classList.add('disabled');
        }
    });

    if (Number(itemQuantity.textContent) === 1) {
        minus.classList.add('disabled');
    }
}


// Видалити товар зі списку
function addDeleteHandler(item) {
    let cancelButton = item.querySelector('.cancel');
    cancelButton.addEventListener('click', function () {
        let listItem = this.closest('li');
        let itemName = listItem.querySelector('.item-name').textContent.trim();

        removeListItem(listItem);
        removeItemFromSection(itemName, remainingItemsList);
        removeItemFromSection(itemName, document.getElementById('boughtItems'));
    });
}


// Редагування назви товару

function addEditNameHandler(item) {
    let itemName = item.querySelector('.item-name');
    let buyButton = item.querySelector('.buy-button');
    itemName.addEventListener('click', function () {
        let isBought = item.classList.contains('bought');
        if (!isBought) { 
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
                    let isUnique = checkUniqueName(newName);
                    if (isUnique) {
                        this.parentNode.textContent = newName;
                        updateItemName(originalName, newName);
                    } else {
                        this.parentNode.textContent = originalName;
                    }
                }
            });
        }
    });
}


// Куплений/некуплений товар
function addBuyUnbuyHandlers(item) {
    let buyButton = item.querySelector('.buy-button');
    let unbuyButton = item.querySelector('.unbuy-button');

    buyButton.addEventListener('click', function () {
        let listItem = this.closest('li');
        listItem.classList.add('bought');
        this.style.display = 'none';
        unbuyButton.style.display = 'inline';

        let itemName = listItem.querySelector('.item-name').textContent.trim();
        let itemQuantity = listItem.querySelector('.item-quantity').textContent;

        removeItemFromSection(itemName, remainingItemsList);

        let boughtItem = document.createElement('li');
        boughtItem.textContent = itemName + ' ';
        let badge = document.createElement('span');
        badge.classList.add('badge');
        badge.textContent = itemQuantity;
        boughtItem.appendChild(badge);
        document.getElementById('boughtItems').appendChild(boughtItem);
    });

    unbuyButton.addEventListener('click', function () {
        let listItem = this.closest('li');
        listItem.classList.remove('bought');
        this.style.display = 'none';
        buyButton.style.display = 'inline';

        let itemName = listItem.querySelector('.item-name').textContent.trim();
        let itemQuantity = listItem.querySelector('.item-quantity').textContent;

        removeItemFromSection(itemName, document.getElementById('boughtItems'));

        let remainingItem = document.createElement('li');
        remainingItem.textContent = itemName + ' ';
        let badge = document.createElement('span');
        badge.classList.add('badge');
        badge.textContent = itemQuantity;
        remainingItem.appendChild(badge);
        remainingItemsList.appendChild(remainingItem);
    });
}

function updateQuantityInSections(itemName, newQuantity) {
    updateItemQuantity(itemName, newQuantity, remainingItemsList);
    updateItemQuantity(itemName, newQuantity, document.getElementById('boughtItems'));
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

function checkUniqueName(newName) {
    let existingNames = [];
    document.querySelectorAll(".item-name").forEach(function (itemName) {
        existingNames.push(itemName.textContent.trim());
    });
    return !existingNames.includes(newName);
}

function updateItemName(originalName, newName) {
    let sections = [remainingItemsList, document.getElementById('boughtItems')];
    sections.forEach(section => {
        let items = section.querySelectorAll('li');
        items.forEach(item => {
            if (item.textContent.includes(originalName)) {
                item.innerHTML = item.innerHTML.replace(originalName, newName);
            }
        });
    });
}
document.querySelectorAll('#itemList > li').forEach(addEventListenersToItem);


// Додати товар
let addItemButton = document.getElementById("addItemButton");
let itemList = document.getElementById("itemList");
let remainingItemsList = document.getElementById("remainingItems");

addItemButton.addEventListener('click', function () {

    let itemInput = document.getElementById("itemInput");
    let itemName = itemInput.value.trim();

    if (itemName !== '' && checkUniqueName(itemName)) {

        let hr = document.createElement('hr');

        let newItem = document.createElement('li');
        newItem.innerHTML = `
            <span class="item-name">${itemName}</span>
            <div class="item-quantity-wrapper">
                <button class="add" data-tooltip="Додати товар">+</button>
                <span class="item-quantity">1</span>
                <button class="supply" data-tooltip="Видалити товар">-</button>
            </div>
            <div class="delete-wrapper">
                <button class="buy-button" data-tooltip="Купити товар">Куплено</button>
                <button class="unbuy-button" data-tooltip="Зробити не купленим" style="display: none;">Не куплено</button>
                <button class="cancel" data-tooltip="Видалити">x</button>
            </div>
        `;

        itemList.appendChild(hr);
        itemList.appendChild(newItem);


        let remainingItem = document.createElement('li');
        remainingItem.innerHTML = `
            ${itemName} <span class="badge">1</span>
        `;

        remainingItemsList.appendChild(remainingItem);

        itemInput.value = '';

        addEventListenersToItem(newItem);

    };
});

function addEventListenersToItem(item) {
    addQuantityHandlers(item);
    addDeleteHandler(item);
    addEditNameHandler(item);
    addBuyUnbuyHandlers(item);
}