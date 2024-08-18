document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('userInput');
    const startBtn = document.querySelector('.start-btn');
    const countDownDisplay = document.getElementById('countDown');
    const endTimeDisplay = document.getElementById('endTime');

    let countdownInterval;

    const startTimer = (minutes) => {
        // Clear any existing interval
        clearInterval(countdownInterval);

        // Get the current time
        const now = new Date();
        
        // Calculate the end time
        const endTime = new Date(now.getTime() + minutes * 60000);
        
        // Display the end time
        const endHours = endTime.getHours().toString().padStart(2, '0');
        const endMinutes = endTime.getMinutes().toString().padStart(2, '0');
        endTimeDisplay.innerText = `End Time: ${endHours}:${endMinutes}`;

        // Start the countdown interval
        countdownInterval = setInterval(() => {
            const currentTime = new Date();
            const timeDiff = endTime - currentTime;

            if (timeDiff <= 0) {
                clearInterval(countdownInterval);
                countDownDisplay.innerText = `Time's up!`;
            } else {
                const minutesLeft = Math.floor(timeDiff / 60000);
                const secondsLeft = Math.floor((timeDiff % 60000) / 1000);
                countDownDisplay.innerText = `Remaining Time: ${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;
            }
        }, 1000);
    };

    // Event listener for the start button
    startBtn.addEventListener('click', () => {
        const inputValue = parseInt(inputField.value, 10);

        if (!isNaN(inputValue) && inputValue > 0) {
            startTimer(inputValue);
        } else {
            alert('Please enter a valid number of minutes.');
        }
    });

    // If you have default options, you can add click events for them
    const defaultTimers = document.querySelectorAll('.default-timer');
    defaultTimers.forEach(timer => {
        timer.addEventListener('click', () => {
            const minutes = parseInt(timer.dataset.minutes, 10);
            startTimer(minutes);
        });
    });
});
