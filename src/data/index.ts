import generated from './faceit.generated.json';

export const PLAYERS = [
  {nick:'yagagarin',name:'Тимофей Тараканов',role:'Капитан · IGL',city:'Санкт-Петербург',country:'RU',age:24,birth:'08.03.2002',elo:3096,photo:'/players/yagagarin.jpg',setup:{mouse:'Logitech G Pro',keyboard:'AULA F75',headset:'HyperX Cloud II'},socials:{faceit:'faceit.com/ru/players/yagagarin',steam:'steamcommunity.com/profiles/76561199056218358',telegram:'t.me/yagagarin52'}},
  {nick:'ksolter',name:'Сергей Хожемпо',role:'Рифлер',city:'Минск',country:'BY',age:21,birth:'14.06.2004',elo:3978,photo:'/players/ksolter.jpg',setup:{mouse:'Logitech G Pro X Superlight 2',keyboard:'Razer Blackwidow V3',headset:'HyperX Cloud II'},socials:{faceit:'faceit.com/ru/players/ksolter',steam:'steamcommunity.com/id/dev1lmice',telegram:'t.me/ksolterr',twitch:'twitch.tv/ksolter'}},
  {nick:'rioeagle',name:'Илья Кузнецов',role:'Рифлер',city:'Брянск',country:'RU',age:22,birth:'02.11.2003',elo:3557,photo:'/players/rioeagle.jpg',setup:{mouse:'WLMOUSE Beast X 8K',keyboard:'LUMINKEY Magger 68 HE Pro',headset:'Simgot EM6L'},socials:{faceit:'faceit.com/ru/players/rioeagle',steam:'steamcommunity.com/id/rioeagle',telegram:'t.me/rioeagle',twitch:'twitch.tv/rioeagle'}},
  {nick:'vova-triceps',name:'Владимир Митрофанов',role:'AWPer',city:'Москва',country:'RU',age:19,birth:'19.09.2006',elo:2864,photo:'/players/vova-triceps.jpg',setup:{mouse:'Logitech G Pro X Superlight 2',keyboard:'LUMINKEY Magger 68 HE Ultra',headset:'HyperX Cloud II'},socials:{faceit:'faceit.com/ru/players/vova-triceps',steam:'steamcommunity.com/profiles/76561198023991145',telegram:'t.me/WWtriceps',twitch:'twitch.tv/vovatriceps'}},
  {nick:'cartilag',name:'Алексей Хлебосолов',role:'Рифлер',city:'Вологда',country:'RU',age:19,birth:'27.01.2007',elo:4166,photo:'/players/cartilag.png',setup:{mouse:'Logitech G Pro X Superlight 2',keyboard:'Aula F75',headset:'Logitech Pro X'},socials:{faceit:'faceit.com/ru/players/cartilag/cs2',steam:'steamcommunity.com/id/Cartilag',twitch:'twitch.tv/cyrtilag'}},
];

export const COACH = {
  nick:'RuFire',name:'Алексей Бирюков',role:'Тренер · Head Coach',city:'Денпасар',country:'ID',age:30,birth:'—',
  photo:'/players/rufire.jpg',
  badge:{lbl:'ROLE',value:'COACH'},
  stats:[{v:'3',k:'Сезона у руля'},{v:'68%',k:'Винрейт сезона'},{v:'14',k:'LAN ивентов'}],
  setup:{mouse:'Zowie FK1',keyboard:'HyperX Alloy FPS',headset:'Logitech G435'},
  socials:{faceit:'faceit.com/ru/players/RuFire',steam:'steamcommunity.com/id/rufire',twitch:'twitch.tv/rufire'},
};

export const CASTER = {
  nick:'Julyen',name:'Евгений Попов',role:'Комментатор · Менеджер',city:'Севастополь',country:'RU',age:23,birth:'—',
  photo:'https://sun9-11.userapi.com/s/v1/ig2/Gmz1f_fXZolczpTiqNaQiP7t-D3VlS15bQTF5D7Q18in_IgDAGxYOuBCG7FKvmka8XRn0dB-6ff7tg4XgZNYsWo1.jpg?quality=95&as=32x43,48x64,72x96,108x144,160x214,240x320,360x480,480x641,540x721,640x854,720x961,959x1280&from=bu&u=VFMMcDuxFahQfh5FY84i1PmwXxZwRLGGB9PdNPj7erQ&cs=959x0',
  badge:{lbl:'ROLE',value:'CAST'},
  stats:[{v:'2',k:'Сезона в команде'},{v:'50+',k:'Матчей озвучено'},{v:'8',k:'LAN ивентов'}],
  setup:{mouse:'Glorious Model D-',keyboard:'Ardor Blade Pro',headset:'JBL T110'},
  socials:{faceit:'faceit.com/ru/players/Julyen',steam:'steamcommunity.com/profiles/76561198375417252'},
};

