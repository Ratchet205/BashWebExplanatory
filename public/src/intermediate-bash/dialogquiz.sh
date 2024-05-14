#!/bin/bash

Antwort_Pruefen() {
    local Option="$1"
    local RichtigeAntwort="$2"
    local Frage="$3"
    
    if [ "$Option" == "$RichtigeAntwort" ]; then
        dialog --colors --title "\Z2 Richtig!" --infobox "" 1 30 
        sleep 1
        counter=$(($counter+1))
    else
        dialog --colors --title "\Z1Deine Antwort war leider falsch." --msgbox "Z0$Frage\n\Z2$RichtigeAntwort" 15 105
    fi
}

Resultat(){
    echo "123"
    dialog --gauge "Resultat:" 7 30 $percentage 
}
    

#Bash Argumente
#######################################################

Aufgaben_BashArgumente() {
    counter=0
    Frage='Welche spezielle Variable gibt die Anzahl der übergebenen Argumente in einem Bash-Skript an?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '$#' '' \
        '$@' '' \
        '$*' '' \
        '$0' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '$#' "$Frage"




    Frage='Wie werden positionale Argumente in Bash-Skripten gespeichert?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        'In der Variable $@' '' \
        'In der Variable $*' '' \
        'In der Reihenfolge, in der sie übergeben wurden, in speziellen Variablen' '' \
        'In der Variable $#' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'In der Reihenfolge, in der sie übergeben wurden, in speziellen Variablen' "$Frage"

    Frage='Welche spezielle Variable gibt alle übergebenen Argumente als separate Wörter zurück?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '$#' '' \
        '$@' '' \
        '$*' '' \
        '$0' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '$@' "$Frage"

    Frage='Wenn ein Bash-Skript mit den Argumenten "arg1 arg2 arg3" ausgeführt wird, wie lautet der Wert von $2 im Skript?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        'arg1' '' \
        'arg2' '' \
        'arg3' '' \
        'arg0' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'arg2' "$Frage"

    Frage='Welche spezielle Variable gibt den Namen des Skripts selbst in einem Bash-Skript zurück?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '$#' '' \
        '$@' '' \
        '$*' '' \
        '$0' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '$0' "$Frage"

    Frage='Welche Variable wird verwendet, um auf das erste positionale Argument in einem Bash-Skript zuzugreifen?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '$0' '' \
        '$1' '' \
        '$2' '' \
        '$#' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '$1' "$Frage"

    Frage='Wie lautet der Exit-Code des letzten ausgeführten Befehls in einem Bash-Skript?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '$#' '' \
        '$@' '' \
        '$?' '' \
        '$0' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '$?' "$Frage"
    
    Frage='Welche spezielle Variable gibt alle übergebenen Argumente als einzelne Zeichenkette zurück?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '$#' '' \
        '$@' '' \
        '$*' '' \
        '$0' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '$*' "$Frage"

    Frage='Wie werden optionale Argumente in Bash-Skripten oft gekennzeichnet?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        'Mit dem Flag ":"' '' \
        'Mit dem Flag "--"' '' \
        'Mit dem Flag ","' '' \
        'Mit dem Flag ";"' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'Mit dem Flag "--"' "$Frage"

    Frage='Welche spezielle Variable gibt Informationen über den Namen des Skripts selbst zurück?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '$#' '' \
        '$@' '' \
        '$*' '' \
        '$0' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '$*' "$Frage"
    percentage=$(printf "%.0f" "$(echo "($counter / 10 * 100)" | bc -l)")
    dialog --gauge "Resultat:" 7 30 $percentage 

}




