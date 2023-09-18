function PopBashFunktion() {
    window.open('../html/ShellOfBash.html', '_blank', 'toolbar=no,scrollbars=no,top=100,left=100,width=850,height=450');
};

function changeIframeSource(url, self) {
    var iframe = document.getElementById('content-iframe');
    var umgebung = document.getElementById('title-page');
    var ausgewählt = document.getElementById(self)

    iframe.src = url;
    umgebung.textContent = self
    ausgewählt.style.backgroundColor = '#303030'

    var idList = [
        'Split', 'Comparison', 'Multi-line', 'Replacement', 'Substring-Extraction', 'Manipulations-Bibliothek'
    ];

    idList.forEach(function(id) {
        if (id !== self) {
            var element = document.getElementById(id);
            element.style.backgroundColor = '#292929';
        }
    });
}

function interactNav(burgerButton) {
    var isActive = burgerButton.classList.contains('active');

    burgerButton.classList.toggle('active');

    if(document.body.clientWidth > 600){
        if(!isActive){
            document.getElementById("nav").style.width = "250px";
            document.getElementById("page-content").style.marginLeft = "250px";
        } else {
            document.getElementById("nav").style.width = "0px";
            document.getElementById("page-content").style.marginLeft = "0px";
        }
    } else {
        if(!isActive){
            document.getElementById("nav").style.width = "100%";
            document.getElementById("page-content").style.marginLeft = "100%";
        } else {
            document.getElementById("nav").style.width = "0px";
            document.getElementById("page-content").style.marginLeft = "0px";
        } 
    }

}