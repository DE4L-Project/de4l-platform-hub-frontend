# DE4L Start Hub

![Project Logo][project-logo]

![Made with love in Germany](https://madewithlove.now.sh/de?heart=true&colorA=%23000000&colorB=%23299fc7&template=for-the-badge)

## Motivation
Angular App for DE4L which is used as entrypoint for the DE4L platform applications.

![App Screenshots][app-screenshot]

## Build
```
(Local)
npm install
ng build

(Docker)
docker build -t de4l-start-hub .
docker run -p 4200:80 de4l-start-hub
```

## Configuration
 The app loads configuration on initialization remotely e.g. from a backend service providing configuration. Files can be provided on the same server as well. 
 The app expects `assets/init-properties.json` containing the following information:
 
```json
{
  "configUrl": "assets/remote-config.json",
  "gitCommitHash": "local-dev"
}
```
Using Docker deployment the file is created automatically using environment variables (`$CONFIG_URL`). Git commit hash is provided by Jenkins on build time.

Example remote-config.json:
```json
{
  "configProperties": {
    "baseUrl": "http://localhost:4200/",
    "keycloakJsonUrl": "assets/keycloak.json"
  }
}
```

## Technology Overview
- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [KeycloakJS](https://www.npmjs.com/package/keycloak-js) & [Keycloak Angular](https://www.npmjs.com/package/keycloak-angular)

[project-logo]: documentation/project-logo_1080p.png "DE4L Project Logo"
[app-screenshot]: documentation/deal-app-hub-screenshot.png "DE4L App Hub Screenshot"

## License
```text
MIT License

Copyright (c) 2022 InfAI Management GmbH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Legal

- Google Play and the Google Play logo are trademarks of Google LLC.
- All trademarks are property of their respective owners.
