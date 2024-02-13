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
                "name": "Nepa",
                "description": "Hiking backpack",
                "price": 5000,
                "date_added": "02-05-2024",
                "image": "https://media.karousell.com/media/photos/products/2020/10/7/nepa_calix_32_hiking_outdoor_b_1602076039_242d5f8c.jpg"
            },
            {
                "name": "Mammut",
                "description": "Hiking backpack",
                "price": 15000,
                "date_added": "02-05-2024",
                "image": "https://www.peakmountaineering.com/wp-content/uploads/2019/10/Trion-Spine-35-Rucksack.png"
            }
        ];

        const dataList = document.getElementById('dataList');
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

        dataList.appendChild(cardGroup); // Append the card group to the dataList
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

function removeFromCart(productName) {
    if (cart[productName]) {
        if (cart[productName].quantity === 1) {
            delete cart[productName];
        } else {
            cart[productName].quantity--;
        }
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
        quantityCell.textContent = product.quantity;

        const totalCell = row.insertCell(3);
        const total = product.price * product.quantity;
        totalCell.textContent = `$${total}`;

        totalPrice += total;
    }

    // Display total price
    const totalRow = cartTableBody.insertRow();
    totalRow.innerHTML = `<td colspan="3" style="text-align: end;"><b>Total:</b></td><td>$${totalPrice}</td>`;
}
