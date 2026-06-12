export const defaultContent = {
  general: {
    companyName: "Monster Van",
    whatsapp: "524691138533",
    phone: "(+52) 469 113 8533",
    email: "contacto@monstervan.com.mx",
    address: "México",
    logo: "/images/logo2.png",
  },

  nav: {
    inicio: "Inicio",
    nosotros: "Nosotros",
    servicios: "Servicios",
    flotilla: "Flotilla",
    contacto: "Contacto",
    cotizar: "Cotizar",
  },

  hero: {
    badge: "Transporte y logística nacional",
    title: "Tu mejor socio en logística y transporte",
    highlight: "en logística",
    subtitle:
      "Transportamos más que tus mercancías, te entregamos tranquilidad. Carga segura, puntual y eficiente en toda la república.",
    backgroundImage: "/images/hero1-bg.jpg",
    truckImage: "/images/truck.jpg",

    primaryButtonText: "Solicitar Cotización",
    secondaryButtonText: "Conocer Servicios",

    badgeOneTitle: "3.5t",
    badgeOneSubtitle: "Carga segura",

    badgeTwoTitle: "Nacional",
    badgeTwoSubtitle: "Cobertura",

    badgeThreeTitle: "24/7",
    badgeThreeSubtitle: "Servicio",
  },

  promo: {
    enabled: false,
    title: "",
    subtitle: "",
    image: "",
    buttonText: "Solicitar Cotización",
  },

  about: {
    eyebrow: "NOSOTROS",
    title: "Logística confiable para mover lo que más importa",
    description:
      "En Monster Van brindamos soluciones de transporte seguras, puntuales y eficientes para empresas que necesitan mover mercancía con confianza.",
    image: "/images/about.jpg",
    missionTitle: "Misión",
    missionText:
      "Ofrecer soluciones de transporte eficientes, seguras y adaptadas a las necesidades de cada cliente.",
    visionTitle: "Visión",
    visionText:
      "Ser una empresa referente en logística y transporte nacional por nuestra puntualidad, compromiso y calidad de servicio.",
  },

  services: {
    eyebrow: "SERVICIOS",
    title: "Soluciones de transporte para tu operación",
    description:
      "Movemos tu mercancía con unidades adecuadas, atención personalizada y cobertura nacional.",
    items: [
      {
        title: "Transporte nacional",
        description:
          "Servicio de traslado de mercancías a diferentes puntos de la república.",
        image: "/images/service-1.jpg",
      },
      {
        title: "Carga segura",
        description:
          "Cuidamos tu mercancía durante todo el trayecto con procesos seguros.",
        image: "/images/service-2.jpg",
      },
      {
        title: "Servicio dedicado",
        description:
          "Unidades disponibles para operaciones específicas de tu empresa.",
        image: "/images/service-3.jpg",
      },
    ],
  },

  fleet: {
    eyebrow: "NUESTRA FLOTILLA",
    title: "Flotilla Vehicular",
    description:
      "Contamos con unidades preparadas para ofrecer transporte seguro, eficiente y profesional.",

    vehicleOneTitle: "Camioneta 1.3t",
    vehicleOneDescription:
      "Ideal para entregas ágiles, seguras y eficientes en rutas locales o nacionales.",
    vehicleOneImage: "/images/caady1.3.webp",

    vehicleTwoTitle: "Plataforma",
    vehicleTwoDescription:
      "Unidad versátil para traslado de mercancías que requieren mayor espacio o maniobra.",
    vehicleTwoImage: "/images/plataforma.webp",

    safetyTitle: "Seguridad en operación",
    safetyDescription:
      "Nuestras unidades cuentan con equipo y medidas para una operación confiable.",
    safetyImage: "/images/result.png",

    eppTitle: "Equipo de protección personal",
    eppDescription:
      "Nuestro personal trabaja con equipo de protección para mantener operaciones seguras.",
    eppImage: "/images/epp-worker.webp",
  },

  cta: {
    title: "¿Listo para mover tu mercancía?",
    description:
      "Solicita una cotización y recibe atención personalizada para tu operación.",
    buttonText: "Solicitar Cotización",
  },

  footer: {
    description:
      "Transporte y logística nacional con atención personalizada, seguridad y compromiso.",
    phoneLabel: "Teléfono",
    emailLabel: "Correo",
    addressLabel: "Ubicación",
    rights: "Todos los derechos reservados.",
    backToTop: "Volver arriba ↑",
  },
};

export type SiteContent = typeof defaultContent;