Positionale_Argumente() {

    dialog --colors --title "\Zb\ZuPositionale Argumente\ZU\ZB"  --msgbox "\n\nPositionale Argumente sind die Argumente, die direkt an das Bash-Skript übergeben werden, wenn es\nausgeführt wird. Diese Argumente werden in der Reihenfolge, in der sie übergeben wurden, in\nspeziellen Variablen gespeichert.\n\nDie Variablen, die verwendet werden, um auf diese Argumente\ zuzugreifen, sind:\n• \$0: Der Name des Skripts selbst.\n• \$1, \$2, \$3, ...: Die ersten, zweiten, dritten, ...\ positionalen Argumente.\n\nBeispiel: Angenommen, wir haben ein Bash-Skript namens \"script.sh\", das zwei positionale\nArgumente erwartet. Wir führen das Skript folgendermaßen aus:\n\Z4\$ bash script.sh argument1 argument2\n\n\Z0Im Skript können wir nun auf die Argumente zugreifen:\n\Z5#!/bin/bash\necho \"Skriptname: \$0\"\necho \"Erstes Argument: \$1\"\necho \"Zweites Argument: \$2\"\Z6\n\n\Z0Die Ausgabe wäre:\Z6\nAnzahl der Argumente: 3\nAlle Argumente als separate Wörter: argument1 argument2 argument3\nAlle Argumente als Zeichenkette: argument1 argument2 argument3" 9999 105
}

Spezielle_Variablen() {

    dialog --colors --title "\Zb\ZuSpezielle Variablen\ZU\ZB" --msgbox "\n\nNeben den positionalen Argumenten gibt es einige spezielle Variablen,\ndie in Bash-Skripten verwendet werden können, um auf Argumente zuzugreifen\noder Informationen über die Argumente zu erhalten.\n\nEinige dieser speziellen Variablen sind:\n• \$#: Die Anzahl der übergebenen Argumente.\n• \$@: Alle übergebenen Argumente als separate Wörter (inklusive Leerzeichen).\n• \$*: Alle übergebenen Argumente als einzelne Zeichenkette (inklusive Leerzeichen).\n• \$?: Der Exit-Code des letzten ausgeführten Befehls.\n\nBeispiel: Angenommen, wir führen das Skript \"script.sh\" mit den Argumenten\n\"argument1 argument2 argument3\" aus:\n\Z5#!/bin/bash\necho \"Anzahl der Argumente: \$#\"\necho \"Alle Argumente als separate Wörter: \$@\"\necho \"Alle Argumente als Zeichenkette: \$*\"\n\n\Z0Die Ausgabe wäre:\n\Z6Anzahl der Argumente: 3\nAlle Argumente als separate Wörter: argument1 argument2 argument3\nAlle Argumente als Zeichenkette: argument1 argument2 argument3" 9999 105
}

