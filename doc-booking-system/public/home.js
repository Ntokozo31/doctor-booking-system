// We use DOMContentLoaded event to make sure the DOM is fully loaded before we run our script
// We get the logoutBtn element by its id
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');

    // We add an event listener to the logoutBtn
    logoutBtn.addEventListener('click', async function() {
        try {
            // We make a fetch request to our server to logout the user
            // Use the POST method to logout the user
            // Set the credentials to include
            // Set the content-type to application/json
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // We get the response from the server
            const data = await response.json();

            // If the response is ok we redirect the user to the login page
            // If not we log the error
            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                console.error('Error logging out:', data.message);
            }
        // Catch an error if its related to our server error
        } catch (error) {
            console.error('Error occurred:', error);
        }
    });
});


// Nav menu toggle
// Get query selector for nav-list
// Toggle the class show on nav-list
function toggleMenu() {
    const navLinks = document.querySelector('.nav-list');
    navLinks.classList.toggle('show');
}