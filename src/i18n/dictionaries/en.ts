/**
 * The reference copy deck. Every other locale is a Partial of this shape and
 * falls back key-by-key, so a half-finished translation never blanks the page.
 */
const en = {
  nav: {
    tagline: "Car rental in Almaty",
    cars: "Cars",
    conditions: "Rental Conditions",
    delivery: "Delivery",
    about: "About Us",
    contact: "Contact",
    language: "Language",
  },

  carTypes: {
    Economy: "Economy",
    Sedan: "Sedan",
    SUV: "SUV",
    "4WD": "4WD",
    Premium: "Premium",
  },

  drivetrains: {
    FWD: "FWD",
    RWD: "RWD",
    AWD: "AWD",
    "4WD": "4WD",
  },

  hero: {
    titleLine1: "Explore Almaty.",
    titleLine2: "Your car is ready.",
    subtitle: "Rent a car in Almaty",
    ctaPrimary: "Choose a Car",
    ctaSecondary: "Contact Us",
    features: [
      { title: "24/7 support", text: "We're always here" },
      { title: "No hidden fees", text: "Transparent pricing" },
    ],
  },

  popular: {
    heading: "Popular Cars",
    viewAll: "View all cars",
    emptyTitle: "The fleet is being prepared",
    emptyText:
      "Cars are added from the admin panel. As soon as the first ones are published they appear here.",
    emptyCta: "Contact us about availability",
  },

  why: {
    heading: "Why choose {brand}?",
    items: [
      { title: "Reliable cars", text: "All cars are inspected and maintained before every trip." },
      { title: "Easy booking", text: "Book your car in a few simple steps." },
      { title: "Delivery in Almaty", text: "We deliver the car to your location: airport, hotel or apartment." },
      { title: "Local support", text: "We help you during your entire trip in Kazakhstan." },
      { title: "Transparent pricing", text: "Clear rental conditions without unnecessary surprises." },
    ],
  },

  explore: {
    heading: "Explore Kazakhstan",
    subtitle: "Amazing places are waiting for you",
    restrictions: "About restrictions",
    cta: "Find a car for your trip",
    kyrgyzstan:
      "You can take our cars to Kyrgyzstan — we prepare all the paperwork you need.",
    note: "Please note: some destinations require specially equipped vehicles.",
    distanceFrom: "from Almaty",
    places: [
      {
        name: "Big Almaty Lake",
        distance: "~ 30 km",
        text: "A turquoise alpine lake an hour above the city. The mountain road is paved most of the way and easy in any season.",
      },
      {
        name: "Charyn Canyon",
        distance: "~ 200 km",
        text: "Red sandstone cliffs carved into a valley of castles. A comfortable day trip on good highway from Almaty.",
      },
      {
        name: "Kolsai Lakes",
        distance: "~ 300 km",
        text: "Three forest lakes stepped up a spruce valley. The upper lakes need a high-clearance car.",
      },
      {
        name: "Altyn Emel",
        distance: "~ 250 km",
        text: "The Singing Dune and the striped Aktau mountains. Long gravel stretches make a 4WD the sensible choice.",
      },
    ],
  },

  how: {
    heading: "How it works",
    steps: [
      { title: "Choose", text: "your car" },
      { title: "Send", text: "a request" },
      { title: "We confirm", text: "your booking" },
      { title: "Get", text: "the car" },
      { title: "Enjoy", text: "your trip" },
    ],
    airportTitle: "Landing in Almaty?",
    airportTitle2: "We'll bring the car to you.",
    airportText: "Airport delivery available 24/7.",
    airportCta: "Book airport delivery",
  },

  reviews: {
    heading: "What our clients say",
    googleLabel: "Google reviews",
    seeAllTitle: "See all reviews on Google",
    seeAllCta: "View reviews",
    placeholderNote: "Sample reviews — real ones are connected later.",
    items: [
      { text: "Excellent service. The car was clean, comfortable and delivered on time.", author: "Ahmed", country: "UAE" },
      { text: "Very easy rental process. Staff is friendly and professional.", author: "Yuki", country: "Japan" },
      { text: "The best car rental experience in Kazakhstan. Highly recommended!", author: "Daniel", country: "UK" },
    ],
  },

  catalog: {
    title: "Our cars",
    subtitle: "Choose a car for your trip in Kazakhstan",
    filterType: "Body type",
    filterPrice: "Price per day",
    all: "All",
    reset: "Reset filters",
    resultsOne: "car",
    resultsMany: "cars",
    minPrice: "Minimum price per day",
    maxPrice: "Maximum price per day",
    emptyTitle: "No cars match these filters",
    emptyText: "Try widening the price range or clearing the body type filter.",
  },

  card: {
    trunkUnit: "L",
    trunk: "Boot",
    drivetrain: "Drive",
    seats: "Seats",
    perDay: "/ day",
    book: "Book now",
    unavailable: "Unavailable",
  },

  contact: {
    call: "Call us",
    wechatTitle: "WeChat",
    wechatText: "Scan the code in WeChat to start a chat with us.",
  },

  footer: {
    about: "Car rental in Almaty, Kazakhstan",
    address: "Auezov St 145V, Almaty",
    mapTitle: "Our location on the map",
    carsHeading: "Cars",
    infoHeading: "Information",
    contactHeading: "Contact",
    support: "24/7 support",
    info: {
      conditions: "Rental conditions",
      delivery: "Delivery",
      about: "About us",
    },
    photoCredit: "Landscape photos",
    rights: "All rights reserved.",
  },

  langModal: {
    title: "Choose your language",
    subtitle: "You can change it any time from the menu.",
  },

  common: {
    menu: "Menu",
    close: "Close",
    previous: "Previous",
    next: "Next",
  },
};

// Deliberately not `as const`: translations must be assignable as plain
// strings, not forced to match the English literal.
export type Dictionary = typeof en;
export default en;
