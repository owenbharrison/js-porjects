var keys = new Array(255);
keys.fill(false);
document.addEventListener("keydown", e=>keys[e.keyCode]=!0);
document.addEventListener("keyup", e=>keys[e.keyCode]=!1);
