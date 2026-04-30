// LinkedIn recommendations imported verbatim from public profile.
// `pullQuote` is the 1-3 sentence excerpt rendered in the testimonials
// section; `fullQuote` is kept for a future "read more" affordance.
//
// Photos are referenced from /public/testimonials/<slug>.jpg — those
// JPGs must be saved alongside this file. See notes in commit message.

export interface Testimonial {
  slug: string;
  name: string;
  role: string;
  /** ISO date when the recommendation was published on LinkedIn */
  date: string;
  /** How the author worked with Jérémy, in their own words */
  relation: string;
  /** Path under /public — saved as JPG by the user */
  photo: string;
  /** LinkedIn profile URL of the author (optional, used for attribution links) */
  linkedin?: string;
  /** 1-3 sentence excerpt shown by default */
  pullQuote: string;
  /** Full LinkedIn recommendation text */
  fullQuote: string;
}

export const testimonials: Testimonial[] = [
  {
    slug: 'kevin-bargoin',
    name: 'Kévin Bargoin',
    role: 'Expert Kubernetes — DevOps Freelance',
    date: '2023-12-12',
    relation: "Était son supérieur, sans être son responsable direct (Domraider, 4+ ans)",
    photo: '/testimonials/kevin-bargoin.jpg',
    pullQuote:
      "Si vous recherchez un leader technique capable de mettre les mains dans le cambouis pour montrer la bonne direction, alors Jérémy est le candidat idéal.",
    fullQuote:
      "J'ai eu la chance de travailler avec Jérémy pendant plus de quatre ans à Domraider. C'est un excellent développeur, un très bon communicateur mais aussi un collaborateur très apprécié. Il est toujours à la pointe des dernières technologies, prêt à partager ses connaissances avec les autres. Que ce soit sur du front-end avec React ou sur du back-end avec Symfony, Jérémy a toujours apporté son expérience et ses idées sur les projets que l'on a réalisés ensemble. En plus de ses compétences de développeur, Jérémy est un vrai leader technique. Il est capable d'inspirer son équipe et il a une vision claire de ce qu'il veut accomplir. Si vous recherchez un leader technique capable de mettre les mains dans le cambouis pour montrer la bonne direction, alors Jérémy est le candidat idéal.",
  },
  {
    slug: 'mehdi-tassi',
    name: 'Mehdi Tassi',
    role: 'Manager QA/QE — ISTQB Foundation',
    date: '2024-01-12',
    relation: "Membre de la même équipe (Skilleos, 2 ans)",
    photo: '/testimonials/mehdi-tassi.jpg',
    pullQuote:
      "Je recommande fortement Jérémy pour son professionnalisme et son bagage technique. Côté technique, Jérémy fait preuve d'excellence. Il sait prendre les bonnes décisions.",
    fullQuote:
      "Je recommande fortement Jérémy pour son professionnalisme et son bagage technique. À ses côtés j'ai pu apprendre énormément et de pair nous avons pu apporter une pierre solide à l'édifice de Skilleos (intégration de tests de performance/api/e2e en CI/CD). C'est une personne ouverte, avec un mindset orienté sur l'amélioration continue. Côté technique, Jérémy fait preuve d'excellence. Il sait prendre les bonnes décisions. C'est une personne en qui on peut faire confiance, le challenge est de mise et cela fait plaisir de travailler avec quelqu'un de passionné. Grâce à lui j'ai pu apprendre plein de choses et cela n'est pas négligeable, au contraire. Il est sensible à la qualité ce qui est aussi un point important dans une équipe. Je te remercie pour ces 2 années.",
  },
  {
    slug: 'ilyes-abd-lillah',
    name: 'Ilyes Abd-Lillah',
    role: 'Lead Front-end',
    date: '2023-12-11',
    relation: "Membre de la même équipe (2 ans)",
    photo: '/testimonials/ilyes-abd-lillah.jpg',
    pullQuote:
      "Jérémy est une personne inspirante, sérieuse, minutieuse et à la pointe technologiquement. C'est une personne qui n'hésite pas à partager ce qui se fait de meilleur, avec un esprit pédagogique hors normes.",
    fullQuote:
      "Ayant travaillé 2 ans avec Jérémy, je n'ai qu'une chose à dire — ma rencontre et notre collaboration restera l'une des meilleures que j'ai jamais eu de toute ma carrière professionnelle. Jérémy est une personne inspirante, sérieuse, minutieuse et à la pointe technologiquement. Il a été une source d'inspiration pour moi ainsi qu'à l'équipe technique dans laquelle je travaillais : c'est une personne qui n'hésite pas à partager ce qui se fait de meilleur en termes de process tech, d'expériences et de capacités à proposer des solutions réalistes face à des problèmes complexes et le tout avec un esprit pédagogique hors normes. Si vous recherchez un leader tech avec qui vous devez collaborer dans un objectif de succès technologique back-end, vous pouvez compter sans hésiter sur Jérémy !",
  },
  {
    slug: 'anthony-thomas',
    name: 'Anthony Thomas',
    role: 'Chief Technical Officer (CTO)',
    date: '2023-11-29',
    relation: "A travaillé avec Jérémy dans 3 structures différentes",
    photo: '/testimonials/anthony-thomas.jpg',
    pullQuote:
      "Ayant travaillé avec Jérémy dans 3 structures différentes, je le recommande les yeux fermés. Son professionnalisme, sa rigueur et sa passion dans son travail en font une personne vraiment formidable.",
    fullQuote:
      "Ayant travaillé avec Jérémy dans 3 structures différentes, je le recommande les yeux fermés. Son professionnalisme, sa rigueur et sa passion dans son travail en font une personne vraiment formidable avec laquelle il est agréable de développer un projet.",
  },
];
