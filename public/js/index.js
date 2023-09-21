function PopBashFunktion() {
    const shellWindow = window.open('../html/ShellOfBash.html', '_blank', 'toolbar=no,scrollbars=no,top=250,left=500,width=850,height=450');
    
}

function changeIframeSource(url, self) {
    var iframe = document.getElementById('content-iframe');
    var titlePage = document.getElementById('title-page');
    var selected = document.getElementById(self);
    var iframeCover = document.getElementById('iframe-cover');
    var typingSpeed = 30;
    var typingProgress;
    var removalProgress;
    var oldLength;
    var removedText = false;

    iframeCover.style.opacity = "100%";
    window.setTimeout(function(){
        iframe.src = url;
        selected.style.backgroundColor = '#303030';
    
        var idList = [
            'Split', 'Comparison', 'Multi-Line', 'Replacement', 'Substring-Extraction', 'Manipulations-Bibliothek'
        ];
    
        idList.forEach(function (id) {
            if (id !== self) {
                var element = document.getElementById(id);
                element.style.backgroundColor = '#292929';
            }
        });    

        window.setTimeout(function(){
            iframeCover.style.opacity = "0%";
        }, 100);
    }, 500);

    closeNav();

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
            titlePage.textContent += self.charAt(typingProgress);
            typingProgress++;
        }

        if (removedText && typingProgress > self.length) {
            clearInterval(change);
        }
    }, typingSpeed);
}

function closeNav() {
    var burgerButton = document.getElementById("full-burger");
    burgerButton.classList.remove('active');

    if (document.body.clientWidth > 600) {
        document.getElementById("nav").style.width = "0px";
        document.getElementById("page-content").style.marginLeft = "0px";
    } else {
        document.getElementById("nav").style.width = "0px";
        document.getElementById("page-content").style.marginLeft = "0px";
    }
}

function interactNav(burgerButton) {
    var isActive = burgerButton.classList.contains('active');

    burgerButton.classList.toggle('active');

    if (document.body.clientWidth > 600) {
        if (!isActive) {
            document.getElementById("nav").style.width = "250px";
            document.getElementById("page-content").style.marginLeft = "250px";
        } else {
            document.getElementById("nav").style.width = "0px";
            document.getElementById("page-content").style.marginLeft = "0px";
        }
    } else {
        if (!isActive) {
            document.getElementById("nav").style.width = "100%";
            document.getElementById("page-content").style.marginLeft = "100%";
        } else {
            document.getElementById("nav").style.width = "0px";
            document.getElementById("page-content").style.marginLeft = "0px";
        }
    }

}

function loadNav() {
    var burgerButton = document.getElementById("full-burger");

    if (document.body.clientWidth > 600) {
        document.getElementById("nav").style.width = "250px";
        document.getElementById("page-content").style.marginLeft = "250px";
        burgerButton.classList.add('active');
    } else {
        document.getElementById("nav").style.width = "0px";
        document.getElementById("page-content").style.marginLeft = "0px";
        burgerButton.classList.remove('active');
    }
}

function updateNav() {
    var isActive = document.getElementById("full-burger").classList.contains('active');

    if (document.body.clientWidth > 600) {
        if (isActive) {
            document.getElementById("nav").style.width = "250px";
            document.getElementById("page-content").style.marginLeft = "250px";
        } else {
            document.getElementById("nav").style.width = "0px";
            document.getElementById("page-content").style.marginLeft = "0px";
        }
    } else {
        if (isActive) {
            document.getElementById("nav").style.width = "100%";
            document.getElementById("page-content").style.marginLeft = "100%";
        } else {
            document.getElementById("nav").style.width = "0px";
            document.getElementById("page-content").style.marginLeft = "0px";
        }
    }
}

function loadContent() {
    loadNav();
}

window.addEventListener('resize', updateNav);