export const SITE_URL = 'https://syurai.online';
export const SITE_NAME = 'Syurai.ai';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/syu.svg`,
  sameAs: ['https://github.com/Timur-marii8st'],
};

const makeBreadcrumbJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

const makeArticleJsonLd = ({ path, headline, description, datePublished, author }) => ({
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline,
  description,
  datePublished,
  author: {
    '@type': 'Person',
    name: author,
  },
  publisher: organizationJsonLd,
  mainEntityOfPage: `${SITE_URL}${path}`,
});

export const seoRoutes = [
  {
    path: '/',
    title: 'Syurai.ai | AI Agents, Research, and Compute Systems',
    description:
      'Syurai builds AI agents, contract automation and tested compute systems for business AI workloads.',
    jsonLd: organizationJsonLd,
  },
  {
    path: '/services',
    title: 'AI Agents for CRM Automation | Syurai.ai',
    description:
      'AI agents that connect to CRM systems and automate lead qualification, follow-ups, task creation, status updates, and reporting.',
    jsonLd: makeBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'AI Agents for CRM', path: '/services' },
    ]),
  },
  {
    path: '/consulting',
    title: 'Agentic Development Consulting | Syurai.ai',
    description:
      'Consulting for engineering teams adopting Claude Code, Codex, Cursor, and practical AI-assisted development workflows.',
    jsonLd: makeBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Agentic Development Consulting', path: '/consulting' },
    ]),
  },
  {
    path: '/compute',
    title: 'Syurai Compute | AI Workstations and GPU Servers',
    description:
      'AI workstations, compact systems, and GPU servers selected, benchmarked, supplied, and deployed for a specific business workload.',
    jsonLd: makeBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Syurai Compute', path: '/compute' },
    ]),
  },
  {
    path: '/research',
    title: 'AI Research and Publications | Syurai.ai',
    description:
      'Research on agentic architectures, mechanistic interpretability, latent-space psychology, and psychological profiling with language models.',
    jsonLd: makeBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Research', path: '/research' },
    ]),
  },
  {
    path: '/research/psych-scope-2026',
    title: 'Implicit Psychological Models in Language Models | Syurai.ai',
    description:
      'A 2026 preprint testing whether language models build implicit psychological models of speakers using sparse autoencoder latents.',
    type: 'article',
    jsonLd: makeArticleJsonLd({
      path: '/research/psych-scope-2026',
      headline:
        'Do Language Models Build Implicit Psychological Models of Speakers? Evidence from Sparse Autoencoder Latents',
      description:
        'IPM hypothesis test with Gemma 3 4B and Gemma Scope 2 SAEs across Big Five and Narcissism.',
      datePublished: '2026-02-01',
      author: 'Timur Sabitov',
    }),
  },
  {
    path: '/research/psych-llm-2025',
    title: 'Zero-Shot Psychological Profiling with LLMs | Syurai.ai',
    description:
      'A preprint evaluating modern language models for zero-shot MBTI and Big Five psychological profiling from text.',
    type: 'article',
    jsonLd: makeArticleJsonLd({
      path: '/research/psych-llm-2025',
      headline: 'Evaluating the Capabilities of Modern LLMs for Zero-Shot Automatic Psychological Profiling',
      description:
        'A comparison of modern LLMs for inferring MBTI types and Big Five traits from text in a zero-shot setting.',
      datePublished: '2025-12-14',
      author: 'Timur B. Sabitov',
    }),
  },
  {
    path: '/agents',
    title: 'AI Agents and Autonomous Systems | Syurai.ai',
    description:
      'Autonomous AI systems from personal planning assistants to enterprise workflow agents built by Syurai.',
  },
  {
    path: '/motivi',
    title: 'Motivi AI Planning Assistant | Syurai.ai',
    description:
      'Motivi is a proactive Telegram planning assistant with cognitive memory, calendar integration, habits, and long-term goal tracking.',
  },
  {
    path: '/vibe-doku',
    title: 'Vibe-Doku | Contract Operations System by Syurai',
    description:
      'Contract operations for procurement, legal review, document generation, and execution control with Saby integration and local AI support.',
  },
  {
    path: '/stack',
    title: 'AI Engineering Tech Stack | Syurai.ai',
    description:
      'The Syurai engineering stack for AI research and production systems, including Python, PyTorch, Polars, Rust, and LLM tooling.',
  },
  {
    path: '/team',
    title: 'Syurai Team | AI Researchers and Engineers',
    description:
      'Meet the Syurai team building AI agents, cognitive architectures, and high-performance AI systems.',
  },
  {
    path: '/team/timur',
    title: 'Timur Sabitov | Syurai.ai',
    description:
      'Timur Sabitov, Syurai founder, ML engineer, NLP researcher, and cognitive architect.',
    type: 'profile',
  },
  {
    path: '/team/arjun',
    title: 'Arjun Patel | Syurai.ai',
    description:
      'Arjun Patel, systems lead focused on Rust, C++, CUDA, high-performance computing, and AI infrastructure.',
    type: 'profile',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | Syurai.ai',
    description:
      'How Syurai collects, uses, and protects the data you submit through our contact forms.',
  },
  {
    path: '/ml-club',
    title: 'KZN ML Club | Syurai.ai',
    description:
      'KZN ML Club is a Kazan machine learning community for AI discussions, meetups, hackathons, and applied ML collaboration.',
    image: `${SITE_URL}/mlclub-people.jpg`,
  },
  {
    path: '/404',
    title: 'Page Not Found | Syurai.ai',
    description: 'The requested Syurai.ai page was not found.',
    noindex: true,
  },
];

export const localizedSeoText = {
  ru: {
    '/': {
      title: 'Syurai.ai | ИИ-агенты, исследования и AI-инфраструктура',
      description:
        'Syurai создаёт ИИ-агентов, автоматизирует договорную работу и подбирает вычислительные системы под бизнес-задачи AI.',
    },
    '/services': {
      title: 'ИИ-агенты для автоматизации CRM | Syurai.ai',
      description:
        'ИИ-агенты подключаются к CRM и автоматизируют квалификацию лидов, follow-up, создание задач, обновление статусов и отчетность.',
    },
    '/consulting': {
      title: 'Консалтинг по агентной разработке | Syurai.ai',
      description:
        'Помогаем инженерным командам внедрять Claude Code, Codex, Cursor и практичные процессы разработки с AI-агентами.',
    },
    '/compute': {
      title: 'Syurai Compute | Рабочие станции и GPU-серверы для ИИ',
      description:
        'Подбор, тестирование, поставка и внедрение рабочих станций, компактных AI-систем и GPU-серверов под конкретную нагрузку.',
    },
    '/research': {
      title: 'AI-исследования и публикации | Syurai.ai',
      description:
        'Исследования Syurai об агентных архитектурах, интерпретируемости, психологии латентных пространств и профилировании с LLM.',
    },
    '/research/psych-scope-2026': {
      title: 'Имплицитные психологические модели в LLM | Syurai.ai',
      description:
        'Препринт 2026 года о том, строят ли языковые модели имплицитные психологические модели говорящих через SAE-латенты.',
    },
    '/research/psych-llm-2025': {
      title: 'Zero-shot психологическое профилирование с LLM | Syurai.ai',
      description:
        'Препринт об оценке современных языковых моделей для zero-shot определения MBTI и Big Five по тексту.',
    },
    '/agents': {
      title: 'ИИ-агенты и автономные системы | Syurai.ai',
      description:
        'Автономные AI-системы Syurai: от персональных ассистентов планирования до корпоративных агентов для рабочих процессов.',
    },
    '/motivi': {
      title: 'Motivi AI - ассистент планирования | Syurai.ai',
      description:
        'Motivi - проактивный Telegram-ассистент планирования с когнитивной памятью, календарем, привычками и долгосрочными целями.',
    },
    '/vibe-doku': {
      title: 'Vibe-Doku | Система договорной работы от Syurai',
      description:
        'Закупки, юридическая проверка, подготовка документов и контроль исполнения с интеграцией Saby и поддержкой локального ИИ.',
    },
    '/stack': {
      title: 'Технологический стек AI-разработки | Syurai.ai',
      description:
        'Стек Syurai для AI-исследований и production-систем: Python, PyTorch, Polars, Rust и инструменты для LLM.',
    },
    '/team': {
      title: 'Команда Syurai | AI-исследователи и инженеры',
      description:
        'Команда Syurai, которая создает ИИ-агентов, когнитивные архитектуры и высокопроизводительные AI-системы.',
    },
    '/team/timur': {
      title: 'Тимур Сабитов | Syurai.ai',
      description:
        'Тимур Сабитов - основатель Syurai, ML-инженер, NLP-исследователь и архитектор когнитивных систем.',
    },
    '/team/arjun': {
      title: 'Арджун Патель | Syurai.ai',
      description:
        'Арджун Патель - systems lead Syurai: Rust, C++, CUDA, высокопроизводительные вычисления и AI-инфраструктура.',
    },
    '/privacy': {
      title: 'Политика конфиденциальности | Syurai.ai',
      description:
        'Как Syurai собирает, использует и защищает данные, которые вы отправляете через формы на сайте.',
    },
    '/ml-club': {
      title: 'KZN ML Club | Syurai.ai',
      description:
        'KZN ML Club - казанское ML-сообщество для встреч, хакатонов, обсуждений AI и прикладного машинного обучения.',
    },
    '/404': {
      title: 'Страница не найдена | Syurai.ai',
      description: 'Запрошенная страница Syurai.ai не найдена.',
    },
  },
};

export const getLocalizedSeoRoute = (route, lang = 'en') => ({
  ...route,
  ...(localizedSeoText[lang]?.[route.path] ?? {}),
});

export const fallbackContent = {
  en: {
    navLabel: 'Primary navigation',
    sectionsLabel: 'Key pages',
    continueLabel: 'Continue to the page',
    pages: {
      '/': {
        eyebrow: 'AI agents and applied research',
        heading: 'Syurai.ai',
        body:
          'Syurai builds AI agents, contract operations software, and compute systems tested for real business workloads.',
        links: [
          { path: '/services', label: 'AI agents for CRM automation' },
          { path: '/compute', label: 'Syurai Compute systems' },
          { path: '/vibe-doku', label: 'Vibe-Doku contract operations' },
          { path: '/consulting', label: 'Agentic development consulting' },
          { path: '/research', label: 'AI research publications' },
          { path: '/agents', label: 'Autonomous AI agents' },
        ],
      },
      '/services': {
        eyebrow: 'AI agents on CRM',
        heading: 'AI agents for CRM automation',
        body:
          'We build AI agents that connect to Bitrix24, amoCRM, Salesforce, or custom CRM APIs to automate lead qualification, follow-ups, task creation, status updates, and reporting.',
        links: [
          { path: '/consulting', label: 'Consulting for agentic teams' },
          { path: '/vibe-doku', label: 'Contract operations with Vibe-Doku' },
          { path: '/agents', label: 'Explore AI agents' },
        ],
      },
      '/consulting': {
        eyebrow: 'Agentic development consulting',
        heading: 'Consulting for teams adopting AI coding agents',
        body:
          'Syurai helps engineering teams introduce Claude Code, Codex, Cursor, and AI-assisted workflows with practical process design, reviews, onboarding, and delivery support.',
        links: [
          { path: '/services', label: 'Business AI agents' },
          { path: '/stack', label: 'Engineering stack' },
          { path: '/team', label: 'Meet the team' },
        ],
      },
      '/compute': {
        eyebrow: 'Syurai Compute',
        heading: 'Compute systems for AI workloads',
        body:
          'We select, benchmark, supply, and deploy AI workstations, compact systems, and GPU servers against an agreed workload and acceptance test.',
        links: [
          { path: '/services', label: 'Business AI agents' },
          { path: '/vibe-doku', label: 'Vibe-Doku contract operations' },
          { path: '/stack', label: 'Engineering stack' },
        ],
      },
      '/research': {
        eyebrow: 'Research',
        heading: 'AI research and publications',
        body:
          'Research from Syurai on agentic architectures, mechanistic interpretability, latent-space psychology, and psychological profiling with language models.',
        links: [
          { path: '/research/psych-scope-2026', label: 'Implicit psychological models in language models' },
          { path: '/research/psych-llm-2025', label: 'Zero-shot psychological profiling with LLMs' },
        ],
      },
      '/research/psych-scope-2026': {
        eyebrow: 'Preprint, 2026',
        heading: 'Do Language Models Build Implicit Psychological Models of Speakers?',
        body:
          'A Syurai preprint testing the implicit psychological model hypothesis with Gemma 3 4B and Gemma Scope 2 sparse autoencoders across Big Five and Narcissism traits.',
        links: [
          { path: '/research', label: 'Back to research' },
          { path: '/research/psych-llm-2025', label: 'Related psychological profiling paper' },
        ],
      },
      '/research/psych-llm-2025': {
        eyebrow: 'Preprint, 2025',
        heading: 'Evaluating Modern LLMs for Zero-Shot Automatic Psychological Profiling',
        body:
          'A Syurai paper evaluating whether modern language models can infer MBTI types and Big Five traits from text in a zero-shot setting.',
        links: [
          { path: '/research', label: 'Back to research' },
          { path: '/research/psych-scope-2026', label: 'Implicit psychological models paper' },
        ],
      },
      '/agents': {
        eyebrow: 'Autonomous systems',
        heading: 'AI agents and autonomous systems',
        body:
          'Syurai develops autonomous AI systems for personal productivity, enterprise workflows, contract automation, planning, and applied research workflows.',
        links: [
          { path: '/motivi', label: 'Motivi planning assistant' },
          { path: '/vibe-doku', label: 'Vibe-Doku for contracts' },
          { path: '/services', label: 'AI agents for business' },
        ],
      },
      '/motivi': {
        eyebrow: 'Planning assistant',
        heading: 'Motivi AI planning assistant',
        body:
          'Motivi is a proactive Telegram planning assistant with cognitive memory, Google Calendar integration, habit tracking, multimodal input, and long-term goal support.',
        links: [
          { path: '/agents', label: 'Back to agents' },
          { path: '/stack', label: 'Technology stack' },
        ],
      },
      '/vibe-doku': {
        eyebrow: 'Contract automation',
        heading: 'Vibe-Doku contract operations',
        body:
          'Vibe-Doku coordinates procurement, legal review, document generation, and execution control with Saby integration, local AI support, and evidence-first checks.',
        links: [
          { path: '/agents', label: 'Back to agents' },
          { path: '/services', label: 'Business AI automation' },
        ],
      },
      '/stack': {
        eyebrow: 'Engineering',
        heading: 'AI engineering tech stack',
        body:
          'Syurai uses Python, PyTorch, Polars, Rust, CUDA, Hugging Face tooling, and modern LLM infrastructure to build research and production AI systems.',
        links: [
          { path: '/research', label: 'Research' },
          { path: '/team', label: 'Team' },
        ],
      },
      '/team': {
        eyebrow: 'Team',
        heading: 'Syurai team',
        body:
          'The Syurai team combines AI research, ML engineering, systems programming, CUDA, Rust, NLP, and cognitive architecture work.',
        links: [
          { path: '/team/timur', label: 'Timur Sabitov' },
          { path: '/team/arjun', label: 'Arjun Patel' },
        ],
      },
      '/team/timur': {
        eyebrow: 'Founder',
        heading: 'Timur Sabitov',
        body:
          'Timur Sabitov is the founder of Syurai, an ML engineer, NLP researcher, and cognitive architect focused on AI agents and language model research.',
        links: [
          { path: '/team', label: 'Back to team' },
          { path: '/research', label: 'Research publications' },
        ],
      },
      '/team/arjun': {
        eyebrow: 'Systems lead',
        heading: 'Arjun Patel',
        body:
          'Arjun Patel leads systems work at Syurai with a focus on Rust, C++, CUDA, high-performance computing, and AI infrastructure.',
        links: [
          { path: '/team', label: 'Back to team' },
          { path: '/stack', label: 'Engineering stack' },
        ],
      },
      '/privacy': {
        eyebrow: 'Legal',
        heading: 'Privacy Policy',
        body:
          'We collect only the data you submit through our contact forms and use it solely to respond to your request.',
        links: [
          { path: '/', label: 'Go home' },
          { path: '/services', label: 'AI agents for CRM automation' },
        ],
      },
      '/ml-club': {
        eyebrow: 'Community',
        heading: 'KZN ML Club',
        body:
          'KZN ML Club is a Kazan machine learning community for AI discussions, regular meetups, hackathons, and applied ML collaboration.',
        links: [
          { path: '/research', label: 'Research' },
        ],
      },
      '/404': {
        eyebrow: '404',
        heading: 'Page not found',
        body: 'The requested Syurai.ai page was not found.',
        links: [{ path: '/', label: 'Go home' }],
      },
    },
  },
  ru: {
    navLabel: 'Основная навигация',
    sectionsLabel: 'Ключевые страницы',
    continueLabel: 'Перейти на страницу',
    pages: {
      '/': {
        eyebrow: 'ИИ-агенты и прикладные исследования',
        heading: 'Syurai.ai',
        body:
          'Syurai создаёт ИИ-агентов, систему договорной работы и вычислительную инфраструктуру, проверенную на реальных бизнес-задачах.',
        links: [
          { path: '/services', label: 'ИИ-агенты для CRM' },
          { path: '/compute', label: 'Вычислительные системы Syurai Compute' },
          { path: '/vibe-doku', label: 'Система договорной работы Vibe-Doku' },
          { path: '/consulting', label: 'Консалтинг по агентной разработке' },
          { path: '/research', label: 'AI-исследования' },
          { path: '/agents', label: 'Автономные ИИ-агенты' },
        ],
      },
      '/services': {
        eyebrow: 'ИИ-агенты поверх CRM',
        heading: 'ИИ-агенты для автоматизации CRM',
        body:
          'Мы строим ИИ-агентов, которые подключаются к Bitrix24, amoCRM, Salesforce или CRM с API и автоматизируют квалификацию лидов, follow-up, задачи, статусы и отчеты.',
        links: [
          { path: '/consulting', label: 'Консалтинг для агентных команд' },
          { path: '/vibe-doku', label: 'Договорная работа Vibe-Doku' },
          { path: '/agents', label: 'Посмотреть ИИ-агентов' },
        ],
      },
      '/consulting': {
        eyebrow: 'Агентная разработка',
        heading: 'Консалтинг для команд, внедряющих AI coding agents',
        body:
          'Syurai помогает инженерным командам внедрять Claude Code, Codex, Cursor и AI-assisted процессы через дизайн workflow, ревью, онбординг и delivery support.',
        links: [
          { path: '/services', label: 'ИИ-агенты для бизнеса' },
          { path: '/stack', label: 'Инженерный стек' },
          { path: '/team', label: 'Команда' },
        ],
      },
      '/compute': {
        eyebrow: 'Syurai Compute',
        heading: 'Вычислительные системы под AI-задачи',
        body:
          'Подбираем, тестируем, поставляем и внедряем рабочие станции, компактные AI-системы и GPU-серверы по согласованной нагрузке и тесту приёмки.',
        links: [
          { path: '/services', label: 'ИИ-агенты для бизнеса' },
          { path: '/vibe-doku', label: 'Система договорной работы Vibe-Doku' },
          { path: '/stack', label: 'Инженерный стек' },
        ],
      },
      '/research': {
        eyebrow: 'Исследования',
        heading: 'AI-исследования и публикации',
        body:
          'Исследования Syurai об агентных архитектурах, механистической интерпретируемости, психологии латентных пространств и психологическом профилировании с LLM.',
        links: [
          { path: '/research/psych-scope-2026', label: 'Имплицитные психологические модели в LLM' },
          { path: '/research/psych-llm-2025', label: 'Zero-shot психологическое профилирование с LLM' },
        ],
      },
      '/research/psych-scope-2026': {
        eyebrow: 'Препринт, 2026',
        heading: 'Строят ли языковые модели имплицитные психологические модели говорящих?',
        body:
          'Препринт Syurai проверяет гипотезу имплицитных психологических моделей на Gemma 3 4B и Gemma Scope 2 SAE по Big Five и нарциссизму.',
        links: [
          { path: '/research', label: 'Назад к исследованиям' },
          { path: '/research/psych-llm-2025', label: 'Связанная статья о профилировании' },
        ],
      },
      '/research/psych-llm-2025': {
        eyebrow: 'Препринт, 2025',
        heading: 'Оценка современных LLM для zero-shot психологического профилирования',
        body:
          'Статья Syurai оценивает, могут ли современные языковые модели определять MBTI и Big Five по тексту в zero-shot режиме.',
        links: [
          { path: '/research', label: 'Назад к исследованиям' },
          { path: '/research/psych-scope-2026', label: 'Статья об имплицитных моделях' },
        ],
      },
      '/agents': {
        eyebrow: 'Автономные системы',
        heading: 'ИИ-агенты и автономные системы',
        body:
          'Syurai разрабатывает автономные AI-системы для продуктивности, корпоративных процессов, автоматизации договоров, планирования и исследований.',
        links: [
          { path: '/motivi', label: 'Ассистент планирования Motivi' },
          { path: '/vibe-doku', label: 'Vibe-Doku для договоров' },
          { path: '/services', label: 'ИИ-агенты для бизнеса' },
        ],
      },
      '/motivi': {
        eyebrow: 'Ассистент планирования',
        heading: 'Motivi AI',
        body:
          'Motivi - проактивный Telegram-ассистент планирования с когнитивной памятью, Google Calendar, трекингом привычек, мультимодальным вводом и долгосрочными целями.',
        links: [
          { path: '/agents', label: 'Назад к агентам' },
          { path: '/stack', label: 'Технологический стек' },
        ],
      },
      '/vibe-doku': {
        eyebrow: 'Автоматизация договоров',
        heading: 'Vibe-Doku для договорной работы',
        body:
          'Vibe-Doku связывает закупки, юридическую проверку, подготовку документов и контроль исполнения с интеграцией Saby, локальным ИИ и проверяемыми источниками.',
        links: [
          { path: '/agents', label: 'Назад к агентам' },
          { path: '/services', label: 'Автоматизация бизнеса с AI' },
        ],
      },
      '/stack': {
        eyebrow: 'Инженерия',
        heading: 'Технологический стек AI-разработки',
        body:
          'Syurai использует Python, PyTorch, Polars, Rust, CUDA, Hugging Face и современную LLM-инфраструктуру для research и production AI-систем.',
        links: [
          { path: '/research', label: 'Исследования' },
          { path: '/team', label: 'Команда' },
        ],
      },
      '/team': {
        eyebrow: 'Команда',
        heading: 'Команда Syurai',
        body:
          'Команда Syurai объединяет AI research, ML engineering, systems programming, CUDA, Rust, NLP и работу над когнитивными архитектурами.',
        links: [
          { path: '/team/timur', label: 'Тимур Сабитов' },
          { path: '/team/arjun', label: 'Арджун Патель' },
        ],
      },
      '/team/timur': {
        eyebrow: 'Основатель',
        heading: 'Тимур Сабитов',
        body:
          'Тимур Сабитов - основатель Syurai, ML-инженер, NLP-исследователь и архитектор когнитивных систем, работающий над ИИ-агентами и LLM-исследованиями.',
        links: [
          { path: '/team', label: 'Назад к команде' },
          { path: '/research', label: 'Публикации' },
        ],
      },
      '/team/arjun': {
        eyebrow: 'Systems lead',
        heading: 'Арджун Патель',
        body:
          'Арджун Патель отвечает за systems-направление Syurai: Rust, C++, CUDA, высокопроизводительные вычисления и AI-инфраструктуру.',
        links: [
          { path: '/team', label: 'Назад к команде' },
          { path: '/stack', label: 'Инженерный стек' },
        ],
      },
      '/privacy': {
        eyebrow: 'Правовая информация',
        heading: 'Политика конфиденциальности',
        body:
          'Мы собираем только те данные, которые вы отправляете через формы на сайте, и используем их исключительно для ответа на ваш запрос.',
        links: [
          { path: '/', label: 'На главную' },
          { path: '/services', label: 'ИИ-агенты для CRM' },
        ],
      },
      '/ml-club': {
        eyebrow: 'Сообщество',
        heading: 'KZN ML Club',
        body:
          'KZN ML Club - казанское ML-сообщество для обсуждений AI, регулярных встреч, хакатонов и прикладного машинного обучения.',
        links: [
          { path: '/research', label: 'Исследования' },
        ],
      },
      '/404': {
        eyebrow: '404',
        heading: 'Страница не найдена',
        body: 'Запрошенная страница Syurai.ai не найдена.',
        links: [{ path: '/', label: 'На главную' }],
      },
    },
  },
};
