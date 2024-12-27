import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PokeRogue Live - 포켓몬 목록',
  description:
    '포켓몬 목록을 확인할 수 있는 페이지입니다. 포켓몬 기본정보, 진화정보, 기술정보를 확인할 수 있습니다. 자유롭게 포켓몬을 검색해서 확인해보세요.',
  keywords: [
    '포켓몬',
    'PokeRogue',
    '포켓몬 알기술',
    '포켓몬 능력치',
    '포켓몬 정보',
    '포켓몬 도감',
    'PokeRogue Live',
    'pokemon',
    '포켓몬 검색',
  ],
  authors: [{ name: 'hanbin choi' }],
  openGraph: {
    title: 'PokeRogue Live - 포켓몬 목록',
    description:
      '포켓몬 목록을 확인할 수 있는 페이지입니다. 포켓몬 기본정보, 진화정보, 기술정보를 확인할 수 있습니다. 자유롭게 포켓몬을 검색해서 확인해보세요.',
    url: 'https://pokerogue-live.vercel.app/pokemon',
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
    title: 'PokeRogue Live - 포켓몬 목록',
    description: '포켓몬 목록을 확인할 수 있는 페이지입니다.',
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
