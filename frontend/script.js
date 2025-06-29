// Navigation JavaScript - Fixed for Mixed Internal/External Links
document.addEventListener('DOMContentLoaded', function() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Elements
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    // Define navigation mappings for different pages
   const navigationMap = {
    'index.html': {
        'home': 'index.html',
        'achievements': 'achievements.html',
        'certifications': 'certifications.html',
        'internships': 'Internship.html',
        'projects': 'projects.html',
        'skills': 'skills.html',
        'hobbies': 'Hobbies.html',
        'education': 'education.html'
    },
    'Internship.html': {
        'home': 'index.html',
        'achievements': 'achievements.html',
        'certifications': 'certifications.html',
        'internships': 'Internship.html',
        'projects': 'projects.html',
        'skills': 'skills.html',
        'hobbies': 'Hobbies.html',
        'education': 'education.html'
    },
    'skills.html': {
        'home': 'index.html',
        'achievements': 'achievements.html',
        'certifications': 'certifications.html',
        'internships': 'Internship.html',
        'projects': 'projects.html',
        'skills': 'skills.html',
        'hobbies': 'Hobbies.html',
        'education': 'education.html'
    },
    'Hobbies.html': {
        'home': 'index.html',
        'achievements': 'achievements.html',
        'certifications': 'certifications.html',
        'internships': 'Internship.html',
        'projects': 'projects.html',
        'skills': 'skills.html',
        'hobbies': 'Hobbies.html',
        'education': 'education.html'
    },
    'education.html': {
        'home': 'index.html',
        'achievements': 'achievements.html',
        'certifications': 'certifications.html',
        'internships': 'Internship.html',
        'projects': 'projects.html',
        'skills': 'skills.html',
        'hobbies': 'Hobbies.html',
        'education': 'education.html'
    },
    'certifications.html': {
        'home': 'index.html',
        'achievements': 'achievements.html',
        'certifications': 'certifications.html',
        'internships': 'Internship.html',
        'projects': 'projects.html',
        'skills': 'skills.html',
        'hobbies': 'Hobbies.html',
        'education': 'education.html'
    },
    'projects.html': {
        'home': 'index.html',
        'achievements': 'achievements.html',
        'certifications': 'certifications.html',
        'internships': 'Internship.html',
        'projects': 'projects.html',
        'skills': 'skills.html',
        'hobbies': 'Hobbies.html',
        'education': 'education.html'
    },
    'achievements.html': {
        'home': 'index.html',
        'achievements': 'achievements.html',
        'certifications': 'certifications.html',
        'internships': 'Internship.html',
        'projects': 'projects.html',
        'skills': 'skills.html',
        'hobbies': 'Hobbies.html',
        'education': 'education.html'
    }
};
    

    // Update navigation links based on current page
    function updateNavigation() {
        const currentPageMap = navigationMap[currentPage] || navigationMap['index.html'];
        
        navLinks.forEach(link => {
            const linkText = link.textContent.toLowerCase().trim();
            
            // Map link text to navigation keys
            let navKey;
            switch(linkText) {
                case 'home': navKey = 'home'; break;
                case 'achievements': navKey = 'achievements'; break;
                case 'certifications': navKey = 'certifications'; break;
                case 'internships': navKey = 'internships'; break;
                case 'projects': navKey = 'projects'; break;
                case 'skills': navKey = 'skills'; break;
                case 'hobbies': navKey = 'hobbies'; break;
                case 'education': navKey = 'education'; break;
                default: return; // Skip unknown links
            }
            
            // Update href attribute
            if (currentPageMap[navKey]) {
                link.href = currentPageMap[navKey];
            }
        });
    }
    
    // Function to check if a link is an external page link
    function isExternalPageLink(href) {
        return href && (
            href.endsWith('.html') || 
            href.includes('/') ||
            href.startsWith('http') ||
            (!href.startsWith('#'))
        );
    }
    
    // Function to check if a link is an internal section link AND the section exists
    function isValidInternalLink(href) {
        if (!href || !href.startsWith('#')) return false;
        const targetElement = document.querySelector(href);
        return targetElement !== null;
    }
    
    // Active link highlighting based on scroll position (only for same-page navigation)
    function highlightActiveNavItem() {
        const scrollPosition = window.scrollY;
        
        // Find which section is currently in view
        document.querySelectorAll('.content-section').forEach(section => {
            const sectionTop = section.offsetTop - 60;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        centerActiveLink(link);
                    }
                });
            }
        });
    }
    //active page 
    
    // Center active link in horizontal scroll
    function centerActiveLink(activeLink) {
        if (!activeLink || !navContainer) return;
        
        const linkParent = activeLink.parentElement;
        if (linkParent) {
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
    
    // Highlight current page in navigation
    function highlightCurrentPage() {
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const linkText = link.textContent.toLowerCase().trim();
            
            // Remove any existing active classes
            link.classList.remove('active');
            
            // Add active class based on current page and link type
            if (currentPage === 'index.html' || currentPage === '') {
                if (linkText === 'home') {
                    link.classList.add('active');
                    centerActiveLink(link);
                }
            } else if (linkHref === currentPage) {
                link.classList.add('active');
                centerActiveLink(link);
            }
        });
    }
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            console.log('Clicked link:', href, 'Current page:', currentPage); // Debug log
            
            // Handle external page links - let browser navigate normally
            if (isExternalPageLink(href)) {
                console.log('External link - allowing normal navigation'); // Debug log
                // Don't prevent default, let the browser handle it
                return true;
            }
            
            // Handle internal section links - only if section exists on current page
            if (isValidInternalLink(href)) {
                console.log('Valid internal link - smooth scrolling'); // Debug log
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                const navHeight = document.querySelector('nav')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                return false;
            }
            
            // For invalid internal links (sections that don't exist), allow normal navigation
            console.log('Invalid internal link - allowing normal navigation'); // Debug log
            return true;
        });
    });
    
    // Initial setup - update navigation first, then highlight
    updateNavigation();
    highlightCurrentPage();
    
    // Only add scroll listener if there are valid sections on the page
    if (document.querySelectorAll('.content-section[id]').length > 0) {
        highlightActiveNavItem();
        window.addEventListener('scroll', highlightActiveNavItem);
    }
    
    // Add keyboard navigation for horizontal scrolling
    if (navContainer) {
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
    }
    
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
                setTimeout(typeWriter, 150);
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

    // Month tab functionality for internship page (added from your internship page)
    const monthTabs = document.querySelectorAll('.month-tab');
    const monthContents = document.querySelectorAll('.month-content');
    
    monthTabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            monthTabs.forEach(t => t.classList.remove('active'));
            monthContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            if (monthContents[index]) {
                monthContents[index].classList.add('active');
            }
        });
    });

    // Form validation (for contact form)
    function validateForm() {
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');

        if (name && phone && message) {
            if (name.value.trim() === '') {
                alert('Please enter your name');
                name.focus();
                return false;
            }

            if (phone.value.trim() === '') {
                alert('Please enter your phone number');
                phone.focus();
                return false;
            }

            const phonePattern = /^[0-9]{10}$/;
            if (!phonePattern.test(phone.value.replace(/\D/g, ''))) {
                alert('Please enter a valid 10-digit phone number');
                phone.focus();
                return false;
            }

            if (message.value.trim() === '') {
                alert('Please enter your message');
                message.focus();
                return false;
            }
        }

        return true;
    }

    // Attach form validation to form if it exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
            }
        });
    }

    // Animation on scroll for internship cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.internship-card').forEach(card => {
        observer.observe(card);
    });
    
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
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            if (navContainer) navContainer.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active');
        });
    }
    
    // Ensure navbar is always horizontal scrolling on all screen sizes
    if (navContainer) {
        navContainer.style.overflowX = 'auto';
        navContainer.style.overflowY = 'hidden';
        navContainer.style.whiteSpace = 'nowrap';
    }
    
    // Make all nav items display inline and center them
    if (navMenu) {
        navMenu.style.display = 'flex';
        navMenu.style.flexWrap = 'nowrap';
        navMenu.style.justifyContent = 'center';
        navMenu.style.alignItems = 'center';
    }

    console.log('Navigation system initialized for:', currentPage);
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
