document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const animationToggle = document.getElementById('animation-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const bgColorPicker = document.getElementById('bg-color');
    const animateBtn = document.getElementById('animate-btn');
    const animatedBox = document.getElementById('animated-box');
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    // Load preferences from localStorage
    loadPreferences();
    
    // Event listeners
    animationToggle.addEventListener('change', toggleAnimations);
    themeToggle.addEventListener('change', toggleTheme);
    bgColorPicker.addEventListener('input', changeAccentColor);
    animateBtn.addEventListener('click', triggerBoxAnimation);
    
    // Add click animation to gallery images
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            if (animationsEnabled()) {
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 1000);
            }
        });
    });
    
    // Check if animations are enabled
    function animationsEnabled() {
        return localStorage.getItem('animationsEnabled') !== 'false';
    }
    
    // Load user preferences from localStorage
    function loadPreferences() {
        // Animation toggle
        if (localStorage.getItem('animationsEnabled') === 'false') {
            animationToggle.checked = false;
            document.body.classList.add('no-animations');
        } else {
            animationToggle.checked = true;
        }
        
        // Theme preference
        if (localStorage.getItem('darkMode') === 'true') {
            themeToggle.checked = true;
            document.body.classList.add('dark-mode');
        }
        
        // Accent color
        const savedColor = localStorage.getItem('accentColor');
        if (savedColor) {
            bgColorPicker.value = savedColor;
            applyAccentColor(savedColor);
        }
    }
    
    // Toggle animations on/off
    function toggleAnimations() {
        if (this.checked) {
            localStorage.setItem('animationsEnabled', 'true');
            document.body.classList.remove('no-animations');
        } else {
            localStorage.setItem('animationsEnabled', 'false');
            document.body.classList.add('no-animations');
        }
    }
    
    // Toggle dark/light theme
    function toggleTheme() {
        if (this.checked) {
            localStorage.setItem('darkMode', 'true');
            document.body.classList.add('dark-mode');
        } else {
            localStorage.setItem('darkMode', 'false');
            document.body.classList.remove('dark-mode');
        }
    }
    
    // Change accent color
    function changeAccentColor() {
        const color = this.value;
        localStorage.setItem('accentColor', color);
        applyAccentColor(color);
    }
    
    // Apply accent color to elements
    function applyAccentColor(color) {
        document.documentElement.style.setProperty('--accent-color', color);
        document.querySelectorAll('button, .box').forEach(el => {
            el.style.backgroundColor = color;
        });
    }
    
    // Trigger box animation
    function triggerBoxAnimation() {
        if (!animationsEnabled()) return;
        
        animatedBox.classList.add('animated');
        
        // Remove the class after animation completes to allow re-triggering
        setTimeout(() => {
            animatedBox.classList.remove('animated');
        }, 2000);
    }
    
    // Initialize accent color
    applyAccentColor(bgColorPicker.value);
});