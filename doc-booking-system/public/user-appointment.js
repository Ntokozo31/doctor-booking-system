// We use the DOMContentloaded event to make sure the DOM is fully Loaded before we run the code
document.addEventListener('DOMContentLoaded', function() {
    // We get the appointmentsContainer, noAppointments, and bookNowBtn elements
    const appointmentsContainer = document.getElementById('appointmentsContainer');
    const noAppointments = document.getElementById('noAppointments');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const message = document.getElementById('showMessage');

    // This function is used to get all appointments for the user
    const getAppointments = async () => {
        try {
            // We make a GET request to our API endpoint
            // We use method: 'GET' to get all appointments
            // We set credentials: 'include' to send cookies
            const response = await fetch('/api/appointment/all', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // We parse the response
            const data = await response.json();

            // If the response is ok we return the data
            // If the response status is 401, we display an error message
            if (response.ok) {
                return data;
            } else if (response.status === 401) {
                showMessage.textContent = data.message;
                showMessage.style.color = 'red'
            } else {
                showMessage.textContent = data.message;
                showMessage.style.color = 'red';
            }
        // Catch an errors and display an error message
        } catch (error) {
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
        }
    };

    // We display appointments in the appointmentsContainer
    function displayAppointments(appointments) {
        // If there are no appointments,  we show the noAppointments message
        if (!appointments || appointments.length === 0) {
            noAppointments.style.display = 'block';
            return;
        }

        // Clear the appointmentsContainer
        appointmentsContainer.innerHTML = '';

        // Loop through each appointment and create a card for it
        // We set the data-id attribute to the appointment id
        // We display the doctorName, speciality, location, days, time, and status
        appointments.forEach(appointment => {
            const appointmentCard = document.createElement('div');
            appointmentCard.className = 'appointment-card';
            appointmentCard.setAttribute('data-id', appointment._id);
            appointmentCard.innerHTML = `
                <h3>${appointment.doctorName}</h3>
                <h4>Speciality: ${appointment.speciality}</h4>
                <h4>Location: ${appointment.location}</h4>
                <h4>Date: ${appointment.days}</h4>
                <h4>Time: ${appointment.time}</h4>
                <h4>Status: ${appointment.status}</h4>
                <div class="appointment-actions">
                    <button onclick="cancelAppointment('${appointment._id}')">Cancel</button>
                </div>
            `;
            // We append the appointment card to the appointmentsContainer
            appointmentsContainer.appendChild(appointmentCard);
        });
    }

    // We fetch and display the appointments when the page loads
    getAppointments().then(displayAppointments);

    // Event listener for the "Book Now" button
    // If user dont have any appointments we redirect to bookings page to book an appointment
    bookNowBtn.addEventListener('click', function() {
        window.location.href = 'bookings.html';
    });
});