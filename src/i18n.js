import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "nav": {
                "home": "Home",
                "services": "Services",
                "guidance": "Career Guidance",
                "interest_test": "Interest Test",
                "career_path": "Career Path Suggestions",
                "skills_analysis": "Skills Analysis",
                "articles": "Articles",
                "support": "Support",
                "browse": "Explore Careers",
                "recommendation": "Smart Guidance",
                "admin": "Admin Panel",
                "login": "Login",
                "logout": "Sign Out",
                "signup": "Create Account"
            },
            "hero": {
                "subtitle": "Shape Your Professional Path",
                "title": "Uncover Your Ideal Career Trajectory",
                "description": "Bridge the gap between graduation and your dream role with precision-targeted skill sets and opportunities.",
                "search_placeholder": "Identify Industry, Role or Expertise...",
                "search_button": "Commence Search",
                "carousel": {
                    "empowering": "Empowering Alumni",
                    "promising": "Promising Future",
                    "guidance": "Expert Guidance",
                    "prev": "Previous",
                    "next": "Next",
                    "career_step": "Your first step to success",
                    "success_path": "Mapped to your aspirations",
                    "expert_talk": "Consult with top industry pros"
                }
            },
            "features": {
                "growth": {
                    "title": "Career Advancement",
                    "desc": "Empower your professional journey with tailored developmental roadmaps."
                },
                "secure": {
                    "title": "Data Integrity",
                    "desc": "Your professional credentials and preferences are guarded by high-level encryption."
                },
                "ai": {
                    "title": "Intelligent Insights",
                    "desc": "Advanced cognitive algorithms designed to align with your unique profile."
                },
                "support": {
                    "title": "Expert Mentorship",
                    "desc": "Access a network of industry specialists to facilitate your professional migration."
                }
            },
            "industries": {
                "title": "Sectors of Opportunity",
                "subtitle": "Analyze the most dominant landscapes in today's global economy.",
                "tabs": {
                    "all": "Comprehensive List",
                    "dev": "Software Engineering",
                    "data": "Data Science",
                    "marketing": "Strategic Marketing",
                    "design": "Creative Design"
                },
                "categories": {
                    "software": "Software",
                    "data": "Data",
                    "marketing": "Marketing",
                    "design": "Design",
                    "high_growth": "High Growth",
                    "in_demand": "Very In-Demand",
                    "diverse": "Diverse Opportunities"
                },
                "roles": {
                    "fullstack": "Software Engineer (Full-Stack)",
                    "fullstack_desc": "Build and develop integrated websites and applications using the latest technologies.",
                    "analyst": "Data Analyst",
                    "analyst_desc": "Extract insights from big data to help companies make decisions.",
                    "ml_engineer": "Machine Learning Engineer",
                    "ml_engineer_desc": "Designing and implementing machine learning models and AI systems.",
                    "data_scientist": "Data Scientist",
                    "data_scientist_desc": "Using advanced analytics and statistical methods to solve complex business problems.",
                    "marketing_spec": "Digital Marketing Specialist",
                    "marketing_spec_desc": "Manage advertising campaigns and analyze consumer behavior via digital platforms.",
                    "android": "Android App Developer",
                    "android_desc": "Programming smart applications working on Android using Kotlin and Java.",
                    "frontend": "Frontend Developer",
                    "frontend_desc": "Transform designs into interactive interfaces using React and modern CSS.",
                    "backend": "Backend Developer",
                    "backend_desc": "Build robust server-side applications and APIs using Node.js, Python, or Java.",
                    "devops": "DevOps Engineer",
                    "devops_desc": "Automate deployment pipelines and manage cloud infrastructure for scalable systems.",
                    "uiux": "UI/UX Designer",
                    "uiux_desc": "Design distinctive user experiences and attractive interfaces for applications.",
                    "seo": "SEO Specialist",
                    "seo_desc": "Optimizing search engine visibility and driving organic growth.",
                    "software_architect": "Software Architect",
                    "software_architect_desc": "Design high-level structures and technical standards for complex software systems.",
                    "content_strat": "Content Strategist",
                    "content_strat_desc": "Plan, oversee, and maximize content impact to achieve business goals.",
                    "graphic_designer": "Graphic Designer",
                    "graphic_designer_desc": "Create visual concepts to communicate ideas that inspire, inform, and captivate.",
                    "motion_graphic": "Motion Graphics Designer",
                    "motion_graphic_desc": "Create animated graphics and visual effects for diverse media.",
                    "social_media": "Social Media Manager",
                    "social_media_desc": "Manage brand presence and engagement across social platforms."
                },
                "actions": {
                    "details": "Details",
                    "explore": "Explore Path",
                    "explore": "Explore Path",
                    "coming_soon": "Coming Soon",
                    "data_paths": "Data Analysis Paths",
                    "data_desc": "Explore top-tier educational and career paths curated for data professionals.",
                    "marketing_paths": "Strategic Marketing Paths",
                    "marketing_desc": "Discover digital marketing and growth paths built on real-world market facts."
                },
                "details_modal": {
                    "roadmap": "Career Roadmap",
                    "skills": "Core Skills",
                    "salary": "Estimated Salary Range",
                    "responsibilities": "Key Responsibilities",
                    "close": "Close"
                },
                "roles_details": {
                    "software": {
                        "roadmap": "Intern/Junior -> Mid-Level -> Senior -> Tech Lead/Engineering Manager.",
                        "skills": "Java/Python/JavaScript, Data Structures, System Design, Git, Agile.",
                        "salary": "Local: EGP 15k - 45k (Junior) to 80k - 180k+ (Senior) monthly. International: $3,000 - $8,000+ monthly.",
                        "responsibilities": "Architecting systems, writing clean code, peer reviews, and deploying scalable applications."
                    },
                    "data": {
                        "roadmap": "Junior Analyst -> Senior Analyst -> Data Scientist or Analytics Manager.",
                        "skills": "SQL proficiency, Python/R, Statistical Modeling, BI Tools (Tableau/PowerBI).",
                        "salary": "Local: EGP 12k - 30k (Junior) to 50k - 100k+ (Senior) monthly. International: $2,500 - $6,500+ monthly.",
                        "responsibilities": "Data mining, cleaning messy datasets, building predictive models, and creating executive dashboards."
                    },
                    "ml_engineer": {
                        "roadmap": "Junior ML Engineer -> ML Researcher -> Lead AI Architect.",
                        "skills": "Deep Learning (PyTorch/TensorFlow), Computer Vision/NLP, Model Optimization, ML Ops.",
                        "salary": "Local: EGP 25k - 60k (Junior) to 100k - 250k+ (Senior) monthly. International: $5,000 - $12,000+ monthly.",
                        "responsibilities": "Developing AI algorithms, training neural networks, scaling ML pipelines, and research Implementation."
                    },
                    "data_scientist": {
                        "roadmap": "Junior Data Scientist -> Senior Scientist -> Principal Data Scientist or Head of Data.",
                        "skills": "Advanced Statistics, Big Data (Spark/Hadoop), Predictive Modeling, Cloud Computing (AWS/GCP).",
                        "salary": "Local: EGP 20k - 50k (Junior) to 90k - 200k+ (Senior) monthly. International: $4,500 - $10,000+ monthly.",
                        "responsibilities": "Hypothesis testing, feature engineering, discovering hidden patterns, and driving strategic decisions through data."
                    },
                    "marketing": {
                        "roadmap": "Coordinator -> Specialist -> Marketing Manager -> CMO/Director.",
                        "skills": "SEO/SEM strategies, Content Marketing, Google Analytics, Social Media Advertising.",
                        "salary": "Local: EGP 10k - 25k (Junior) to 40k - 85k+ (Senior) monthly. International: $1,500 - $5,000+ monthly.",
                        "responsibilities": "Campaign management, market trend analysis, brand positioning, and ROI tracking."
                    },
                    "android": {
                        "roadmap": "Intern -> Junior Android Dev -> Mid-Level -> Senior -> Mobile Architect.",
                        "skills": "Kotlin, Java, Android SDK, Jetpack Compose, Retrofit, MVVM architecture.",
                        "salary": "Local: EGP 18k - 30k (Junior) to 50k - 110k+ (Senior) monthly. International: $2,500 - $7,000+ monthly.",
                        "responsibilities": "Building native apps, optimizing performance, integrating APIs, and unit testing."
                    },
                    "frontend": {
                        "roadmap": "Junior Developer -> Mid-Level -> Senior Frontend -> Frontend Architect.",
                        "skills": "React/Next.js, TypeScript, TailWind CSS, Redux, Web Performance optimization.",
                        "salary": "Local: EGP 15k - 28k (Junior) to 45k - 100k+ (Senior) monthly. International: $3,000 - $8,500+ monthly.",
                        "responsibilities": "Developing responsive UIs, ensuring cross-browser compatibility, and state management."
                    },
                    "backend": {
                        "roadmap": "Junior Backend Dev -> Mid-Level -> Senior Backend -> Backend Architect.",
                        "skills": "Node.js/Python/Java, REST APIs, Database Design (SQL/NoSQL), Microservices, Docker.",
                        "salary": "Local: EGP 18k - 35k (Junior) to 55k - 120k+ (Senior) monthly. International: $3,500 - $9,000+ monthly.",
                        "responsibilities": "Building scalable APIs, database optimization, server management, and security implementation."
                    },
                    "devops": {
                        "roadmap": "Junior DevOps -> DevOps Engineer -> Senior DevOps -> Platform Architect.",
                        "skills": "CI/CD (Jenkins/GitLab), Kubernetes, AWS/Azure/GCP, Terraform, Monitoring (Prometheus/Grafana).",
                        "salary": "Local: EGP 25k - 45k (Junior) to 70k - 150k+ (Senior) monthly. International: $4,500 - $11,000+ monthly.",
                        "responsibilities": "Automating deployments, managing cloud infrastructure, monitoring system health, and ensuring high availability."
                    },
                    "uiux": {
                        "roadmap": "Junior Designer -> UI/UX Specialist -> Product Designer -> Design Lead.",
                        "skills": "Figma, Adobe XD, User Research, Prototyping, Design Systems, UX Audit.",
                        "salary": "Local: EGP 15k - 25k (Junior) to 40k - 90k+ (Senior) monthly. International: $2,000 - $6,500+ monthly.",
                        "responsibilities": "Creating wireframes, user testing, designing high-fidelity UI, and product discovery."
                    },
                    "seo": {
                        "roadmap": "SEO Associate -> SEO Specialist -> Organic Growth Lead -> Marketing Director.",
                        "skills": "Keyword Research, Technical SEO, Content Strategy, GSC & GA Tools, Backlink building.",
                        "salary": "Local: EGP 10k - 20k (Junior) to 35k - 75k+ (Senior) monthly. International: $1,500 - $5,000+ monthly.",
                        "responsibilities": "On-page optimization, technical site audits, keyword tracking, and reporting."
                    },
                    "software_architect": {
                        "roadmap": "Senior Developer -> Tech Lead -> Software Architect -> CTO.",
                        "skills": "System Design, Microservices, Cloud Architecture (Azure/AWS), Leadership, Scalability.",
                        "salary": "Local: EGP 100k - 250k+ monthly. International: $8,000 - $18,000+ monthly.",
                        "responsibilities": "Defining technology stacks, ensuring system quality, mentoring leads, and overseeing architecture design."
                    },
                    "content_strat": {
                        "roadmap": "Content Writer -> Strategist -> Content Manager -> Head of Content.",
                        "skills": "Copywriting, SEO, CMS Management, Data Analysis, Brand Storytelling.",
                        "salary": "Local: EGP 12k - 35k (Junior) to 50k - 120k+ (Senior) monthly. International: $3,000 - $7,500+ monthly.",
                        "responsibilities": "Developing content strategy, managing editorial calendars, auditing content, and analyzing engagement metrics."
                    },
                    "graphic_designer": {
                        "roadmap": "Junior Designer -> Senior Designer -> Art Director -> Creative Director.",
                        "skills": "Adobe Creative Suite (Ps, Ai, Id), Typography, Branding, Layout Design.",
                        "salary": "Local: EGP 8k - 20k (Junior) to 30k - 70k+ (Senior) monthly. International: $2,000 - $5,500+ monthly.",
                        "responsibilities": "Creating visual identity systems, designing marketing materials, packaging design, and illustrations."
                    },
                    "motion_graphic": {
                        "roadmap": "Junior Animator -> Motion Designer -> Senior Motion Designer -> Animation Director.",
                        "skills": "After Effects, Cinema 4D, Premiere Pro, Storyboarding, Animation Principles.",
                        "salary": "Local: EGP 15k - 30k (Junior) to 45k - 95k+ (Senior) monthly. International: $2,800 - $7,000+ monthly.",
                        "responsibilities": "Creating animated sequences, visual effects, editing video content, and collaborating with creative teams."
                    },
                    "social_media": {
                        "roadmap": "Coordinator -> Specialist -> Social Media Manager -> Head of Engagement.",
                        "skills": "Content Scheduling, Community Management, Social Analytics, Paid Social, Crisis Management.",
                        "salary": "Local: EGP 8k - 18k (Junior) to 30k - 65k+ (Senior) monthly. International: $1,800 - $4,500+ monthly.",
                        "responsibilities": "Creating social content, managing communities, tracking engagement, and executing platform strategies."
                    }
                }
            },
            "footer": {
                "tagline": "Realize Your Capabilities",
                "subscribe": "Join Newsletter",
                "placeholder": "Professional Email",
                "whyUs_title": "The CareerPilot Advantage",
                "whyUs_desc": "Committed to delivering high-fidelity career recommendations optimized for the modern graduate's aspirations.",
                "readMore": "Learn More",
                "links_title": "Primary Resources",
                "about": "Our Mission",
                "contact": "Inquiries",
                "privacy": "Data Policy",
                "terms": "User Agreement",
                "account_title": "Portal",
                "myAccount": "Personnel Profile",
                "contact_title": "Headquarters",
                "address": "Global Hub: 1429 Netus Avenue, NY 10001",
                "payment": "Secure Transactions"
            },
            "login": {
                "title": "Administrative Authentication",
                "subtitle": "Authorized personnel only - Secure Login",
                "username": "User Identifier",
                "password": "Security Key",
                "placeholder_user": "Input username",
                "placeholder_pass": "Input credentials",
                "button": "Authenticate",
                "logging": "Establishing connection...",
                "error": "Authentication failed. Invalid credentials."
            },
            "browse": {
                "title": "Navigate Career Landscapes",
                "subtitle": "Scrutinize diverse professional avenues calibrated to your core competencies.",
                "search_placeholder": "Query by designation or skill...",
                "all_industries": "All Domains",
                "add_new": "Create Entry",
                "key_skills": "Prerequisite Skills:",
                "details": "Examine Specs",
                "no_results": "No correlations found",
                "no_results_desc": "Refine your parameters to broaden the search results.",
                "confirm_delete": "Are you sure you want to delete this career path?"
            },
            "recommend": {
                "title": "Generate Career Analytics",
                "subtitle": "Synthesize your expertise and preferences to identify the optimal career fit.",
                "skills_label": "Core Competencies",
                "skills_placeholder": "e.g. Full-Stack, Quantitative Analysis, UX Design",
                "skills_hint": "Delineate skills with commas",
                "interests_label": "Specializations / Target Industries",
                "interests_placeholder": "e.g. Fintech, Biotechnology, Logistics",
                "button": "Synthesize Recommendations",
                "results_title": "Analytical Matches For You",
                "match": "Compatibility",
                "matching_skills": "Skill Correlations:",
                "no_matches": "No direct alignment identified",
                "no_matches_desc": "Expand your skill set parameters to optimize matching accuracy."
            },
            "articles_page": {
                "title": "Professional Insights & Articles",
                "subtitle": "Dive into the latest trends, career advice, and industry news meticulously curated for developing professionals.",
                "search": "Search Articles...",
                "read_more": "Read Full Article",
                "categories": {
                    "all": "All Categories",
                    "tech": "Technology",
                    "career": "Career Guidance",
                    "soft_skills": "Soft Skills",
                    "industry": "Industry Insights"
                }
            },
            "admin_panel": {
                "add_title": "Register New Career Specification",
                "success": "Matrix updated. Re-routing to dashboard...",
                "label_title": "Professional Title",
                "label_industry": "Industrial Domain",
                "label_desc": "Functional Overview",
                "label_skills": "Required Competencies (CSV format)",
                "placeholder_title": "e.g. Systems Architect",
                "placeholder_desc": "Outline the fundamental requirements...",
                "placeholder_skills": "e.g. AWS, Python, Agile Methodology",
                "save": "Commit Changes",
                "cancel": "Discard",
                "select_ind": "Categorize Domain",
                "validation": {
                    "title": "Title is required",
                    "description": "Description is required",
                    "industry": "Industry is required",
                    "skills": "At least one skill is required"
                }
            }
        }
    },
    ar: {
        translation: {
            "nav": {
                "home": "الرئيسية",
                "services": "خدمات",
                "guidance": "التوجيه المهني",
                "interest_test": "اختبار الميول",
                "career_path": "اقتراح المسارات المهنية",
                "skills_analysis": "تحليل المهارات",
                "articles": "مقالات",
                "support": "الدعم",
                "browse": "استكشاف المهن",
                "recommendation": "التوجيه المهني",
                "admin": "لوحة الإدارة",
                "login": "تسجيل الدخول",
                "logout": "خروج",
                "signup": "إنشاء حساب"
            },
            "hero": {
                "subtitle": "ارسم ملامح مستقبلك",
                "title": "حدد مسارك المهني المنشود",
                "description": "صمم رحلتك المهنية بدقة، واكتسب الخبرات اللازمة لتبوء الوظيفة التي تطمح إليها بعد التخرج.",
                "search_placeholder": "ابحث عن تخصص، دور وظيفي أو مهارة...",
                "search_button": "ابدأ البحث",
                "carousel": {
                    "empowering": "تمكين الخريجين",
                    "promising": "مستقبل واعد",
                    "guidance": "توجيه الخبراء",
                    "prev": "السابق",
                    "next": "التالي",
                    "career_step": "خطوتك الأولى نحو النجاح المهني",
                    "success_path": "مسارات مصممة وفق طموحاتك",
                    "expert_talk": "استشارات مع نخبة من المتخصصين"
                }
            },
            "features": {
                "growth": {
                    "title": "الارتقاء المهني",
                    "desc": "عزز كفاءتك المهنية عبر خرائط طريق تطويرية مخصصة."
                },
                "secure": {
                    "title": "نزاهة البيانات",
                    "desc": "بياناتك وتفضيلاتك المهنية محمية ببروتوكولات أمان متقدمة."
                },
                "ai": {
                    "title": "ذكاء التوجيه",
                    "desc": "خوارزميات تحليلية دقيقة مصممة لتتوافق مع سماتك الفريدة."
                },
                "support": {
                    "title": "الإرشاد التخصصي",
                    "desc": "تواصل مع نخبة من الخبراء لتسهيل عملية انتقالك إلى سوق العمل."
                }
            },
            "industries": {
                "title": "قطاعات الفرص القائمة",
                "subtitle": "استعرض المجالات الأكثر حيوية وتأثيراً في الاقتصاد المعاصر.",
                "tabs": {
                    "all": "القائمة الشاملة",
                    "dev": "هندسة البرمجيات",
                    "data": "علوم البيانات",
                    "marketing": "التسويق الاستراتيجي",
                    "design": "التصميم الإبداعي"
                },
                "categories": {
                    "software": "برمجيات",
                    "data": "بيانات",
                    "marketing": "تسويق",
                    "design": "تصميم",
                    "high_growth": "نمو مرتفع",
                    "in_demand": "مطلوب جداً",
                    "diverse": "فرص متنوعة"
                },
                "roles": {
                    "fullstack": "مهندس برمجيات (Full-Stack)",
                    "fullstack_desc": "بناء وتطوير المواقع والتطبيقات المتكاملة باستخدام أحدث التقنيات.",
                    "analyst": "محلل بيانات (Data Analyst)",
                    "analyst_desc": "استخراج الرؤى من البيانات الكبيرة لمساعدة الشركات في اتخاذ القرارات.",
                    "ml_engineer": "مهندس تعلم الآلة (ML Engineer)",
                    "ml_engineer_desc": "تصميم وتنفيذ نماذج تعلم الآلة وأنظمة الذكاء الاصطناعي المتقدمة.",
                    "data_scientist": "عالم بيانات (Data Scientist)",
                    "data_scientist_desc": "استخدام التحليلات المتقدمة والأساليب الإحصائية لحل مشكلات الأعمال المعقدة.",
                    "marketing_spec": "أخصائي تسويق رقمي",
                    "marketing_spec_desc": "إدارة الحملات الإعلانية وتحليل سلوك المستهلك عبر المنصات الرقمية.",
                    "android": "مطور تطبيقات أندرويد",
                    "android_desc": "برمجة تطبيقات ذكية تعمل على نظام أندرويد باستخدام Kotlin و Java.",
                    "frontend": "مطور واجهات (Frontend)",
                    "frontend_desc": "تحويل التصميمات إلى واجهات تفاعلية باستخدام React و modern CSS.",
                    "backend": "مطور خلفية (Backend)",
                    "backend_desc": "بناء تطبيقات خادم قوية وواجهات برمجية باستخدام Node.js أو Python أو Java.",
                    "devops": "مهندس DevOps",
                    "devops_desc": "أتمتة عمليات النشر وإدارة البنية التحتية السحابية لأنظمة قابلة للتوسع.",
                    "uiux": "مصمم واجهات (UI/UX)",
                    "uiux_desc": "تصميم تجارب مستخدم مميزة وواجهات جذابة للتطبيقات.",
                    "seo": "أخصائي تحسين محركات البحث (SEO)",
                    "seo_desc": "تحسين ظهور المواقع في محركات البحث وزيادة الزيارات المجانية.",
                    "software_architect": "معمار برمجيات (Software Architect)",
                    "software_architect_desc": "تصميم الهياكل عالية المستوى والمعايير التقنية لأنظمة البرمجيات المعقدة.",
                    "content_strat": "استراتيجي محتوى (Content Strategist)",
                    "content_strat_desc": "تخطيط وإدارة استراتيجية المحتوى لتحقيق أهداف النمو وتعزيز الهوية.",
                    "graphic_designer": "مصمم جرافيك (Graphic Designer)",
                    "graphic_designer_desc": "إنشاء مفاهيم بصرية لتوصيل الأفكار التي تلهم وتعلم وتأسر الجمهور.",
                    "motion_graphic": "مصمم موشن جرافيك (Motion Graphics)",
                    "motion_graphic_desc": "إنشاء رسومات متحركة وتأثيرات بصرية لوسائل الإعلام المختلفة.",
                    "social_media": "مدير منصات التواصل الإجتماعي",
                    "social_media_desc": "إدارة حضور العلامة التجارية والتفاعل عبر المنصات الاجتماعية."
                },
                "actions": {
                    "details": "التفاصيل",
                    "explore": "استكشف المسار",
                    "coming_soon": "قريباً",
                    "data_paths": "مسارات تحليل البيانات",
                    "data_desc": "إليك أفضل المسارات التعليمية والمهنية المختارة بعناية في مجالات البيانات.",
                    "marketing_paths": "مسارات التسويق الاستراتيجي",
                    "marketing_desc": "اكتشف مسارات التسويق الرقمي ونمو الشركات المبنية على حقائق السوق."
                },
                "details_modal": {
                    "roadmap": "خارطة الطريق المهنية",
                    "skills": "المهارات الأساسية",
                    "salary": "نطاق الرواتب التقديري",
                    "responsibilities": "المسؤوليات الرئيسية",
                    "close": "إغلاق"
                },
                "roles_details": {
                    "software": {
                        "roadmap": "متدرب/مبتدئ -> مستوى متوسط -> مطور خبير -> قائد تقني أو مدير هندسي.",
                        "skills": "جافا/بايثون/جافاسكريبت، هياكل البيانات، تصميم النظم، Git، المنهجيات المرنة (Agile).",
                        "salary": "محلياً: 15 - 45 ألف (مبتدئ) إلى 80 - 180 ألف+ (خبير) شهرياً. عالمياً: $3,000 - $8,000+ شهرياً.",
                        "responsibilities": "تصميم بنية الأنظمة، كتابة أكواد نظيفة، مراجعة الأكواد، ونشر تطبيقات قابلة للتوسع."
                    },
                    "data": {
                        "roadmap": "محلل مبتدئ -> محلل خبير -> عالم بيانات أو مدير تحليلات.",
                        "skills": "إتقان SQL، بايثون/R، النمذجة الإحصائية، أدوات BI مثل (Tableau/PowerBI).",
                        "salary": "محلياً: 12 - 30 ألف (مبتدئ) إلى 50 - 100 ألف+ (خبير) شهرياً. عالمياً: $2,500 - $6,500+ شهرياً.",
                        "responsibilities": "تنقيب البيانات، تنظيف البيانات المعقدة، بناء النماذج التنبؤية، وإنشاء لوحات التحكم التنفيذية."
                    },
                    "ml_engineer": {
                        "roadmap": "مهندس ML مبتدئ -> باحث تعلم آلة -> معمار ذكاء اصطناعي رائد.",
                        "skills": "التعلم العميق (PyTorch/TensorFlow)، الرؤية الحاسوبية/NLP، تحسين النماذج، ML Ops.",
                        "salary": "محلياً: 25 - 60 ألف (مبتدئ) إلى 100 - 250 ألف+ (خبير) شهرياً. عالمياً: $5,000 - $12,000+ شهرياً.",
                        "responsibilities": "تطوير خوارزميات الذكاء الاصطناعي، تدريب الشبكات العصبية، توسيع خطوط إنتاج ML، وتنفيذ الأبحاث."
                    },
                    "data_scientist": {
                        "roadmap": "عالم بيانات مبتدئ -> عالم بيانات خبير -> عالم بيانات رئيسي أو رئيس قطاع البيانات.",
                        "skills": "الإحصاء المتقدم، البيانات الكبيرة (Spark/Hadoop)، النمذجة التنبؤية، الحوسبة السحابية.",
                        "salary": "محلياً: 20 - 50 ألف (مبتدئ) إلى 90 - 200 ألف+ (خبير) شهرياً. عالمياً: $4,500 - $10,000+ شهرياً.",
                        "responsibilities": "اختبار الفرضيات، هندسة الميزات، اكتشاف الأنماط المخفية، وقيادة القرارات الاستراتيجية من خلال البيانات."
                    },
                    "marketing": {
                        "roadmap": "منسق -> أخصائي -> مدير تسويق -> مدير تنفيذي للتسويق.",
                        "skills": "استراتيجيات SEO/SEM، تسويق المحتوى، Google Analytics، الإعلانات عبر شبكات التواصل.",
                        "salary": "محلياً: 10 - 25 ألف (مبتدئ) إلى 40 - 85 ألف+ (خبير) شهرياً. عالمياً: $1,500 - $5,000+ شهرياً.",
                        "responsibilities": "إدارة الحملات، تحليل اتجاهات السوق، تحديد موقع العلامة التجارية، وتتبع عائد الاستثمار."
                    },
                    "android": {
                        "roadmap": "متدرب -> مطور أندرويد مبتدئ -> مستوى متوسط -> مطور خبير -> مهندس تطبيقات موبايل.",
                        "skills": "Kotlin، Java، Android SDK، Jetpack Compose، Retrofit، نمط MVVM.",
                        "salary": "محلياً: 18 - 30 ألف (مبتدئ) إلى 50 - 110 ألف+ (خبير) شهرياً. عالمياً: $2,500 - $7,000+ شهرياً.",
                        "responsibilities": "بناء تطبيقات أصلية، تحسين الأداء، ربط واجهات البرمجة (APIs)، واختبار الوحدات."
                    },
                    "frontend": {
                        "roadmap": "مطور جونيور -> مطور مستوى متوسط -> مطور واجهات خبير -> مهندس واجهات (Architect).",
                        "skills": "React/Next.js، TypeScript، TailWind CSS، Redux، تحسين أداء الويب.",
                        "salary": "محلياً: 15 - 28 ألف (مبتدئ) إلى 45 - 100 ألف+ (خبير) شهرياً. عالمياً: $3,000 - $8,500+ شهرياً.",
                        "responsibilities": "تطوير واجهات متجاوبة، ضمان التوافق مع المتصفحات، وإدارة حالة التطبيق."
                    },
                    "backend": {
                        "roadmap": "مطور خلفية مبتدئ -> مستوى متوسط -> مطور خلفية خبير -> مهندس خلفية (Architect).",
                        "skills": "Node.js/Python/Java، REST APIs، تصميم قواعد البيانات (SQL/NoSQL)، Microservices، Docker.",
                        "salary": "محلياً: 18 - 35 ألف (مبتدئ) إلى 55 - 120 ألف+ (خبير) شهرياً. عالمياً: $3,500 - $9,000+ شهرياً.",
                        "responsibilities": "بناء واجهات برمجية قابلة للتوسع، تحسين قواعد البيانات، إدارة الخوادم، وتطبيق الأمان."
                    },
                    "devops": {
                        "roadmap": "DevOps مبتدئ -> مهندس DevOps -> DevOps خبير -> مهندس منصات (Platform Architect).",
                        "skills": "CI/CD (Jenkins/GitLab)، Kubernetes، AWS/Azure/GCP، Terraform، المراقبة (Prometheus/Grafana).",
                        "salary": "محلياً: 25 - 45 ألف (مبتدئ) إلى 70 - 150 ألف+ (خبير) شهرياً. عالمياً: $4,500 - $11,000+ شهرياً.",
                        "responsibilities": "أتمتة عمليات النشر، إدارة البنية التحتية السحابية، مراقبة صحة الأنظمة، وضمان التوافر العالي."
                    },
                    "uiux": {
                        "roadmap": "مصمم مبتدئ -> أخصائي UI/UX -> مصمم منتجات -> قائد فريق تصميم.",
                        "skills": "Figma، Adobe XD، بحث المستخدمين، بناء البروتوتايب، نظم التصميم (Design Systems).",
                        "salary": "محلياً: 15 - 25 ألف (مبتدئ) إلى 40 - 90 ألف+ (خبير) شهرياً. عالمياً: $2,000 - $6,500+ شهرياً.",
                        "responsibilities": "إنشاء مخططات هيكلية، اختبار المستخدمين، تصميم واجهات عالية الدقة، واستكشاف المنتجات."
                    },
                    "seo": {
                        "roadmap": "مساعد SEO -> أخصائي SEO -> قائد نمو عضوي -> مدير تسويق.",
                        "skills": "بحث الكلمات المفتاحية، SEO تقني، استراتيجية المحتوى، أدوات GSC و GA، بناء الروابط.",
                        "salary": "محلياً: 10 - 20 ألف (مبتدئ) إلى 35 - 75 ألف+ (خبير) شهرياً. عالمياً: $1,500 - $5,000+ شهرياً.",
                        "responsibilities": "تحسين الصفحات برمجياً، تدقيق المواقع تقنياً، تتبع الكلمات المفتاحية، وإعداد التقارير."
                    },
                    "software_architect": {
                        "roadmap": "مطور خبير -> قائد تقني -> معمار برمجيات -> مدير تكنولوجيا (CTO).",
                        "skills": "تصميم الأنظمة، الخدمات المصغرة (Microservices)، سحابة (Azure/AWS)، القيادة، قابلية التوسع.",
                        "salary": "محلياً: 100 - 250 ألف+ شهرياً. عالمياً: $8,000 - $18,000+ شهرياً.",
                        "responsibilities": "تحديد التقنيات المستخدمة، ضمان جودة الأنظمة، توجيه القادة التقنيين، والإشراف على تصميم البنية التحتية."
                    },
                    "content_strat": {
                        "roadmap": "كاتب محتوى -> استراتيجي محتوى -> مدير محتوى -> رئيس قسم المحتوى.",
                        "skills": "الكتابة الإبداعية، SEO، إدارة أنظمة المحتوى (CMS)، تحليل البيانات، السرد القصصي للعلامة التجارية.",
                        "salary": "محلياً: 12 - 35 ألف (مبتدئ) إلى 50 - 120 ألف+ (خبير) شهرياً. عالمياً: $3,000 - $7,500+ شهرياً.",
                        "responsibilities": "تطوير استراتيجية المحتوى، إدارة التقويم التحريري، تدقيق المحتوى الحالي، وتحليل مقاييس التفاعل."
                    },
                    "graphic_designer": {
                        "roadmap": "مصمم مبتدئ -> مصمم خبير -> مدير فني -> مدير إبداعي.",
                        "skills": "Adobe Creative Suite (Ps, Ai, Id)، التايبوجرافي، الهوية البصرية، تصميم التخطيطات.",
                        "salary": "محلياً: 8 - 20 ألف (مبتدئ) إلى 30 - 70 ألف+ (خبير) شهرياً. عالمياً: $2,000 - $5,500+ شهرياً.",
                        "responsibilities": "إنشاء أنظمة الهوية البصرية، تصميم المواد التسويقية، تصميم العبوات، والرسوم التوضيحية."
                    },
                    "motion_graphic": {
                        "roadmap": "محرك رسوم مبتدئ -> مصمم موشن -> مصمم موشن خبير -> مخرج رسوم متحركة.",
                        "skills": "After Effects، Cinema 4D، Premiere Pro، رسم القصص المصورة (Storyboarding)، مبادئ التحريك.",
                        "salary": "محلياً: 15 - 30 ألف (مبتدئ) إلى 45 - 95 ألف+ (خبير) شهرياً. عالمياً: $2,800 - $7,000+ شهرياً.",
                        "responsibilities": "إنشاء تسلسلات متحركة، تأثيرات بصرية، تحرير محتوى الفيديو، والتعاون مع الفرق الإبداعية."
                    }
                }
            },
            "footer": {
                "tagline": "حقق أقصى طموحاتك",
                "subscribe": "انضم للنشرة المهنية",
                "placeholder": "البريد الإلكتروني المهني",
                "whyUs_title": "ميزة CareerPilot",
                "whyUs_desc": "نلتزم بتقديم أدق التوصيات المهنية المصممة خصيصاً لتطلعات الخريجين في العصر الحديث.",
                "readMore": "استكشف المزيد",
                "links_title": "المصادر الأساسية",
                "about": "رؤيتنا",
                "contact": "طلبات التواصل",
                "privacy": "سياسة البيانات",
                "terms": "اتفاقية الاستخدام",
                "account_title": "بوابة المستخدم",
                "myAccount": "الملف الوظيفي",
                "contact_title": "المقر الرئيسي",
                "address": "المركز الرئيسي: 1429 شارع نيتوس، نيويورك 10001",
                "payment": "معاملات آمنة"
            },
            "login": {
                "title": "مصادقة المسؤولين",
                "subtitle": "الوصول للمصرح لهم فقط - تسجيل دخول آمن",
                "username": "معرف المستخدم",
                "password": "مفتاح الأمان",
                "placeholder_user": "أدخل اسم المستخدم",
                "placeholder_pass": "أدخل كلمة المرور",
                "button": "تأكيد الهوية",
                "logging": "جاري التحقق من البيانات...",
                "error": "فشلت المصادقة. البيانات غير صحيحة."
            },
            "browse": {
                "title": "تصفح آفاق العمل",
                "subtitle": "استعرض المسارات المهنية المتنوعة والمعايرة وفق كفاءاتك الأساسية.",
                "search_placeholder": "ابحث عن مسمى وظيفي أو خبرة...",
                "all_industries": "كافة المجالات",
                "add_new": "إنشاء سجل",
                "key_skills": "المهارات والمتطلبات:",
                "details": "فحص التفاصيل",
                "no_results": "لم يتم العثور على نتائج متوافقة",
                "no_results_desc": "حاول تعديل معايير البحث لتوسيع نطاق النتائج.",
                "confirm_delete": "هل أنت متأكد من حذف هذا المسار المهني؟"
            },
            "recommend": {
                "title": "تحليل التوافق المهني",
                "subtitle": "حلل مهاراتك وتفضيلاتك لتحديد المسار الوظيفي الأمثل لك.",
                "skills_label": "الكفاءات الجوهرية",
                "skills_placeholder": "مثلاً: تطوير واجهات، تحليل كمي، تصميم تجربة المستخدم",
                "skills_hint": "استخدم الفاصلة (,) للفصل بين المهارات",
                "interests_label": "التخصصات / القطاعات المستهدفة",
                "interests_placeholder": "مثلاً: التكنولوجيا المالية، التكنولوجيا الحيوية، الخدمات اللوجستية",
                "button": "بدأ عملية التحليل",
                "results_title": "نتائج المطابقة التحليلية",
                "match": "نسبة التوافق",
                "matching_skills": "نقاط الارتباط بالمهارات:",
                "no_matches": "لم يتم تحديد ارتباطات مباشرة",
                "no_matches_desc": "قم بتوسيع معايير مهاراتك لتحقيق دقة مطابقة أعلى."
            },
            "articles_page": {
                "title": "منصة المقالات والرؤى المهنية",
                "subtitle": "اكتشف أحدث التوجهات، ونصائح التطوير المهني، وأخبار الصناعة المختارة بعناية للخريجين والمحترفين.",
                "search": "ابحث في المقالات...",
                "read_more": "قراءة المقال بالكامل",
                "categories": {
                    "all": "كل التصنيفات",
                    "tech": "تكنولوجيا",
                    "career": "توجيه مهني",
                    "soft_skills": "تطوير الذات",
                    "industry": "رؤى سوق العمل"
                }
            },
            "admin_panel": {
                "add_title": "تسجيل مواصفات مسار وظيفي",
                "success": "تم تحديث البيانات. جاري العودة للوحة التحكم...",
                "label_title": "المسمى الوظيفي",
                "label_industry": "نطاق القطاع",
                "label_desc": "لمحة عامة عن الدور",
                "label_skills": "الكفاءات المطلوبة (بصيغة CSV)",
                "placeholder_title": "مثلاً: معمار برمجيات",
                "placeholder_desc": "حدد المتطلبات والمسؤوليات الأساسية...",
                "placeholder_skills": "مثلاً: AWS، بايثون، منهجية Agile",
                "save": "اعتماد التغييرات",
                "cancel": "تجاهل",
                "select_ind": "تصنيف القطاع",
                "validation": {
                    "title": "المسمى مطلوب",
                    "description": "الوصف مطلوب",
                    "industry": "المجال مطلوب",
                    "skills": "مهارة واحدة على الأقل مطلوبة"
                }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
