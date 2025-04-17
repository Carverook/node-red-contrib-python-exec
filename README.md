# node-red-contrib-python-exec

Node-RED узел для выполнения Python-кода и автоматической установки pip-модулей.

## Установка

```bash
npm install node-red-contrib-python-exec
``` 

## Использование

1. Перезапустите Node-RED.
2. В палитре найдите узел "python" (категория "function").
3. Введите в поле **Python Code** ваш скрипт.
4. (Опционально) Введите в **Pip Modules** список модулей через запятую для установки при старте.

При входящем сообщении узел выполнит указанный код и вернёт `stdout` в `msg.payload`.

## Публикация в npm

1. Зарегистрируйтесь и залогиньтесь в npm:
   ```bash
   npm login
   ```
2. Убедитесь, что в `package.json` указана корректная версия и название (начинается с `node-red-contrib-`).
3. Опубликуйте модуль:
   ```bash
   npm publish
   ```

## Добавление в Flow Library

После публикации зайдите на страницу https://flows.nodered.org/add/node, введите имя `node-red-contrib-python-exec` и отправьте форму.
