/**
 * Single source of truth for brand + contact details.
 * Everything the owner is likely to change lives here, not in components.
 */
export const site = {
  name: "THE RENT",
  city: "Almaty",
  country: "Kazakhstan",

  /** Digits only — used to build tel: and wa.me links. */
  phoneRaw: "77471114888",
  phone: "+7 747 111 48 88",
  email: "the.rent.kz@gmail.com",

  links: {
    whatsapp: "https://wa.me/77471114888",
    /** Scanned from the QR in the navbar/footer rather than opened as a URL. */
    wechatQr: "/images/wechat-qr.webp",
    googleReviews: "https://maps.app.goo.gl/JjYNtNW524FGHExZ8",
    twoGis: "https://2gis.kz/almaty/geo/70000001060241979",
    yandexMaps:
      "https://yandex.ru/maps/org/the_rent/218708190873?si=c172yhcx4hz3pmyyudr5vzafm4",
    mapPlace: "https://maps.app.goo.gl/JjYNtNW524FGHExZ8",
    /** Keyless embed pinned to the exact coordinates of the office. */
    mapEmbed: "https://www.google.com/maps?q=43.2344874,76.9044229&z=16&output=embed",
  },

  googleRating: "4.9",
} as const;

export const CAR_TYPES = ["Economy", "Sedan", "SUV", "4WD", "Premium"] as const;
export type CarType = (typeof CAR_TYPES)[number];

export const TRANSMISSIONS = ["Automatic", "Manual"] as const;
export type Transmission = (typeof TRANSMISSIONS)[number];

/** Kept separate from the SUV/4WD body type — a 4WD body can be front-driven. */
export const DRIVETRAINS = ["FWD", "RWD", "AWD", "4WD"] as const;
export type Drivetrain = (typeof DRIVETRAINS)[number];
