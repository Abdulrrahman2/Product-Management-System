
let name = document.querySelector('#name');
let category = document.querySelector('#cat');
let price = document.querySelector('#price');
let quantity = document.querySelector('#Quantity');
let discount = document.querySelector('#dis');

let form = document.querySelector('form');
let displayTable = document.querySelector('.table-body');

let submit = document.querySelector('.submit');

let data = [];

let editIndex = -1;

quantity.value = 1;
discount.value = '';

form.addEventListener('submit', function(e) {
     e.preventDefault();


let inputs = [name, category, price, quantity];
for (let input of inputs) {
    if (input.value.trim() === '') {

        input.style.border = '2px solid red';
        input.focus();
        alert(`Warning! Please enter ${input.id}`);
        return;
        }

    input.style.border = '';
    }

    let discountValue = discount.value.trim() === ''
     ? 0
    : Number(discount.value);

    const product = {
    proname: name.value.trim(),
    procategory: category.value.trim(),
    proprice: Number(price.value),
    proquantity: Number(quantity.value),
    prodiscount: discountValue
    };

 if (
     product.proprice < 0 ||
     product.proquantity <= 0 ||
     product.prodiscount < 0
) {
    alert('Please enter valid numbers!');
     return;
}


product.prototal =
     (product.proprice * product.proquantity) -
     product.prodiscount;

if (editIndex !== -1) {

    data[editIndex] = {
     ...product,
     proid: data[editIndex].proid
};
    editIndex = -1;

    submit.innerHTML = 'Submit';

}
else {
let existingIndex = data.findIndex(item =>
 item.proname.toLowerCase() === product.proname.toLowerCase() &&
 item.procategory.toLowerCase() === product.procategory.toLowerCase() &&
 item.proprice === product.proprice

 );
     if (existingIndex !== -1) {

     data[existingIndex].proquantity += product.proquantity;
    data[existingIndex].prototal =
    (data[existingIndex].proprice *
    data[existingIndex].proquantity) -
    data[existingIndex].prodiscount;
    }
     else {
     product.proid = data.length + 1;
    data.push(product);
        }
    }

    displayProducts();

    form.reset();
quantity.value = 1;
discount.value = '';
});

function displayProducts() {

    displayTable.innerHTML = data.map((item, index) => `

        <tr>
            <td>${index + 1}</td>
            <td>${item.proname}</td>
            <td>${item.procategory}</td>
            <td>${item.proprice}</td>
            <td>${item.proquantity}</td>
            <td>${item.prodiscount}</td>
            <td>${item.prototal}</td>

            <td>
                <button type="button" class="update"
                onclick="updateProduct(${index})">
                    Update
                </button>
            </td>
          <td>
               <button type="button" class="delete"
          onclick="deleteProduct(${index})">
              Delete
           </button>
        </td>
        </tr>
    `).join('');
    let totalPrice = data.reduce((total, item) => {

        return total + item.prototal;

    }, 0);


    document.querySelector('.total-price').innerHTML = totalPrice;

}
function updateProduct(index) {

let product = data[index];
name.value = product.proname;
category.value = product.procategory;
price.value = product.proprice;
quantity.value = product.proquantity;
 discount.value = product.prodiscount;
editIndex = index;
 submit.innerHTML = 'Update';
 form.scrollIntoView({
     behavior: 'smooth',
block: 'center'
 });
}

function deleteProduct(index) {
    let confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
 data.splice(index, 1);
     displayProducts();
 data.forEach((item, i) => {
      item.proid = i + 1;
        });

  if (editIndex === index) {
     editIndex = -1;
     form.reset();
     quantity.value = 1;
        discount.value = '';
     submit.innerHTML = 'Submit';

    }

else if (editIndex > index) {

     editIndex--;

     }

 }

}


let allInputs = [name, category, price, quantity, discount];

allInputs.forEach(input => {
 input.addEventListener('input', function() {

    input.style.border = '';

 });

});