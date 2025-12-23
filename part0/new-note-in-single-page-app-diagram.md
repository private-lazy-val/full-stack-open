## Flow 1
```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Type note and submit form
    browser-->>browser: onsubmit → e.preventDefault()
    browser-->>browser: Build note = { content, date }
    browser-->>browser: notes.push(note)
    browser-->>browser: redrawNotes() → update DOM immediately<br/> (optimistic rendering)

    Note over browser,server: Send new note to the server<br/>asynchronously (no reload)

    browser->>server: POST /exampleapp/new_note_spa<br/>payload: JSON.stringify(note)
    activate server
    Note left of server: Server saves note and responds
    server-->>browser: 201 Created (OK)
    deactivate server

    Note right of browser: UI already updated<br/> No redirect or reload
