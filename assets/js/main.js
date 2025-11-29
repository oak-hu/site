// 1. Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("scroll-progress");
    if(bar) bar.style.width = scrolled + "%";
});

// 2. Sidenote Overlap Prevention
function preventOverlap() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        document.querySelectorAll('.sidenote').forEach(note => note.style.marginTop = '');
        return;
    }
    const notes = Array.from(document.querySelectorAll('.sidenote'))
                        .filter(n => n.offsetParent !== null);
    
    let lastBottom = 0;
    notes.forEach((note) => {
        note.style.marginTop = '0px'; 
        const rect = note.getBoundingClientRect();
        const top = rect.top + window.scrollY; 
        
        if (top < lastBottom + 10) {
            const overlap = (lastBottom + 10) - top;
            note.style.marginTop = `${overlap}px`;
            lastBottom = top + overlap + rect.height;
        } else {
            lastBottom = top + rect.height;
        }
    });
}

window.addEventListener('resize', preventOverlap);
window.addEventListener("orientationchange", () => setTimeout(preventOverlap, 100));
window.addEventListener('load', preventOverlap);

/*// 3. Gallery Logic (Only runs on gallery page)
async function loadGallery() {
    const grid = document.getElementById('gallery-grid');
    if(!grid) return; // Not on gallery page

    // CONFIGURATION: Change these to your repo details!
    const config = {
        username: 'oak-hu-demo', 
        repo: 'gallery-assets',
        folder: 'images'
    };
    
    // Add dummy fallback for now if you haven't set up the repo
    const status = document.getElementById('gallery-status');
    status.innerHTML = "Loading...";

    try {
        const apiUrl = `https://api.github.com/repos/${config.username}/${config.repo}/contents/${config.folder}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Repo not found');
        
        const data = await response.json();
        const images = data.filter(file => file.type === 'file' && /\.(jpg|jpeg|png|webp)$/i.test(file.name));

        status.style.display = 'none';
        images.forEach(img => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `<a href="${img.download_url}" target="_blank"><img src="${img.download_url}" loading="lazy"></a>`;
            grid.appendChild(div);
        });
    } catch (e) {
        status.innerHTML = "Demo Mode: Add your GitHub details in assets/js/main.js to see your real images.";
        // Fallback images
        [1,2,3,4].forEach(i => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `<img src="https://picsum.photos/400/400?random=${i}">`;
            grid.appendChild(div);
        });
    }
}

if(document.getElementById('gallery-grid')) loadGallery();*/
