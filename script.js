document.addEventListener('DOMContentLoaded', () => {
    const spinButton = document.getElementById('spinButton');
    const foodSpinner = document.getElementById('foodSpinner');
    const resultDisplay = document.getElementById('result');
    const foodOptions = []; // Array to store food options

    // Populate foodOptions from HTML data attributes
    document.querySelectorAll('.spinner-section').forEach(section => {
        foodOptions.push(section.getAttribute('data-food'));
    });

    let currentRotation = 0; // Keep track of the spinner's current rotation

    spinButton.addEventListener('click', () => {
        spinButton.disabled = true; // Disable button during spin
        resultDisplay.textContent = "Spinning...";

        const numSections = foodOptions.length;
        const degreesPerSection = 360 / numSections;

        // Calculate a random target section
        const randomIndex = Math.floor(Math.random() * numSections);
        const selectedFood = foodOptions[randomIndex];

        // Calculate a new rotation that lands on the selected section
        // Add multiple full rotations to make it spin for a while
        // The - (degreesPerSection / 2) is to try and land the pointer in the middle of a slice
        let targetRotation = (360 * 5) + (360 - (randomIndex * degreesPerSection)) + (degreesPerSection / 2); // Spin at least 5 full rotations

        // Apply the rotation
        foodSpinner.style.transform = `rotate(${targetRotation}deg)`;

        // Listen for the end of the transition
        foodSpinner.addEventListener('transitionend', function handler() {
            // Remove listener to prevent multiple triggers
            foodSpinner.removeEventListener('transitionend', handler);

            // Re-enable the button
            spinButton.disabled = false;

            // Display the result
            resultDisplay.textContent = `You should eat: ${selectedFood}!`;

            // Reset the spinner's rotation to a visually correct position without a transition
            // This prevents the spinner from "unwinding" when spun again
            currentRotation = targetRotation % 360; // Get the effective rotation
            foodSpinner.style.transition = 'none'; // Disable transition temporarily
            foodSpinner.style.transform = `rotate(${currentRotation}deg)`;
            // Re-enable transition after a very short delay
            setTimeout(() => {
                foodSpinner.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
            }, 50);
        });
    });
});
