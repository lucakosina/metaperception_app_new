# Meta-perception Task

A dots discrimination task with confidence ratings. Participants have to choose between two boxes, which one has a higher number of dots shown. After making their choice, they rate their confidence in their decision on a 50-100% probability rating scale.

# Details

- Dots are drawn with `react-konva` on a trial-by-trial basis
- Dots difference are controlled by a 2-down 1-up staircase procedure
- Responses are all configured to keyboard presses

# Use

- Requires node.js
- Clone repo to local folder
- Edit package.json `"start": "node server.js"` to `"start": "react-scripts start"` for localhost deployment
- In command line, cd to local repo folder and execute `npm i` to install dependencies
- `npm start` to launch app on localhost

# License

This work is licensed under the Creative Commons Attribution-Non Commercial 4.0 International (CC BY-NC 4.0). Feel free to use it and adapt it however you want for non-commercial purposes.

(c) 2023 Tricia Seow