Optionale_Argumente() {

    dialog --colors --title "\Zb\ZuOptionale Argumente\ZU\ZB" --msgbox "\n\nOptionale Argumente ermöglichen es, bestimmte Funktionen oder Verhaltensweisen eines Skripts zu\nsteuern, indem man zusätzliche Argumente mit speziellen Optionen angibt. In Bash werden optionale\nArgumente oft mit dem Flag \"-\" oder \"--\" gekennzeichnet.\n\nBeispiel: Angenommen, wir möchten ein Skript mit einer optionalen Verbose-Funktion erstellen. Wenn\ndas Skript mit dem Argument \"-v\" oder \"--verbose\" ausgeführt wird, soll es zusätzliche Informationen\nausgeben. Andernfalls wird es im Standardmodus ausgeführt.\n\Z5#!/bin/bash\nverbose=false\nwhile [[ \"\$#\" -gt 0 ]]; do\ncase \$1 in\n-v|--verbose) verbose=true;;\n*) echo \"Unbekannte Option: \$1\"; exit 1;;\nesac\nshift\ndone\nif [ \"\$verbose\" = true ]; then\necho \"Verbose-Modus aktiviert.\"\nfi\n# Rest des Skripts...\n\n\Z0In diesem Beispiel wird eine Schleife verwendet, um alle übergebenen Argumente zu überprüfen. Wenn\ndas Argument \"-v\" oder \"--verbose\" ist, wird die Variable \"verbose\" auf \"true\" gesetzt. Andernfalls wird\neine Meldung für unbekannte Optionen ausgegeben. Am Ende des Skripts wird überprüft, ob der\nVerbose-Modus aktiviert ist, und entsprechende Ausgaben werden gemacht." 9999 105
}
Bash_Argumente() {

    os=$(dialog --menu "Intermediate Level" 0 0 0 \
        "Positionale Argumente" "" \
        "Spezielle Variablen" "" \
        "Optionale Argumente" "" \
        "Aufgaben" "" 3>&1 1>&2 2>&3)

    case $os in
        "Positionale Argumente")
            Positionale_Argumente
            Bash_Argumente
            ;;
        "Spezielle Variablen")
            Spezielle_Variablen
            Bash_Argumente
            ;;
        "Optionale Argumente")
            Optionale_Argumente
            Bash_Argumente
            ;;
        "Aufgaben")
            Aufgaben_BashArgumente
            Bash_Argumente
            ;;
    esac
    
    
}
#Bash Input
############################################################
Aufgaben_BashInput(){

    counter=0
    Frage='Welcher Bash-Befehl wird verwendet, um Benutzereingaben in der Bash-Shell zu erfassen und in einer Variablen zu speichern?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        'echo' '' \
        'input' '' \
        'read' '' \
        'capture' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'read' "$Frage"

    Frage='Welche Option des "read"-Befehls ermöglicht es, den Echo-Modus auszuschalten, um Benutzereingaben nicht anzuzeigen (z. B. für Passworteingaben)?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '-p' '' \
        '-s' '' \
        '-n' '' \
        '-t' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '-s' "$Frage"

    Frage='Wie lautet das allgemeine Format des "read"-Befehls, um Benutzereingaben in einer Variablen zu speichern?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        'read [Variable] Optionen' '' \
        'read Optionen [Variable]' '' \
        'Optionen [Variable] read' '' \
        '[Variable] read Optionen' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'read [Variable] Optionen' "$Frage"

    Frage='Welche spezielle Variable gibt den Namen des Skripts oder der ausgeführten Datei in einem Bash-Skript zurück?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '$0' '' \
        '$1' '' \
        '$@' '' \
        '$#' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '$0' "$Frage"

    Frage='Wie lautet die Option des "read"-Befehls, um eine Eingabeaufforderung an den Benutzer auszugeben, bevor er eine Eingabe macht?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '-p' '' \
        '-s' '' \
        '-n' '' \
        '-t' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '-p' "$Frage"

    Frage='Welche spezielle Variable gibt die Anzahl der übergebenen Argumente von der Kommandozeile in einem Bash-Skript zurück?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '$0' '' \
        '$1' '' \
        '$@' '' \
        '$#' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '$#' "$Frage"

    Frage='Wie können Command-Line-Argumente in Bash-Skripten verwendet werden?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        'Nur für die Anzeige von Informationen an den Benutzer' '' \
        'Nur in bedingten Anweisungen' '' \
        'In bedingten Anweisungen, Schleifen und anderen Kontrollstrukturen' '' \
        'Nur zur Ausgabe von Fehlermeldungen' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'In bedingten Anweisungen, Schleifen und anderen Kontrollstrukturen' "$Frage"

    Frage='Welche Option des "read"-Befehls ermöglicht es, nur eine bestimmte Anzahl von Zeichen von der Eingabe zu lesen?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '-p' '' \
        '-s' '' \
        '-n' '' \
        '-t' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '-n' "$Frage"

    Frage='Wie können Benutzereingaben in Bash-Skripten weiterverarbeitet werden?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        'Nur in Schleifen' '' \
        'Nur in bedingten Anweisungen' '' \
        'In bedingten Anweisungen, Schleifen und anderen Kontrollstrukturen' '' \
        'Nur zur Anzeige von Informationen an den Benutzer' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'In bedingten Anweisungen, Schleifen und anderen Kontrollstrukturen' "$Frage"

    Frage='Welche Variable gibt eine Liste aller übergebenen Argumente von der Kommandozeile zurück?'
    os=$(dialog --menu "$Frage" 15 105 4 \
        '$0' '' \
        '$1' '' \
        '$@' '' \
        '$#' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" '$#' "$Frage"

    percentage=$(printf "%.0f" "$(echo "($counter / 10 * 100)" | bc -l)")
    dialog --gauge "Resultat:" 7 30 $percentage 


}

Einleitung() {

    dialog --colors --title "\Zb\ZuEinleitung\ZU\ZB" --msgbox "\n\nDer Bash-Input bezieht sich auf die Möglichkeit, Benutzereingaben in der Bash-Shell zu erfassen und\nin Bash-Skripten zu verwenden. Die Bash-Shell bietet verschiedene Mechanismen, um\nBenutzereingaben zu lesen und damit interaktive oder automatisierte Aufgaben auszuführen.\n\nDiese Dokumentation wird die verschiedenen Methoden und Techniken zum Einlesen von\nBenutzereingaben in der Bash-Shell erläutern." 9999 105

}

read_Befehl() {

    dialog --colors --title "\Zb\Zuread-Befehl\ZB\ZU" --msgbox "\n\nDer read-Befehl ist der grundlegende Mechanismus zum Einlesen von Benutzereingaben in der Bash-Shell. Er erlaubt es dem Benutzer, eine Zeile von der Standardeingabe einzugeben und in einer Variablen zu speichern. Das allgemeine Format lautet:\n\n\Z5read [Optionen] Variable\Z0\n\nDer read-Befehl blockiert die Ausführung des Skripts, bis der Benutzer eine Eingabe macht und die Eingabetaste drückt. Die eingegebene Zeile wird dann in der angegebenen Variablen gespeichert.\n\nBeispiel:\n\n\Z5read -p \"Bitte geben Sie Ihren Namen ein: \" name\necho \"Hallo, \$name!\"" 9999 105

}

read_Optionen() {

    dialog --colors --title "\Zb\Zuread Optionen\ZB\ZU" --msgbox "\n\n-p \"Prompt\": Gibt einen Text als Eingabeaufforderung aus, bevor der Benutzer eine Eingabe macht.\n-s: Schaltet den Echo-Modus aus, sodass die Eingabe des Benutzers nicht angezeigt wird (z. B. für das Lesen von Passwörtern).\n-n N: Liest nur N Zeichen von der Eingabe.\n-t T: Liest die Eingabe für maximal T Sekunden. Wenn innerhalb dieser Zeit keine Eingabe erfolgt, wird mit einem Fehler abgebrochen.\n\n\ZbCommand-Line-Argumente\ZB\n\nZusätzlich zur Eingabe von Benutzern während der Laufzeit können auch Argumente direkt von der Kommandozeile gelesen werden. Bash ermöglicht den Zugriff auf diese Argumente über spezielle Variablen:\n\n\$0: Name des Skripts oder der ausgeführten Datei.\n\$1, \$2, \$3, ...: Die einzelnen Argumente, die beim Aufruf des Skripts übergeben wurden.\n\$@: Eine Liste aller Argumente.\n\$#: Die Anzahl der übergebenen Argumente.\n\nBeispiel:\n\n\Z5echo \"Das Skript heißt: \$0\"\necho \"Das erste Argument ist: \$1\"\necho \"Alle Argumente: \$@\"\necho \"Anzahl der Argumente: \$#\"\Z0\n\n\ZbVerarbeiten von Benutzereingaben\ZB\n\nNachdem die Benutzereingabe erfasst wurde, können Sie in Bash-Skripten weiterverarbeitet werden. Sie können in bedingten Anweisungen, Schleifen oder anderen Kontrollstrukturen verwendet werden, um Entscheidungen zu treffen oder Aktionen auszuführen.\n\nBeispiel:\n\n\Z5read -p \"Bitte geben Sie eine Zahl ein: \" zahl\nif (( zahl > 10 )); then\necho \"Die eingegebene Zahl ist größer als 10.\"\nelse\necho \"Die eingegebene Zahl ist kleiner oder gleich 10.\"\nfi\Z0\n\n\ZbFazit\ZB\n\nDer Bash-Input ermöglicht es Benutzern, interaktive und automatisierte Aufgaben durchzuführen, indem sie Benutzereingaben lesen und in Bash-Skripten verarbeiten. Der read-Befehl und die Verwendung von Command-Line-Argumenten sind wichtige Werkzeuge, um die Flexibilität und Interaktivität von Bash-Skripten zu erhöhen. Indem Sie diese Funktionen nutzen, können Sie leistungsstarke und anpassbare Skripte erstellen." 9999 105

}

Bash_Input() {

    os=$(dialog --menu "Intermediate Level" 0 0 0 \
        "Einleitung" "" \
        "read-Befehl" "" \
        "read-Optionen" "" \
        "Aufgaben" "" 3>&1 1>&2 2>&3)

    case $os in
        "Einleitung")
            Einleitung
            Bash_Input
            ;;
        "read-Befehl")
            read_Befehl
            Bash_Input
            ;;
        "read-Optionen")
            read_Optionen
            Bash_Input
            ;;
        "Aufgaben")
            Aufgaben_BashInput
            Bash_Input
            ;;
    esac

}

