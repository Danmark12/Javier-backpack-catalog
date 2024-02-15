let cart = {}; // Object to store cart items

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = [
            {
                "name": "Osprey",
                "description": "Hiking backpack",
                "price": 10000,
                "date_added": "02-05-2024",
                "image": "https://www.osprey.com/media/catalog/product/cache/ca35d37a47a35be7104c909d8374b4c3/v/o/voltef65_s23_side_mutedspaceblue.jpg"
            },
            {
                "name": "Naturehike",
                "description": "Hiking backpack",
                "price": 5000,
                "date_added": "02-05-2024",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgkPLs7bBG3ewqeauIp8cm1h6wtWEAaTf1rPOBxrnUw9fasFfFM7dq08TnQh9rGeK70p4&usqp=CAU"
            },
            {
                "name": "Mammut",
                "description": "Hiking backpack",
                "price": 15000,
                "date_added": "02-05-2024",
                "image": "https://www.peakmountaineering.com/wp-content/uploads/2019/10/Trion-Spine-35-Rucksack.png"
            },
            {
                "name": "Gregory",
                "description": "Travel backpack",
                "price": 20000,
                "date_added": "02-10-2024",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiLa-GOyYiCE0STV6O1Fpc-nRW9t8wlCnvuw&usqp=CAU"
            },
            {
                "name": "Deuter Aircontact Core 65+10",
                "description": "Travel backpack",
                "price": 25000,
                "date_added": "02-11-2024",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY7bHKU6xoyK8BjXJpOF7pwGK1gVeDeNgr6Q&usqp=CAU"
            },
            {
                "name": "Mountaintop",
                "description": "Travel backpack",
                "price": 30000,
                "date_added": "02-12-2024",
                "image": "https://mountaintop-outdoor.com/cdn/shop/products/b62d22128786f8468f7ad4a039ab48fa.jpg?v=1698914493"
            }
        ];

        const dataList = document.getElementById('dataList');
        
        // Function to create card group
        function createCardGroup(data) {
            const cardGroup = document.createElement('div'); // Create a div for card group
            cardGroup.classList.add('card-group'); // Add class "card-group"

            data.forEach(item => {
                const card = document.createElement('div'); // Create a card for each product
                card.classList.add('card'); // Add class "card" to each card
                card.style.width = '18rem'; // Set width of the card

                const img = document.createElement('img');
                img.src = item.image; // Use the image URL provided in the JSON
                img.classList.add('card-img-top');
                img.alt = item.name; // Set alt attribute for accessibility
                card.appendChild(img); // Append the image to the card

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.style.height = '10rem'; // Set a fixed height for the card body
                cardBody.style.display = 'flex'; // Use flexbox for alignment
                cardBody.style.flexDirection = 'column'; // Align content vertically

                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.textContent = item.name;
                cardBody.appendChild(title);

                const description = document.createElement('p');
                description.classList.add('card-text');
                description.textContent = item.description;
                cardBody.appendChild(description);

                const price = document.createElement('p');
                price.classList.add('card-text');
                price.textContent = `Price: $${item.price}`;
                cardBody.appendChild(price);

                const dateAdded = document.createElement('p');
                dateAdded.classList.add('card-text');
                dateAdded.textContent = `Date Added: ${item.date_added}`;
                cardBody.appendChild(dateAdded);

                const footer = document.createElement('div');
                footer.classList.add('card-footer');

                const addToCartBtn = document.createElement('button');
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.classList.add('btn', 'btn-primary');
                addToCartBtn.addEventListener('click', () => addToCart(item));
                footer.appendChild(addToCartBtn);

                card.appendChild(cardBody);
                card.appendChild(footer);

                cardGroup.appendChild(card); // Append the card to the card group
            });

            return cardGroup;
        }

        const firstCardGroup = createCardGroup(data.slice(0, 3)); // First three items
        dataList.appendChild(firstCardGroup); // Append the first card group to the dataList

        const secondCardGroup = createCardGroup(data.slice(3)); // Last three items
        dataList.appendChild(secondCardGroup); // Append the second card group to the dataList
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function addToCart(item) {
    if (cart[item.name]) {
        cart[item.name].quantity++;
    } else {
        cart[item.name] = {
            quantity: 1,
            price: item.price
        };
    }
    updateCart();
}

function updateCart() {
    const cartTableBody = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    cartTableBody.innerHTML = ''; // Clear existing content

    let totalPrice = 0;

    for (const productName in cart) {
        const product = cart[productName];
        const row = cartTableBody.insertRow();

        const productNameCell = row.insertCell(0);
        productNameCell.textContent = productName;

        const priceCell = row.insertCell(1);
        priceCell.textContent = `$${product.price}`;

        const quantityCell = row.insertCell(2);
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = 0;
        quantityInput.value = product.quantity;
        quantityInput.classList.add('quantity-input');
        quantityInput.addEventListener('change', (event) => {
            const newQuantity = parseInt(event.target.value);
            if (newQuantity >= 0) {
                cart[productName].quantity = newQuantity;
                updateCart();
            } else {
                event.target.value = product.quantity;
            }
        });
        quantityCell.appendChild(quantityInput);

        const totalCell = row.insertCell(3);
        const total = product.price * product.quantity;
        totalCell.textContent = `$${total}`;

        totalPrice += total;
    }

    // Display total price
    const totalRow = cartTableBody.insertRow();
    totalRow.innerHTML = `<td colspan="3" style="text-align: end;"><b>Total:</b></td><td>$${totalPrice}</td>`;
}
