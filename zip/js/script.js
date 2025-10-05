document.addEventListener('DOMContentLoaded', function() {
    const downloadBtns = document.querySelectorAll('.download-btn');
    const productImages = document.querySelectorAll('.product-image');
    
    // Image loading animation
    productImages.forEach(img => {
        const imageElement = img.querySelector('img');
        if (imageElement) {
            imageElement.addEventListener('load', function() {
                this.style.opacity = '1';
                img.classList.remove('image-loading');
            });
            
            // Add loading class if image hasn't loaded yet
            if (!imageElement.complete) {
                img.classList.add('image-loading');
                imageElement.style.opacity = '0';
            }
        }
    });
    
    // Download button functionality - FIXED VERSION
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default first
            
            // Get the file path from href attribute
            const filePath = this.getAttribute('href');
            
            // Extract filename from path
            const fileName = filePath.split('/').pop();
            
            // Create a temporary element to trigger download
            const tempLink = document.createElement('a');
            tempLink.href = filePath;
            tempLink.download = fileName;
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
                                    
            // Add animation effect to button
            const originalHTML = this.innerHTML;
            const originalBackground = this.style.background;
            this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            this.style.background = 'linear-gradient(45deg, #4cd964, #34c759)';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = originalBackground;
            }, 2000);
        });
    });
    
    // Add CSS for image loading state
    const style = document.createElement('style');
    style.textContent = `
        .image-loading {
            position: relative;
            overflow: hidden;
        }
        .image-loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: loading 1.5s infinite;
        }
        @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        :root {
            --success: #4cd964;
        }
    `;
    document.head.appendChild(style);
});
