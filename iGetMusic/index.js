document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('downloadBtn');
    const urlInput = document.getElementById('input');
    const outputDiv = document.getElementById('output');
    const spinner = document.querySelector('.spinner');

    button.addEventListener('click', () => {
        const videoUrl = urlInput.value.trim();
        if (!videoUrl) {
            console.error('Please enter a valid video URL.');
            return;
        }

        // Extract the video ID from the URL
        const videoIdMatch = videoUrl.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (!videoId) {
            console.error('Invalid video ID.');
            return;
        }

        // Show spinner
        spinner.style.display = 'block';

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                // Hide spinner
                spinner.style.display = 'none';
                
                if (this.status === 200) {
                    const response = JSON.parse(this.responseText);
                    console.log(response);  // Log the output to the console
                    outputDiv.textContent = JSON.stringify(response, null, 2); // Display the response in the output div
                } else {
                    console.error(`Error: ${this.status} - ${this.statusText}`);
                    outputDiv.textContent = `Error: ${this.status} - ${this.statusText}`;
                }
            }
        });

        xhr.open('GET', `https://yt-api.p.rapidapi.com/dl?id=${videoId}`);
        xhr.setRequestHeader('x-rapidapi-key', 'a22a23b675msh6fe4b1451059ea6p13d261jsncb047d13849a');
        xhr.setRequestHeader('x-rapidapi-host', 'yt-api.p.rapidapi.com');

        xhr.send(null);  // Send the request
    });
});
