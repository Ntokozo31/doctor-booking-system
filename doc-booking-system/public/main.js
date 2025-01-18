// We register the user
// Use DOMContentloaded event to make sure the DOM is fully loaded before we start using the DOM
document.addEventListener('DOMContentLoaded', () => {
    // Get signupForm element and add an event listener to it
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
            // If the response is ok we display a green success message
            // If the response did not succeed we display a red message related to that error
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
        // If there is an internal error we catch it and display a red message
        } catch (error) {
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
        }
    });

    // login the user
    // Get loginForm element and add an event listener to it
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        // Get user data email and password and assign it to loginUser
        const loginUser = {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value,
            message: document.getElementById('showMessage').value
        }

        try {
            // Fetch request to login the user
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginUser)
            })
            // We get the response data
            const data = await response.json();

            // If the response is ok we display a green success message and log the user in
            // If the response did not succeed we display a red message related to that error
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
            // If there is an internal error we catch it and display a red message
        } catch (error) {
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
        }
    });
});