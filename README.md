### Application is an integrated version of Qencode Login UI built on the design from [Figma](https://www.figma.com/file/jyCTDwiw4IwadVfae9FMu8/Qencode-Frontend-Developer-Test?type=design&node-id=0-1&mode=design) and authentication API specification
The following technologies and libraries were used during creation:
- JavaScript
- TypeScript
- React
- React Router
- Redux ToolKit
- Material UI

---
#### [DEMO LINK](https://wonderful-faun-f789b8.netlify.app/)

#### Functionality of the application:
- Effectively used React state and props to handle form data and validations.
- Implemented client-side verification:
-- Email format must be valid.
-- The length of the password field must be at least 8 characters.
- Imitation "Forgot your password?" was created. When entering mail, a request is sent to the server, if the mail is valid, the "Simulate the transition from mail" button appears, when clicked, a form for setting a new password will appear.
- Integrated the forms with the provided API endpoints using fetch
- Implemented error handling that informs users of any input mistakes or API request issues.

To run locally, copy the application and run the commands
```bash
npm install
# and
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser