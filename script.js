// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    authButtons.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Search Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Property Favorite Toggle
const favoriteIcons = document.querySelectorAll('.property-favorite i, .saved-actions .btn-danger');
favoriteIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        const heartIcon = icon.classList.contains('far') ? icon : icon.parentElement.querySelector('i');
        
        if (heartIcon) {
            heartIcon.classList.toggle('far');
            heartIcon.classList.toggle('fas');
            heartIcon.classList.toggle('active');
            
            if (heartIcon.classList.contains('active')) {
                heartIcon.style.color = '#F56565'; // Red color for active favorite
                showToast('Property added to favorites');
            } else {
                heartIcon.style.color = '';
                showToast('Property removed from favorites');
            }
        }
    });
});

// Property Card Click
const propertyCards = document.querySelectorAll('.property-card, .saved-item');
propertyCards.forEach(card => {
    card.addEventListener('click', () => {
        // In a real app, this would navigate to the property detail page
        console.log('Navigating to property detail page');
    });
});

// Form Submission
const propertyForm = document.getElementById('propertyForm');
if (propertyForm) {
    propertyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Form validation would go here
        showToast('Property listing submitted successfully!');
        propertyForm.reset();
    });
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Authentication logic would go here
        showToast('Logged in successfully!');
    });
}

// Password Toggle
const passwordToggle = document.querySelector('.password-toggle');
if (passwordToggle) {
    passwordToggle.addEventListener('click', () => {
        const passwordInput = document.getElementById('password');
        const icon = passwordToggle.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
}

// Photo Upload Preview
const photoUpload = document.querySelector('.photo-upload input[type="file"]');
if (photoUpload) {
    photoUpload.addEventListener('change', (e) => {
        const files = e.target.files;
        const uploadPreview = document.querySelector('.upload-preview');
        
        if (files.length > 0) {
            uploadPreview.innerHTML = '';
            
            for (let i = 0; i < Math.min(files.length, 5); i++) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.objectFit = 'cover';
                    img.style.margin = '5px';
                    img.style.borderRadius = '4px';
                    uploadPreview.appendChild(img);
                };
                reader.readAsDataURL(files[i]);
            }
            
            if (files.length > 5) {
                const remaining = document.createElement('div');
                remaining.textContent = `+${files.length - 5} more`;
                remaining.style.marginTop = '10px';
                uploadPreview.appendChild(remaining);
            }
        }
    });
}

// Chat Functionality
const conversations = document.querySelectorAll('.conversation');
if (conversations.length > 0) {
    conversations.forEach(convo => {
        convo.addEventListener('click', () => {
            conversations.forEach(c => c.classList.remove('active'));
            convo.classList.add('active');
            
            // In a real app, this would load the conversation messages
            document.querySelector('.conversation-badge')?.remove();
        });
    });
    
    // Send message functionality
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const messagesContainer = document.querySelector('.chat-messages');
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message sent';
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${message}</p>
                    <span class="message-time">${timeString}</span>
                </div>
            `;
            
            messagesContainer.appendChild(messageDiv);
            chatInput.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate reply after 1 second
            setTimeout(() => {
                const replies = [
                    "Thanks for your message!",
                    "I'll get back to you shortly.",
                    "Are you available for a viewing tomorrow?",
                    "The property is still available.",
                    "Let me check that for you."
                ];
                const reply = replies[Math.floor(Math.random() * replies.length)];
                
                const replyDiv = document.createElement('div');
                replyDiv.className = 'message received';
                replyDiv.innerHTML = `
                    <div class="message-content">
                        <p>${reply}</p>
                        <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                `;
                
                messagesContainer.appendChild(replyDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
    }
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            authButtons.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add toast styles dynamically
const toastStyles = document.createElement('style');
toastStyles.textContent = `
.toast-notification {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #2D3748;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
}
.toast-notification.show {
    opacity: 1;
}
`;
document.head.appendChild(toastStyles);

// Initialize with some saved properties if empty
document.addEventListener('DOMContentLoaded', () => {
    const savedProperties = document.querySelector('.saved-properties');
    const savedEmpty = document.querySelector('.saved-empty');
    
    if (savedProperties && savedEmpty && savedProperties.children.length === 0) {
        savedEmpty.style.display = 'block';
        savedProperties.style.display = 'none';
    } else if (savedProperties && savedEmpty) {
        savedEmpty.style.display = 'none';
        savedProperties.style.display = 'grid';
    }
});

// REGISTER BUTTON
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if(username && email && password) {
        // Add your registration logic/API call here
        console.log('Registration data:', { username, email, password });
        alert('Registration successful! (This is a demo)');
        this.reset();
    } else {
        alert('Please fill all fields');
    }
});