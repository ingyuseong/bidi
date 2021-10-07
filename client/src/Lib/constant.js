// export const SERVER_URL = 'http://127.0.0.1:3000/api';
export const SERVER_URL = 'http://13.125.215.51/api';

export const APP_VERSION = 'v1.0.0';

export const STORAGE_KEY = 'user';
export const LOCATION_STORAGE_KEY = 'location';
export const CURRENT_LOCATION_STORAGE_KEY = 'current_location';
export const SHOP_EXTRA_INFO_LIST = [
  '주차 가능',
  'wifi 제공',
  '음료/간식',
  '반려견 동반가능',
  '공유 헤어샵',
  '남성 전문',
  '여성 전문',
  '유아전용의자',
  '대중교통 용이',
  '심야 영업',
  '클리닉 가능',
];

export const GENDER_TYPE = [
  { label: '남성', value: 'male', key: '13' },
  { label: '여성', value: 'female', key: '14' },
];

export const START_TIME_LIST = [
  { label: '9:00', value: '9' },
  { label: '9:30', value: '9.5' },
  { label: '10:00', value: '10' },
  { label: '10:30', value: '10.5' },
  { label: '11:00', value: '11' },
  { label: '11:30', value: '11.5' },
  { label: '12:00', value: '12' },
  { label: '12:30', value: '12.5' },
  { label: '13:00', value: '13' },
  { label: '13:30', value: '13.5' },
  { label: '14:00', value: '14' },
  { label: '14:30', value: '14.5' },
];
export const END_TIME_LIST = [
  { label: '15:00', value: '15' },
  { label: '15:30', value: '15.5' },
  { label: '16:00', value: '16' },
  { label: '16:30', value: '16.5' },
  { label: '17:00', value: '17' },
  { label: '17:30', value: '17.5' },
  { label: '18:00', value: '18' },
  { label: '18:30', value: '18.5' },
  { label: '19:00', value: '19' },
  { label: '19:30', value: '19.5' },
  { label: '20:00', value: '20' },
  { label: '20:30', value: '20.5' },
  { label: '21:00', value: '21' },
  { label: '21:30', value: '21.5' },
  { label: '22:00', value: '22' },
  { label: '22:30', value: '22.5' },
];

export const LENGTH_TYPE = [
  { label: '롱', value: 'long', key: '1' },
  { label: '미디엄', value: 'medium', key: '2' },
  { label: '단발', value: 'short', key: '3' },
];

export const STYLE_TYPE = {
  미선택: [{ label: '미선택', value: '미선택', key: '0' }],
  long: [
    { label: '커트', value: 'cut', key: '4' },
    { label: '파마', value: 'perm', key: '5' },
    { label: '염색', value: 'color', key: '6' },
  ],
  medium: [
    { label: '커트', value: 'cut', key: '7' },
    { label: '파마', value: 'perm', key: '8' },
    { label: '염색', value: 'color', key: '9' },
  ],
  short: [
    { label: '커트', value: 'cut', key: '10' },
    { label: '파마', value: 'perm', key: '11' },
    { label: '염색', value: 'color', key: '12' },
  ],
};

export const DISTANCE_CATEGORY = [
  { label: '1km 이내', value: '1', key: 1 },
  { label: '3km 이내', value: '3', key: 2 },
  { label: '5km 이내', value: '5', key: 3 },
];

export const DATE_SKELETON = [
  {
    id: 0,
    selected: false,
  },
  {
    id: 1,
    selected: false,
  },
  {
    id: 2,
    selected: false,
  },
  {
    id: 3,
    selected: false,
  },
  {
    id: 4,
    selected: false,
  },
  {
    id: 5,
    selected: false,
  },
  {
    id: 6,
    selected: false,
  },
  {
    id: 7,
    selected: false,
  },
  {
    id: 8,
    selected: false,
  },
  {
    id: 9,
    selected: false,
  },
  {
    id: 10,
    selected: false,
  },
  {
    id: 11,
    selected: false,
  },
  {
    id: 12,
    selected: false,
  },
  {
    id: 13,
    selected: false,
  },
];

export const KEYWORDS = [
  {
    id: 0,
    icon: '💰 ',
    title: '합리적인 가격',
    selected: false,
  },
  {
    id: 1,
    icon: '✂️ ',
    title: '똑같이 해주세요!',
    selected: false,
  },
  {
    id: 2,
    icon: '😎 ',
    title: '경력자 찾아요',
    selected: false,
  },
  {
    id: 3,
    icon: '⏰ ',
    title: '시간약속 잘 지켜주세요',
    selected: false,
  },
  {
    id: 4,
    icon: '👌 ',
    title: '저에게 어울리는 다른 스타일도 괜찮아요',
    selected: false,
  },
];

