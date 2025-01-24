document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.appointment-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const appointmentData = {
            speciality: document.getElementById('specialty').value,
            location: document.getElementById('location').value,
            days: document.getElementById('days').value,
            time: document.getElementById('time').value,
            message: document.getElementById('showMessage').value,
        }

        try {
            const response = await fetch('/api/appointment/create', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData),
            });

            const data = await response.json();

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
        } catch (error) {
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
            setTimeout(function () {
                window.location.href = 'home.html'
            }, 5000);
        }
    });
});