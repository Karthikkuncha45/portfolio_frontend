// Updated Navigation JavaScript - Horizontal Scrolling Only
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    // Active link highlighting based on scroll position
    function highlightActiveNavItem() {
        const scrollPosition = window.scrollY;
        
        // Find which section is currently in view
        document.querySelectorAll('.content-section').forEach(section => {
            const sectionTop = section.offsetTop - 60; // Reduced from 100 to match smaller navbar
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        
                        // Center active link in horizontal scroll
                        const linkParent = link.parentElement;
                        
                        if (linkParent && navContainer) {
                            const linkOffset = linkParent.offsetLeft;
                            const linkWidth = linkParent.offsetWidth;
                            const containerWidth = navContainer.offsetWidth;
                            
                            // Calculate scroll position to center the active link
                            const scrollTo = linkOffset - (containerWidth / 2) + (linkWidth / 2);
                            
                            // Smooth scroll the navbar horizontally
                            navContainer.scrollTo({
                                left: scrollTo,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            }
        });
    }
    
    // Initial call and scroll event listener for active highlighting
    highlightActiveNavItem();
    window.addEventListener('scroll', highlightActiveNavItem);
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add keyboard navigation for horizontal scrolling
    navContainer.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navContainer.scrollBy({ left: -100, behavior: 'smooth' });
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            navContainer.scrollBy({ left: 100, behavior: 'smooth' });
        }
    });
    
    // Mouse wheel horizontal scrolling
    navContainer.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
            e.preventDefault();
            navContainer.scrollBy({ left: e.deltaY * 2, behavior: 'smooth' });
        }
    });
    
    // Add name with typing effect (preserved from original code)
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const nameText = "Karthik";
        let charIndex = 0;
        
        // Clear the existing text first
        nameElement.textContent = '';
        
        // Type one character at a time
        function typeWriter() {
            if (charIndex < nameText.length) {
                nameElement.textContent += nameText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 150); // Adjust typing speed (150ms between characters)
            } else {
                // Add blinking cursor effect after typing is complete
                setTimeout(() => {
                    nameElement.classList.add('typing-complete');
                }, 500);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Mobile touch scrolling for navbar
    let isDown = false;
    let startX;
    let scrollLeft;
    
    if (navContainer) {
        navContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            navContainer.classList.add('active');
            startX = e.pageX - navContainer.offsetLeft;
            scrollLeft = navContainer.scrollLeft;
        });
        
        navContainer.addEventListener('mouseleave', () => {
            isDown = false;
            navContainer.classList.remove('active');
        });
        
        navContainer.addEventListener('mouseup', () => {
            isDown = false;
            navContainer.classList.remove('active');
        });
        
        navContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - navContainer.offsetLeft;
            const walk = (x - startX) * 2;
            navContainer.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        navContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - navContainer.offsetLeft;
            scrollLeft = navContainer.scrollLeft;
        });
        
        navContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const x = e.touches[0].pageX - navContainer.offsetLeft;
            const walk = (x - startX) * 2;
            navContainer.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Disable mobile navbar functionality (hamburger menu, etc.)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.style.display = 'none';
    }
    
    if (mobileMenu) {
        mobileMenu.style.display = 'none';
    }
    
    // Ensure navbar is always horizontal scrolling on all screen sizes
    if (navContainer) {
        navContainer.style.overflowX = 'auto';
        navContainer.style.overflowY = 'hidden';
        navContainer.style.whiteSpace = 'nowrap';
    }
    
    // Make all nav items display inline and center them
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = 'flex';
        navMenu.style.flexWrap = 'nowrap';
        navMenu.style.justifyContent = 'center';
        navMenu.style.alignItems = 'center';
    }
});

// Additional utility functions for responsive behavior
function handleResize() {
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        // Ensure horizontal scrolling is maintained on resize
        navContainer.scrollTo({ left: 0, behavior: 'smooth' });
    }
}

// Listen for window resize
window.addEventListener('resize', handleResize);
