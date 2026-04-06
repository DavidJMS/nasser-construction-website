import { Data } from '@generated/data'
import { sileo } from 'sileo'
import { ReactElement, useEffect } from 'react'

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  useEffect(() => {
    if (children.props.flash.error) {
      sileo.error({ title: children.props.flash.error })
    }
    if (children.props.flash.success) {
      sileo.success({ title: children.props.flash.success })
    }
  })

  return <>{children}</>
}
