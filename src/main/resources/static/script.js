document.getElementById('loginForm')?.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Send a POST request to the backend
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful.') {
        alert('Login successful! Redirecting...');
        window.location.href = 'manage-trips.html';
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('registerForm')?.addEventListener('submit', async function(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const roleInput = document.querySelector('input[name="role"]:checked'); // For radio buttons
  const usernameError = document.getElementById('usernameError');
  const passwordConfirmationError = document.getElementById('passwordConfirmationError');
  const roleError = document.getElementById('roleError');

  const username = usernameInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const role = roleInput?.value; // For radio buttons

  // Clear previous errors
  usernameError.textContent = '';
  usernameInput.classList.remove('error');
  passwordConfirmationError.textContent = '';
  passwordConfirmationError.style.display = 'none';
  passwordInput.classList.remove('error');
  confirmPasswordInput.classList.remove('error');
  roleError.textContent = '';
  roleError.style.display = 'none';

  // Validate role selection
  if (!role) {
    roleError.textContent = 'Please select a role.';
    roleError.style.display = 'block';
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    passwordConfirmationError.textContent = 'Passwords do not match.';
    passwordConfirmationError.style.display = 'block';
    passwordInput.classList.add('error');
    confirmPasswordInput.classList.add('error');
    return;
  }

  // Send a POST request to the server
  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role })
    });

    const data = await response.json();

    if (response.status === 409) {
      // Username already exists
      usernameError.textContent = 'Username is already in use.';
      usernameError.style.display = 'block';
      usernameInput.classList.add('error');
    } else if (response.status === 201) {
      alert('Registration successful!');
    } else {
      alert(data.message || 'An error occurred. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});