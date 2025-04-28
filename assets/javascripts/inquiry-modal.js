document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.getElementById('hero');
  const heroBg = document.getElementById('hero-bg');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const contactBtn = document.getElementById('contact-btn');
  const inquiryModal = document.getElementById('inquiry-modal');
  const closeModal = document.getElementById('close-modal');
  const inquiryForm = document.getElementById('inquiry-form');
  
  // Hero slider images
  const images = [
    baseUrl + '/assets/images/hero-bg1.avif',
    baseUrl + '/assets/images/hero-bg2.avif',
    baseUrl + '/assets/images/hero-bg3.avif',
    baseUrl + '/assets/images/hero-bg4.avif'
  ];
  let currentIndex = 0;
  let isTransitioning = false;
  
  // Set initial background
  heroBg.style.backgroundImage = `url('${images[currentIndex]}')`;
  
  // Function to change background with crossfade effect
  function changeBackground(newIndex) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Create overlay div for crossfade effect
    const nextImage = document.createElement('div');
    nextImage.style.position = 'absolute';
    nextImage.style.inset = '0';
    nextImage.style.backgroundImage = `url('${images[newIndex]}')`;
    nextImage.style.backgroundSize = 'cover';
    nextImage.style.backgroundPosition = 'center';
    nextImage.style.transition = 'opacity 1.5s ease-in-out';
    nextImage.style.opacity = '0';
    nextImage.style.zIndex = '0';
    
    // Add overlay to hero section
    heroSection.appendChild(nextImage);
    
    // Small delay to ensure the element is rendered before starting transition
    setTimeout(() => {
      nextImage.style.opacity = '1';
    }, 10);
    
    // After transition completes
    setTimeout(() => {
      // Update the main background
      heroBg.style.backgroundImage = `url('${images[newIndex]}')`;
      // Remove the temporary overlay
      heroSection.removeChild(nextImage);
      // Update the current index
      currentIndex = newIndex;
      isTransitioning = false;
    }, 1500);
  }
  
  // Go to next image
  function nextImage() {
    const nextIndex = (currentIndex + 1) % images.length;
    changeBackground(nextIndex);
  }
  
  // Go to previous image
  function prevImage() {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    changeBackground(prevIndex);
  }
  
  // Add click event listeners to navigation buttons
  nextBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    nextImage();
    autoSlideInterval = setInterval(nextImage, 7000);
  });
  
  prevBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    prevImage();
    autoSlideInterval = setInterval(nextImage, 7000);
  });
  
  // Modal functionality
  contactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    inquiryModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
  
  closeModal.addEventListener('click', () => {
    inquiryModal.classList.add('hidden');
    document.body.style.overflow = '';
  });
  
  inquiryModal.addEventListener('click', (e) => {
    if (e.target === inquiryModal) {
      inquiryModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
  
  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const budget = document.getElementById('budget').value;
    const duration = document.getElementById('duration').value;
    
    // Get selected addons
    const addons = Array.from(document.querySelectorAll('input[name="addons"]:checked'))
      .map(checkbox => checkbox.value);
    
    // Create WhatsApp message
    let message = `Halo! Saya ${name} tertarik dengan paket wisata Bali.\n\n`;
    message += `Budget: ${budget}\n`;
    message += `Durasi: ${duration}\n`;
    if (addons.length > 0) {
      message += `Fasilitas tambahan: ${addons.join(', ')}\n`;
    }
    message += `\nBisakah Anda memberi informasi lebih lanjut?`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Close modal
    inquiryModal.classList.add('hidden');
    document.body.style.overflow = '';
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/628123456789?text=${encodedMessage}`, '_blank');
  });
  
  // Change background every 7 seconds
  let autoSlideInterval = setInterval(nextImage, 7000);
});