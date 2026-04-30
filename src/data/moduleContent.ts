export interface Topic {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  quiz: Question[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'image' | 'list' | 'info';
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const topics: Topic[] = [
  {
    id: 'intro',
    title: 'Introduction to AI',
    description: 'Foundational concepts and definitions of Artificial Intelligence.',
    sections: [
      {
        id: 'def',
        title: 'What is AI?',
        type: 'text',
        content: 'Artificial Intelligence refers to computer programs that can complete cognitive tasks typically associated with human intelligence. Intelligence is the human ability to perform cognitive tasks like thinking, understanding, learning, and remembering.'
      },
      {
        id: 'evo',
        title: 'Evolution of AI',
        type: 'list',
        content: '1950: The Turing Test (Ability to exhibit behavior indistinguishable from a human). \n1956: Birth of AI (Dartmouth Workshop). \n1980s: Expert Systems (Rule-based). \n1997: IBM Deep Blue beats Kasparov. \n2010s: Deep Learning Boom (Neural Networks). \nPresent: Generative AI (LLMs).'
      }
    ],
    quiz: [
      {
        id: 'q1',
        text: 'What was the primary focus of Alan Turing\'s 1950 proposal?',
        options: ['Quantum computing', 'The Imitation Game / Turing Test', 'Blockchain technology', 'Social media algorithms'],
        correctAnswer: 1,
        explanation: 'Alan Turing proposed the "Imitation Game" to test a machine\'s ability to exhibit intelligent behavior indistinguishable from a human.'
      },
      {
        id: 'q2',
        text: 'Which event in 1956 is officially recognized as the birth of AI as an academic discipline?',
        options: ['The London Olympics', 'The Dartmouth Workshop', 'The moon landing', 'The invention of the internet'],
        correctAnswer: 1,
        explanation: 'The term "Artificial Intelligence" was coined at the Dartmouth Workshop in 1956, marking its start as an official field.'
      }
    ]
  },
  {
    id: 'ml',
    title: 'Machine Learning Paradigms',
    description: 'Understanding the clear hierarchy and the three main paradigms.',
    sections: [
      {
        id: 'hierarchy',
        title: 'The AI Hierarchy',
        type: 'info',
        content: 'AI (Broad field) > Machine Learning (Algorithms that learn patterns) > Deep Learning (Specialized subset using neural networks).'
      },
      {
        id: 'paradigms',
        title: 'Three Main Paradigms',
        type: 'list',
        content: '1. Supervised Learning: Learning from labeled examples (Ground Truth), e.g., Spam vs Not Spam. \n2. Unsupervised Learning: Discovering structure from unlabeled data (Clustering). \n3. Reinforcement Learning: Learning through trial and error via rewards/penalties.'
      }
    ],
    quiz: [
      {
        id: 'ml_q1',
        text: 'In Supervised Learning, what is another term for labeled examples used for training?',
        options: ['Random noise', 'Ground truth', 'Latent space', 'Tokens'],
        correctAnswer: 1,
        explanation: 'Labeled data provides the "ground truth" for the model to learn correct outputs for specific inputs.'
      },
      {
        id: 'ml_q2',
        text: 'Which paradigm involves discovering structures like "Clustering" within unlabeled data?',
        options: ['Supervised Learning', 'Reinforcement Learning', 'Unsupervised Learning', 'Prompt Engineering'],
        correctAnswer: 2,
        explanation: 'Unsupervised Learning works with unlabeled data to uncover hidden patterns and relationships, such as grouping similar data points (clustering).'
      }
    ]
  },
  {
    id: 'gen-ai',
    title: 'Generative AI & LLMs',
    description: 'How modern models create new content and predict the next word.',
    sections: [
      {
        id: 'llm_work',
        title: 'How LLMs Work',
        type: 'text',
        content: 'Large Language Models don\'t "know" answers. They calculate the most statistically probable next word (token) based on context. They use the Transformer Architecture (introduced by Google in 2017) which enabled long-range dependencies and contextual understanding.'
      },
      {
        id: 'tokens',
        title: 'The Token Economy',
        type: 'info',
        content: 'LLMs process text in chunks called tokens. Rough Rule of Thumb: 1,000 tokens ≈ 750 words. A "Context Window" is the model\'s short-term memory. Exceeding it causes "information overload" or data loss.'
      },
      {
        id: 'budget',
        title: 'Budgeting Strategy',
        type: 'list',
        content: '1. The Constraint: Maximum attention span. \n2. The Communication Risk: Information overload makes the AI "forget" the beginning. \n3. Cost: In professional tools, you pay per token. \n4. The Fix: Context Curation (select only relevant data points).'
      }
    ],
    quiz: [
      {
        id: 'gen_q1',
        text: 'What specific architecture made modern Generative AI possible in 2017?',
        options: ['Expert Systems', 'Symbolic AI', 'Transformer Model', 'Blockchain'],
        correctAnswer: 2,
        explanation: 'The Transformer architecture, introduced by Google researchers in 2017, is the breakthrough that enabled modern Generative AI.'
      },
      {
        id: 'gen_q2',
        text: 'Approximately how many words are represented by 1,000 tokens?',
        options: ['100 words', '750 words', '2,000 words', '5,000 words'],
        correctAnswer: 1,
        explanation: 'A common rule of thumb is that 1,000 tokens are roughly equivalent to 750 words.'
      }
    ]
  },
  {
    id: 'prompt-eng',
    title: 'Prompt Engineering',
    description: 'Mastering the art of designing structured inputs for better AI outputs.',
    sections: [
      {
        id: 'definition',
        title: 'Simple Prompt vs Prompt Engineering',
        type: 'text',
        content: 'Simple Prompt: Basic instruction (e.g., "Write about AI"). \nPrompt Engineering: The art of designing clear, structured, and optimized prompts to get high-quality, specific outputs (e.g., "Act as a tech journalist...").'
      },
      {
        id: 'rise',
        title: 'The R.I.S.E. Framework',
        type: 'list',
        content: 'Role: Assign specific identity (e.g., "Senior Product Manager"). \nInstruction: Define the core task (e.g., "Code a script"). \nSpecifics: Provide constraints (e.g., "target audience, timeframes"). \nExamples: Show desired format/style.'
      },
      {
        id: 'code',
        title: 'The C.O.D.E. Framework',
        type: 'list',
        content: 'Context: Explain the "why" and setting. \nObjective: State the exact goal (Be very clear). \nDetails: Specify constraints and format (e.g., "No technical jargon"). \nExamples: Show what "good" looks like.'
      }
    ],
    quiz: [
      {
        id: 'pe_q1',
        text: 'What does the "R" in the R.I.S.E. framework stand for?',
        options: ['Randomize', 'Role', 'Revision', 'Response'],
        correctAnswer: 1,
        explanation: 'Role (R) involves assigning a specific identity or persona to the AI to set the tone and level of expertise.'
      }
    ]
  },
  {
    id: 'ethics',
    title: 'AI Ethics & Society',
    description: 'Bias, privacy, accountability, and the "New Jim Code".',
    sections: [
      {
        id: 'jim_code',
        title: 'The New Jim Code',
        type: 'text',
        content: 'Concept by Dr. Ruha Benjamin: Innovation that enables social containment and inequality while appearing objective, progressive, or fair. It builds the digital world we are forced to inhabit.'
      },
      {
        id: 'bias_ways',
        title: 'Three Ways Inequity is Built',
        type: 'list',
        content: '(a) Engineered Inequality: Systems explicitly designed to exclude/disadvantage. \n(b) Coded Exposure: Systems that unfairly target or track specific groups (Hyper-visibility). \n(c) Techno-Benevolence: Tools that claim to fix bias but secretly worsen it (False Fairness).'
      },
      {
        id: 'fair_use',
        title: 'Copyright & Fair Use',
        type: 'list',
        content: 'Factor 1: Purpose & Character (Transformative?). \nFactor 2: Nature of Original Work. \nFactor 3: Amount Used. \nFactor 4: Market Effect (Most critical factor).'
      }
    ],
    quiz: [
      {
        id: 'eth_q1',
        text: 'According to the 4-factor Fair Use dashboard, which factor is often considered the most critical?',
        options: ['Factor 1: Purpose', 'Factor 2: Nature', 'Factor 3: Amount', 'Factor 4: Market Effect'],
        correctAnswer: 3,
        explanation: 'The Market Effect (Factor 4) is often viewed as the most critical factor—asking if the AI generation harms the market for the original.'
      },
      {
        id: 'eth_q2',
        text: 'What term does Dr. Ruha Benjamin use for tools that claim to fix bias but secretly worsen it?',
        options: ['Engineered Inequality', 'Coded Exposure', 'Techno-Benevolence', 'Digital Glitch'],
        correctAnswer: 2,
        explanation: 'Techno-Benevolence refers to innovation that claims to help/be fair but actually enables social containment and inequality.'
      },
      {
        id: 'eth_q3',
        text: 'Which "New Jim Code" category describes systems that unfairly target or track specific groups?',
        options: ['Engineered Inequality', 'Coded Exposure', 'Techno-Benevolence', 'Fair Use'],
        correctAnswer: 1,
        explanation: 'Coded Exposure (or Hyper-visibility) refers to systems that unfairly target or track specific groups, like neighborhood avoidance apps.'
      }
    ]
  },
  {
    id: 'production',
    title: 'AI Production & Workflow',
    description: 'Technical architectures and professional creative pipelines.',
    sections: [
      {
        id: 'gans',
        title: 'GAN Architecture',
        type: 'info',
        content: 'Generative Adversarial Networks: Consist of two neural networks, a generator (the forger) and a discriminator (the expert), that compete in a zero-sum game.'
      },
      {
        id: 'diffusion',
        title: 'Diffusion Models',
        type: 'list',
        content: '1. Forward Process: Slowly adds Gaussian noise to destroying data. \n2. Reverse Process: Trained to look at noisy data and predict/subtract noise to reveal the clear image.'
      },
      {
        id: 'pipeline',
        title: 'AI Filmmaking Pipeline',
        type: 'list',
        content: '1. Pre-Production & Planning. \n2. Character & Asset Development (LoRAs). \n3. Generating the First Frame. \n4. Adding Motion (Video Gen). \n5. Lip Sync & Performance.'
      }
    ],
    quiz: [
      {
        id: 'prod_q1',
        text: 'What role does the "Generator" play in a GAN architecture?',
        options: ['The expert judge', 'The data cleaner', 'The forger creating synthetic data', 'The user interface'],
        correctAnswer: 2,
        explanation: 'The Generator acts as a "forger," creating synthetic data to try and fool the Discriminator.'
      },
      {
        id: 'prod_q2',
        text: 'In the Diffusion process, what happens during the "Forward Process"?',
        options: ['Noise is subtracted', 'Gaussian noise is slowly added', 'The model predicts tokens', 'A prompt is engineered'],
        correctAnswer: 1,
        explanation: 'The Forward Process involves destroying data by slowly adding Gaussian noise until the image is pure random pixels.'
      }
    ]
  }
];
