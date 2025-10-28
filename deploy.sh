#!/bin/bash
echo "🚀 Starting deployment process..."

# Собираем проект
npm run build

# Деплоим на Vercel
npx vercel --prod

echo "✅ Deployment completed!"
