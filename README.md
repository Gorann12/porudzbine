# MANUAL
Don't forget to stop everything you start here, steps for stopping application are at the bottom of this readme

## Prerequisites
  - Git
  - Docker (Docker Desktop for windows)
  - NodeJs

## Universal steps for starting the app, not dependant on OS
  1. Clone this repository locally
    - git clone <link-of-the-repo>
    - download the zip clicking on green "code" button
      - extract it somewhere

## Steps to start the app (for windows)
  1. Open docker desktop
  2. Assuming you did universal steps (from the chapter after "Prerequisites"), locate and open root folder of the project
  3. Open two terminals (git bash), right click in the folder and select "Git Bash Here"(don't forget to open two git bash instances).
  4. Choose one of these terminals and type: sh ./initialize-project.sh
  5. After that execute following command: sh ./windows-scripts/start-db.sh
  6. After that command finished type (doesn't matter which terminal) cd porudzbine-backend
  7. Now use that terminal where you typed cd and type npm run start:dev
  8. Switch to other terminal window and type: cd porudzbine-frontend
  9. In the same terminal (one in which you just wrote "cd porudzbine-frontend") type npm run start
  10. Open your browser and type address localhost:4200, and that's it (don't forget to stop everything once you are done, steps for stopping are at the end of this readme)

## Steps to start the app (for linux)
  1. add execution rights to sh files 
   - chmod +x initialize-project.sh
   - chmod +x ./linux-scripts/start-db.sh
   - chmod +x ./linux-scripts/stop-db.sh
  
  2. If you are starting this for the first time you should execute initialize-project.sh first
   - ./initialize-project.sh
  
  3. Then you could start the database by executing start-db.sh script
   - ./linux-scripts/start-db.sh
  
  4. If you are not in porudzbine-aplikacija folder, navigate to it 
   - You can go to the folder using file system and then just right click -> open in terminal
   - Open one more terminal in that folder
  
  5. If you correctly navigated to porudzbine-aplikacija folder, execute following commands
   - cd porudzbine-backend
   - npm run start:dev
  
  6. On the second terminal (opened in step 4.2)
   - cd porudzbine-frontend
   - npm run start

  7. Open your favorite browser, type localhost:4200 address and start using the app!

## Steps to stop the app (universal, not dependant on the OS)
  1. Go to the terminal where your backend is running and press CTRL + C, close the terminal
  2. Go to the other terminal where your frontend is running and press CTRL + C, don't close this terminal yet
  3. In that remaining terminal execute following command 
    - for linux
      - sudo docker stop pgDatabaseContainer
    - for windows
      - docker stop pgDatabaseContainer
