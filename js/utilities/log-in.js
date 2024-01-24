import HttpClient from "./http.js";

async function handleLoginSubmit(event) {
    event.preventDefault();

    const email = document.querySelector('#loginEmail').value;
    const password = document.querySelector('#loginPassword').value;

    // HttpClient is initialized for users and admins separately
    const userClient = new HttpClient('http://localhost:3000/users');
    const adminClient = new HttpClient('http://localhost:3000/adminUsers');

    try {
        const users = await userClient.get();
        const admins = await adminClient.get();

        const user = users.find(user => user.email === email && user.password === password);
        const admin = admins.find(admin => admin.email === email && admin.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('userEmail', email);
            window.location.href = 'courses.html';
        } else if (admin){
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('adminEmail', email);
            window.location.href = 'admin-index.html';
        } else {
            alert('Login failed: Invalid email or password.');
        }
    } catch (error) {
        alert('Login error');
    }
}

export { handleLoginSubmit };