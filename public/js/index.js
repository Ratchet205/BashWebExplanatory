// INTERACTIVE BASH SHELL
var shell_window;

function open_bash_shell_window() {
    if (shell_window) {
        shell_window.close();
    }
    shell_window = window.open('./html/extras/InteractiveShell.html', '_blank', 'toolbar=no,scrollbars=no,top=250,left=500,width=850,height=450'); 
}

function close_bash_shell_window() {
    if (shell_window) {
        shell_window.close();
    }
}

// NAV
function switch_nav_level() { //switches betweens categories and pages navs
    nav = document.getElementById("nav");
    if(nav.style.left == "-250px"){
        nav.style.left = "0px";
    } else {
        nav.style.left = "-250px";
    }
}

var pages = {
    "home-button" : ["home.html", "Home"],
    "split" : ["html/manipulation/split.html", "Split"],
    "comparison" : ["html/manipulation/comparison.html", "Comparison"],
    "multi-line" : ["html/manipulation/multi-line.html", "Multi-Line"],
    "replacement" : ["html/manipulation/replacement.html", "Replacement"],
    "substring-extraction" : ["html/manipulation/subextraction.html", "Substring-Extraction"],
    "manipulations-bibliothek" : ["html/manipulation/gesamtmanp.html", "Manipulations-Bibliothek"],
    "append-file" : ["html/files_directories/Bash_Append_to_File.html", "Append to File"],
    "check-dir-exists" : ["html/files_directories/Bash_Check_if_Directories_exist.html", "Check if Directories Exist"],
    "check-file-exists" : ["html/files_directories/Bash_Check_if_Files_exist.html", "Check if Files Exist"],
    "files-and-dir" : ["html/files_directories/Bash_Files_and_Directories.html", "Files and Directories"],
    "read-file-line-by-line" : ["html/files_directories/Bash_Read_File_Line_by_Line.html", "Read File Line by Line"],
    "awk" : ["html/advanced_level/awk.html", "AWK"],
    "debugging": ["html/advanced_level/debugging.html", "Debugging"],
    "grep": ["html/advanced_level/grep.html", "GREP"],
    "nohup": ["html/advanced_level/nohup.html", "NoHup"],
    "regex": ["html/advanced_level/regex.html", "REGEX"],
    "returncodes": ["html/advanced_level/returncodes.html", "Returncodes"],
    "sed": ["html/advanced_level/sed.html", "SED"],
    "pipes": ["html/pipes_buffering/pipes.html", "Pipes"],
    "buffering": ["html/pipes_buffering/buffering.html", "Buffering"]
};

function query_page_change(path) {
    const iframe = document.getElementById('content-iframe');
    iframe.src = pages[path][0];
}

function change_page_content(self) { //switches page nav
    if(self == null) {
        alert("Kein Dokument mit diesem Namen.");
        return;
    }
    const nav_items = document.getElementsByClassName("page-list-item"); 
    const iframe = document.getElementById('content-iframe');
    const page_title = document.getElementById('title-page');
    const content_border = document.getElementById('content-border');
    const full_burger = document.getElementById("full-burger");
    const bash_shell_button = document.getElementById("bash-shell-button");

    var typingSpeed = 30;
    var typingProgress;
    var removalProgress;
    var oldLength;
    var removedText = false;

    bash_shell_button.style.top = "0px";
    content_border.style.backgroundColor = "#292929";

    window.setTimeout(function(){
        iframe.src = pages[self.id][0];

        for (let currentNavItem of nav_items) {
            currentNavItem.style.backgroundColor = "#292929";
        }

        if(self.id != "home-button") self.style.backgroundColor = '#303030'; 

        window.setTimeout(function(){
            content_border.style.backgroundColor = "#29292900";
            bash_shell_button.style.top = "70px";
        }, 100);
    }, 500);

    full_burger.classList.remove('active');
    close_nav();

    typingProgress = 0;
    removalProgress = 0;
    oldLength = page_title.textContent.length;
    removedText = false;
    const change = setInterval(function(){
        if(!removedText){
            page_title.textContent = page_title.textContent.slice(0, -1);
            removalProgress++;
            if(removalProgress > oldLength) removedText = true;
        } else {
            page_title.textContent += pages[self.id][1].charAt(typingProgress);
            typingProgress++;
        }

        if (removedText && typingProgress > pages[self.id][1].length) {
            clearInterval(change);
        }
    }, typingSpeed);
}

