/**
 * All copy in this file is sourced from the live CommHawk site
 * (https://www.commhawk.in/, plus /careers) — rebuilt into the portfolio's
 * design-system data shape. Fields with no real published source (per-service
 * paragraph descriptions, per-capability blurbs, FAQ copy) are freshly
 * authored from the real offering/capability lists, in CommHawk's own voice.
 */

export const nav = {
  logoLabel: "CH",
  links: [
    { index: "01", label: "Businesses", href: "/#works" },
    { index: "02", label: "Services", href: "/#services" },
    { index: "03", label: "About", href: "/#about" },
    { index: "04", label: "Careers", href: "/careers" },
    { index: "05", label: "Connect", href: "/#contact" },
  ],
  email: "commhawktechnologies@gmail.com",
};

export type HeroBackgroundEffectId = "gridwave" | "light-tunnel";

export const hero = {
  backgroundEffects: [
    { id: "gridwave" as HeroBackgroundEffectId, label: "Gridwave" },
    { id: "light-tunnel" as HeroBackgroundEffectId, label: "Light Tunnel" },
  ],
  wordmark: "COMMHAWK",
  tagline: "Engineering Digital Excellence",
  description:
    "CommHawk is a premier technology partner specializing in high-performance digital products. We help ambitious companies scale through cutting-edge development and innovative AI solutions.",
  cta: { label: "Start Your Project", href: "#contact" },
  available: true,
};

export const works = [
  {
    name: "BeFin",
    description:
      "Gamified platform helping every generation grow smarter with money and achieve financial independence.",
    industry: ["Fintech"],
    services: ["Gamified Growth Platform", "Full-Stack Development"],
    status: "Live",
    url: "https://www.thebefin.com/",
    logo: "/logos/befin-logo.avif",
  },
  {
    name: "Trip N Roll Travel",
    description:
      "Next-generation travel and booking platform designed for seamless customer experiences.",
    industry: ["Travel & Tourism", "Ticketing Platform"],
    services: ["Booking Platform", "Full-Stack Development"],
    status: "Live",
    url: "https://tripnrolltravel.com/",
    logo: "/logos/tripnroll-logo.png",
  },
  {
    name: "Maytri ERP",
    description: "Industrial-grade ERP system for comprehensive resource planning and management.",
    industry: ["Enterprise Solutions"],
    services: ["ERP System", "Resource Planning"],
    status: "Live",
    url: "https://maytri.netlify.app/login",
    logo: "/logos/maytri-logo.svg",
  },
  {
    name: "Bihar Sahu Sabha",
    description:
      "Digital platform developed to connect, engage, and empower members of the Bihar Sahu community.",
    industry: ["Community Platform"],
    services: ["Community Engagement", "Full-Stack Development"],
    status: "Live",
    url: "https://www.bihartailiksahusabha.com/",
    logo: "/logos/biharsahu-logo.png",
  },
  {
    name: "Kaamlee",
    description:
      "Custom white-label digital solution built for businesses looking to launch and scale under their own brand.",
    industry: ["White Label Solution"],
    services: ["White-Label Product", "Custom Branding"],
    status: "Live",
    url: "https://kaamlee.in/",
    logo: "/logos/kaamlee-logo.png",
  },
] satisfies Array<{
  name: string;
  description: string;
  industry: string[];
  services: string[];
  status: string;
  url?: string;
  logo: string;
}>;

