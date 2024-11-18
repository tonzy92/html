fetch('https://www.googleapis.com/calendar/v3/calendars/ODlkMzQ1NWY1NzA5ZjJhMTcyNDk5Mzk0NTQ5OWM2MTk4M2NiZWE1MTUxOTViNmI0MDZkNGZjZTBiMGYzZDg1MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t/events?key=DEIN_API_KEY')
    .then(response => response.json())
    .then(data => {
        if (data.items) {
            const eventList = document.getElementById('event-list');

            // Alle Termine durchlaufen und anzeigen
            data.items.forEach(event => {
                const li = document.createElement('li');
                li.textContent = `${event.summary} - ${new Date(event.start.dateTime || event.start.date).toLocaleString()}`;
                eventList.appendChild(li);
            });
        } else {
            console.error('Keine Termine gefunden.');
        }
    })
    .catch(error => console.error('Fehler:', error));