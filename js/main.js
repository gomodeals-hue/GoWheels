// goWheels - Main JS

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Header Background Change on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 0';
            header.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            header.style.padding = '1.5rem 0';
            header.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });

    // 3. Simple Cart Simulation
    const addButtons = document.querySelectorAll('.add-btn');
    const cartCount = document.querySelector('.header-actions span');
    let count = 0;

    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            count++;
            cartCount.textContent = count;
            
            // Add a little pop animation to the cart
            cartCount.style.transform = 'scale(1.5)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);

            // Change button temporarily
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-check"></i>';
            btn.style.background = '#00E5FF';
            
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                btn.style.background = '';
            }, 1500);
        });
    });

    // Unified Parallax System
    let currentScrollY = window.scrollY;
    let currentMouseX = 0;
    let currentMouseY = 0;

    window.addEventListener('scroll', () => {
        currentScrollY = window.scrollY;
        applyParallax();
    });

    window.addEventListener('mousemove', (e) => {
        currentMouseX = (window.innerWidth - e.pageX * 2) / 100;
        currentMouseY = (window.innerHeight - e.pageY * 2) / 100;
        applyParallax();
    });

    function applyParallax() {
        // 1. Hero Background (Mouse only)
        
        const heroImgBg = document.querySelector('.hero-img-bg');
        if (heroImgBg) {
            heroImgBg.style.transform = `scale(1.05) translate(${currentMouseX * 0.5}px, ${currentMouseY * 0.5}px)`;
        }

        // 2. Flying Cars Wrapper (Mouse Parallax only, GSAP handles scroll)
        const carWrapper = document.querySelector('.flying-car-wrapper');
        if (carWrapper) {
            // Apply mouse movement to the wrapper to prevent GSAP conflict on the children
            carWrapper.style.transform = `translate(${currentMouseX * 4}px, ${currentMouseY * 4}px)`;
        }

        // 3. Global Parallax Elements All Over The Website
        // Section titles parallax
        const sectionTitles = document.querySelectorAll('.section-title h2');
        sectionTitles.forEach(title => {
            title.style.transform = `translateY(${currentScrollY * 0.05}px)`;
        });

        // Coupon banner car
        const couponCar = document.querySelector('.coupon-img img');
        if (couponCar) {
            // Keep original rotation and add parallax
            couponCar.style.transform = `rotate(-20deg) translateY(calc(50px + ${currentScrollY * -0.1}px))`;
        }
    }

    // Initial call to set positions
    applyParallax();

    // 5. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Dynamic Hero Text Rotation
    const dynamicText = document.getElementById('dynamic-text');
    const words = ['LIMITS.', 'SPEED.', 'HORIZONS.', 'MOTION.', 'BOUNDARIES.', 'VELOCITY.', 'RECORDS.', 'THE TRACK.'];
    let wordIndex = 0;

    function rotateWord() {
        dynamicText.style.opacity = '0';
        dynamicText.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            wordIndex = (wordIndex + 1) % words.length;
            dynamicText.textContent = words[wordIndex];
            dynamicText.style.opacity = '1';
            dynamicText.style.transform = 'translateY(0)';
        }, 500);
    }

    setInterval(rotateWord, 3000);

    // 7. Modern Entrance Animation
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(50px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
        }, 200 * (index + 1));
    });

    // 8. GSAP 3D Parallax Effect for Hero Cars
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 3D Flying effect for Red Car (car-1)
        gsap.to(".car-1", {
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            z: 250, // Move forward strongly
            y: -250, // Fly up strongly
            x: -150, // Move left
            rotationZ: -15, // Rotate into the turn
            scale: 1.8, // Enlarge as it flies towards viewer
            ease: "none"
        });

        // 3D Depth effect for Blue Car (car-2)
        gsap.to(".car-2", {
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            z: -150, // Push into background
            y: 150, // Drop down slightly
            x: 80,
            rotationZ: 10,
            scale: 0.6,
            ease: "none"
        });
    }
});
