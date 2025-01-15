import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PokeRogue Live - 타입 계산기',
  description:
    '각 타입의 상성을 방어, 공격 상황에 맞게 계산해볼 수 있는 페이지입니다. 타입 뿐 아니라 특성, 기술 등을 체크하여 다양한 상황을 시뮬레이션 할 수 있습니다.',
  keywords: [
    '포켓몬',
    'PokeRogue',
    '포켓몬 알기술',
    '포켓몬 능력치',
    '포켓몬 정보',
    '포켓몬 도감',
    'PokeRogue Live',
    'pokemon',
    '포켓몬 타입',
    '타입 상성',
    '공격 타입',
    '방어 타입',
  ],
  authors: [{ name: 'hanbin choi' }],
  openGraph: {
    title: 'PokeRogue Live - 타입 계산기',
    description:
      '각 타입의 상성을 방어, 공격 상황에 맞게 계산해볼 수 있는 페이지입니다. 타입 뿐 아니라 특성, 기술 등을 체크하여 다양한 상황을 시뮬레이션 할 수 있습니다.',
    url: 'https://pokerogue-live.vercel.app/type-calculator',
    siteName: 'PokeRogue Live',
    images: [
      {
        url: '/assets/img/logo.png',
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
    title: 'PokeRogue Live - 타입 계산기!',
    description:
      '각 타입의 상성을 방어, 공격 상황에 맞게 계산해볼 수 있는 페이지입니다.',
    images: ['/assets/img/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