export const STAFF = [COACH, CASTER];
export type StaffMember = typeof COACH;

export const FLAGS: Record<string, string> = {
  RU: `<svg viewBox="0 0 9 6"><rect width="9" height="2" fill="#fff"/><rect y="2" width="9" height="2" fill="#0039A6"/><rect y="4" width="9" height="2" fill="#D52B1E"/></svg>`,
  BY: `<svg viewBox="0 0 9 6"><rect width="9" height="4" fill="#CE1720"/><rect y="4" width="9" height="2" fill="#4AA657"/></svg>`,
  ID: `<svg viewBox="0 0 9 6"><rect width="9" height="3" fill="#FF0000"/><rect y="3" width="9" height="3" fill="#fff"/></svg>`,
};

export const SILHOUETTE = `<svg viewBox="0 0 200 360" fill="currentColor" style="color:rgba(255,255,255,.55)">
<circle cx="100" cy="60" r="32"/>
<path d="M55 105 Q55 95 70 92 L130 92 Q145 95 145 105 L150 180 Q150 190 145 195 L150 280 L138 360 L62 360 L50 280 L55 195 Q50 190 50 180 Z"/>
<path d="M40 130 L50 200 L40 260 L30 200 Z" opacity=".7"/>
<path d="M160 130 L170 200 L160 260 L150 200 Z" opacity=".7"/>
<rect x="40" y="160" width="120" height="6" fill="#F5333F" opacity=".8"/>
<rect x="120" y="155" width="40" height="16" fill="#F5333F" opacity=".7"/>
<rect x="60" y="158" width="6" height="14" fill="#0a0a0b"/>
</svg>`;

export type Match = {
  date: string;
  tour: string;
  opp: string;
  oppShort: string;
  oppLogo?: string;
  maps: { name: string; score: string; win: boolean }[];
  result: string;
  win: boolean;
};

export type Standing = {
  pos: number;
  team: string;
  tag: string;
  logo?: string;
  w: number;
  l: number;
  rd: string;
  pts: number;
  us: boolean;
};

export type Season = {
  id: string;
  short: string;
  label: string;
  name: string;
  current: boolean;
  standings: Standing[];
  matches: Match[];
};

export type TeamStats = {
  totalMatches: number;
  wins: number;
  losses: number;
  winRate: number;
  longestStreak: number;
  currentStreak: number;
  recent: boolean[];
  kd: string;
  kr: string;
  hsPerMatch: number;
  hsPercent: number;
  entryRate: number;
  entrySuccess: number;
  clutch1v1: number;
  clutch1v2: number;
  flashSuccess: number;
  utilDmgPerRound: number;
  sniperKillRate: number;
};

export type MapStat = {
  label: string;
  short: string;
  matches: number;
  wins: number;
  winRate: number;
};

export const STATS: TeamStats = generated.team;

export const MAPS: MapStat[] = generated.maps;

export const SEASONS: Season[] = generated.seasons;

export const MATCHES: Match[] = SEASONS.flatMap(s => s.matches);

export const STANDINGS: Standing[] = (SEASONS.find(s => s.current) || SEASONS[0]).standings;

export const FACEIT_UPDATED_AT: string = generated.updatedAt;

export const STREAMS = [
  {nick:'ksolter',live:true,viewers:1284,title:'FACEIT LVL 10 · ROAD TO 4K ELO',game:'Counter-Strike 2'},
  {nick:'cartilag',live:true,viewers:892,title:'РАНКЕД · MR12 GRIND',game:'Counter-Strike 2'},
  {nick:'rioeagle',live:false,title:'OFFLINE · BACK SOON'},
  {nick:'vova-triceps',live:false,title:'OFFLINE'},
  {nick:'rufire',live:false,title:'OFFLINE · COACHING SESSIONS'},
];

export type PlayerClip = {
  id: string;
  title: string;
  map: string;
  dur: string;
  tag: string;
  vs: string;
  date: string;
};

