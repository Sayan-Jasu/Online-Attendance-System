function showDialogue(message) {
    document.getElementById('attendanceForm').style.display = 'none';
    const dialogueBox = document.getElementById('dialogueBox');
    dialogueBox.style.display = 'block';
    dialogueBox.textContent = message;
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

    fetch('/attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ studentName, studentID })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Attendance data sent successfully');
            showDialogue('Attendance recorded successfully');
        })
        .catch(error => {
            console.error('Error sending attendance data:', error);
            showDialogue('Error recording attendance. Please try again.');
        });
    studentNameInput.value = '';
    studentIDInput.value = '';
});
