const viewCartButton = document.getElementById('view-cart-button');
        const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
        const carousel = document.getElementById('image-carousel');
        const carouselInner = carousel.querySelector('.carousel-inner');
        const carouselControls = carousel.querySelectorAll('.carousel-control');
        const carouselIndicators = carousel.querySelector('.carousel-indicators');
        const carouselItems = carouselInner.querySelectorAll('.carousel-item');

        let currentIndex = 0;
        let intervalId;

        function updateCartDisplay() {
            const totalItems = sessionStorage.getItem('cartItemCount') || 0;
            viewCartButton.textContent = `View Cart (${totalItems})`;
        }

        function showSlide(index) {
            carouselItems.forEach(item => item.classList.remove('active'));
            carouselIndicators.querySelectorAll('.carousel-indicator').forEach(item => item.classList.remove('active'));
            carouselItems[index].classList.add('active');
            carouselIndicators.children[index].classList.add('active');
            currentIndex = index;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
            showSlide(currentIndex);
        }

        function selectSlide(index) {
            showSlide(index);
            clearInterval(intervalId);
            intervalId = setInterval(nextSlide, 5000);
        }

        carouselControls.forEach(control => {
            control.addEventListener('click', () => {
                const direction = control.dataset.control;
                if (direction === 'next') {
                    nextSlide();
                } else {
                    prevSlide();
                }
            });
        });

        carouselIndicators.addEventListener('click', (event) => {
            if (event.target.classList.contains('carousel-indicator')) {
                const slideIndex = parseInt(event.target.dataset.slide);
                selectSlide(slideIndex);
            }
        });

        function startCarousel() {
            intervalId = setInterval(nextSlide, 5000);
        }

        function stopCarousel() {
            clearInterval(intervalId);
        }

        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);

        startCarousel();
        showSlide(currentIndex);

        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.closest('.product-card').dataset.productId);
                const product = {
                    id: productId,
                    name: `Product ${productId}`,
                    price: parseFloat(event.target.closest('.product-card').querySelector('p:last-of-type').textContent.slice(1)),
                    image: `product${productId}.jpg`
                };
                addItemToCart(product);
                updateCartDisplay();
            });
        });

        updateCartDisplay();