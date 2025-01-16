// We register the user
// Get signupForm element by id
document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get user data username, email and password and assign it to userData
    const userData = {
        username: document.getElementById('signupName').value,
        email: document.getElementById('signupEmail').value,
        password: document.getElementById('signupPassword').value,
        message: document.getElementById('showMessage').value,
    };

    try {
        // Fetch request to register the user
        // We send the userData to the server
        // If the response is ok we display a succes message
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // We get the response data
        const data = await response.json();
        // If the response is ok we display a success message
        // If the response did not succeed we also display a message related to the error
        if (response.ok) {
            showMessage.textContent = data.message;
            showMessage.style.color = 'green';
        } else if (response.status === 400) {
            showMessage.textContent = data.message;
            showMessage.style.color = 'red';
        } else if (response.status === 422) {
            showMessage.textContent = data.message;
            showMessage.style.color = 'red';
        } else {
            showMessage.textContent = data.message;
            showMessage.style.color = 'red';
        }
    // If there is an error we catch the error and display a message
    } catch (error) {
        showMessage.textContent = 'Sorry something went wrong';
        showMessage.style.color = 'red';
    }
});

// login the user
document.getElementById('LoginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const loginUser = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('password').value
        }

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginUser)
        })

        const data = await response.json();

        if (response.ok) {
            showMessage.textContent = data.message;
            showMessage.style.color = 'green';
        } else {
            showMessage.textContent = data.message;
            showMessage.style.color = 'red';
        }
    } catch (error) {
        showMessage.textContent = 'Sorry something went wrong';
        showMessage.style.color = 'red';
    }

})


// add event listener
// Get loginTab, signupTab, loginTab, signupForm, elements by id
// Get passwordToggles by querySelectorAll

document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Add event listener to loginTab
    // Add event listener to loginTab
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });

    // Add event listener
    // Add event listener to signupTab
    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });
    // Loop through passwordToggles
    // Add event listener to passwordToggles
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

