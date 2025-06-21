let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function updateCartTotal() {
            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
            });
            sessionStorage.setItem('cartTotal', total.toFixed(2));
        }

        function updateCartCount() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            sessionStorage.setItem('cartItemCount', totalItems);
        }

        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartTotal();
            updateCartCount();
        }

        function getCart() {
            return cart;
        }

        function addItemToCart(product) {
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            saveCart();
            showAlert('Item added successfully!');
        }

        function removeItemFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            saveCart();
        }

        function increaseQuantity(productId) {
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity++;
                saveCart();
            }
        }

        function decreaseQuantity(productId) {
            const item = cart.find(i => i.id === productId);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--;
                    saveCart();
                }
            }
        }

        function clearCart() {
            cart = [];
            saveCart();
        }

        function showAlert(message) {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert';
            alertDiv.textContent = message;
            document.body.appendChild(alertDiv);

            setTimeout(() => {
                alertDiv.classList.add('fade-out');
                setTimeout(() => {
                    alertDiv.remove();
                }, 500);
            }, 2000);
        }

        