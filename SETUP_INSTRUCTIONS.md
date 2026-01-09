# 🚀 Настройка монетизации и аутентификации

## Предварительные требования

1. **Аккаунт Stripe** для платежей: https://stripe.com
2. **Аккаунт Google Cloud** для OAuth: https://console.cloud.google.com
3. **Аккаунт GitHub** для OAuth: https://github.com/settings/developers
4. **Аккаунт Supabase** для базы данных (опционально): https://supabase.com

## Шаг 1: Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Supabase (опционально)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Stripe (опционально)
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

## Шаг 2: Настройка Google OAuth

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com)
2. Создайте новый проект или выберите существующий
3. Включите Google+ API
4. Создайте OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Скопируйте Client ID и Client Secret в `.env.local`

## Шаг 3: Настройка GitHub OAuth

1. Перейдите в [GitHub Developer Settings](https://github.com/settings/developers)
2. Создайте новое OAuth App:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Скопируйте Client ID и Client Secret в `.env.local`

## Шаг 4: Настройка Stripe

1. Создайте аккаунт на [Stripe](https://stripe.com)
2. Перейдите в Developers > API keys
3. Скопируйте Publishable key и Secret key
4. Создайте продукт в Stripe Dashboard:
   - Product name: "Premium Subscription"
   - Pricing: $9.99/month
5. Скопируйте Price ID в код компонента StripeCheckout

## Шаг 5: Настройка Supabase (опционально)

1. Создайте проект на [Supabase](https://supabase.com)
2. Перейдите в Settings > API
3. Скопируйте Project URL и anon/public key
4. Перейдите в Settings > Service Role и скопируйте service_role key

## Шаг 6: Запуск приложения

```bash
npm run dev
```

## Тестирование функций

### Аутентификация
- Нажмите "Sign In" в правом верхнем углу
- Попробуйте войти через Google/GitHub
- Проверьте статус пользователя

### Премиум функции
- Перейдите в режим "От цели"
- Попробуйте использовать премиум функции
- Должно появиться предложение обновления

### Социальные функции
- Перейдите на вкладку "Community"
- Попробуйте сохранить/загрузить сценарии
- Проверьте лидерборд и сравнения

### Образовательный контент
- Перейдите на вкладку "Learn"
- Просмотрите персональные рекомендации
- Попробуйте открыть премиум уроки

## Следующие шаги для продакшена

1. **Настройка продакшн базы данных** (Supabase или PostgreSQL)
2. **Webhook endpoints** для Stripe платежей
3. **Email notifications** для новых подписок
4. **Analytics** (Vercel Analytics, Mixpanel)
5. **Error monitoring** (Sentry)
6. **CDN** для статических файлов
7. **SSL сертификат** для HTTPS

## Модель монетизации

### Freemium
- **Бесплатно**: базовый калькулятор, 3 сценария, community features
- **Premium ($9.99/мес)**: неограниченные сценарии, продвинутые функции, приоритетная поддержка

### B2B
- **Professional ($49/пользователь)**: командные функции, интеграции
- **Enterprise ($99/пользователь)**: white-label, custom features, SLA

### Цели на первый год
- **MRR**: $50k (833 платных пользователя)
- **ARR**: $600k
- **Пользователи**: 10,000 total, 1,000 premium

## Поддержка

Если возникнут проблемы с настройкой, проверьте:
1. Правильность переменных окружения
2. Корректность callback URLs в OAuth настройках
3. Активность API ключей Stripe
4. Правильность Supabase конфигурации

Happy coding! 🚀
