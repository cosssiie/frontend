
function filterUsers(users, filters) {
    return users.filter(user => {
        return Object.keys(filters).every(key => {
            if (key === 'age') {
                const { min } = filters.age;
                return user.age >= min;
            }
            return user[key] === filters[key];
        });
    });
}

// const filters = {
    
//     gender: "Female",
    
// };

// const filteredUsers = filterUsers(randomUserMock, filters);
// console.log(filteredUsers);



function sortUsers(users, sortBy, order = 'asc') {
    return users.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];


        if (sortBy === 'b_date') {
            valA = new Date(a.b_date);
            valB = new Date(b.b_date);
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
            const comparison = valA.localeCompare(valB);
            return order === 'asc' ? comparison : -comparison;
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
            return order === 'asc' ? valA - valB : valB - valA;
        }

        return 0;
    });
}
// const sorted = sortUsers(randomUserMock, 'country', 'asc');
// console.log(sorted);



function findUsers(users, searchParam, value) {
    return users.filter(user => {
        return user[searchParam] === value;
    });
}
// const found = findUsers(randomUserMock, 'age', 64);
// console.log(found);




function getPercentage(users, searchParam, value) {
    const matchingUsers = users.filter(user => {
        return user[searchParam] > value;
    });

    const percentage = (matchingUsers.length / users.length) * 100;
    return percentage.toFixed(2);
}


// const percentage = getPercentage(randomUserMock, 'age', 30);
// console.log(percentage);
