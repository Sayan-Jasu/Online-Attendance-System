function showDialogue() {
    document.getElementById('attendanceForm').style.display = 'none';
    document.getElementById('dialogueBox').style.display = 'block';
}

document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentNameInput = document.getElementById('studentName');
    const studentIDInput = document.getElementById('studentID');

    const studentName = studentNameInput.value.trim();
    const studentID = studentIDInput.value.trim();

    if (studentName === '' || studentID === '') {
        alert('Please fill in all required fields');
        return;
    }

    // Send attendance data to the server using an AJAX request or fetch API
    // Replace 'YOUR_BACKEND_ENDPOINT' with the appropriate URL to connect to your backend
    fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ studentName, studentID })
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server (e.g., display success message)
            console.log(data);
            // Show the dialogue box indicating successful attendance recording
            document.getElementById('dialogueBox').style.display = 'block';
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error(error);
        });

    // Reset the form after submission
    studentNameInput.value = '';
    studentIDInput.value = '';
});