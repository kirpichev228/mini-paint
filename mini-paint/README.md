# mini-paint
https://drive.google.com/file/d/19cb4whI_HUVPzuaPyaj5r6hGotIVnhho/view

## how to run the app
to run this app, enter following commands:
```
npm install
npm run dev
```

## Database snapshot
- item ID
  - item email
  - item src


## Application configuration

Used techologies:
- Vite
- Vue 3 composition api
- Pinia
- Typescript
- Eslint/prettier
- vue router
- firebase athentithication
- firebase realtime database
- dotenv

## Folder structure
- 'public' contsins favicon
- 'src' contains source code and root app and main files
  - 'components' contains app components like sidebar, navbar etc.
    - 'UI' contains reusable components like inputs and buttons
  - 'firebase' contains database initialize file
  - 'helpers' contains helper functions for figures
  - 'router' contains vue router initialize file with routes
  - 'services' contains service classes to db requests
  - 'stores' contains pinia store modules
  - 'types' contains reusable interfaces
  - 'views' contains app pages
  