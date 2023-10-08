var shellWindow;

function PopBashFunktion() {
    if (shellWindow) {
        shellWindow.close();
    }
    shellWindow = window.open('./html/manipulation/ShellOfBash.html', '_blank', 'toolbar=no,scrollbars=no,top=250,left=500,width=850,height=450'); 
}

function  CloseBashFunktion() {
    if (shellWindow) {
        shellWindow.close();
    }
}

function changeIframeSource(url, title, selfID) {
    const navItems = document.getElementsByClassName("content-nav-item"); 
    var iframe = document.getElementById('content-iframe');
    var titlePage = document.getElementById('title-page');
    var selected = document.getElementById(selfID);
    var iframeCover = document.getElementById('iframe-cover');
    var burgerButton = document.getElementById("full-burger");
    var typingSpeed = 30;
    var typingProgress;
    var removalProgress;
    var oldLength;
    var removedText = false;

    document.getElementById("bash-shell-button").querySelector("button").style.display = "none";
    iframeCover.style.opacity = "100%";
    window.setTimeout(function(){
        iframe.src = url;

        for (let currentNavItem of navItems) {
            currentNavItem.style.backgroundColor = "#292929";
        }
        selected.style.backgroundColor = '#303030'; 

        window.setTimeout(function(){
            iframeCover.style.opacity = "0%";
            document.getElementById("bash-shell-button").style.height = "40px";
            document.getElementById("bash-shell-button").style.boxShadow = "0px 5px 17px 6px rgba(0,0,0,0.38)";
            document.getElementById("bash-shell-button").querySelector("button").style.display = "block";
        }, 100);
    }, 500);

    burgerButton.classList.remove('active');
    document.getElementById("page-content").style.marginLeft = "0px";

    typingProgress = 0;
    removalProgress = 0;
    oldLength = titlePage.textContent.length;
    removedText = false;
    const change = setInterval(function(){
        if(!removedText){
            titlePage.textContent = titlePage.textContent.slice(0, -1);
            removalProgress++;
            if(removalProgress > oldLength) removedText = true;
        } else {
            titlePage.textContent += title.charAt(typingProgress);
            typingProgress++;
        }

        if (removedText && typingProgress > title.length) {
            clearInterval(change);
        }
    }, typingSpeed);
}

function switchTLNandCN() {
    nav = document.getElementById("nav");
    if(nav.style.left == "-250px"){
        nav.style.left = "0px";
    } else {
        nav.style.left = "-250px";
    }
}

function interactNav(burgerButton) {
    var isActive = burgerButton.classList.contains('active');
    var bashShellButton = document.getElementById("bash-shell-button");

    burgerButton.classList.toggle('active');

    if (document.body.clientWidth > 600) {
        if (!isActive) {
            document.getElementById("page-content").style.marginLeft = "250px";
            bashShellButton.style.boxShadow = "none";
            bashShellButton.style.height = "0px";
            bashShellButton.querySelector("button").style.display = "none";
        } else {
            document.getElementById("page-content").style.marginLeft = "0px";
            bashShellButton.style.boxShadow = "0px 5px 17px 6px rgba(0,0,0,0.38)";
            bashShellButton.style.height = "40px";
            bashShellButton.querySelector("button").style.display = "block";
        }
    } else {
        if (!isActive) {
            document.getElementById("page-content").style.marginLeft = "100%";
            bashShellButton.style.boxShadow = "none";
            bashShellButton.style.height = "0px";
            bashShellButton.querySelector("button").style.display = "none";
        } else {
            document.getElementById("page-content").style.marginLeft = "0px";
            bashShellButton.style.boxShadow = "0px 5px 17px 6px rgba(0,0,0,0.38)";
            bashShellButton.style.height = "40px";
            bashShellButton.querySelector("button").style.display = "block";
        }
    }
}

function changeNavCategory(navToUse) {
    const navs = document.getElementsByClassName("content-nav"); 

    for (let currentNav of navs) {
        currentNav.style.display = "none";
    }

    document.getElementById(navToUse).style.display = "block";

    switchTLNandCN();
}

function loadNav() {
    var burgerButton = document.getElementById("full-burger");
    var bashShellButton = document.getElementById("bash-shell-button");

    if (document.body.clientWidth > 600) {
        document.getElementById("page-content").style.marginLeft = "250px";
        bashShellButton.style.boxShadow = "none";
        document.getElementById("bash-shell-button").style.height = "0px";
        bashShellButton.querySelector("button").style.display = "none";
        burgerButton.classList.add('active');
    } else {
        document.getElementById("page-content").style.marginLeft = "0px";
        bashShellButton.style.boxShadow = "0px 5px 17px 6px rgba(0,0,0,0.38)";
        document.getElementById("bash-shell-button").style.height = "40px";
        bashShellButton.querySelector("button").style.display = "block";
        burgerButton.classList.remove('active');
    }

    document.getElementById("stringManikure").style.display = "block";
}

function updateNav() {
    if(document.getElementById("full-burger") == null) return;
    var isActive = document.getElementById("full-burger").classList.contains('active');

    if (document.body.clientWidth > 600) {
        if (isActive) {
            document.getElementById("nav").style.width = "500px";
            document.getElementById("page-content").style.marginLeft = "250px";
        } else {
            document.getElementById("page-content").style.marginLeft = "0px";
        }
    } else {
        if (isActive) {
            document.getElementById("nav").style.width = "100%";
            document.getElementById("page-content").style.marginLeft = "100%";
        } else {
            document.getElementById("page-content").style.marginLeft = "0px";
        }
    }
}

function loadContent() {
    loadNav();
}

window.addEventListener('resize', updateNav);

/*
$('#content-iframe').contents().find('html').on('mousemove', function (e) { 
    mouseX = e.clientX; 
    mouseY = e.clientY;
})

setInterval(function() {
    var bashShellButton = document.getElementById("bash-shell-button");

    var bashShellButtonOffset = bashShellButton.offset();
    var bashShellButtonWidth = bashShellButton.width();
    var bashShellButtonHeight = bashShellButton.height();

    var bashShellButtonCenterX = bashShellButtonOffset.left + bashShellButtonWidth / 2;
    var bashShellButtonCenterY = bashShellButtonOffset.top + bashShellButtonHeight / 2;

    var a = bashShellButtonCenterX - mouseX;
    var b = bashShellButtonCenterY - onmousemove;
    
    var distance = Math.sqrt( a*a + b*b );

    if(distance < 250) {
        document.getElementById("bash-shell-button").style.height = "15px";
        bashShellButton.querySelector("button").style.display = "none";
    } else {
        document.getElementById("bash-shell-button").style.height = "40px";
        bashShellButton.querySelector("button").style.display = "block";
    }

    console.log("mouse location:", mouseX, mouseY);
    console.log("button location:", bashShellButtonCenterX, bashShellButtonCenterY);
    console.log("distance:", distance);
}, 600);*/