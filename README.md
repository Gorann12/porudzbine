# MANUAL
## Prerequisites
  - Git: https://git-scm.com/downloads
  - Docker: https://www.docker.com/products/docker-desktop/
  - Node: https://nodejs.org/en/

## Steps to start the app (for windows)

## Steps to start the app (for linux)
  1. add execution rights to sh files 
   - chmod +x initialize-project.sh
   - chmod +x start-db.sh
   - chmod +x stop-db.sh
  
  2. If you are starting this for the first time you should execute initialize-project.sh first
   - ./initialize-project.sh
  
  3. Then you could start the database by executing start-db.sh script
   - ./start-db.sh
  
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
    - sudo docker stop pgDatabaseContainer
