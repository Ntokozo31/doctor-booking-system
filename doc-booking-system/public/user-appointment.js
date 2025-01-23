// Get all appointments for the user
// Display appointments in the appointmentsContainer
document.addEventListener('DOMContentLoaded', function() {
    const appointmentsContainer = document.getElementById('appointmentsContainer');
    const noAppointments = document.getElementById('noAppointments');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const message = document.getElementById('showMessage').value;

    // We will use this function to get all appointments for the user
    const getAppointments = async () => {
        try {
            // Fetch all appointments for the user
            // We will use the /api/appointment/all endpoint
            // This endpoint is protected and requires the user to be authenticated
            // We will use the credentials: 'include' option to send the user's cookies
            // This will allow the server to verify the user's identity
            // The server will return a list of appointments for the user
            const response = await fetch('/api/appointment/all', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
                // Parse the JSON response
                const data = await response.json();

                // Check if the response is ok
                // If the response is ok, return the data
                // If the response is not ok, display an error message
                if (response.ok) {
                    return data;
                } else if (response.status === 401) {
                    showMessage.textContent = data.message;
                    showMessage.style.display = 'red';
                } else {
                    showMessage.textContent = data.message;
                    showMessage.style.display = 'none';
                }
        // If an error occurs, display an error message
        } catch (error) {
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
        }
    }

    // We will use this function to display the appointments in the appointmentsContainer
    // This function will be called after we get the appointments
    // The function will display the appointments in the appointmentsContainer
    // If there are no appointments, the function will display a message
    // The function will also add event listeners to the update and cancel buttons
    // The update and cancel buttons will call the updateAppointment and cancelAppointment functions
    function displayAppointments(appointments) {
        console.log('appointments:', appointments);
        if (!appointments || appointments.length === 0) {
            noAppointments.style.display = 'block';
            return;
        }

        // Loop through the appointments and display each appointment in the appointmentsContainer
        // For each appointment, create an appointment card
        // The appointment card will display the appointment details
        // The appointment card will also have update and cancel buttons
        // The update and cancel buttons will call the updateAppointment and cancelAppointment functions
        appointments.forEach(appointment => {
            const appointmentCard = document.createElement('div');
            appointmentCard.className = 'appointment-card';
            appointmentCard.innerHTML = `
                <h3>${appointment.doctorName}</h3>
                <h4>Speciality: ${appointment.speciality}</h3>
                <h4>Location: ${appointment.location}</h4>
                <h4>Date: ${appointment.days}</h4>
                <h4>Time: ${appointment.time}</h4>
                <h4>Status: ${appointment.status}</h4>
                <div class="appointment-actions">
                    <button onclick="updateAppointment(${appointment.id})">Update</button>
                    <button onclick="cancelAppointment(${appointment.id})">Cancel</button>
                </div>
            `;
            appointmentsContainer.appendChild(appointmentCard);
        });
    }

    // Call the getAppointments function to get all appointments for the user
    getAppointments().then(displayAppointments);

    // Add an event listener to the bookNowBtn  button
    // When the button is clicked, redirect the user to the bookings.html page
    bookNowBtn.addEventListener('click', function() {
        window.location.href = 'bookings.html';
    });
});

// Implement the updateAppointment
function updateAppointment(id) {
    alert(`Update appointment ${id}`);
}

// Implement the cancelAppointment
function cancelAppointment(id) {
    if (confirm(`Are you sure you want to cancel appointment ${id}?`)) {
        alert(`Appointment ${id} cancelled`);
    }
}