export const services = [
  {
    index: "01",
    name: "Design Services",
    description:
      "We shape interfaces, identities, and motion systems that make products feel considered from the first pixel, not just functional.",
    offerings: ["UI/UX Design", "Web Design", "Graphic Design", "Motion Design", "Prototyping & Wireframing"],
  },
  {
    index: "02",
    name: "Web Development",
    description:
      "We build CMS, e-commerce, portals, and SaaS platforms on modern stacks engineered to handle real production traffic.",
    offerings: [
      "CMS Development",
      "E-Commerce Development",
      "Web Portals",
      "ERP Systems",
      "CRM Systems",
      "SaaS Product Development",
      "API Development & Integration",
      "Legacy System Modernization",
    ],
  },
  {
    index: "03",
    name: "Mobile App Development",
    description:
      "We ship native and cross-platform apps, wearable integrations, and PWAs that hold up across every device your users carry.",
    offerings: [
      "iOS Development",
      "Android Development",
      "Cross-Platform Apps",
      "Wearable & IoT Apps",
      "Progressive Web Apps (PWA)",
    ],
  },
  {
    index: "04",
    name: "Data & Analytics",
    description:
      "We turn raw data into decisions, from scraping pipelines to BI dashboards and predictive models that hold up at scale.",
    offerings: [
      "Web Scraping",
      "Data Engineering",
      "Business Intelligence (BI)",
      "Big Data Solutions",
      "Data Visualization",
      "Predictive Analytics",
    ],
  },
  {
    index: "05",
    name: "AI & Machine Learning",
    description:
      "We build practical AI, from NLP and computer vision to generative integrations, deployed as real product features, not demos.",
    offerings: [
      "AI Consulting & Strategy",
      "Machine Learning Model Development",
      "Natural Language Processing (NLP)",
      "Computer Vision",
      "Recommendation Engines",
      "AI-Powered Automation",
      "Generative AI Integration",
    ],
  },
  {
    index: "06",
    name: "Cloud & Hosting Services",
    description:
      "We architect and manage cloud infrastructure built for uptime, from migration and serverless design to CDN and database hosting.",
    offerings: [
      "Cloud Consulting",
      "Cloud Migration",
      "Web Hosting & Management",
      "Managed Cloud Services",
      "CDN Setup",
      "Serverless Architecture",
      "Database Hosting",
    ],
  },
  {
    index: "07",
    name: "Cybersecurity Services",
    description:
      "We harden systems end to end, from penetration testing and compliance audits to identity management and incident response.",
    offerings: [
      "Penetration Testing",
      "Security Audits & Compliance",
      "Firewall & Network Security Setup",
      "Endpoint Security Solutions",
      "Identity & Access Management (IAM)",
      "Incident Response & Recovery",
      "SSL/TLS Certificate Management",
    ],
  },
  {
    index: "08",
    name: "DevOps & Infrastructure",
    description:
      "We build the pipelines and platforms that let teams ship fast and stay reliable, from CI/CD to site reliability engineering.",
    offerings: [
      "CI/CD Pipeline Setup",
      "Containerization",
      "System Monitoring & Alerting",
      "Site Reliability Engineering (SRE)",
      "Load Balancing & Auto-scaling",
    ],
  },
  {
    index: "09",
    name: "Digital Marketing & SEO",
    description:
      "We grow the businesses we build for, pairing SEO and paid acquisition with conversion-focused analytics.",
    offerings: [
      "Search Engine Optimization (SEO)",
      "Pay-PPC Advertising",
      "Social Media Marketing",
      "Email Marketing Automation",
      "Content Marketing Strategy",
      "Conversion Rate Optimization (CRO)",
      "Analytics Setup",
    ],
  },
  {
    index: "10",
    name: "IT Support & Managed Services",
    description:
      "We keep the lights on, with help desk support, network management, and disaster recovery you can rely on.",
    offerings: [
      "IT Help Desk Support",
      "Network Setup & Management",
      "Remote IT Support",
      "Backup & Disaster Recovery",
      "IT Asset Management",
    ],
  },
  {
    index: "11",
    name: "Integration & Automation",
    description:
      "We connect the systems that don't talk to each other, and automate the workflows that shouldn't need a human.",
    offerings: [
      "Third-Party API Integrations",
      "Robotic Process Automation (RPA)",
      "Workflow Automation",
      "IoT Integration",
    ],
  },
  {
    index: "12",
    name: "Quality Assurance & Testing",
    description:
      "We test what we ship, across manual, automated, performance, and security coverage before it ever reaches a user.",
    offerings: [
      "Manual Testing",
      "Automated Testing",
      "Performance Testing",
      "Mobile App Testing",
      "Security Testing",
      "UAT (User Acceptance Testing)",
    ],
  },
  {
    index: "13",
    name: "IT Consulting",
    description:
      "We advise on the decisions that outlast any single build: roadmap, architecture, vendor selection, and startup tech strategy.",
    offerings: [
      "Technology Roadmap Planning",
      "Digital Transformation Strategy",
      "IT Architecture Design",
      "Vendor Selection & Management",
      "Startup Tech Advisory",
    ],
  },
];

/** CommHawk Synapse — the company's internal autonomous-engineering capability set. */
export const process = {
  heading: "CommHawk Synapse — the autonomous engineering core behind every build",
  capabilities: [
    {
      step: "S1",
      title: "System Audit",
      description:
        "We start by mapping what's already there — architecture, data flow, and technical debt — before writing a single line of new code.",
    },
    {
      step: "S2",
      title: "Infrastructure as Code",
      description:
        "Every environment we touch gets codified, versioned, and reproducible, so infrastructure stops being a manual chore.",
    },
    {
      step: "S3",
      title: "Data Stream Aggregation",
      description:
        "We unify data from every source into one real-time stream, so decisions get made on what's happening now, not last week.",
    },
    {
      step: "S4",
      title: "Autonomous Scaling",
      description:
        "Systems we build scale themselves under load, provisioning and releasing resources without a human on call.",
    },
    {
      step: "S5",
      title: "Predictive Maintenance",
      description:
        "We instrument systems to flag failure before it happens, not just alert after something's already down.",
    },
    {
      step: "S6",
      title: "Edge Deployment",
      description:
        "We push compute closer to the user, cutting latency for the workloads that can't afford a round trip to a central region.",
    },
  ],
};

