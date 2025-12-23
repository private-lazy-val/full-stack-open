## Flow 1
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET /exampleapp/spa
    activate server
    server-->>browser: HTML (SPA shell)
    deactivate server

    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: CSS
    deactivate server

    browser->>server: GET /exampleapp/spa.js
    activate server
    server-->>browser: JS (SPA logic)
    deactivate server

    Note right of browser: JS immediately creates XHR to fetch notes

    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: JSON array of notes
    deactivate server

    browser-->>browser: Browser converts the server’s JSON<br/> into a JS array and saves it in notes
    browser-->>browser: redrawNotes() → render parsed notes in DOM
