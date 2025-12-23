## New note diagram
```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Type note and submit form

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note<br/>payload: content=<text>
    activate server
    Note left of server: Server stores the note (adds timestamp)
    server-->>browser: 302 Found<br/>Location: /exampleapp/notes
    deactivate server

    Note right of browser: Browser follows the redirect and reloads the page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: Browser runs main.js<br/>which fetches the updated notes list

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [ { "content": "...", "date": "..." }, ... ]
    deactivate server

    browser-->>browser: Parse JSON → rebuild notes list in DOM
