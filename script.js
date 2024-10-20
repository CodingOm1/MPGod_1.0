// Function to filter papers based on class
function filterPapersByClass() {
    const selectedClass = document.getElementById('class').value;
    const papers = document.querySelectorAll('.paper');
    
    papers.forEach(paper => {
        const paperClass = paper.querySelector('h3').textContent;
        if (paperClass === selectedClass || selectedClass === 'all') {
            paper.style.display = 'flex'; // Show matching paper
        } else {
            paper.style.display = 'none'; // Hide non-matching paper
        }
    });
}

// Function to initialize the search bar filter
function initializeSearchFilter() {
    const searchButton = document.querySelector('.search_bar button');
    
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        filterPapersByClass(); // Apply filter when "Search" button is clicked
    });
}

// Function to handle downloading the paper
function downloadPaper(imageSrc, fileName) {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to initialize the download buttons
function initializeDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.paper_info button');
    
    downloadButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const paper = button.closest('.paper');
            const imageSrc = paper.querySelector('.paper_preview img').src;
            const paperTitle = paper.querySelector('h2').textContent;
            const paperClass = paper.querySelector('h3').textContent;
            const fileName = `${paperClass}_${paperTitle}.jpg`; // Customize file name
            
            downloadPaper(imageSrc, fileName); // Trigger download
        });
    });
}

// Function to initialize the script
function initialize() {
    initializeSearchFilter();
    initializeDownloadButtons();
}

document.addEventListener("DOMContentLoaded", function() {
    const papersContainer = document.getElementById("papers-container");

    // Get papers from localStorage
    let papers = JSON.parse(localStorage.getItem("papers")) || [];

    // Loop through each paper and add it to the DOM
    papers.forEach(paper => {
        const paperDiv = document.createElement("div");
        paperDiv.classList.add("paper");
        paperDiv.innerHTML = `
            <div class="paper_preview">
                <img src="${paper.imageUrl}" alt="">
            </div>
            <div class="paper_info">
                <h3>${paper.class}</h3>
                <h2>${paper.subject}</h2>
                <p>${paper.year}</p>
                <button>Download</button>
            </div>
        `;
        papersContainer.appendChild(paperDiv);
    });
});


// Call initialize when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initialize);

