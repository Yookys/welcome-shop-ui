# UI Welcome-shop.ru

### Файлы конфигураций:

- `/config/setupTest.ts` - Конфигурация для enzume;
- `/config/env.configUtil.ts` - Webpack-конфигурация окружения;
- `/config/webpack.common.configUtil.ts` - Общая webpack-конфигурация;
- `/config/webpack.dev.configUtil.ts` - Webpack-конфигурация для разработки;
- `/config/webpack.prod.configUtil.ts` - Webpack-конфигурация для сборки;
- `/public/static/configs/development.json` - Конфигурация endpoint`s для разработки;
- `/public/static/configs/prom.json` - Конфигурация endpoint`s для продуктива;
- `/env/.env.development` - Параметры окружения для разработки;
- `/env/.env.production` - Параметры окружения для сборки;
- `/src/common/constants/configConst.ts` - Перечень endpoint`s, которые должны быть сконфигурированы;
- `/.babelrc` - Конфигурация для babel;
- `/.browserslistrc` - Конфигурация поддерживаемых браузеров;
- `/.prettierrc` - Конфигурация для библиотеки Prettier;
- `/.eslintrc.json` - Конфигурация для ESLint.

### Установка пакетов:

- Добавить в корень проекта корректный `.npmrc`;
- Установка пакета typescript `npm i typescript -g`;
- Установка пакетов: `npm i`;

### Сборка билда:

После этого, запускаем нужный скрипт:
- Запуск сборки: `npm run build`.

По окончанию выполнения скрипта, сборка появится в директории `/build`.

### Запуск разработки:

- Установить пакеты;
- Запуск приложения в режиме разработки `npm run start`;
- Откройте [http://127.0.0.1:3000](http://127.0.0.1:3000) чтобы посмотреть работу приложения в браузере.
  - basepath - указан в файлах окружения, но может отсутствовать.


Входная точка для разработки - `/src/index.tsx`.

### Запуск ESLint:

- Установить пакеты;
- Запуск: `npx eslint src/*`.

### Запуск Тестов:

- Установить пакеты;
- Запуск: `jest --silent`.
