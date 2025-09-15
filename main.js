
document.addEventListener('DOMContentLoaded', function() {
    const profileTab = document.getElementById('profileTab');
    const passwordTab = document.getElementById('passwordTab');
    const profileContent = document.getElementById('profileContent');
    const passwordContent = document.getElementById('passwordContent');

    profileTab.addEventListener('click', function() {
        profileTab.classList.add('active');
        passwordTab.classList.remove('active');
        profileContent.classList.add('active');
        passwordContent.classList.remove('active');
    });

    passwordTab.addEventListener('click', function() {
        passwordTab.classList.add('active');
        profileTab.classList.remove('active');
        passwordContent.classList.add('active');
        profileContent.classList.remove('active');
    });

  
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    darkModeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode', darkModeSwitch.checked);
    });
});

// Profile form submission
document.addEventListener('DOMContentLoaded', function() {
  

    // Handle profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Profile information saved!');
            
        });
    }
});