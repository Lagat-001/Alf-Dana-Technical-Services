export interface FAQ {
  id: string
  question: string
  answer: string
  keywords: string[]
}

export interface ChatbotData {
  greeting: string
  faqs: FAQ[]
  handoffMessage: string
  noMatchMessage: string
}

export const chatbotData: Record<string, ChatbotData> = {
  en: {
    greeting: "Hello! I'm your ALF DANA assistant. How can I help you today?",
    handoffMessage: "I'll connect you with our WhatsApp team for immediate assistance!",
    noMatchMessage: "I'm not sure about that. Let me connect you with our team.",
    faqs: [
      {
        id: 'services',
        question: 'What services do you offer?',
        keywords: ['service', 'offer', 'provide', 'do you', 'what can'],
        answer:
          'We offer 8 main services: AC Maintenance, Plumbing, Electrical, Painting, Carpentry, Tiling, Deep Cleaning, and General Maintenance. Which one do you need help with?',
      },
      {
        id: 'quote',
        question: 'How do I get a quote?',
        keywords: ['quote', 'price', 'cost', 'how much', 'estimate', 'rate', 'charge'],
        answer:
          "Getting a quote is easy! Click the WhatsApp button and tell us your requirement. We'll respond within 1 hour with a detailed quote.",
      },
      {
        id: 'areas',
        question: 'Which areas do you cover?',
        keywords: ['area', 'location', 'cover', 'where', 'dubai', 'abu dhabi', 'sharjah', 'ajman'],
        answer:
          'We cover all major areas in UAE: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, and Fujairah.',
      },
      {
        id: 'response',
        question: 'How quickly can you respond?',
        keywords: ['fast', 'quick', 'urgent', 'emergency', 'response', 'how long', 'when'],
        answer:
          'For emergencies, we respond within 1 hour. For scheduled work, we can arrange service within 24 hours.',
      },
      {
        id: 'licensed',
        question: 'Are you licensed and insured?',
        keywords: ['license', 'insured', 'certified', 'official', 'registered', 'legal'],
        answer:
          'Yes! ALF DANA is fully licensed by UAE authorities and carries comprehensive insurance. All technicians are certified professionals.',
      },
      {
        id: 'hours',
        question: 'What are your working hours?',
        keywords: ['hours', 'open', 'available', 'timing', 'when', 'schedule', 'time'],
        answer:
          'Mon–Sat: 8:00 AM – 8:00 PM, Sunday: 9:00 AM – 5:00 PM. Emergency services available 24/7.',
      },
    ],
  },
  ar: {
    greeting: 'مرحباً! أنا مساعد ألف دانا. كيف يمكنني مساعدتك اليوم؟',
    handoffMessage: 'سأتواصل معك مع فريقنا عبر واتساب للمساعدة الفورية!',
    noMatchMessage: 'لست متأكداً من ذلك. دعني أتواصل معك مع فريقنا.',
    faqs: [
      {
        id: 'services',
        question: 'ما الخدمات التي تقدمونها؟',
        keywords: ['خدمة', 'خدمات', 'تقديم', 'ماذا', 'ما هي'],
        answer:
          'نقدم 8 خدمات رئيسية: صيانة التكييف، السباكة، الكهرباء، الدهان، النجارة، التبليط، التنظيف العميق، والصيانة العامة.',
      },
      {
        id: 'quote',
        question: 'كيف أحصل على عرض سعر؟',
        keywords: ['عرض', 'سعر', 'تكلفة', 'كم', 'تسعير'],
        answer: 'انقر على زر واتساب وأخبرنا بمتطلباتك. سنرد خلال ساعة بعرض سعر تفصيلي.',
      },
      {
        id: 'areas',
        question: 'ما المناطق التي تغطونها؟',
        keywords: ['منطقة', 'مناطق', 'دبي', 'أبو ظبي', 'الشارقة', 'أين', 'تغطية'],
        answer:
          'نغطي جميع المناطق الرئيسية في الإمارات: دبي وأبو ظبي والشارقة وعجمان ورأس الخيمة والفجيرة.',
      },
      {
        id: 'response',
        question: 'كم يستغرق الرد؟',
        keywords: ['سريع', 'عاجل', 'طوارئ', 'كم يستغرق', 'متى', 'وقت'],
        answer:
          'للطوارئ نستجيب خلال ساعة واحدة. للعمل المجدول يمكننا ترتيب الخدمة خلال 24 ساعة.',
      },
      {
        id: 'licensed',
        question: 'هل أنتم مرخصون ومؤمنون؟',
        keywords: ['رخصة', 'ترخيص', 'مؤمن', 'معتمد', 'رسمي'],
        answer:
          'نعم! ألف دانا مرخصة بالكامل من سلطات الإمارات وتحمل تأميناً شاملاً. جميع فنيينا محترفون معتمدون.',
      },
      {
        id: 'hours',
        question: 'ما هي ساعات العمل؟',
        keywords: ['ساعات', 'وقت', 'متى', 'مفتوح', 'دوام'],
        answer:
          'الاثنين–السبت من 8 صباحاً حتى 8 مساءً، والأحد من 9 صباحاً حتى 5 مساءً. خدمات الطوارئ متاحة 24/7.',
      },
    ],
  },
  hi: {
    greeting: 'नमस्ते! मैं ALF DANA का सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?',
    handoffMessage: 'तत्काल सहायता के लिए मैं आपको हमारी WhatsApp टीम से जोड़ूंगा!',
    noMatchMessage: 'मुझे इसके बारे में यकीन नहीं है। मैं आपको हमारी टीम से जोड़ता हूं।',
    faqs: [
      {
        id: 'services',
        question: 'आप क्या सेवाएं प्रदान करते हैं?',
        keywords: ['सेवा', 'सेवाएं', 'क्या', 'कौन', 'प्रदान'],
        answer:
          'हम 8 मुख्य सेवाएं प्रदान करते हैं: AC मेंटेनेंस, प्लम्बिंग, इलेक्ट्रिकल, पेंटिंग, कारपेंट्री, टाइलिंग, डीप क्लीनिंग और जनरल मेंटेनेंस।',
      },
      {
        id: 'quote',
        question: 'कोटेशन कैसे मिलेगी?',
        keywords: ['कोटेशन', 'कीमत', 'रेट', 'कितना', 'मूल्य'],
        answer:
          'WhatsApp बटन पर क्लिक करें और हमें अपनी आवश्यकता बताएं। हम 1 घंटे के भीतर विस्तृत कोटेशन देंगे।',
      },
      {
        id: 'areas',
        question: 'आप कौन से क्षेत्रों में सेवा देते हैं?',
        keywords: ['क्षेत्र', 'जगह', 'कहां', 'दुबई', 'अबु धाबी'],
        answer:
          'हम UAE के सभी प्रमुख क्षेत्रों में सेवा देते हैं: दुबई, अबु धाबी, शारजाह, अजमान, रास अल खैमाह और फुजैराह।',
      },
      {
        id: 'response',
        question: 'जवाब में कितना समय लगता है?',
        keywords: ['समय', 'जल्दी', 'इमरजेंसी', 'कब', 'कितना'],
        answer:
          'आपात स्थितियों के लिए 1 घंटे के भीतर प्रतिक्रिया। शेड्यूल काम के लिए 24 घंटे के भीतर सेवा।',
      },
      {
        id: 'licensed',
        question: 'क्या आप लाइसेंस्ड और बीमाकृत हैं?',
        keywords: ['लाइसेंस', 'बीमा', 'प्रमाणित', 'आधिकारिक'],
        answer:
          'हां! ALF DANA UAE प्राधिकरणों द्वारा पूरी तरह लाइसेंस्ड है। हमारे सभी तकनीशियन प्रमाणित पेशेवर हैं।',
      },
      {
        id: 'hours',
        question: 'काम के घंटे क्या हैं?',
        keywords: ['घंटे', 'समय', 'खुला', 'कब', 'उपलब्ध'],
        answer:
          'सोमवार–शनिवार 8:00 AM से 8:00 PM, रविवार 9:00 AM से 5:00 PM। आपात सेवाएं 24/7 उपलब्ध हैं।',
      },
    ],
  },
  ur: {
    greeting: 'سلام! میں ALF DANA کا معاون ہوں۔ آج میں آپ کی کیسے مدد کر سکتا ہوں؟',
    handoffMessage: 'فوری مدد کے لیے میں آپ کو ہماری WhatsApp ٹیم سے جوڑوں گا!',
    noMatchMessage: 'مجھے اس بارے میں یقین نہیں۔ میں آپ کو ہماری ٹیم سے جوڑتا ہوں۔',
    faqs: [
      {
        id: 'services',
        question: 'آپ کون سی خدمات فراہم کرتے ہیں؟',
        keywords: ['خدمت', 'خدمات', 'کیا', 'کون', 'فراہم'],
        answer:
          'ہم 8 اہم خدمات فراہم کرتے ہیں: AC مینٹیننس، پلمبنگ، الیکٹریکل، پینٹنگ، نجاری، ٹائلنگ، ڈیپ کلیننگ اور جنرل مینٹیننس۔',
      },
      {
        id: 'quote',
        question: 'قیمت کیسے ملے گی؟',
        keywords: ['قیمت', 'کتنا', 'ریٹ', 'خرچہ', 'تخمینہ'],
        answer:
          'WhatsApp بٹن پر کلک کریں اور ہمیں اپنی ضرورت بتائیں۔ ہم 1 گھنٹے کے اندر تفصیلی قیمت دیں گے۔',
      },
      {
        id: 'areas',
        question: 'آپ کون سے علاقوں میں خدمت دیتے ہیں؟',
        keywords: ['علاقہ', 'کہاں', 'دبئی', 'ابوظہبی', 'شارجہ'],
        answer:
          'ہم UAE کے تمام بڑے علاقوں میں خدمت دیتے ہیں: دبئی، ابوظہبی، شارجہ، عجمان، رأس الخیمہ اور فجیرہ۔',
      },
      {
        id: 'response',
        question: 'جواب میں کتنا وقت لگتا ہے؟',
        keywords: ['وقت', 'جلدی', 'ہنگامی', 'کب', 'کتنا'],
        answer:
          'ہنگامی صورتوں میں 1 گھنٹے کے اندر ردعمل۔ شیڈول کام کے لیے 24 گھنٹوں کے اندر خدمت۔',
      },
      {
        id: 'licensed',
        question: 'کیا آپ لائسنس یافتہ اور بیمہ شدہ ہیں؟',
        keywords: ['لائسنس', 'بیمہ', 'سند', 'سرکاری'],
        answer:
          'جی ہاں! ALF DANA UAE حکام کے ذریعے مکمل لائسنس یافتہ ہے۔ ہمارے تمام ٹیکنیشن سند یافتہ پیشہ ور ہیں۔',
      },
      {
        id: 'hours',
        question: 'کام کے اوقات کیا ہیں؟',
        keywords: ['اوقات', 'وقت', 'کھلا', 'کب'],
        answer:
          'پیر سے ہفتہ 8:00 AM سے 8:00 PM اور اتوار 9:00 AM سے 5:00 PM۔ ہنگامی خدمات 24/7 دستیاب ہیں۔',
      },
    ],
  },
  zh: {
    greeting: '您好！我是ALF DANA助手。今天我能为您做什么？',
    handoffMessage: '我将为您连接我们的WhatsApp团队以获得即时帮助！',
    noMatchMessage: '我不确定这一点。让我为您连接我们的团队。',
    faqs: [
      {
        id: 'services',
        question: '您提供哪些服务？',
        keywords: ['服务', '提供', '什么', '哪些'],
        answer:
          '我们提供8项主要服务：空调维护、管道工程、电气工程、油漆工程、木工、铺砖、深度清洁和综合维护。',
      },
      {
        id: 'quote',
        question: '如何获取报价？',
        keywords: ['报价', '价格', '多少钱', '费用', '收费'],
        answer: '点击WhatsApp按钮，告诉我们您的需求。我们将在1小时内回复详细报价。',
      },
      {
        id: 'areas',
        question: '您覆盖哪些地区？',
        keywords: ['地区', '位置', '哪里', '迪拜', '阿布扎比'],
        answer: '我们覆盖阿联酋所有主要地区：迪拜、阿布扎比、沙迦、阿治曼、哈伊马角和富查伊拉。',
      },
      {
        id: 'response',
        question: '响应速度如何？',
        keywords: ['快速', '紧急', '多快', '时间', '多长'],
        answer: '紧急情况下1小时内响应。计划工程通常可在24小时内安排服务。',
      },
      {
        id: 'licensed',
        question: '你们有许可证和保险吗？',
        keywords: ['许可证', '保险', '认证', '官方'],
        answer: '是的！ALF DANA获得阿联酋当局完全许可，持有全面保险。所有技术人员都是认证专业人士。',
      },
      {
        id: 'hours',
        question: '工作时间是什么？',
        keywords: ['时间', '营业', '开放', '何时'],
        answer:
          '周一至周六8:00 AM至8:00 PM，周日9:00 AM至5:00 PM。24/7提供紧急服务。',
      },
    ],
  },
}

export function findFAQAnswer(
  locale: string,
  query: string
): { answer: string; matched: boolean } {
  const data = chatbotData[locale] || chatbotData.en
  const queryLower = query.toLowerCase()

  for (const faq of data.faqs) {
    if (faq.keywords.some((kw) => queryLower.includes(kw.toLowerCase()))) {
      return { answer: faq.answer, matched: true }
    }
  }

  return { answer: data.noMatchMessage, matched: false }
}