export const about = {
  heading:
    "We're a collective of strategists, designers, and engineers empowering ambitious businesses with technology built for scale, impact, and exceptional user experience — solving real problems with creativity, collaboration, and measurable results.",
  vision:
    "Our vision is to lead digital transformation for tomorrow's enterprises using modern technology, design thinking, and relentless innovation — creating benchmarks for quality, transparency, and genuine impact.",
  competencies: [
    { name: "System Architecture", tag: "Architecture" },
    { name: "Data Engineering", tag: "Data" },
    { name: "AI Integration", tag: "AI" },
    { name: "Full-Stack Development", tag: "Platform" },
    { name: "DevOps & CI/CD", tag: "DevOps" },
    { name: "Cloud Native Architecture", tag: "Cloud" },
    { name: "Microservices", tag: "Architecture" },
    { name: "Performance & Scalability", tag: "Reliability" },
    { name: "Security & Reliability", tag: "Security" },
    { name: "Infrastructure as Code", tag: "Infra" },
    { name: "Autonomous Agents", tag: "Automation" },
    { name: "Real-Time Analytics", tag: "Analytics" },
    { name: "Enterprise Security", tag: "Security" },
  ],
};

/** Tech stack CommHawk builds on. */
export const brands = [
  "Python",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Django",
  "PostgreSQL",
  "Redis",
  "Docker",
  "GraphQL",
  "AWS",
  "Gunicorn",
  "Nginx",
];

/** Official recognitions/endorsements — badge images pulled from the live commhawk.in site. */
export const recognitions = [
  { name: "Startup India", src: "/recognition/StartupIndia.png" },
  { name: "Startup Bihar", src: "/recognition/StartupBihar.png" },
  { name: "MSME, Govt. of India", src: "/recognition/msme.png" },
  { name: "Govt. of Bihar", src: "/recognition/bihar.webp" },
];

export const careers = {
  heading: "Build the Future With Us",
  intro:
    "We're an elite team of engineers, designers, and strategists building digital products that define the next generation of technology. If you obsess over craft and love solving hard problems, we want to hear from you.",
  values: [
    { title: "Ship with Ambition", description: "Setting high standards and raising software quality benchmarks." },
    { title: "Team First", description: "Investing in colleagues to build outstanding products together." },
    { title: "Remote Friendly", description: "Supporting distributed talent with flexible arrangements." },
    { title: "Move Fast Responsibly", description: "Balancing speed with quality and security." },
    { title: "Craft Over Commodity", description: "Prioritizing pride in code and meaningful products." },
    { title: "Radical Transparency", description: "Practicing open communication and honest feedback." },
  ],
  opening: {
    title: "DevOps & Cloud Engineer",
    type: "Remote, Full-time",
    stack: ["Kubernetes", "Terraform", "CI/CD", "AWS"],
  },
  outro:
    "We're always on the lookout for exceptional talent. Send us a note about what you want to build — we read every message.",
};

export const faq = [
  {
    question: "What kind of projects does CommHawk take on?",
    answer:
      "Everything from web and mobile platforms to AI integrations and full cloud infrastructure — see our services above for the full list.",
  },
  {
    question: "Do you work with remote or international clients?",
    answer:
      "Yes. We're a remote-friendly, distributed team built to support ambitious companies wherever they are.",
  },
  {
    question: "What does CommHawk Synapse do?",
    answer:
      "It's our internal engineering platform for system audits, infrastructure as code, real-time data aggregation, autonomous scaling, predictive maintenance, and edge deployment.",
  },
  {
    question: "How do we get started on a project?",
    answer:
      "Send your project details through the contact form below, or reach out directly at commhawktechnologies@gmail.com — we read every message.",
  },
  {
    question: "Is CommHawk hiring?",
    answer:
      "Yes — we're currently hiring a DevOps & Cloud Engineer, remote and full-time. Reach out if that's you.",
  },
];

export const contact = {
  heading: "Let's Build the Future Together",
  interests: ["Web & Mobile", "AI & Analytics", "Cloud & DevOps"],
  email: "commhawktechnologies@gmail.com",
};

export const footer = {
  blurb: "Leading the digital transformation with precision-engineered solutions. Built for scale, designed for excellence.",
  sitemap: [
    { label: "About", href: "/#about" },
    { label: "Businesses", href: "/#works" },
    { label: "Services", href: "/#services" },
    { label: "Careers", href: "/careers" },
    { label: "Connect", href: "/#contact" },
  ],
  expertise: ["Web & Mobile", "AI & Analytics", "Cloud & DevOps"],
  location: "Technology Hub, India",
  socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/commhawk/" }],
  wordmark: "COMMHAWK SOLUTIONS",
};
