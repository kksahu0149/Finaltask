const viewCartButton = document.getElementById('view-cart-button');
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const checkoutButton = document.querySelector('.checkout-button');

        function updateCartDisplay() {
            const totalItems = sessionStorage.getItem('cartItemCount') || 0;
            viewCartButton.textContent = `View Cart (${totalItems})`;

            cartItemsContainer.innerHTML = '';
            const cart = getCart();
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
                checkoutButton.style.display = 'none';
            } else {
                checkoutButton.style.display = 'block';
                cart.forEach(item => {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item');
                    cartItemDiv.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>$${item.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button class="decrease-quantity" data-product-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="increase-quantity" data-product-id="${item.id}">+</button>
                            </div>
                        </div>
                        <button class="remove-item" data-product-id="${item.id}">Remove</button>
                    `;
                    cartItemsContainer.appendChild(cartItemDiv);
                });
            }

            const total = sessionStorage.getItem('cartTotal') || '0.00';
            cartTotalElement.textContent = `Total: $${total}`;
        }

        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                const productId = parseInt(event.target.dataset.productId);
                removeItemFromCart(productId);
                updateCartDisplay();
            }

            if (event.target.classList.contains('increase-quantity')) {
                const productId = parseInt(event.target.dataset.productId);
                increaseQuantity(productId);
                updateCartDisplay();
            }

            if (event.target.classList.contains('decrease-quantity')) {
                const productId = parseInt(event.target.dataset.productId);
                decreaseQuantity(productId);
                updateCartDisplay();
            }
        });

        updateCartDisplay();