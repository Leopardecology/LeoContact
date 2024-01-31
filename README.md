# LeoContact

## Update

### Backend
1. ``` cd apps/LeoContact/ ```
2. ``` git pull ```
3. ``` cd backend/ ```
4. ``` npm i ```
5. ``` pm2 restart (correct number) ```

### Frontend
1. ``` cd apps/LeoContact/ ```
2. ``` git pull ```
3. ``` cd frontend/ ```
4. ``` npm i ```
5. ``` npm run build ```
6. ``` sudo rm -rf /var/www/LeoContact/* ```
7. ```sudo cp -r build/* /var/www/LeoContact/```
