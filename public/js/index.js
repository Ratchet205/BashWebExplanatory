function PopBashFunktion() {
    window.open('../html/ShellOfBash.html', '_blank', 'toolbar=no,scrollbars=no,top=100,left=100,width=850,height=450');
};

function changeIframeSource(url, self) {
    var iframe = document.getElementById('DASiframe');
    var umgebung = document.getElementById('umgebungU');
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