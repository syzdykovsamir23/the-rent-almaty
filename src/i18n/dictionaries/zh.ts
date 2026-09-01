import type { DeepPartial, Dictionary } from "../dictionary";

const zh: DeepPartial<Dictionary> = {
  nav: {
    tagline: "阿拉木图租车",
    cars: "车型",
    conditions: "租车条款",
    delivery: "送车服务",
    about: "关于我们",
    contact: "联系我们",
    language: "语言",
  },

  carTypes: {
    Economy: "经济型",
    Sedan: "轿车",
    SUV: "城市SUV",
    "4WD": "四驱越野",
    Premium: "豪华型",
  },

  hero: {
    titleLine1: "畅游阿拉木图。",
    titleLine2: "爱车已备好。",
    subtitle: "在阿拉木图租车自驾",
    ctaPrimary: "选择车型",
    ctaSecondary: "联系我们",
    features: [
      { title: "全天候客服", text: "随时为您待命" },
      { title: "无隐藏费用", text: "价格公开透明" },
    ],
  },

  popular: {
    heading: "热门车型",
    viewAll: "查看全部车型",
    emptyTitle: "车队正在筹备中",
    emptyText: "车辆由后台管理系统添加，首批车辆发布后会立即显示在这里。",
    emptyCta: "咨询可租车辆",
  },

  why: {
    heading: "为什么选择 {brand}？",
    items: [
      { title: "车况可靠", text: "每辆车在出租前都经过全面检查与保养。" },
      { title: "预订简单", text: "只需几步即可完成预订。" },
      { title: "市内送车", text: "机场、酒店或住所，我们把车送到您指定的地点。" },
      { title: "本地支持", text: "您在哈萨克斯坦的整个行程中，我们随时提供协助。" },
      { title: "价格透明", text: "租车条款清晰明了，绝无额外惊喜。" },
    ],
  },

  explore: {
    heading: "探索哈萨克斯坦",
    subtitle: "绝美风景正等着您",
    restrictions: "关于通行限制",
    cta: "为您的行程选车",
    note: "请注意：部分目的地需要越野性能较强的车辆。",
    distanceFrom: "距阿拉木图",
    places: [
      {
        name: "大阿拉木图湖",
        distance: "约 30 公里",
        text: "距市区一小时车程的高山湖泊，湖水呈松石绿色。山路几乎全程铺装，四季均可通行。",
      },
      {
        name: "恰伦大峡谷",
        distance: "约 200 公里",
        text: "红色砂岩被岁月雕琢成的「城堡谷」。全程路况良好，适合轻松的一日往返。",
      },
      {
        name: "科尔赛湖群",
        distance: "约 300 公里",
        text: "三座湖泊沿云杉峡谷层层而上。前往上游两湖需要底盘较高的车辆。",
      },
      {
        name: "阿尔金-埃梅尔",
        distance: "约 250 公里",
        text: "会「唱歌」的沙丘与彩色条纹的阿克套山。砂石路段较长，建议选择四驱车。",
      },
    ],
  },

  how: {
    heading: "租车流程",
    steps: [
      { title: "选择", text: "心仪车型" },
      { title: "提交", text: "租车申请" },
      { title: "确认", text: "订单信息" },
      { title: "取车", text: "开始出发" },
      { title: "尽享", text: "旅途时光" },
    ],
    airportTitle: "即将降落阿拉木图？",
    airportTitle2: "我们把车送到航站楼。",
    airportText: "机场送车服务全天候提供。",
    airportCta: "预约机场送车",
  },

  reviews: {
    heading: "客户评价",
    googleLabel: "谷歌评价",
    seeAllTitle: "在谷歌查看全部评价",
    seeAllCta: "查看评价",
    placeholderNote: "此处为示例评价，真实评价稍后接入。",
    items: [
      { text: "服务非常好。车子干净舒适，而且准时送达。", author: "艾哈迈德", country: "阿联酋" },
      { text: "租车手续非常简便，工作人员亲切又专业。", author: "由纪", country: "日本" },
      { text: "在哈萨克斯坦最好的租车体验，强烈推荐！", author: "丹尼尔", country: "英国" },
    ],
  },

  catalog: {
    title: "全部车型",
    subtitle: "为您的哈萨克斯坦之旅挑选一辆车",
    filterType: "车身类型",
    filterPrice: "每日租金",
    all: "全部",
    reset: "清除筛选",
    resultsOne: "辆车",
    resultsMany: "辆车",
    minPrice: "每日最低租金",
    maxPrice: "每日最高租金",
    emptyTitle: "没有符合条件的车辆",
    emptyText: "请尝试放宽价格区间，或取消车身类型的筛选。",
  },

  card: {
    seats: "座",
    perDay: "/ 天",
    book: "立即预订",
    unavailable: "暂不可租",
  },

  contact: {
    call: "拨打电话",
    wechatTitle: "微信",
    wechatText: "用微信扫描二维码即可与我们联系。",
  },

  footer: {
    about: "哈萨克斯坦阿拉木图租车服务",
    address: "阿拉木图市阿乌埃佐夫街 145V 号",
    mapTitle: "我们的位置",
    carsHeading: "车型",
    infoHeading: "相关信息",
    contactHeading: "联系方式",
    support: "全天候客服",
    info: {
      conditions: "租车条款",
      delivery: "送车服务",
      about: "关于我们",
    },
    photoCredit: "风景照片",
    rights: "版权所有。",
  },

  langModal: {
    title: "请选择语言",
    subtitle: "您随时可以在菜单中更改。",
  },

  common: {
    menu: "菜单",
    close: "关闭",
    previous: "上一个",
    next: "下一个",
  },
};

export default zh;
