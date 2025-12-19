function check() {
    var searchTerm = document.getElementById('searchInput').value.trim();
    
    // Define game pages and their corresponding names
    if (searchTerm.toLowerCase() === 'rock paper scissors') {
        window.open('rps.html', '_self');
    } else if (searchTerm.toLowerCase() === 'atlas') {
        window.open('Atlas.html', '_self');
    } else if (searchTerm.toLowerCase() === 'odds and evens') {
        window.open('odds_evens.html', '_self');
    } else if (searchTerm.toLowerCase() === 'simon') {
        window.open('simon.html', '_self');
    } else if (searchTerm.toLowerCase() === 'tic') {
        window.open('tic.html', '_self');
    } else if (searchTerm.toLowerCase() === 'guess the word') {
        window.open('Hangman.html', '_self');
    } else {
        // If not found, display an alert
        alert('Game not found!');
    }
}