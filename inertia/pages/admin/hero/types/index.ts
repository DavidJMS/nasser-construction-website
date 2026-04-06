export interface Hero {
  id: number
  badge: string | null
  title: string | null
  description: string | null
  primaryButtonText: string | null
  primaryButtonLink: string | null
  secondaryButtonText: string | null
  secondaryButtonLink: string | null
  statsText: string | null
  image1: string | null
  image2: string | null
  image3: string | null
}

export interface HeroProps {
  hero: Hero
}
