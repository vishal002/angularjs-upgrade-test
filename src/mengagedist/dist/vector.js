/*
    Created by Raja on 2 Feb 2018
    Async load bundles into App with progress, where TreeShaking not possible
 */

const req = new XMLHttpRequest();
req.addEventListener("progress", function(event) {
    const progressHud = document.querySelector(".progress-value");
    if (event.lengthComputable) {
        const percentComplete = event.loaded / event.total;
        if (progressHud) {
            progressHud.style.width = (percentComplete*100)+"%";
            progressHud.classList.remove("indeterminate");
            progressHud.classList.add("determinate");
        }
    } else {
        progressHud.classList.add("indeterminate");
        progressHud.classList.remove("determinate");
    }
}, false);

req.open("GET", "mengagedist/dist/bundle.js");
req.send();
