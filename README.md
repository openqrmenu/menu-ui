# Open QR Menu UI

This project is the part of the OpenQRMenu service and is the UI built in Vue.js 3.

OpenQRMenu is hosted at [Go QR Menu](https://goqrmenu.com)

## Development

During Development, the UI runs off vite on port 4000.

`npm install`

Start the service by
`npm run dev`

 Connect to https://localhost:4000 to open the UI. The UI will connect to the nodejs service at port 3000

## Production

The packaged UI is copied to the dist/public folder in the server and served by nodejs server

To run full build
`npm run build`