// We use DomContentLoaded event to make sure the DOM is fully loaded before we run the code
// We get the profileContainer, profileInfo, updateProfileForm, usernameDisplay, emailDisplay, joinedDateDisplay, editProfileBtn, deleteProfileBtn, cancelUpdateBtn, usernameInput, emailInput, and message elements
document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.getElementById('profileContainer');
    const profileInfo = document.getElementById('profileInfo');
    const updateProfileForm = document.getElementById('updateProfileForm');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    const joinedDateDisplay = document.getElementById('joinedDateDisplay');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const deleteProfileBtn = document.getElementById('deleteProfileBtn');
    const cancelUpdateBtn = document.getElementById('cancelUpdate');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const message = document.getElementById('showMessage');

    // We initialize currentUser to null
    let currentUser = null;

    // We create a function to get the user profile
    // We make a GET request to the /api/auth/profile endpoint
    // We set credentials: 'include' to send cookies
    const getUserProfile = async () => {
        try {
            const response = await fetch('/api/auth/profile', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // We parse the response
            const data = await response.json();

            // If the response is ok we display the user profile
            // If the response is not ok we display an error message
            if (response.ok) {
                currentUser = data;
                displayUserProfile(data);
            } else {
                console.error('Error getting user profile:', data.message);
            }
        // Catch an errors and display an error message
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    // We create a function to display the user profile
    // We set the textContent of usernameDisplay, emailDisplay, and joinedDateDisplay
    // Set the textContent of usernameDisplay to `Username: ${user.username}`
    // Set the textContent of emailDisplay to `Email: ${user.email}`
    // Set the textContent of joinedDateDisplay to `Joined Date: ${new Date(user.joined_DocBook).toLocaleDateString()}`
    const displayUserProfile = (user) => {
        usernameDisplay.textContent = `Username: ${user.username}`;
        emailDisplay.textContent = `Email: ${user.email}`;
        joinedDateDisplay.textContent = `Joined Date: ${new Date(user.joined_DocBook).toLocaleDateString()}`;
    };

    // We create a function to update the user profile
    // Prevent the default form submission
    // Create an updatedUser object with the username and email values
    const updateUserProfile = async (event) => {
        event.preventDefault();
        const updatedUser = {
            username: usernameInput.value,
            email: emailInput.value,
        };

        try {

            // We make a PUT request to the /api/auth/profile/update endpoint
            // We set credentials: 'include' to send cookies
            // We set headers: 'Content-Type': 'application/json'
            // We set the body to the updatedUser object
            const response = await fetch('/api/auth/profile/update', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            // We parse the response
            const data = await response.json();

            // If the response is ok we get the user profile
            // Use await getUserProfile() to get the user profile
            // We hide the updateProfileForm and display the profileInfo
            // If the response is not ok we display an error message
            if (response.ok) {
                await getUserProfile();
                updateProfileForm.style.display = 'none';
                profileInfo.style.display = 'block';
            } else {
                console.error('Error updating profile:', data.message);
            }
        // Catch an errors and display an error message
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    // We create a function to delete the user profile
    const deleteUserProfile = async () => {
        try {
            // We make a DELETE request to the /api/auth/profile/delete endpoint
            // Set credentials: 'include' to send cookies
            // Set headers: 'Content-Type': 'application/json'
            const response = await fetch('/api/auth/profile/delete', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            //If the response is ok we display the message
            // Logout the user and redirect to the signup-login page
            if (response.ok) {
                window.location.href = 'signup-login.html';
            } else {
                const data = await response.json();
                console.error('Error deleting profile:', data.message);
            }
        // Catch an errors and display an error message
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    // Add event listeners to the editProfileBtn, cancelUpdateBtn, updateProfileForm, and deleteProfileBtn
    editProfileBtn.addEventListener('click', () => {
        usernameInput.value = currentUser.username;
        emailInput.value = currentUser.email;
        profileInfo.style.display = 'none';
        updateProfileForm.style.display = 'block';
    });

    // When the cancelUpdateBtn is clicked, we hide the updateProfileForm and display the profileInfo
    cancelUpdateBtn.addEventListener('click', () => {
        updateProfileForm.style.display = 'none';
        profileInfo.style.display = 'block';
    });

    // Update the user profile when the updateProfileForm is submitted
    // Delete the user profile when the deleteProfileBtn is clicked
    updateProfileForm.addEventListener('submit', updateUserProfile);
    deleteProfileBtn.addEventListener('click', deleteUserProfile);

    // Fetch and display the user profile on page load
    getUserProfile();
    message.texContent = data.message;
    message.style.color = 'green';
});