export const PLAYER_CLIPS: Record<string, PlayerClip[]> = {
  yagagarin: [
    { id: 'yag-01', title: 'Тайм-аут на 14:14 — IGL-разводка', map: 'Inferno', dur: '0:38', tag: 'TACTICS', vs: 'vs forZe', date: '12.03.26' },
    { id: 'yag-02', title: 'Smoke-line на B + retake 1v2', map: 'Mirage',  dur: '0:27', tag: 'CLUTCH',  vs: 'vs Astralis', date: '02.02.26' },
    { id: 'yag-03', title: 'Anti-eco read и тройник из CT',  map: 'Anubis',  dur: '0:19', tag: 'AIM',     vs: 'vs BetBoom', date: '21.01.26' },
  ],
  ksolter: [
    { id: 'kso-01', title: '1v5 ACE на B-плантe',           map: 'Mirage',  dur: '0:42', tag: 'ACE',     vs: 'vs Astralis', date: '08.03.26' },
    { id: 'kso-02', title: 'Spray-transfer через дым',      map: 'Nuke',    dur: '0:21', tag: 'AIM',     vs: 'vs Vitality', date: '17.02.26' },
    { id: 'kso-03', title: 'Quad на ретейке нижки',         map: 'Inferno', dur: '0:33', tag: 'MULTI',   vs: 'vs HEROIC',   date: '04.01.26' },
  ],
  rioeagle: [
    { id: 'rio-01', title: 'Flash-assist + entry на A',      map: 'Anubis',  dur: '0:24', tag: 'ENTRY',   vs: 'vs forZe',    date: '19.03.26' },
    { id: 'rio-02', title: 'Wallbang через короткий',        map: 'Inferno', dur: '0:14', tag: 'WALLBANG',vs: 'vs MOUZ',     date: '11.02.26' },
    { id: 'rio-03', title: 'Пять открытых на pistol',        map: 'Mirage',  dur: '0:36', tag: 'PISTOL',  vs: 'vs Cloud9',   date: '28.01.26' },
  ],
  'vova-triceps': [
    { id: 'vov-01', title: 'No-scope triple через окно',     map: 'Mirage',  dur: '0:18', tag: 'AWP',     vs: 'vs Astralis', date: '06.03.26' },
    { id: 'vov-02', title: 'Клатч 1v3 на B с AWP',           map: 'Inferno', dur: '0:31', tag: 'CLUTCH',  vs: 'vs FaZe',     date: '22.02.26' },
    { id: 'vov-03', title: 'OT-раунд: hold + flick',         map: 'Nuke',    dur: '0:55', tag: 'AWP',     vs: 'vs G2',       date: '14.01.26' },
  ],
  cartilag: [
    { id: 'car-01', title: 'Eco-round comeback четверкой',   map: 'Mirage',  dur: '0:31', tag: 'ECO',     vs: 'vs MOUZ',     date: '05.03.26' },
    { id: 'car-02', title: 'B-site clutch 1v3',              map: 'Anubis',  dur: '0:24', tag: 'CLUTCH',  vs: 'vs Vitality', date: '23.02.26' },
    { id: 'car-03', title: 'Header-spam HS×4',               map: 'Inferno', dur: '0:22', tag: 'HEADSHOT',vs: 'vs forZe',    date: '08.01.26' },
  ],
};

export const EPISODES = [
  {yt:'MgitXSzCCEs',title:'1v5 ACE on Mirage\nksolter · vs Astralis',label:'TOP CLIP',dur:'0:42',big:true,pilot:true},
  {yt:'Ob7psrQXWxo',title:'AWP no-scope triple',label:'CLIP 01',dur:'0:18',big:false,pilot:false},
  {yt:'C_PVHjeIzo8',title:'Eco round comeback',label:'CLIP 02',dur:'0:31',big:false,pilot:false},
  {yt:'d8XTy550B8s',title:'B-site clutch 1v3',label:'CLIP 03',dur:'0:24',big:false,pilot:false},
  {yt:'3lu3lu8ErpI',title:'OT round to win Major',label:'CLIP 04',dur:'0:55',big:false,pilot:false},
];

export const FORM: { win: boolean; h: number }[] = (() => {
  const recent = MATCHES.slice(0, 10).reverse();
  const winHeights = [62, 78, 70, 84, 66, 76];
  const lossHeights = [38, 46, 34, 42, 50, 36];
  let wi = 0, li = 0;
  return recent.map(m => {
    if (m.win) {
      const h = winHeights[wi % winHeights.length];
      wi++;
      return { win: true, h };
    }
    const h = lossHeights[li % lossHeights.length];
    li++;
    return { win: false, h };
  });
})();

export const FORM_W = FORM.filter(f => f.win).length;
export const FORM_L = FORM.length - FORM_W;
