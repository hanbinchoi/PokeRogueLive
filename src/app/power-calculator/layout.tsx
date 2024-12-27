import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PokeRogue Live - 기술 위력 계산기',
  description:
    '기술의 위력을 계산할 수 있는 페이지입니다. 공격, 방어 포켓몬을 설정하여 주어진 상황에 맞추어 시뮬레이션을 할 수 있습니다.',
  keywords: [
    '포켓몬',
    'PokeRogue',
    '포켓몬 능력치',
    '포켓몬 정보',
    '포켓몬 도감',
    'PokeRogue Live',
    'pokemon',
    '기술 위력',
    '포켓몬 배틀 시뮬레이터',
  ],
  authors: [{ name: 'hanbin choi' }],
  openGraph: {
    title: 'PokeRogue Live - 기술 위력 계산기',
    description:
      '기술의 위력을 계산할 수 있는 페이지입니다. 공격, 방어 포켓몬을 설정하여 주어진 상황에 맞추어 시뮬레이션을 할 수 있습니다.',
    url: 'https://pokerogue-live.vercel.app/power-calculator',
    siteName: 'PokeRogue Live',
    images: [
      {
        url: '/Users/choehanbin/Desktop/project/poke_rogue_live/public/assets/img/logo.png',
        width: 1200,
        height: 630,
        alt: 'PokeRogue Live 썸네일 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PokeRogue Live - 기술 위력 계산기',
    description: '기술의 위력을 계산할 수 있는 페이지입니다.',
    images: ['public/assets/img/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: 'public/assets/img/icon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
