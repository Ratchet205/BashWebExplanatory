function PopBashFunktion() {
    window.open('../html/ShellOfBash.html', '_blank', 'toolbar=no,scrollbars=no,top=100,left=100,width=850,height=450');
};

function changeIframeSource(url, self) {
    var iframe = document.getElementById('content-iframe');
    var titlePage = document.getElementById('title-page');
    var selected = document.getElementById(self)

    iframe.src = url;
    titlePage.textContent = self;
    selected.style.backgroundColor = '#303030';

    var idList = [
        'Split', 'Comparison', 'Multi-line', 'Replacement', 'Substring-Extraction', 'Manipulations-Bibliothek'
    ];

    idList.forEach(function (id) {
        if (id !== self) {
            var element = document.getElementById(id);
            element.style.backgroundColor = '#292929';
        }
    });

    closeNav();
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

window.addEventListener('resize', updateNav);