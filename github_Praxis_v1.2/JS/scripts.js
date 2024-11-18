window.onscroll = function() {
    var navbar = document.getElementById("navbar");
    var logo = document.getElementById("logo_shadow");

    if (window.scrollY > 100) {
        navbar.classList.add("shrink");
        logo.classList.add("shrink_logo");
        console.log("Logo und Navbar geschrumpft."); // Testausgabe
    } else {
        navbar.classList.remove("shrink");
        logo.classList.remove("shrink_logo");
        console.log("Logo und Navbar auf Standardgröße."); // Testausgabe
    }
};


window.onload = function() {
    // Aktueller Pfad der Seite
    let currentLocation = window.location.pathname;

    // Sonderfall für die Startseite
    if (currentLocation === "/" || currentLocation === "/index.html") {
        currentLocation = "/Marcella/HTML/index.html"; // Falls index.html aufgerufen wird, passe es an
    }

    // Alle Links innerhalb der Navigation
    const navLinks = document.querySelectorAll('.grid_nav_item a, .dropdown-content a');

    // Für jeden Link in der Navigation prüfen, ob der Pfad übereinstimmt
    navLinks.forEach(link => {
        // Hole den Pfad des Links ohne Berücksichtigung des Protokolls und des Hostnamens
        const linkPath = new URL(link.href).pathname;

        // Vergleich: Wenn der aktuelle Pfad den Pfad des Links enthält
        if (currentLocation.endsWith(linkPath)) {
            link.style.color = "rgb(156, 212, 203)"; // Link einfärben
        } else {
            link.style.color = "black"; // Andere Links bleiben schwarz
        }
    });

    // Button "Termine" einfärben, wenn einer der beiden Unterseiten aufgerufen ist
    const termineButton = document.querySelector('.dropbtn'); // Selektiere den "Termine"-Button
    if (currentLocation.endsWith("/Marcella/HTML/appointment_formular.html") || 
        currentLocation.endsWith("/Marcella/HTML/contact.html")) {
        termineButton.style.color = "rgb(156, 212, 203)"; // Button "Termine" einfärben
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".contact-form").addEventListener("submit", function (e) {
        e.preventDefault(); // Verhindert das Neuladen der Seite

        const formData = new FormData(this);

        fetch("contact.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Erfolgs- oder Fehlermeldung anzeigen
                if (data.status === "success") {
                    alert(data.message); // Erfolgsnachricht
                } else {
                    alert(data.message); // Fehlermeldung
                }
            })
            .catch((error) => {
                console.error("Fehler:", error);
                alert("Es gab ein Problem beim Senden der Nachricht.");
            });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".dropdown-menu");

    menuToggle.addEventListener("click", () => {
        const isMenuOpen = mobileMenu.style.display === "flex";
        mobileMenu.style.display = isMenuOpen ? "none" : "flex";
    });
});