#Bash Output
##############################################################################

Aufgaben_BashOutput(){

    counter=0
    Frage='Welcher Ausgabekanal wird in der Bash-Shell standardmäßig verwendet, um die Ausgabe von Befehlen anzuzeigen?'
    os=$(dialog --menu "$Frage" 15 105 3 \
    'Standard-Eingabe (stdin)' '' \
    'Standard-Ausgabe (stdout)' '' \
    'Standard-Fehlerausgabe (stderr)' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'Standard-Ausgabe (stdout)' "$Frage"

    Frage='Welche Art von Redirection ermöglicht es, den Output eines Befehls in eine Datei umzuleiten, ohne den bestehenden Inhalt zu überschreiben?'
    os=$(dialog --menu "$Frage" 15 105 3 \
    'Umleitung in eine Datei' '' \
    'Anhängen an eine Datei' '' \
    'Umleitung des Fehlertexts' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'Anhängen an eine Datei' "$Frage"

    Frage='Was ist der Standardkanal, über den die meisten Befehle ihre Ausgabe anzeigen, wenn kein anderer Ausgabekanal spezifiziert ist?'
    os=$(dialog --menu "$Frage" 15 105 2 \
    'Standard-Eingabe (stdin)' '' \
    'Standard-Ausgabe (stdout)' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'Standard-Ausgabe (stdout)' "$Frage"

    Frage='Wie nennt man den Kanal, der normalerweise mit der Tastatur verbunden ist und Eingaben vom Benutzer entgegennimmt?'
    os=$(dialog --menu "$Frage" 15 105 3 \
    'Standard-Eingabe (stdin)' '' \
    'Standard-Ausgabe (stdout)' '' \
    'Standard-Fehlerausgabe (stderr)' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'Standard-Eingabe (stdin)' "$Frage"

    Frage='Welche Art von Redirection ermöglicht es, den Output eines Befehls in eine Datei umzuleiten, wobei der bestehende Inhalt überschrieben wird?'
    os=$(dialog --menu "$Frage" 15 105 3 \
    'Umleitung in eine Datei' '' \
    'Anhängen an eine Datei' '' \
    'Umleitung des Fehlertexts' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'Umleitung in eine Datei' "$Frage"

    Frage='Welcher Ausgabekanal wird verwendet, um Fehlermeldungen und Diagnoseinformationen auszugeben?'
    os=$(dialog --menu "$Frage" 15 105 3 \
    'Standard-Eingabe (stdin)' '' \
    'Standard-Ausgabe (stdout)' '' \
    'Standard-Fehlerausgabe (stderr)' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'Standard-Fehlerausgabe (stderr)' "$Frage"

    Frage='Welche Art von Redirection ermöglicht es, den Output eines Befehls in eine Datei umzuleiten und dabei den bestehenden Inhalt zu überschreiben?'
    os=$(dialog --menu "$Frage" 15 105 3 \
    'Umleitung in eine Datei' '' \
    'Anhängen an eine Datei' '' \
    'Umleitung des Fehlertexts' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'Umleitung in eine Datei' "$Frage"

    Frage='Welches Konzept ermöglicht es, den Output eines Befehls direkt als Input für einen anderen Befehl zu verwenden, ohne dass eine Datei zwischengespeichert werden muss?'
    os=$(dialog --menu "$Frage" 15 105 2 \
    'Standard Output' '' \
    'Pipes' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'Pipes' "$Frage"

    Frage='Welcher Ausgabekanal ist standardmäßig mit dem Bildschirm verbunden und gibt die Ausgabe von Befehlen aus?'
    os=$(dialog --menu "$Frage" 15 105 3 \
    'Standard-Eingabe (stdin)' '' \
    'Standard-Ausgabe (stdout)' '' \
    'Standard-Fehlerausgabe (stderr)' '' 3>&1 1>&2 2>&3)
    Antwort_Pruefen "$os" 'Standard-Ausgabe (stdout)' "$Frage"

    percentage=$(printf "%.0f" "$(echo "($counter / 9 * 100)" | bc -l)")
    dialog --gauge "Resultat:" 7 30 $percentage 





}

Standard_Output() {

    dialog --colors --title "\Zb\ZuStandard Output\ZB\ZU" --msgbox "\n\nDer Standard Output ist der Standardkanal, über den die meisten Befehle ihre Ausgabe anzeigen. Wenn kein anderer Ausgabekanal spezifiziert ist, wird die Ausgabe auf den Standard Output geschrieben. In der Bash wird der Standard Output in der Regel auf den Bildschirm oder die Konsole umgeleitet, so dass der Benutzer die Ergebnisse sehen kann.\n\nBeispiel: Um den Inhalt eines Verzeichnisses anzuzeigen, kann der Befehl \"ls\" verwendet werden:\n\n\Z5\$ ls\n\Z6Desktop Documents Downloads Music Pictures Public\n\n\Z0In diesem Beispiel werden die Namen der Dateien und Verzeichnisse im aktuellen Verzeichnis auf den Bildschirm ausgegeben." 9999 105
    
}

Umleitung_des_Outputs() {

    dialog --colors --title "\Zb\ZuUmleitung des Outputs\ZB\ZU" --msgbox "\n\nDie Bash ermöglicht die Umleitung des Outputs auf verschiedene Weisen. Hier sind einige gängige Möglichkeiten:\n\na) Umleitung in eine Datei: Der Output eines Befehls kann in eine Datei umgeleitet werden, anstatt ihn auf den Bildschirm auszugeben. Dies ist nützlich, um die Ausgabe für spätere Referenzierung oder Analyse zu speichern.\nBeispiel:\n\Z5\$ ls > dateiliste.txt\Z0\nIn diesem Beispiel wird der Output des Befehls \"ls\" in die Datei \"dateiliste.txt\" geschrieben.\n\nb) Anhängen an eine Datei: Statt den Output in eine Datei zu schreiben und dabei den bestehenden Inhalt zu überschreiben, kann der Output an das Ende der Datei angehängt werden.\nBeispiel:\n\Z5\$ echo \"Hallo, Welt!\" >> dateiliste.txt\Z0\nHier wird der Text \"Hallo, Welt!\" an die Datei \"dateiliste.txt\" angehängt.\n\nc) Umleitung des Fehlertexts: Die Bash ermöglicht auch die Umleitung von Fehlermeldungen (Standard Error) separat vom normalen Output. Dies ist hilfreich, um Fehlerprotokolle zu erstellen oder Fehlermeldungen zu analysieren, ohne dass sie mit dem normalen Output vermischt werden.\nBeispiel:\n\Z5\$ command_does_not_exist 2> fehlerprotokoll.txt\Z0\nIn diesem Beispiel wird die Fehlermeldung, die durch den Aufruf eines nicht existierenden Befehls erzeugt wird, in die Datei \"fehlerprotokoll.txt\" umgeleitet." 9999 105

}

Fazit(){
  
    dialog --colors --title "\Zb\ZuFazit\ZB\ZU" --msgbox "\n\nBash-Redirections sind ein leistungsstarkes Konzept in der Bash-Shell, das es ermöglicht, den Ein- und Ausgabefluss von Befehlen in der Shell zu steuern. Mit Hilfe von Redirections können Sie den Standard-Ein- und -Ausgabekanälen neue Quellen und Ziele zuweisen oder diese umleiten.\n\nStandard-Ein- und -Ausgabe: In der Bash-Shell gibt es drei Standard-Ein- und -Ausgabekanäle:\n\n1. Standard-Eingabe (stdin): Dieser Kanal wird normalerweise mit der Tastatur verbunden und nimmt Eingaben vom Benutzer entgegen.\n2. Standard-Ausgabe (stdout): Dieser Kanal ist standardmäßig mit dem Bildschirm verbunden und gibt die Ausgabe von Befehlen aus.\n3. Standard-Fehlerausgabe (stderr): Dieser Kanal wird verwendet, um Fehlermeldungen und Diagnoseinformationen auszugeben und ist ebenfalls mit dem Bildschirm verbunden." 9999 105

}

Bash_Output() {

    os=$(dialog --menu "Intermediate Level" 0 0 0 \
        "Standard Output" "" \
        "Umleitung des Outputs" "" \
        "Aufgaben" "" \
        "Fazit" "" 3>&1 1>&2 2>&3)

    case $os in
        "Standard Output")
            Standard_Output
            Bash_Output
            ;;
        "Umleitung des Outputs")
            Umleitung_des_Outputs
            Bash_Output
            ;;
        "Fazit")
            Fazit
            Bash_Output
            ;;
        "Aufgaben")
            Aufgaben_BashOutput
            Bash_Output
        ;;
    esac

    return 1

}


#Redirection-Symbole
###########################################################################################

Redirection-Symbole(){

    dialog --colors --title "\Zu\ZbBash Redirections\ZU\ZB" --msgbox "\n\nUm Redirections in der Bash-Shell durchzuführen, werden verschiedene Symbole verwendet:\n\n1. > : Dieses Symbol leitet den Standardausgabekanal (stdout) um und schreibt die Ausgabe in eine Datei. Wenn die Datei bereits existiert, wird sie überschrieben. Beispiel:\n   \Z5command > file.txt\Z0\n\n2. >> : Dieses Symbol leitet den Standardausgabekanal (stdout) um und fügt die Ausgabe am Ende einer Datei an. Wenn die Datei nicht vorhanden ist, wird sie erstellt. Beispiel:\n   \Z5command >> file.txt\Z0\n\n3. < : Dieses Symbol leitet den Standard-Eingabekanal (stdin) um und liest die Eingabe aus einer Datei anstatt von der Tastatur. Beispiel:\n   \Z5command < file.txt\Z0\n\n4. 2> : Dieses Symbol leitet den Standardfehlerausgabekanal (stderr) um und schreibt die Fehlermeldung in eine Datei. Beispiel:\n   \Z5command 2> error.txt\Z0\n\n5. 2>> : Dieses Symbol leitet den Standardfehlerausgabekanal (stderr) um und fügt die Fehlermeldung am Ende einer Datei an. Beispiel:\n   \Z5command 2>> error.txt\Z0\n\n6. & : Dieses Symbol kombiniert den Standardausgabekanal (stdout) und den Standardfehlerausgabekanal (stderr) und leitet beide in dasselbe Ziel um. Beispiel:\n   \Z5command &> output.txt\Z0\n\n7. | : Dieses Symbol leitet die Ausgabe eines Befehls an den Eingabekanal eines anderen Befehls weiter. Beispiel:\n   \Z5command1 | command2" 9999 105
    dialog --colors --title "\Zu\ZbBash Redirections\ZU\ZB" --msgbox "\n\n\ZbBeispiele:\ZB\n\n   \Z5ls > file.txt\Z0\n   Dieser Befehl leitet die Ausgabe des Befehls 'ls' in die Datei 'file.txt' um.\n\n• Ausgabe am Ende einer Datei anhängen:\n   \Z5echo \"Hello, World!\" >> file.txt\Z0\n   Dieser Befehl fügt die Zeichenkette 'Hello, World!' am Ende der Datei 'file.txt' hinzu, ohne den vorherigen Inhalt zu löschen.\n\n• Eingabe aus einer Datei lesen:\n   \Z5sort < input.txt\Z0\n   Dieser Befehl liest die Eingabe für den Befehl 'sort' aus der Datei 'input.txt' anstatt von der Tastatur.\n\n• Fehlermeldung in eine Datei schreiben:\n   \Z5command 2> error.txt\Z0\n   Dieser Befehl leitet die Fehlerausgabe des Befehls 'command' in die Datei 'error.txt' um.\n\n\ZbFazit:\ZB\n\nBash-Redirections sind ein mächtiges Werkzeug, um den Ein- und Ausgabefluss von Befehlen in der Bash-Shell zu steuern. Durch die geschickte Verwendung von Redirections können Sie die Ausgabe speichern, Eingaben aus Dateien lesen und Fehlermeldungen protokollieren. Dies ermöglicht Ihnen eine effektive Kontrolle über den Datenfluss in der Shell und erleichtert die Automatisierung von Aufgaben." 9999 105

}


#Bash Pipes
###############################################################################################################

Bash_Pipes(){

   dialog --colors --title "\Zu\ZbBash Pipes\ZU\ZB" --msgbox "\n\n1. Einführung\nBash Pipes sind eine leistungsstarke Funktion in der Bash-Shell, die es ermöglicht, die Ausgabe eines Befehls als Eingabe für einen anderen Befehl zu verwenden. Dieser Mechanismus der Verkettung von Befehlen durch Pipes bietet eine flexible Möglichkeit, komplexe Aufgaben durch Kombination mehrerer Befehle zu automatisieren.\n\n2. Grundlegende Verwendung\nDie grundlegende Syntax für die Verwendung von Pipes in Bash lautet:\n\Z5command1 | command2\Z0\nHierbei wird die Ausgabe von command1 an command2 übergeben, wodurch command2 die Ausgabe von command1 verarbeiten kann.\n\n3. Beispielanwendung\nEin häufiges Beispiel für die Verwendung von Pipes ist die Filterung von Text. Angenommen, wir haben eine Datei mit dem Namen \"text.txt\" und möchten alle Zeilen filtern, die das Wort \"Hallo\" enthalten. Dies könnte mit folgendem Befehl erreicht werden:\n\Z5cat text.txt | grep \"Hallo\"\Z0\nDer Befehl cat text.txt gibt den Inhalt der Datei \"text.txt\" aus, der dann an den Befehl grep \"Hallo\" übergeben wird. Der Befehl grep sucht nach dem Muster \"Hallo\" in der Eingabe und gibt nur die Zeilen aus, die dieses Muster enthalten.\n\n4. Mehrfache Pipes\nEs ist möglich, mehrere Pipes hintereinander zu schalten, um komplexe Aufgaben zu lösen. Die Ausgabe des ersten Befehls wird dabei an den nächsten Befehl weitergegeben und so weiter. Ein Beispiel hierfür könnte folgendermaßen aussehen:\n\Z5command1 | command2 | command3\Z0\nHierbei wird die Ausgabe von command1 an command2 übergeben, und die Ausgabe von command2 wird wiederum an command3 übergeben.\n\n5. Redirection mit Pipes\nPipes können auch mit Dateiredirektion kombiniert werden, um die Eingabe oder Ausgabe von Befehlen umzuleiten. Beispielsweise kann die Ausgabe eines Befehls in eine Datei umgeleitet werden:\n\Z5command1 | command2 > output.txt\Z0\nIn diesem Fall wird die Ausgabe von command2 in die Datei \"output.txt\" geschrieben.\n\n6. Fehlerbehandlung\nBei der Verwendung von Pipes ist es wichtig zu beachten, dass der Exit-Code des letzten Befehls in der Pipe verwendet wird. Wenn ein Befehl in der Pipe fehlschlägt, wird der Exit-Code an den vorherigen Befehl zurückgegeben. Dies ermöglicht eine effektive Fehlerbehandlung und das Abbrechen der Ausführung, wenn ein Fehler auftritt." 9999 105

}


#Main
###############################################################################################

Main() {

    os=$(dialog --menu "Intermediate Level" 0 0 0 \
        "Bash Argumente" "" \
        "Bash Input" "" \
        "Bash Output" "" \
        "Redirection-Symbole" "" \
        "Bash Pipes" "" 3>&1 1>&2 2>&3)

    case $os in
        "Bash Argumente")
            Bash_Argumente
            Main
        ;;
        "Bash Input")
            Bash_Input
            Main
        ;;
       "Bash Output")
            Bash_Output
            Main
        ;;  
        "Redirection-Symbole")
            Redirection-Symbole
            Main
        ;;  
        "Bash Pipes")
            Bash_Pipes
            Main
        ;;
        *)
    esac


}
Main
