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
    // If we are in portrait mode (phones), just clear the styles and exit
    if (window.matchMedia("(orientation: portrait)").matches) {
        document.querySelectorAll('.sidenote').forEach(note => note.style.marginTop = '');
        return;
    }
    
    // Desktop logic: Calculate overlaps
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

// 3. Smart Resize Listener
let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) {
        preventOverlap();
        lastWidth = window.innerWidth;
    }
});

// Run on orientation change and load as normal
window.addEventListener("orientationchange", () => {
    setTimeout(preventOverlap, 100);
    lastWidth = window.innerWidth; // Update width after rotation
});
window.addEventListener('load', preventOverlap);
