// We use DOMContentLoaded event to make sure the DOM is fully loaded before we run the code
// We get the appointment-form element and add an event listener to it
// Prevent the default form submission
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.appointment-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get the values of the speciality, location, days, time
        const appointmentData = {
            speciality: document.getElementById('specialty').value,
            location: document.getElementById('location').value,
            days: document.getElementById('days').value,
            time: document.getElementById('time').value,
            message: document.getElementById('showMessage').value,
        }

        try {
            // We make a POST request to our API endpoint
            // Use method: 'POST' to send the appointmentData
            // Set credentials: 'include' to send cookies
            // Set the Content-Type header to 'application/json'
            // We send the appointmentData as the request body
            const response = await fetch('/api/appointment/create', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            // We parse the response
            const data = await response.json();

            // If the response is ok, we display the message and redirect to user-appointment.html
            // If the response status is 401, we display an error message and redirect to home.html
            // If the response status is 400, we display an error message and redirect to home.html
            // If useer dont have an appointment, we display an error message and redirect to available-slots.html
            if (response.ok) {
                showMessage.textContent = data.message;
                showMessage.style.color = 'green';
                setTimeout(function () {
                    window.location.href = 'user-appointment.html'
                }, 7000);
            } else if (response.status === 401) {
                showMessage.textContent = data.message;
                showMessage.style.color = 'red';
                setTimeout(function () {
                    window.location.href = 'home.html'
                }, 4000);
            } else if (response.status === 400) {
                showMessage.textContent = data.message;
                showMessage.style.color = 'red';
                setTimeout(function () {
                    window.location.href = 'home.html'
                }, 4000);
            } else {
                showMessage.textContent = data.message;
                showMessage.style.color = 'red';
                setTimeout(function () {
                    window.location.href = 'available-slots.html'
                }, 4000);
            }
        // Catch any errors and display an error message
        } catch (error) {
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
            setTimeout(function () {
                window.location.href = 'home.html'
            }, 5000);
        }
    });
});