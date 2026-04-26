# React Design Starter

Стартер для быстрой сборки полированных React-сайтов в связке с Claude.
Реализация рекомендаций из видео-гайда: дизайн-токены, готовый UI-кит,
обёртки Framer Motion и промпт-шаблоны для AI.

## Что внутри

```
src/
  components/   ← UI-кит: Button, Card, Container (расширяй)
  motion/       ← FadeIn, Reveal, Stagger — обёртки Framer Motion
  styles/       ← globals.css с CSS-переменными (светлая + тёмная темы)
  lib/          ← cn() и прочие утилиты
prompts/
  system.md         ← системный промпт для Claude (скопируй в Project Instructions)
  page-template.md  ← шаблон запроса "сгенерируй страницу"
tailwind.config.ts  ← все дизайн-токены: цвета, шрифты, тени, easing
```

## Запуск

```bash
npm install
npm run dev
```

Откроется smoke-тест с кнопками, карточками и анимациями. Если всё
рендерится и анимируется — стек собран корректно. Удаляй `App.tsx`
и пиши свои страницы.

## Как использовать с Claude

1. **Создай Project в Claude.ai** (или используй любой интерфейс,
   поддерживающий длинный системный промпт).
2. Содержимое `prompts/system.md` положи в Project Instructions
   (или Custom Instructions).
3. Загрузи в проект как контекст: `tailwind.config.ts`,
   `src/components/index.ts`, `src/motion/index.ts`,
   `src/styles/globals.css`. Этого достаточно — Claude поймёт токены
   и API.
4. Когда нужна страница — открой `prompts/page-template.md`,
   скопируй, заполни и отправь.

## Про MCP

В видео упоминается MCP — это **Model Context Protocol** Anthropic.
MCP-серверы подключаются не в твой React-проект через npm, а к
самому Claude — через интерфейс (Settings → Connectors). Полезные
для дизайн-работы:

- **Filesystem MCP** — даёт Claude прямой доступ к файлам проекта.
- **GitHub MCP** — Claude может читать/писать ветки и PR.
- **Figma MCP** (если у тебя есть макет) — Claude видит фреймы.

Подключение делается в настройках Claude, не здесь.

## Соглашения

- **Только токены, никакого хардкода.** `bg-surface`, не `bg-white`.
- **Анимации только через обёртки `@/motion`.** Не разводить
  `motion.div` по компонентам.
- **Семантика и доступность** — обязательны, не опциональны.
- **`cn(...)`** для слияния классов вместо склейки строк.

## QA-чеклист перед коммитом страницы

- [ ] Все цвета — через токены, в `git diff` нет `#hex` и `gray-N`.
- [ ] На мобильном (375px) ничего не вылезает по горизонтали.
- [ ] Tab-навигация работает, фокус виден.
- [ ] Тёмная тема не ломается (переключи `<html class="dark">`).
- [ ] Анимации не дёргают layout (только transform/opacity).
- [ ] Lighthouse / axe не нашли критических нарушений.
