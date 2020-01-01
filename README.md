# Hackscreen 3

Third iteration of Hackscreen - a hackable, pluggable community noticeboard. Designed for Hackspace Manchester, go ahead and make this work for your space or community.

## Configuration

The config needs to live in `/config.json`
A sample `/config.example.json` is provided to guide you the right way.

## Development

#### Directories and key files

- server
  - integrations - add any data fetching or listening as a file in here
- src
  - Components - add any reusable components here
  - Footers - Things that live in the footer
  - Screens - Things that show on the main screen
  - Sidebars - things that show on the sidebar
  - App.scss - styles for the general screen
  - App.js - this runs the app

#### Adding a Screen/Sidebar/Footer

For example, we want to create a `Name` `Screen`:

- Create a directory: `/src/Screens/Name`
- Create `Name.jsx` and `Name.scss`
- Pur your React and Sass in
- update `/src/Screens/index.js` to export your new screen
- Update the config file if you'd like for your screen to show
