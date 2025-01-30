// Event listeners for navigation between pages
const recordBtn = document.getElementById('record-btn');
const recorderPage = document.getElementById('recorder-page');
const donationFormPage = document.getElementById('donation-form-page');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');
const recorderNameInput = document.getElementById('recorder-name');
const errorMessage = document.getElementById('error-message');
let recorderName = '';

// Open recorder name page when "Record" button is clicked
recordBtn.addEventListener('click', () => {
    document.getElementById('landing-page').classList.add('hidden');
    recorderPage.classList.remove('hidden');
});

// Proceed to donation form page when "Next" button is clicked
nextBtn.addEventListener('click', () => {
    // Validate recorder name input
    if (recorderNameInput.value.trim() === '') {
        errorMessage.classList.remove('hidden'); // Show error message
    } else {
        recorderName = recorderNameInput.value;
        errorMessage.classList.add('hidden'); // Hide error message
        recorderPage.classList.add('hidden');
        document.getElementById('recorder').value = recorderName;
        donationFormPage.classList.remove('hidden');
    }
});

// Go back to the landing page when "Back" button is clicked
backBtn.addEventListener('click', () => {
    recorderPage.classList.add('hidden');
    document.getElementById('landing-page').classList.remove('hidden');
});

// Handle donation submission
// document.getElementById('submit-btn').addEventListener('click', () => {
//     const donationData = {
//         donationType: document.getElementById('donation-type').value,
//         orgName: document.getElementById('org-name').value || 'Anonymous',
//         firstName: document.getElementById('first-name').value || 'Anonymous',
//         lastName: document.getElementById('last-name').value || 'Anonymous',
//         title: document.getElementById('title').value,
//         donationDate: document.getElementById('donation-date').value,
//         paymentMethod: document.getElementById('payment-method').value,
//         currency: document.getElementById('currency').value,
//         amount: document.getElementById('amount').value,
//         recorder: recorderName
//     };

//     console.log(donationData);  // Log donation data to verify submission

//     alert('Donation recorded successfully!');
//     // Optionally clear the form for a new entry
//     resetDonationForm();
// });

// Event listeners for the "Next" button click to trigger validation on the recorder name
nextBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    validateRecorderName();
});

// Event listener for the recorder name input field to trigger validation on "Enter" key press
recorderNameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        validateRecorderName();
    }
});

// Function to validate recorder name input
// Function to validate recorder name input
function validateRecorderName() {
    const recorderName = recorderNameInput.value.trim();
    const errorMessage = document.getElementById("error-message");
    const inputField = recorderNameInput;

    if (!recorderName) {
        // Show error message if name is empty
        errorMessage.classList.remove("hidden");
        inputField.classList.add("error-border"); // Add red border on error
    } else {
        // Hide error message and remove error border if name is valid
        errorMessage.classList.add("hidden");
        inputField.classList.remove("error-border");
        // Proceed to next step (move to donation form)
        recorderPage.classList.add("hidden");
        donationFormPage.classList.remove("hidden");
    }
}

// Get the donation type and organization name input elements
const donationTypeSelect = document.getElementById('donation-type');
const orgNameInput = document.getElementById('org-name');

// Function to toggle the organization name input based on donation type
function toggleOrgNameInput() {
    if (donationTypeSelect.value === 'individual') {
        // Disable and set the value of the organization name input to "Anonymous"
        orgNameInput.disabled = true;
        orgNameInput.value = 'N/A';
    } else if (donationTypeSelect.value === 'organization') {
        // Enable the organization name input, allowing user input
        orgNameInput.disabled = false;
        orgNameInput.value = ''; // Clear the value for organization name
    }
}

// Add event listener to donation type select to detect changes
donationTypeSelect.addEventListener('change', toggleOrgNameInput);
// Initial check when the page loads to set the correct state
toggleOrgNameInput();



// Event listener for "Back" button to return to the landing page
backBtn.addEventListener("click", () => {
    recorderPage.classList.add('hidden');
    document.getElementById('landing-page').classList.remove('hidden');
});

