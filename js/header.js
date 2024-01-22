export function initHeader() {
    const headerNav = ` 
    <nav class="headerNav">
        <div class="container"
            <ul class="menu">
                <li class="menu-item"><a href="index.html">Home</a></li>
                <li class="menu-item"><a href="courses.html">Courses</a></li>
                <li class="menu-item"><a href="admin-index.html">Admin</a></li>
                <li class="menu-item"><a href="login.html">Login</a></li>
                <li class="menu-item"><a href="user-creation.html">Create Account</a></li>
            </ul>
    </nav>
`;

    document.getElementById('header-nav-placeholder').innerHTML = headerNav;
}

document.addEventListener('DOMContentLoaded', initHeader);