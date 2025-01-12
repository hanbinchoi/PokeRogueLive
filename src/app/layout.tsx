import '../styles/globals.css';

import type { Metadata } from 'next';

import ReactQueryProviders from '@/hooks/useReactQuery';

import { Header, Sidebar } from '@/components/common';

import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PokeRogue Live - 포켓몬 정보를 한눈에 확인하세요!',
  description:
    'PokeRogue Live는 포켓몬의 능력치, 기술, 알기술, 도감 번호 등 다양한 정보를 실시간으로 확인할 수 있는 플랫폼입니다. 포켓몬 정보 뿐 아니라 기술 위력, 타입 상성을 손쉽게 확인해보세요.',
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
    '기술 위력',
  ],
  authors: [{ name: 'hanbin choi' }],
  openGraph: {
    title: 'PokeRogue Live - 포켓몬 정보를 한눈에 확인하세요!',
    description:
      'PokeRogue Live는 포켓몬의 능력치, 기술, 알기술, 도감 번호 등 다양한 정보를 실시간으로 확인할 수 있는 플랫폼입니다. 포켓몬 정보 뿐 아니라 기술 위력, 타입 상성을 손쉽게 확인해보세요.',
    url: 'https://pokerogue-live.vercel.app/',
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
    title: 'PokeRogue Live - 포켓몬 정보를 한눈에 확인하세요!',
    description:
      '포켓몬 능력치, 타입 상성, 기술 위력을 실시간으로 확인할 수 있는 포켓몬 트레이너의 필수 도구!',
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
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <ReactQueryProviders>
          <div className="min-h-screen w-screen flex flex-col">
            <Header />
            <div className="grow grid md:grid-cols-[1fr_6fr] lg:grid-cols-[1fr_5fr] ">
              <Sidebar className="hidden md:flex flex-col gap-4" />
              {children}
            </div>
          </div>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
