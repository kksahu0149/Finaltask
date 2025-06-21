const viewCartButton = document.getElementById('view-cart-button');

        function updateCartDisplay() {
            const totalItems = sessionStorage.getItem('cartItemCount') || 0;
            viewCartButton.textContent = `View Cart (${totalItems})`;
        }

        updateCartDisplay();