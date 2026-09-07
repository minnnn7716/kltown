export const projectList = {
  "ChingJe": {
    name: "青喆 SOHO",
    googleMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.9124275471663!2d121.50202920901653!3d25.003091477743922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9007e1c9083%3A0x1a5f8a831e9b3093!2z6Z2S5ZaGU09ITw!5e0!3m2!1sen!2stw!4v1787639910832!5m2!1sen!2stw"
  },
  "HuaShan": {
    name: "華山藝邸",
    googleMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7229.217632864586!2d121.52873260000001!3d25.047346200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9003efc9997%3A0xcb3624c71e5e89f1!2z6I-v5bGx6Jed6YK4!5e0!3m2!1sen!2stw!4v1784697128437!5m2!1sen!2stw"
  },
  "DuenNan": {
    name: "敦南 SOHO",
    googleMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7396622133388!2d121.54879470901842!3d25.042907577718044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442abc455bc3715%3A0xb36c873989d963ac!2z5pWm5Y2XU09ITyDlpKflu4g!5e0!3m2!1sen!2stw!4v1787639957368!5m2!1sen!2stw"
  },
  "OnePark": {
    name: "台中 One Park",
    googleMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3641.0213541754715!2d120.62498519999998!3d24.1358882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d0027a6d10f%3A0xf47946728cbbdd6c!2z5YWJ6ZqGIE9ORSBQQVJL!5e0!3m2!1sen!2stw!4v1787640027847!5m2!1sen!2stw"
  },
  "LightImperial": {
    name: "宜蘭光御墅",
    googleMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.5376826578718!2d121.73513090900562!3d24.77703567789199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3467fb741edd072f%3A0x4f0d1d58e973d26c!2z5YWJ5b6h5aKFVmlsbGE!5e0!3m2!1sen!2stw!4v1787640060040!5m2!1sen!2stw"
  },
} as const

export type ProjectCode = keyof typeof projectList
