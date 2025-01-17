// We register the user
// Get signupForm element by id
document.addEventListener('DOMContentLoaded', () => {

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
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const loginUser = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value,
            message: document.getElementById('showMessage').value
        }

        try {
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
                localStorage.setItem('token', data.userToken);
            } else if (response.status === 404) {
                showMessage.textContent = data.message;
                showMessage.style.color = 'red';
            } else {
                showMessage.textContent = data.message
                showMessage.style.color = 'red'
            }
        } catch (error) {
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
        }
    });
});