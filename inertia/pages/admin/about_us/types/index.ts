export interface AboutUsFeature {
  id: number
  title: string | null
  description: string | null
  icon: string | null
  order: number | null
}

export interface AboutUsData {
  id: number
  categoryTag: string | null
  titleMain: string | null
  titleHighlight: string | null
  titleSuffix: string | null
  description: string | null
  image1: string | null
  image2: string | null
  buttonText: string | null
  buttonLink: string | null
  features: AboutUsFeature[]
}

export interface AboutUsProps {
  aboutUs: AboutUsData
}
