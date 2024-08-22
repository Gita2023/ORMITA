document.addEventListener('DOMContentLoaded', (event) => {
    const getStartedBtn = document.getElementById('getStartedBtn');
    const signupModal = document.getElementById('signupModal');
    const closeBtn = document.querySelector('.modal .close');
    const signupToggle = document.getElementById('signupToggle');
    const signinToggle = document.getElementById('signinToggle');
    const signupForm = document.getElementById('signupForm');
    const signinForm = document.getElementById('signinForm');

    // Show signup modal when Get Started button is clicked
    getStartedBtn.addEventListener('click', () => {
        signupModal.style.display = 'block';
    });

    // Close modal when close button is clicked
    closeBtn.addEventListener('click', () => {
        signupModal.style.display = 'none';
    });

    // Switch to Signup form
    signupToggle.addEventListener('click', () => {
        signupForm.classList.add('active');
        signinForm.classList.remove('active');
        signupToggle.classList.add('active');
        signinToggle.classList.remove('active');
    });

    // Switch to Signin form
    signinToggle.addEventListener('click', () => {
        signupForm.classList.remove('active');
        signinForm.classList.add('active');
        signupToggle.classList.remove('active');
        signinToggle.classList.add('active');
    });

    // Close modal if clicked outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    // Handle Signup form submission
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Handle signup logic here (e.g., Firebase authentication)
        console.log('Signup form submitted');
        // You can add signup logic here
    });

    // Handle Signin form submission and redirect to P.html
    signinForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Handle signin logic here (e.g., Firebase authentication)
        console.log('Signin form submitted');
        // You can add signin logic here
        // On successful signin, redirect to P.html
        window.location.href = 'P.html';
    });
});
