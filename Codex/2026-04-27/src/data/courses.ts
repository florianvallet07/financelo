import { CourseModule } from "@/types/learning";

export const modules: CourseModule[] = [
  {
    id: "argent",
    title: "Bases de l'argent",
    theme: "Comprendre les flux, les priorites et les bons reflexes.",
    color: "#00C853",
    lessons: [
      {
        id: "argent-1",
        title: "Ton argent a une mission",
        minutes: 4,
        xp: 20,
        summary: "Revenus, depenses fixes, variables et argent disponible.",
        content: [
          "La finance personnelle commence par une phrase simple: chaque euro doit avoir une mission.",
          "On separe d'abord les revenus, les depenses fixes, les depenses variables, l'epargne et les projets.",
          "Un bon objectif MVP pour ta vie financiere: savoir ou part ton argent avant d'essayer de l'optimiser."
        ],
        questions: [
          {
            id: "q1",
            prompt: "Quelle est la premiere chose a comprendre dans un budget ?",
            options: ["Le cours du Bitcoin", "Ou part l'argent", "Le prix de l'or", "Le taux du Livret A uniquement"],
            answerIndex: 1,
            explanation: "Sans visibilite sur les flux, il est difficile de prendre de bonnes decisions."
          }
        ]
      }
    ]
  },
  {
    id: "budget",
    title: "Budget personnel",
    theme: "Construire un systeme simple qui tient dans la vraie vie.",
    color: "#2563EB",
    lessons: [
      {
        id: "budget-1",
        title: "La methode 50/30/20",
        minutes: 5,
        xp: 25,
        summary: "Un cadre clair pour repartir besoins, envies et futur.",
        content: [
          "La regle 50/30/20 propose 50% pour les besoins, 30% pour les envies et 20% pour l'epargne ou le remboursement accelere.",
          "Ce n'est pas une loi. C'est un point de depart a adapter a ton logement, ton salaire et tes objectifs."
        ],
        questions: [
          {
            id: "q2",
            prompt: "Dans 50/30/20, les 20% servent surtout a...",
            options: ["Acheter plus d'abonnements", "Epargner ou rembourser", "Payer uniquement les loisirs", "Speculer"],
            answerIndex: 1,
            explanation: "Les 20% construisent ton futur financier."
          }
        ]
      }
    ]
  }
];

export const allLessons = modules.flatMap((module) => module.lessons);
