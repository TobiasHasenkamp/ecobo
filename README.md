# ecoBo

Ratgeber- und Social-Communication-Platform für nachhaltigen Konsum in Bochum. Kernstück der Web-App ist eine karten- und listenbasierte Darstellung verschiedenster nachhaltiger Angebote in (und um) Bochum, wobei Benutzer eigene Angebote eintragen und reviewen können. Auf diese Weise kann eine lokale Community zu nachhaltigem Konsum wachsen und die eingetragenen Daten aktuell halten.

Link: https://ecobo-neuefische.herokuapp.com
(Die Web-App ist für mobile Endgeräte gedacht und optimiert. Auf großen Displays, wie Bildschrim, Tablet, iPad usw. wird die Seitenbreite automatisch begrenzt).

## Features:
- User-System mit eigener Passwortwahl, Tracking eingetragener Angebote und Upload eines Profilbildes
- Eintragen von nachhaltigen Angeboten in 5 Kategorien, 13 Subkategorien und mehreren Dutzend hinzufügbaren Tags inklusive Bearbeitungs- und Löschungsmöglichkeiten
- Darstellung der Angebote auf einer Kartenansicht basierend auf OpenstreetMap und der JS-Library Leaflet
- automatische Suche der Geolocation basierend auf Adresseingabe (und anschließnder manueller Überprüfungsmöglichkeit durch den User) mithilfe von OpenStreetMap APIs
- Darstellung auf einer weiteren Listenansicht
- umfangreiche Filterfunktionen nach Subkategorien, Tags und Stadtteilen
- Review-System zum "Approven" neu-hinzugefügter Elemente durch User. Erst mit mindestens drei positiven Reviews (und einem ausreichenden prozentualen Anteil) werden diese Angebote gleichwertig angezeigt.
- Newsfeed-System, welches auf der Homepage über aktuelle Ereignisse auf der Seite (neue Angebote, neue User, erfolgreiche Approvals usw.) informiert
- [teilweise fertig] Wechseln von verschiedenen Designthemes

## technische Aspekte:
- Backend mit Java / Spring Boot, Security-System mit Spring Security
- MongoDB als Datenbank (MongoDB Atlas)
- Frontend mit React JS
- umfangreiche Backend- Unit- & Integration-Tests insbesondere mit JUnit 5
- Frontend-Tests mit Jest
- Deployment auf Heroku (Stand 12-2020)
- Bilder-Upload zu AWS S3 (Stand 12-2020)

## Zukünftige Pläne:
- Wechseln zwischen verschiedenen Designthemes
- Implementation in React Native und mögliche Veröffentlichung in App-Stores
- Implementierung des Hinzufügens von Homepage, FB-Page, Öffnungszeiten und Telefonnr.
- darüberhinaus verschiedenste einzelne Feature-Ideen, z.B. Anbindung von Stromtarifvergleichen, Co2-Rechner usw.

ursprüngliche Designzeichnung in Excalidraw (von Anfang November 2020): https://excalidraw.com/#json=5915205112430592,8UMSjmloJ3-0yKA5s9h5XQ

Tobias Hasenkamp, Bochum - Stand 12-2020
Project for Neue Fische Java course 2020
