// We use DOMContentLoaded event to make sure the DOM is fully loaded before we run the code
// We get the slotSearchForm, slotsContainer, and showMessage elements
document.addEventListener('DOMContentLoaded', function() {
    const slotSearchForm = document.getElementById('slotSearchForm');
    const slotsContainer = document.getElementById('slotsContainer');
    const showMessage = document.getElementById('showMessage');

    // We add an event listener to the slotSearchForm
    // Prevent the default form submission
    // Get the values of the speciality, location, days, and time fields
    slotSearchForm.addEventListener('submit', async(event) => {
        event.preventDefault();
        const availableSlots = {
            speciality: document.getElementById('speciality').value,
            location: document.getElementById('location').value,
            days: document.getElementById('days').value,
            time: document.getElementById('time').value,
        };

        // We make a POST request to our API endpoint
        // Use method: 'POST' to send the availableSlots data
        // Set credentials: ''include' to send cookies
        // Set the Content-Type header to 'application/json'
        // We send the availableSlots data as the request body
        try {
            const response = await fetch('/api/appointment/slots', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(availableSlots),
            });

            // We parse the response
            const data = await response.json();

            // If the response is ok, we display the message and render the slots
            // If the response status is 401, we display an error message
            if (response.ok) {
                showMessage.textContent = data.message;
                showMessage.style.color = 'green';
                renderSlots(data.Details);
                return data;
            } else {
                showMessage.textContent = data.message;
                showMessage.style.color = 'red';
            }
        // Catch any errors and display an error message
        } catch (error) {
            console.error('Error occurred:', error);
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
        }
    });

    // This function is used to render the available slots
    // We clear the slosContainer
    // If there are no slots, we display a message
    // If there are slots, we render the slots delails
    function renderSlots(details) {
        slotsContainer.innerHTML = '';
        if (!details) {
            slotsContainer.textContent = 'Sorry No Slots Available Please Try To Book Another Date';
            return;
        }

        // Loop through each slot and create a slotElement
        // We set the slotElement innerHTML to the slot details
        // We display the doctorName, location, speciality, days, startTime, and endTime
        const slotElement = document.createElement('div');
        slotElement.className = 'slot';
        slotElement.innerHTML = `
            <h4>Doctor Name: ${details.doctorName}</h4>
            <h4>Location: ${details.location}</h4>
            <h4>Speciality: ${details.speciality}</h4>
            <h4>Days: ${details.days.join(', ')}</h4>
            <h4>Start Time: ${details.startTime}</h4>
            <h4>End Time: ${details.endTime}</h4>    
        `;
        // Append the slotElement to the slotsContainer
        slotsContainer.appendChild(slotElement);
    }
});
