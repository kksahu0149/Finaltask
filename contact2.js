const viewCartButton = document.getElementById('view-cart-button');
        const contactForm = document.getElementById('contact-form');

        function updateCartDisplay() {
            const totalItems = sessionStorage.getItem('cartItemCount') || 0;
            viewCartButton.textContent = `View Cart (${totalItems})`;
        }

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            alert('Your message has been sent!');
            contactForm.reset();
        });

        updateCartDisplay();