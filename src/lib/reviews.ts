/**
 * Real Google reviews, kept in the language they were written in. They live
 * here rather than in the dictionaries on purpose: translating them would hide
 * that they come from foreign visitors, which is the point of showing them.
 *
 * `lang` is set on the element so browsers pick the right font for each script.
 */
export type Review = {
  author: string;
  /** BCP 47 tag for the language the review is written in. */
  lang: string;
  text: string;
};

export const REVIEWS: Review[] = [
  {
    author: "Sanha Kang",
    lang: "ko",
    text: "한국인 후기들 보고 2박 3일동안 HAVAL M6 렌트했는데 차량 상태도 좋았고, 가격도 괜찮았습니다. 무엇보다 직원분들이 매우 친절했고, 주차비나 톨비 결제와 관련해 문의할 일이 몇 번 있었는데, 왓츠앱으로 연락하자 항상 빠르게 대응해줬습니다 : ) 알마티에서 렌트 시에 이 업체 추천해요!",
  },
  {
    author: "Andy Tam",
    lang: "zh-Hant",
    text: "我地租左5天的Chevrolet Cobalt，價錢合適，車好乾淨舒適，汽車狀況很好，帶左我地去睇湖睇峽谷，推薦呢間租車",
  },
  {
    author: "ชัยรัตน์ ขู่วิชัย",
    lang: "th",
    text: "เราเช่ารถ road trip 10 วัน จากอัลมาตี้ ข้ามไปคีร์กีส และคืนรถที่อัลมาตี้ ประทับใจทั้งบริการที่รวดเร็ว ถูกต้อง พร้อมแก้ปัญหา สภาพรถดี ราคาที่เหมะสม อีกทั้งเจ้าของซึ่งเป็นคนท้องถิ่น สื่อสารภาษาอังกฤษดีมาก แถมหล่อมากๆ เตรียมเอกสารครบถ้วนสมบูรณ์ทั้งสัญญา ประกันภัยที่ครอบคลุมทั้ง 2 ประเทศ พร้อมคืนเงินค่ามัดจำตรงตามเวลาที่กำหนด คราวหน้าถ้าได้ไปอีกครั้ง จะใช้บริการที่ the rent อีกแน่นอน",
  },
  {
    author: "CT",
    lang: "en",
    text: "Good service. Quick reply. The car is in good condition. The guarantee is given back in time.",
  },
];
