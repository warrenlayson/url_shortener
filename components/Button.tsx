import classNames from 'classnames'
import React, { ButtonHTMLAttributes } from 'react'
import { FaCircleNotch } from 'react-icons/fa'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
}

export const Button = ({
  loadingText,
  isLoading,
  className,
  children,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(
        'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white border border-transparent rounded-md focus:outline-none font-medium px-4 py-2',
        className,
        isLoading
          ? 'flex items-center gap-2 cursor-not-allowed'
          : 'cursor-pointer'
      )}
      {...props}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <FaCircleNotch className="block animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  )
}
