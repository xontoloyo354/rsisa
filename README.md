# RSISA Disposisi Online

## Setup Project

1. Install NPM
2. Jalankan `npm i`
3. Copy `.env.example` ke `.env`
4. Sesuaikan settingan database.
5. Jalankan `npm run dev`

## Setup Development Environment

1. Gunakan `Visual Studio Code`
2. Jalankan `yarn`
3. Install package `Prettier`
4. Buka vscode setting untuk workspace, tambahkan option di bawah ini
   ```
   "editor.formatOnSave": true
   ```

## Migrasi dan Seeding Data

1. Jalankan `npm run db:setup`
2. Untuk mengubah data awal, tambah file di folder `seeders`