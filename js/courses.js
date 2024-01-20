import HttpClient from "./http.js";
import { initHeader } from "./header.js";

const initPage = () => {
    // Initiating the header
    initHeader();

    const url = 'http://Localhost:3000/courses';
    const http = new HttpClient(url);


}

document.addEventListener('DOMContentLoaded', initPage);
