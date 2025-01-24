document.addEventListener('DOMContentLoaded', function() {
    const slotSearchForm = document.getElementById('slotSearchForm');
    const slotsContainer = document.getElementById('slotsContainer');
    const showMessage = document.getElementById('showMessage');

    slotSearchForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        const availableSlots = {
            speciality: document.getElementById('speciality').value,
            location: document.getElementById('location').value,
            days: document.getElementById('days').value,
            time: document.getElementById('time').value,
        };

        try {
            const response = await fetch('/api/appointment/slots', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(availableSlots),
            });

            const data = await response.json();

            if (response.ok) {
                showMessage.textContent = data.message;
                showMessage.style.color = 'green';
                renderSlots(data.Details);
                return data;

            } else {
                showMessage.textContent = data.message;
                showMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error occurred:', error);
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
        }
    });

    function renderSlots(details) {
        slotsContainer.innerHTML = '';
        if (!details) {
            slotsContainer.textContent = 'Sorry No Slots Available Please Try To Book Another Date';
            return;
        }

        const slotElement = document.createElement('div');
        slotElement.className = 'slot';
        slotElement.innerHTML = `
            <h4>Doctor Name: ${details.doctorName}</h4>
            <p>Location: ${details.location}</h4>
            <p>Speciality: ${details.speciality}</h4>
            <p>Days: ${details.days.join(', ')}</h4>
            <p>Start Time: ${details.startTime}</h4>
            <h4>End Time: ${details.endTime}</h4>    
        `;
        slotsContainer.appendChild(slotElement);
    }
});
