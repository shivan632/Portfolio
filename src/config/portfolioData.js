import flashnotesImg from "../assets/project_img/flashnotes.png";
import quickdocImg from "../assets/project_img/quickdoc.png";
import brainImg from "../assets/project_img/brain.jpeg";
import fishImg from "../assets/project_img/fish.png";
import uniselectorImg from "../assets/project_img/uniselector.png";
import adventureImg from "../assets/project_img/adventure.png";
import foodImg from "../assets/project_img/food.png";
import aniflixImg from "../assets/project_img/aniflix.png";
import sentiment from "../assets/project_img/sentiment.png";

import nodeCert from "../assets/certificate/node.jpg";
import dsCert from "../assets/certificate/data-science.png";
import pythonCert from "../assets/certificate/p-python.png";
import pdsCert from "../assets/certificate/p-data-science.png";
import aiCert from "../assets/certificate/ai.png";
import mlCert from "../assets/certificate/ml.png";
import devfestCert from "../assets/certificate/devfest.png";

export const portfolioData = {
  personalInfo: {
    name: "Shivan Mishra",
    title: "Data Science, AI/ML & Full Stack Developer",
    subtitle: "Leveraging Data Science, AI/ML models, and Full Stack technologies to build intelligent, high-performance applications.",
    bio: [
      "My name is Shivan Mishra, and I am a highly motivated BCA graduate with a strong academic background and a CGPA of 8.82. I have completed IBM-certified training in Artificial Intelligence and developed expertise in AI/ML, Data Science, and Frontend Development through academic projects and internships.",
      "During my BCA journey, I gained practical experience in data manipulation, machine learning model development, and predictive analytics. I have worked on AI/ML and backend projects that strengthened my problem-solving, analytical, and technical skills. My academic curriculum covered important subjects such as Data Structures & Algorithms (DSA), Design & Analysis of Algorithms (DAA), Computer Networking, Operating Systems, Artificial Intelligence, Machine Learning, and Data Visualization.",
      "I am also an active participant in hackathons and campus events, where I developed teamwork, leadership, and innovation skills. I am passionate about building impactful technology solutions and continuously learning emerging technologies in the field of AI and software development.",
      "Beyond academics, I'm actively developing my skills in React, MongoDB, and Node.js, working on full-stack projects to grow as a developer.",
      "When I'm not studying or working on projects, I enjoy exploring new technologies, improving my development skills, and staying curious about the latest trends in IT and software development."
    ],
    email: "shivrom.2020@gmail.com",
    location: "Prayagraj, Uttar Pradesh, India",
    github: "https://github.com/shivan632",
    linkedin: "https://www.linkedin.com/in/shivan-mishra-b7156a317",
    resumeUrl: "/resume.pdf",
    stats: [
      { label: "Years of Experience", value: "2+" },
      { label: "Completed Projects", value: "15+" },
      { label: "Certifications", value: "10+" }
    ]
  },

  skills: [
    {
      category: "Data Science & AI/ML",
      items: [
        { name: "Python (Pandas, NumPy)", level: 90 },
        { name: "Scikit-Learn & Machine Learning", level: 85 },
        { name: "TensorFlow & Deep Learning", level: 80 },
        { name: "Data Visualization (Tableau, Seaborn)", level: 85 },
        { name: "RAG", level: 70 },
        { name: "NLP & Generative AI", level: 70 }
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: "React", level: 90 },
        { name: "JavaScript (ES6+)", level: 85 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Bootstrap", level: 80 },
        { name: "HTML5 & CSS3", level: 90 },
        { name: "Redux Toolkit", level: 75 }
      ]
    },
    {
      category: "Backend & Database",
      items: [
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "SQL & Postgres", level: 70 },
        { name: "REST APIs", level: 90 }
      ]
    },
    {
      category: "Tools & DevOps",
      items: [
        { name: "Git & GitHub", level: 85 },
        { name: "SupaBase", level: 90 },
        { name: "Vercel / Netlify", level: 85 },
        { name: "Docker", level: 60 },
        { name: "Render", level: 75 }
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "FlashNotes-AI-powered Learning Platform",
      shortDescription: "An AI-powered learning platform that helps students to learn new things and improve their knowledge.",
      longDescription: "FlashNotes is an AI-powered learning platform that helps students to learn new things and improve their knowledge. It is built using React, Node.js, Express, SupaBase, Tailwind CSS, and Bootstrap.",
      category: "Fullstack",
      tech: ["React", "Node.js", "Express", "SupaBase", "Tailwind CSS", "Bootstrap"],
      github: "https://github.com/shivan632/flashnotes-grp-pjt",
      vercel: "https://flashnotes-grp-pjt-1t3z.vercel.app/",
      analysis: "https://flashnotesgrppjt-ibzbmgjvu58n95fjpsvwao.streamlit.app/",
      image: flashnotesImg
    },
    {
      id: 2,
      title: "QuickDoc-AI Health Care Platform",
      shortDescription: "A Healthcare Platform built using HTML5, CSS3 and JavaScript",
      longDescription: "QuickDoc-AI is a healthcare platform built using HTML5, CSS3 and JavaScript. It is a platform for doctors and patients to connect and share their medical information.",
      category: "Frontend",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS"],
      github: "https://github.com/shivan632/QuickDocAI",
      vercel: "https://quick-doc-ai-rho.vercel.app/",
      image: quickdocImg
    },
    {
      id: 3,
      title: "Brain Tumar Detection",
      shortDescription: "Brain Tumar Detection using Deep Learning",
      longDescription: "Brain Tumar Detection using Deep Learning. It is built using Streamlit, TensorFlow & Keras and Python.",
      category: "Data Science",
      tech: ["Python", "TensorFlow & Keras", "Streamlit", "CNN"],
      github: "https://github.com/shivan632/Brain-Tumor-MRI-Classifierr",
      image: brainImg
    },
    {
      id: 4,
      title: "Fish Classification",
      shortDescription: "A Fish Classification using Deep Learning",
      longDescription: "A Fish Classification using Deep Learning pridect a fish Class by taking it's image as input. It is built using Keras, TensorFlow and Python.",
      category: "Data Science",
      tech: ["Python", "TensorFlow & Keras", "Streamlit", "CNN & ANN"],
      github: "https://github.com/shivan632/Fish-Classification",
      image: fishImg
    },
    {
      id: 5,
      title: "University Selector",
      shortDescription: "A platfrom for Students where they can find intresed colleges and compare them.",
      longDescription: "UniSelector is a platfrom for students where they can find intresed colleges based on their intrest, Events organized by colleges, location, courses, placement statstics and fees.",
      category: "Fullstack",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "MySQL", "Node.js", "Express", "Tailwind CSS"],
      github: "https://github.com/shivan632/University-Selector",
      vercel: "https://university-selector.vercel.app/",
      image: uniselectorImg
    },
    {
      id: 6,
      title: "Adventure Explorer",
      shortDescription: "A website where users can find intresed places and plan their trip.",
      longDescription: "A adventurous website where users view different places, plan there trip, book tickets, hotels and track there journey. It is build for Friends, Familys and solo travelers.",
      category: "Frontend",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS", "Three.js"],
      github: "https://github.com/shivan632/Advanture",
      vercel: "https://advanture-nu.vercel.app/",
      image: adventureImg
    },
    {
      id: 7,
      title: "Food Ordering Platform",
      shortDescription: "A food ordering platform where users can order food from different restaurants.",
      longDescription: "A food ordering platform where different types of food are available and users can order them. A full-featured online food ordering platform with menu listings, cart functionality, and secure checkout.",
      category: "Frontend",
      tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS"],
      github: "https://github.com/shivan632/Project-Food-Website",
      vercel: "https://project-food-website.vercel.app/",
      image: foodImg
    },
    {
      id: 8,
      title: "Sentiment Analysis System",
      shortDescription: "Sentiment Analysis",
      longDescription: "Sentiment Analysis on Social Media is an AI-powered web application that analyzes the sentiment of user-provided social media text and classifies it as Positive, Negative, or Neutral. The application uses Natural Language Processing (NLP) and a trained machine learning model to preprocess text, extract meaningful features, and generate accurate sentiment predictions.",
      category: "Data Science",
      tech: ["Python", "NumPy", "Pandas", "Streamlit", "NLP"],
      github: "https://github.com/shivan632/Sentiment-Analyses-on-Social-Media.git",
      analysis: "https://sentiment-analyses-on-social-media-tg4fqruswdfjsm5r6stbb2.streamlit.app/",
      image: sentiment
    },
    {
      id: 9,
      title: "AniFlix (OTT Platform)",
      shortDescription: "A platform where users can watch anime, series, and other shows.",
      longDescription: "A OTT platform where users can watch anime, series, and other shows. A full-featured online OTT platform with  listings, cart functionality, and secure checkout.",
      category: "Frontend",
      tech: ["HTLM5", "CSS3", "JavaScript", "Tailwind CSS", "Bootstrap", "Local Storage", "Iconify"],
      github: "https://github.com/shivan632/AniFlix",
      vercel: "https://ani-flix-two.vercel.app/",
      image: aniflixImg
    }
  ],

  certificates: [
    {
      id: 1,
      title: "Node JS Course",
      issuer: "UnStop",
      date: "July 2026",
      credentialUrl: "https://unstop.com/certificate-preview/70d30eb6-b606-4604-888f-371f3a334f37",
      image: nodeCert
    },
    {
      id: 2,
      title: " Data Science Methodology",
      issuer: "IBM",
      date: "June  2025",
      credentialUrl: "https://courses.uniteduniversity.skillsnetwork.site/certificates/e0a7da10ee254f6886bbfd7c6ddcf818",
      image: dsCert
    },
    {
      id: 3,
      title: "Practicing Test Driven Development with Python",
      issuer: "IBM",
      date: "May  2025",
      credentialUrl: "https://courses.ibmcep.cognitiveclass.ai/certificates/3173458ce3a14fe387d03a117a3915b7",
      image: pythonCert
    },
    {
      id: 4,
      title: "Practicing Test Driven Development with Python",
      issuer: "IBM",
      date: "May  2025",
      credentialUrl: "https://courses.ibmcep.cognitiveclass.ai/certificates/3173458ce3a14fe387d03a117a3915b7",
      image: pythonCert
    },
    {
      id: 5,
      title: " Python for Data Science",
      issuer: "IBM",
      date: "October 2025",
      credentialUrl: "https://courses.uniteduniversity.skillsnetwork.site/certificates/7cf1a78ea95f4549938fb7d9a85e0abc",
      image: pdsCert
    },
    {
      id: 6,
      title: " Artificial Intelligence Analyst",
      issuer: "IBM",
      date: "November 2025",
      credentialUrl: "https://courses.uniteduniversity.skillsnetwork.site/certificates/83a1b68efe294a5cab2a7063ff930220",
      image: aiCert
    },
    {
      id: 7,
      title: "Machine Learning with Python",
      issuer: "IBM",
      date: "September 2025",
      credentialUrl: "https://courses.uniteduniversity.skillsnetwork.site/certificates/6e5dc25bc32740f9912dc8b75ebda037",
      image: mlCert
    },
    {
      id: 8,
      title: "DevFest",
      issuer: "Google",
      date: "November 2025",
      credentialUrl: "https://certificate.givemycertificate.com/c/e1032d34-985b-4bf4-945d-7b31807496f1",
      image: devfestCert
    }
  ],

  experience: [
    {
      id: 1,
      role: "AI/ML Intern",
      company: "Labmentix Pvt. Ltd.",
      duration: "June 2025 - August 2025",
      description: "At Labmentix, I contributed to developing and training Machine Learning and Deep Learning models for real-world applications. My work involved data preprocessing, model evaluation, and integrating AI solutions into existing systems. This internship strengthened my skills in Python, machine learning algorithms, and practical AI deployment.",
      tags: ["Python", "Scikit-learn", "Pandas", "Numpy", "TensorFlow", "Keras"]
    },
    {
      id: 2,
      role: "Data Science Intern",
      company: "Clinch Soft Bridge",
      duration: "January 2026 - March 2026",
      description: "At Clinch Soft Bridge, I contributed to developing and training Machine Learning and Deep Learning models for real-world applications. My work involved data preprocessing, model evaluation, and integrating AI solutions into existing systems. This internship strengthened my skills in Python, machine learning algorithms, and practical AI deployment.",
      tags: ["Python", "Scikit-learn", "Pandas", "Numpy", "TensorFlow", "Keras"]
    },
    {
      id: 3,
      role: "Web Developer Intern",
      company: "CodSoft",
      duration: "June 2026 - July 2026",
      description: "At CodSoft, I contributed to developing and maintaining web applications. My work involved . This internship strengthened my skills in HTML, CSS, Bootstrap and JavaScript.",
      tags: ["HTML", "CSS", "Bootstrap", "JavaScript"]
    }
  ],

  education: [
    {
      id: 1,
      degree: "Bachelor of Computer Application (BCA)",
      specialisation: "Artifical Intelligence",
      institution: "United University, Prayagraj",
      duration: "2023 - 2026",
      CGPA: "8.82/10",
      description: "BCA in Artifical Intelligence focused on AI and Machine Learning fundamentals, Python, Data Science, and modern web technologies. Involved in hackathons, AI projects, and developing innovative solutions using emerging technologies."
    },
    { 
      id: 2,
      degree: "Intermediate (12th)",
      specialisation: "Science",
      institution: "Army Public School New Cantt Prayagraj",
      duration: "2022 - 2023",
      percentage: "64%",
      description: "Intermediate in Science focused on Physics, Chemistry, Maths and English. Involved in science projects, and developing innovative solutions using emerging technologies."
    },
    { 
      id: 3,
      degree: "Matriculation (10th)",
      specialisation: "Computer Science",
      institution: "Army Public School New Cantt Prayagraj",
      duration: "2020 - 2021",
      CGPA: "86%",
      description: "Matriculation in Science focused on Physics, Chemistry, Mathematics, and English. Involved in science projects, and developing innovative solutions using emerging technologies."
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Amit Sharma",
      role: "Senior Developer",
      company: "Labmentix Pvt. Ltd.",
      quote: "Shivan demonstrated exceptional AI/ML skills during his internship. His ability to preprocess complex datasets and build accurate models was impressive for someone at his level. A truly dedicated and fast learner."
    },
    {
      id: 2,
      name: "Priya Verma",
      role: "Project Lead",
      company: "Clinch Soft Bridge",
      quote: "Working with Shivan was a great experience. He brought creative solutions to data science challenges and always delivered quality work on time. His enthusiasm for learning new technologies is contagious."
    },
    {
      id: 3,
      name: "Rahul Gupta",
      role: "Team Lead",
      company: "CodSoft",
      quote: "Shivan's frontend development skills are top-notch. He built responsive, pixel-perfect UIs with attention to detail. His understanding of React and modern CSS frameworks made him a valuable team member."
    },
    {
      id: 4,
      name: "Dr. Neha Singh",
      role: "Assistant Professor",
      company: "United University",
      quote: "One of the most dedicated students I've mentored. Shivan's academic excellence combined with his practical project work in AI and full-stack development sets him apart. He has a bright future ahead."
    }
  ]
};