/*function change_page_content(path) { //switches page nav
    const nav_items = document.getElementsByClassName("page-list-item"); 
    const iframe = document.getElementById('content-iframe');
    const page_title = document.getElementById('title-page');
    const content_border = document.getElementById('content-border');
    const full_burger = document.getElementById("full-burger");
    const bash_shell_button = document.getElementById("bash-shell-button");

    var typingSpeed = 30;
    var typingProgress;
    var removalProgress;
    var oldLength;
    var removedText = false;

    bash_shell_button.style.top = "0px";
    content_border.style.backgroundColor = "#292929";

    window.setTimeout(function(){
        iframe.src = pages[path][0];

        for (let currentNavItem of nav_items) {
            currentNavItem.style.backgroundColor = "#292929";
        }

        if(path != "home-button") document.getElementById(path).style.backgroundColor = '#303030'; 

        window.setTimeout(function(){
            content_border.style.backgroundColor = "#29292900";
            bash_shell_button.style.top = "70px";
        }, 100);
    }, 500);

    full_burger.classList.remove('active');
    close_nav();

    typingProgress = 0;
    removalProgress = 0;
    oldLength = page_title.textContent.length;
    removedText = false;
    const change = setInterval(function(){
        if(!removedText){
            page_title.textContent = page_title.textContent.slice(0, -1);
            removalProgress++;
            if(removalProgress > oldLength) removedText = true;
        } else {
            page_title.textContent += pages[path][1].charAt(typingProgress);
            typingProgress++;
        }

        if (removedText && typingProgress > pages[path][1].length) {
            clearInterval(change);
        }
    }, typingSpeed);
}*/

function switch_nav_category(navToUse) { //swichtes nav categories
    const navs = document.getElementsByClassName("page"); 

    for (let currentNav of navs) {
        currentNav.style.display = "none";
    }

    document.getElementById(navToUse).style.display = "block";

    switch_nav_level();
}

function interact_nav_button() { //opens/closes nav when pressing burger button
    var full_burger = document.getElementById("full-burger");
    var isActive = full_burger.classList.contains('active');
    var bash_shell_button = document.getElementById("bash-shell-button");

    full_burger.classList.toggle('active');

    if (!isActive) {
        if (document.body.clientWidth > 600) {
            open_nav();
        } else {
            open_nav();
        }
        bash_shell_button.style.top = "0px";
    } else {
        close_nav();
        bash_shell_button.style.top = "70px";
    }
}

function load_nav() { //changes nav opened/closed on load depending on device screen width
    var full_burger = document.getElementById("full-burger");
    var bash_shell_button = document.getElementById("bash-shell-button");

    if (document.body.clientWidth > 600) {
        open_nav();
        full_burger.classList.add('active');
        bash_shell_button.style.top = "0px";
    } else {
        close_nav();
        full_burger.classList.remove('active');
        bash_shell_button.style.top = "70px";
    }

    document.getElementById("string-manikure").style.display = "block";
}

function update_nav() { //changes nav size depending on window/screen width after resizing
    var full_burger = document.getElementById("full-burger");
    if(full_burger == null) return;
    var isActive = full_burger.classList.contains('active');

    if (isActive) {
        if (document.body.clientWidth > 600) {
            open_nav();
        } else {
            open_nav();
        }
    } else {
        close_nav();
    }
}

function open_nav() {
    document.getElementById("page-content").style.left = "250px";
    document.getElementById("content-border").style.left = "250px";
    document.getElementById("page-content").style.width = "calc(100vw - 1px - 250px)";
    document.getElementById("content-border").style.width = "calc(100vw - 2px - 250px)";
}

function close_nav() {
    document.getElementById("page-content").style.left = "1px";
    document.getElementById("content-border").style.left = "1px";
    document.getElementById("page-content").style.width = "calc(100vw - 2px)";
    document.getElementById("content-border").style.width = "calc(100vw - 3px)";
}

// GENERAL FUNCTIONS
window.addEventListener('resize', update_nav); //executes function on windows resize