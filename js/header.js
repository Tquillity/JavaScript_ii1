export function initHeader() {
    const headerNav = ` 
    <nav class="headerNav">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="courses.html">Courses</a></li>
            <li><a href="admin-index.html">Admin</a></li>
            <li><a href="login.html">Login</a></li>
        </ul>
    </nav>
`;

    document.getElementById('header-nav-placeholder').innerHTML = headerNav;
}

document.addEventListener('DOMContentLoaded', initHeader);