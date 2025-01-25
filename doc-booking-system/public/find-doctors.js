// We use DOMContentLoaded event to make sure the DOM is fully loaded before we run the code
// We get the doctorSearchForm, doctorsContainer and showMessage elements
document.addEventListener('DOMContentLoaded', function() {
    const locationSearchForm = document.getElementById('doctorSearchForm');
    const doctorsContainer = document.getElementById('doctorsContainer');
    const showMessage = document.getElementById('showMessage');

    // We add an event listener to the doctorSearchForm
    // Prevent the default form submission
    // Get the value of the location field
    locationSearchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const location = document.getElementById('location').value;

        // Doctors container and showMessage elements are cleared
        doctorsContainer.innerHTML = '';
        showMessage.textContent = '';

        try {
            // We make a GET request to our API endpoint with the location as a parameter
            // Use method: 'GET' to get the location data
            // Set the Content-Type header to 'application/json'
            const response = await fetch(`/api/doctor/doc/${location}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            // We parse the response
            const data = await response.json();

            // If the response is ok, we display the message and render the doctors
            // If the response status is 400, we display an error message
            if (response.ok) {
                showMessage.textContent = 'Doctors found:';
                showMessage.style.color = 'green';
                renderDoctors(data);
            } else {
                showMessage.textContent = data.message;
                showMessage.style.color = 'red';
            }
        // Catch any errors that occur
        } catch (error) {
            console.error('Error occurred:', error);
            showMessage.textContent = 'Sorry something went wrong';
            showMessage.style.color = 'red';
        }
    });

    // Function to render doctors
    // We clear the doctorsContainer
    // If there are no doctors found, we display a message
    // If there are doctors found, we display the doctor's name, specialty, location, experience, and availability
    function renderDoctors(doctors) {
        doctorsContainer.innerHTML = '';
        if (doctors.length === 0) {
            doctorsContainer.textContent = 'No doctors found in the specified location.';
            return;
        }

        // We loop through the doctors array and display the doctor's name, specialty, location, experience, and availability
        doctors.forEach(doctor => {
            const doctorElement = document.createElement('div');
            doctorElement.className = 'doctor';
            doctorElement.innerHTML = `
                <h4>Name: ${doctor.name}</h4>
                <h4>Speciality: ${doctor.speciality}</h4>
                <h4>Location: ${doctor.location}</h4>
                <h4>experience: ${doctor.experience}</h4>
                <h4>Availability:</h4>
                <ul>
                    <li><h4>Days: ${doctor.availability.days.join(', ')}</h4></li>
                    <li><h4>Start Time: ${doctor.availability.startTime}</h4></li>
                    <li><h4>End Time: ${doctor.availability.endTime}</h4></li>
                </ul>
            `;
            // Append the doctorElement to the doctorsContainer
            doctorsContainer.appendChild(doctorElement);
        });
    }
});