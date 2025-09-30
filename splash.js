// Splash Screen Functionality

// Animate numbers counting up
function animateNumber(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString('ar-SA');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString('ar-SA');
    }
  }, 16);
}

// Start number animations when page loads
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const numbers = document.querySelectorAll('.stat-number');
    numbers.forEach(num => animateNumber(num));
  }, 1000);
});

// Enter app function
function enterApp() {
  const splash = document.getElementById('splashScreen');
  const mainApp = document.getElementById('mainApp');
  
  // Add fade out animation
  splash.classList.add('fade-out');
  
  // Wait for animation to complete
  setTimeout(() => {
    splash.style.display = 'none';
    mainApp.style.display = 'block';
    
    // Trigger map resize and zoom animation
    setTimeout(() => {
      if (window.investmentMap && window.ARAR_CENTER) {
        // First resize
        window.investmentMap.invalidateSize();
        console.log('Map invalidated');
        
        // Then zoom out and zoom in for dramatic effect
        window.investmentMap.setZoom(11, { animate: false });
        
        setTimeout(() => {
          window.investmentMap.flyTo(window.ARAR_CENTER, 13, {
            duration: 2.0,
            easeLinearity: 0.25
          });
          console.log('Flying to Arar city');
        }, 100);
      }
    }, 200);
    
    // Additional resize attempts to ensure map displays correctly
    setTimeout(() => {
      if (window.investmentMap) {
        window.investmentMap.invalidateSize();
      }
    }, 500);
    
    setTimeout(() => {
      if (window.investmentMap) {
        window.investmentMap.invalidateSize();
      }
    }, 1000);
  }, 500);
}

// Skip splash screen if URL has ?skip parameter (for testing)
if (window.location.search.includes('skip')) {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      enterApp();
    }, 100);
  });
}

// Auto-enter after 5 seconds (optional)
// Uncomment the following lines if you want auto-entry
/*
setTimeout(() => {
  enterApp();
}, 5000);
*/
