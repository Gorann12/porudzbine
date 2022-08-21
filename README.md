# MANUAL
- Don't forget to stop every service you start here, steps for stopping the application are at the bottom of this readme

## 0. Prerequisites
  - Git
  - Docker (Docker Desktop for windows)
  - NodeJs

## 1. Universal steps for starting the app, not dependant on OS
  1. Clone this repository locally
    - download the zip clicking on green "code" button
      - extract it somewhere

## 3. Steps to start the app (for windows)
  1. Open docker desktop
  2. Assuming you did universal steps (from chapter 1), locate and open root folder of the project
  3. Open two terminals (git bash), right click in the folder and select "Git Bash Here"(don't forget to open two git bash instances).
  4. Choose one of these terminals and type: sh ./initialize-project.sh !ONLY THE FIRST TIME, IF YOU ALREADY DID THIS YOU SHOULDN'T DO IT EVER AGAIN!
  5. After that, execute following command: sh ./windows-scripts/start-db.sh
  6. After that command finished, type (doesn't matter which terminal) cd porudzbine-backend
  7. Now use that terminal where you typed "cd porudzbine-backend" and type: npm run start:dev
  8. Now switch to the other terminal window and type: cd porudzbine-frontend
  9. In the same terminal (one in which you just wrote "cd porudzbine-frontend") type npm run start
  10. Open your browser and type localhost:4200, that's it (don't forget to stop everything once you are done, steps for stopping are at the end of this readme)

## 4. Steps to start the app (for linux)
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

## 5. Steps to stop the app (universal, not dependant on the OS)
  1. Assuming you did everything correctly you should have two git bash instances, you should press ctrl + c in each of them (that will terminate processes which are running or local servers for both backend and frontend)
  3. If you closed both terminal instances, open new (location doesn't matter you can even click right click on desktop and press: for windows "git bash here", for linux "open in terminal") and type:
  - for linux:
    - sudo docker stop pgDatabaseContainer
  - for windows: 
    - docker stop pgDatabaseContainer
