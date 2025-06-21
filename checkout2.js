const viewCartButton = document.getElementById('view-cart-button');
        const orderSummaryItems = document.getElementById('order-summary-items');
        const orderTotalElement = document.getElementById('order-total');
        const billingForm = document.getElementById('billing-form');

        function updateCartDisplay() {
            const totalItems = sessionStorage.getItem('cartItemCount') || 0;
            viewCartButton.textContent = `View Cart (${totalItems})`;
        }

        function displayOrderSummary() {
            const cart = getCart();
            orderSummaryItems.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                const orderItem = document.createElement('div');
                orderItem.classList.add('order-item');
                orderItem.innerHTML = `
                    <p>${item.name} x ${item.quantity}</p>
                    <p>$${(item.price * item.quantity).toFixed(2)}</p>
                `;
                orderSummaryItems.appendChild(orderItem);
                total += item.price * item.quantity;
            });
            orderTotalElement.textContent = total.toFixed(2);
        }

        billingForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (confirm('Are you sure you want to place this order?')) {
                clearCart();
                alert('Thank you for your order!');
                window.location.href = 'index.html';
            }
        });

        displayOrderSummary();
        updateCartDisplay();