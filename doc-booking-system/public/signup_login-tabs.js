// We use DOMContentLoaded event to make sure the DOM is fully loaded before we run the code
// When the page loads, the login tab is active by default
// When the login tab is clicked, the login form is displayed and the signup form is hidden
// When the signup tab is clicked, the signup form is displayed and the login form is hidden
// When the password toggle is clicked, the password is shown or hidden
document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // By default, the login tab is active
    // When the login tab is clicked, the login form is displayed and the signup form is hidden
    // When the signup tab is clicked, the signup form is displayed and the login form is hidden
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });

    // When the signup tab is clicked, the signup form is displayed and the login form is hidden
    // When the login tab is clicked, the login form is displayed and the signup form is hidden
    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // When the password toggle is clicked, the password is shown or hidden
    // The password is shown when the eye icon is clicked
    // The password is hidden when the lock icon is clicked
    // The password is hidden by default
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                toggle.textContent = '🔒';
            } else {
                input.type = 'password';
                toggle.textContent = '👁️';
            }
        });
    });
});