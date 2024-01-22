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
            console.log('Login successful', user);
            console.log('isLoggedin', localStorage.getItem('isLoggedIn'));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'false');
            window.location.href = 'index.html';
        } else if (admin){
            console.log('login successful', admin);
            console.log('isLoggedin', localStorage.getItem('isLoggedIn'));
            console.log('isAdmin', localStorage.getItem('isAdmin'));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('isAdmin', 'true');
            window.location.href = 'admin-index.html';
        } else {
            alert('Login failed: Invalid email or password.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login error');
    }
}

export { handleLoginSubmit };