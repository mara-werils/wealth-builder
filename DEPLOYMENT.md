# 🚀 Инструкция по деплою

Самый быстрый и надежный способ задеплоить этот Next.js проект — использовать **Vercel**.

## 1. Подготовка
Убедитесь, что ваш код отправлен в GitHub репозиторий.
Если вы еще не сделали commit:
```bash
git add .
git commit -m "Ready for deploy"
git push origin main
```

## 2. Деплой на Vercel
1. Зайдите на [Vercel Dashboard](https://vercel.com/new).
2. Нажмите **Add New...** -> **Project**.
3. Выберите **Import** напротив вашего репозитория.
4. В разделе **Environment Variables** добавьте переменные из вашего `.env.local` (или используйте эти значения для старта):

| Key | Value |
|-----|-------|
| `NEXTAUTH_URL` | `https://ваш-проект.vercel.app` (будет доступен после деплоя) |
| `NEXTAUTH_SECRET` | Генерируйте новый (можно `openssl rand -base64 32`) |
| `GOOGLE_CLIENT_ID` | Ваш ID из Google Console |
| `GOOGLE_CLIENT_SECRET` | Ваш Secret из Google Console |
| `GITHUB_CLIENT_ID` | Ваш ID из GitHub |
| `GITHUB_CLIENT_SECRET` | Ваш Secret из GitHub |

5. Нажмите **Deploy**.

## 3. Финальная настройка
После успешного деплоя Vercel выдаст вам домен (например, `financial-roadmap.vercel.app`).

Вам нужно обновить настройки OAuth провайдеров (Google/GitHub), добавив новый callback URL:
- **Google**: Добавьте `https://financial-roadmap.vercel.app/api/auth/callback/google`
- **GitHub**: Обновите Authorization callback URL на `https://financial-roadmap.vercel.app/api/auth/callback/github`

Теперь ваше приложение доступно всему миру! 🌍