export const STYLE_INFO = {
  male: [
    {
      id: 'style01',
      styleName: '스타일',
    },
    {
      id: 'style02',
      styleName: '스타일',
    },
    {
      id: 'style03',
      styleName: '스타일',
    },
    {
      id: 'style04',
      styleName: '볼륨매직',
    },
    {
      id: 'style05',
      styleName: '볼륨매직',
    },
    {
      id: 'style06',
      styleName: '볼륨매직',
    },
    {
      id: 'style07',
      styleName: '볼륨매직',
    },
    {
      id: 'style08',
      styleName: '볼륨매직',
    },
    {
      id: 'style09',
      styleName: '볼륨매직',
    },
    {
      id: 'style10',
      styleName: '볼륨매직',
    },
    {
      id: 'style11',
      styleName: '볼륨매직',
    },
    {
      id: 'style12',
      styleName: '볼륨매직',
    },
    {
      id: 'style13',
      styleName: '볼륨매직',
    },
    {
      id: 'style14',
      styleName: '볼륨매직',
    },
    {
      id: 'style15',
      styleName: '볼륨매직',
    },
    {
      id: 'style16',
      styleName: '볼륨매직',
    },
    {
      id: 'style17',
      styleName: '볼륨매직',
    },
    {
      id: 'style18',
      styleName: '볼륨매직',
    },
    {
      id: 'style19',
      styleName: '볼륨매직',
    },
    {
      id: 'style20',
      styleName: '볼륨매직',
    },
    {
      id: 'style21',
      styleName: '볼륨매직',
    },
    {
      id: 'style22',
      styleName: '볼륨매직',
    },
    {
      id: 'style23',
      styleName: '볼륨매직',
    },
    {
      id: 'style24',
      styleName: '볼륨매직',
    },
    {
      id: 'style25',
      styleName: '볼륨매직',
    },
    {
      id: 'style26',
      styleName: '볼륨매직',
    },
    {
      id: 'style27',
      styleName: '볼륨매직',
    },
    {
      id: 'style28',
      styleName: '볼륨매직',
    },
    {
      id: 'style29',
      styleName: '볼륨매직',
    },
    {
      id: 'style30',
      styleName: '볼륨매직',
    },
    {
      id: 'style31',
      styleName: '볼륨매직',
    },
  ],
  female: [
    {
      id: 'style26',
      styleName: '올림머리',
    },
    {
      id: 'style14',
      styleName: '볼륨매직',
    },
    {
      id: 'style02',
      styleName: '웨이브펌',
    },
    {
      id: 'style03',
      styleName: '아이롱펌',
    },
    {
      id: 'style04',
      styleName: '라이트브라운',
    },
    {
      id: 'style05',
      styleName: '볼륨매직',
    },
    {
      id: 'style06',
      styleName: '숏컷',
    },
    {
      id: 'style07',
      styleName: '금발헤어',
    },
    {
      id: 'style08',
      styleName: '볼륨매직',
    },
    {
      id: 'style09',
      styleName: '볼륨매직',
    },
    {
      id: 'style10',
      styleName: '볼륨매직',
    },
    {
      id: 'style11',
      styleName: '볼륨매직',
    },
    {
      id: 'style12',
      styleName: '볼륨매직',
    },
    {
      id: 'style13',
      styleName: '볼륨매직',
    },
    {
      id: 'style15',
      styleName: '볼륨매직',
    },
    {
      id: 'style16',
      styleName: '볼륨매직',
    },
    {
      id: 'style17',
      styleName: '볼륨매직',
    },
    {
      id: 'style18',
      styleName: '볼륨매직',
    },
    {
      id: 'style19',
      styleName: '볼륨매직',
    },
    {
      id: 'style20',
      styleName: '볼륨매직',
    },
    {
      id: 'style21',
      styleName: '볼륨매직',
    },
    {
      id: 'style22',
      styleName: '볼륨매직',
    },
    {
      id: 'style23',
      styleName: '볼륨매직',
    },
    {
      id: 'style24',
      styleName: '볼륨매직',
    },
    {
      id: 'style25',
      styleName: '볼륨매직',
    },
    {
      id: 'style27',
      styleName: '볼륨매직',
    },
    {
      id: 'style28',
      styleName: '볼륨매직',
    },
    {
      id: 'style29',
      styleName: '볼륨매직',
    },
    {
      id: 'style30',
      styleName: '볼륨매직',
    },
    {
      id: 'style31',
      styleName: '볼륨매직',
    },
    {
      id: 'style01',
      styleName: '짧은머리 c컬펌',
    },
  ],
};
