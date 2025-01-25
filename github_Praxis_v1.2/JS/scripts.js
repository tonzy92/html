let lastScrollY = 0;

window.onscroll = function () {
    var navbar = document.getElementById("navbar");
    var navbar_grid = document.getElementById("navbar_grid");
    var logo = document.getElementById("logo_shadow");
    var button = document.getElementById("footer_button");

    if (window.scrollY > 100) {
        navbar.classList.add("shrink");
        navbar_grid.classList.add("shrink_nav");
        logo.classList.add("shrink_logo");
    } else {
        navbar.classList.remove("shrink");
        navbar_grid.classList.remove("shrink_nav");
        logo.classList.remove("shrink_logo");
    }

    if (window.scrollY < lastScrollY && window.scrollY <= 100) {
        button.classList.add("rotate_button");
    } else if (window.scrollY > 100) {
        button.classList.remove("rotate_button");
    }

    lastScrollY = window.scrollY;
};




document.querySelector(".arrow-wrap").addEventListener("click", function (event) {
    event.preventDefault(); // Standard-Link-Verhalten verhindern

    // Prüfen, ob der Benutzer oben oder unten ist
    if (window.scrollY === 0) {
        // Benutzer ist oben -> nach unten scrollen
        document.getElementById("bottom").scrollIntoView({ behavior: "smooth" });
    } else {
        // Benutzer ist nicht oben -> nach oben scrollen
        document.getElementById("top").scrollIntoView({ behavior: "smooth" });
    }
});


window.onload = function() {
    // Aktueller Pfad der Seite
    let currentLocation = window.location.pathname;

    // Sonderfall für die Startseite
    if (currentLocation === "/" || currentLocation === "/index.html") {
        currentLocation = "/Marcella/HTML/index.html"; // Falls index.html aufgerufen wird, passe es an
    }

    // Alle Links innerhalb der NaviSgation
    const navLinks = document.querySelectorAll('.grid_nav_item a, .dropdown-content a');

    // Für jeden Link in der Navigation prüfen, ob der Pfad übereinstimmt
    navLinks.forEach(link => {
        // Hole den Pfad des Links ohne Berücksichtigung des Protokolls und des Hostnamens
        const linkPath = new URL(link.href).pathname;

        // Vergleich: Wenn der aktuelle Pfad den Pfad des Links enthält
        if (currentLocation.endsWith(linkPath)) {
            link.style.color ="rgba(152, 114, 57, 0.73)"; // Link einfärben
        } else {
            link.style.color = "rgba(0, 0, 0, 0.65)"; // Andere Links bleiben schwarz
        }
    });
}; 






function toggleNav() {
    const button = document.getElementById("menuButton");
    const sidenav = document.getElementById("mySidenav");
    const menu = document.getElementById("mobile-menu");

    if (sidenav && button) {
        if (button.textContent === "☰") {
            sidenav.style.width = "100%";
            button.textContent = "✖";
        } else {
            sidenav.style.width = "0%";
            button.textContent = "☰";
        }
    }

    if (menu) {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    }
}


/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0%";
  }


  function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}


document.getElementById('menuButton').addEventListener('click', toggleNav);


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
    const button = document.querySelector('.team_text1_button');
    if (button) {
        button.addEventListener("click", toggleContainers);
    } else {
        console.error("Button mit der Klasse '.team_text1_button' wurde nicht gefunden.");
    }
});



let isLaufbahnVisible = false; // Status, ob der laufbahn_container sichtbar ist

function toggleContainers() {
    const teamText = document.querySelector('.grid_team_text1');
    const laufbahn = document.querySelector('.laufbahn_container');

    if (isLaufbahnVisible) {
        // Laufbahn ausblenden, Team-Text einblenden
        laufbahn.style.opacity = '0';
        laufbahn.style.zIndex = '0';
        teamText.style.opacity = '1';
        teamText.style.zIndex = '1';
    } else {
        // Team-Text ausblenden, Laufbahn einblenden
        teamText.style.opacity = '0';
        teamText.style.zIndex = '0';
        laufbahn.style.opacity = '1';
        laufbahn.style.zIndex = '2';
    }

    isLaufbahnVisible = !isLaufbahnVisible; // Status umschalten
}