// Handle donation submission when submit button is clicked
document.getElementById('submit-btn').addEventListener('click', (event) => {
    // Prevent default form submission
    event.preventDefault();

    const email2Element = document.getElementById('email-2');
    const email2Value = email2Element ? email2Element.value : 'N/A';

    const mobileInput = document.getElementById('mobile');
    const amountInput = document.getElementById('amount');
    const mobileErrorMessage = document.getElementById('mobile-error-message');
    const amountErrorMessage = document.getElementById('amount-error-message');

    // Clear previous error states
    mobileInput.classList.remove('error-border');
    amountInput.classList.remove('error-border');
    mobileErrorMessage.classList.add('hidden');
    amountErrorMessage.classList.add('hidden');

    // Check if the mobile number and amount are empty
    if (mobileInput.value.trim() === '') {
        mobileInput.classList.add('error-border');
        mobileErrorMessage.classList.remove('hidden');
        mobileInput.focus(); // Focus on the mobile input field for correction
        return; // Prevent form submission
    }

    if (amountInput.value.trim() === '') {
        amountInput.classList.add('error-border');
        amountErrorMessage.classList.remove('hidden');
        amountInput.focus(); // Focus on the amount input field for correction
        return; // Prevent form submission
    }
    const donationData = {
        donationType: document.getElementById('donation-type').value,
        orgName: document.getElementById('org-name').value || 'N/A',
        firstName: document.getElementById('first-name').value || 'Anonymous',
        lastName: document.getElementById('last-name').value || 'Anonymous',
        title: document.getElementById('title').value || 'Anonymous',
        gender: document.getElementById('gender').value || 'Anonymous',
        address: document.getElementById('address').value || 'Anonymous',
        city: document.getElementById('city').value || 'Anonymous',
        country: document.getElementById('country').value || 'Anonymous',
        mobile: document.getElementById('mobile').value || 'Anonymous',
        whatsapp: document.getElementById('whatsapp').value || (document.getElementById('same-as-mobile').checked ? document.getElementById('mobile').value : 'N/A'),
        email: document.getElementById('email').value || 'Anonymous',
        email_2: email2Value,
        jobTitle: document.getElementById('job-title').value || 'Anonymous',
        employer: document.getElementById('employer').value || 'Anonymous',
        donorCategory: document.getElementById('donor-category').value || 'Anonymous',
        traditionalTitle: document.getElementById('traditional-title').value || 'Anonymous',
        reference: document.getElementById('reference').value || 'Anonymous',
        receiptNo: document.getElementById('receipt-no').value || 'N/A',
        description: document.getElementById('description').value || 'N/A',
        campaignEvent: document.getElementById('campaign-event').value || 'Anonymous',
        referredBy: document.getElementById('referred-by').value || 'N/A',
        moneyReceivedBy: document.getElementById('money-received-by').value || 'N/A',
        recorder: recorderName,  // Use the recorder name from the previous page
        donationDate: document.getElementById('donation-date').value || 'N/A',
        registryDate: document.getElementById('registering-date').value || 'N/A',
        paymentMethod: document.getElementById('payment-method').value,
        currency: document.getElementById('currency').value,
        amount: document.getElementById('amount').value
    };
    console.log(donationData);

    fetch('http://127.0.0.1:5000/submit_donation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(donationData)
    })
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data:', data);  // Log the response data from the server
            alert(data.message);
            resetDonationForm();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the donation.');
        });

        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('An error occurred while submitting the donation.');
        // });

});

// CODE FOR ADDING ADDITIONAL EMAIL

document.addEventListener('DOMContentLoaded', function () {
    const addEmailButton = document.getElementById('add-email');
    const additionalEmailContainer = document.getElementById('additional-email-container');

    addEmailButton.addEventListener('click', () => {
        // Check if the input already exists
        const existingInput = document.getElementById('email-2');
        if (existingInput) {
            // If input exists, remove it (toggle behavior)
            existingInput.parentElement.removeChild(existingInput);
        } else {
            // If no input exists, create it and append to the container
            const emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.id = 'email-2';
            emailInput.name = 'email-2';
            emailInput.placeholder = 'Enter second email';
            emailInput.required = true;

            additionalEmailContainer.appendChild(emailInput);
        }
    });
});

// Resetting the form

function resetDonationForm() {
    // Reset form fields
    document.getElementById('donation-type').value = '';
    document.getElementById('org-name').value = 'N/A';  // Set default value for 'N/A'
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('title').value = '';
    document.getElementById('donation-date').value = '';
    document.getElementById('payment-method').value = '';
    document.getElementById('currency').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('whatsapp').value = '';
    document.getElementById('email').value = '';
    document.getElementById('job-title').value = '';
    document.getElementById('employer').value = '';
    document.getElementById('donor-category').value = '';
    document.getElementById('traditional-title').value = '';
    document.getElementById('reference').value = '';
    document.getElementById('receipt-no').value = 'N/A';
    document.getElementById('description').value = '';
    document.getElementById('campaign-event').value = '';
    document.getElementById('referred-by').value = '';
    document.getElementById('money-received-by').value = '';
    // Add any other fields you want to reset
}


