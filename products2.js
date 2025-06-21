const viewCartButton = document.getElementById('view-cart-button');

        function updateCartDisplay() {
            const totalItems = sessionStorage.getItem('cartItemCount') || 0;
            viewCartButton.textContent = `View Cart (${totalItems})`;
        }



        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart-button')) {
                const productId = parseInt(event.target.closest('.product-card').dataset.productId);
                const product = {
                    id: productId,
                    name: `Product ${productId}`,
                    price: parseFloat(event.target.closest('.product-card').querySelector('p:last-of-type').textContent.slice(1)),
                    image: `product${productId}.jpg`
                };
                addItemToCart(product);
                updateCartDisplay();
            }
        });

        updateCartDisplay();