# Blog App (React + TypeScript + Firebase)

src/
│
├── components/             // Повторно используемые UI-компоненты
│   ├── PostForm.tsx        // Форма создания постов
│   ├── PostList.tsx        // Список постов
│   └── CommentForm.tsx     // Форма добавления комментария
│
├── pages/                  // Страницы приложения
│   ├── Home.tsx            // Главная страница с формой и списком постов
│   └── PostPage.tsx        // Детальный просмотр поста, редактирование и комментарии
│
├── store/                  // Redux Toolkit slices
│   ├── postsSlice.ts       // Посты: CRUD и состояние
│   ├── commentsSlice.ts    // Комментарии: добавление/загрузка
│   └── index.ts            // Настройка Redux store
│
├── firebase.ts             // Инициализация Firebase/Firestore
├── App.tsx                 // Основной роутинг
└── main.tsx                // Точка входа, подключение Redux и Router


## 🛠 Стек
- React
- TypeScript
- Redux Toolkit
- React Hook Form + Zod
- Firebase Firestore
- React Router
- React Navigation (если в mobile-версии)
- Vercel/Render (деплой)

## 🚀 Функциональность
- Просмотр постов
- Создание постов
- Редактирование и удаление
- Комментарии к постам
- Адаптивная вёрстка

## 🔧 Установка
```bash
git clone ...
npm install
npm start
