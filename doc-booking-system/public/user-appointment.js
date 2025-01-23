document.addEventListener('DOMContentLoaded', function() {
    const appointmentsContainer = document.getElementById('appointmentsContainer');
    const noAppointments = document.getElementById('noAppointments');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const message = document.getElementById('showMessage').value;

    const getAppointments = async () => {
        try {
            const response = await fetch('/api/appointment/all', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

                const data = await response.json();

                if (response.ok) {
                    return data;
                } else if (response.status === 401) {
                    showMessage.textContent = data.message;
                    showMessage.style.display = 'red';
                } else {
                    showMessage.textContent = data.message;
                    showMessage.style.display = 'none';
                }
        } catch (error) {
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
        }
    }

    function displayAppointments(appointments) {
        console.log('appointments:', appointments);
        if (!appointments || appointments.length === 0) {
            noAppointments.style.display = 'block';
            return;
        }

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

    getAppointments().then(displayAppointments);

    bookNowBtn.addEventListener('click', function() {
        window.location.href = 'available-slots.html';
    });
});

function updateAppointment(id) {
    alert(`Update appointment ${id}`);
    // Implement update logic here
}

function cancelAppointment(id) {
    if (confirm(`Are you sure you want to cancel appointment ${id}?`)) {
        alert(`Appointment ${id} cancelled`);
        // Implement cancellation logic here
    }
}