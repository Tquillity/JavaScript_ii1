export function checkAdminLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isAdmin = localStorage.getItem('isAdmin');
    if (isLoggedIn !== 'true' || isAdmin !== 'true') {
        window.location.href = 'index.html';
        alert('Please log in as admin to access this page.');
    }
}