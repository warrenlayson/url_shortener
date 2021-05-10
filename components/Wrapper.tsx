import React, { PropsWithChildren } from 'react'

type WrapperProps = PropsWithChildren<{}>

export const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return (
    <div className="max-w-5xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
