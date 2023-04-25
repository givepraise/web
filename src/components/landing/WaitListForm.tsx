import React, { ChangeEvent, FormEvent, useState } from 'react'
import {
  faEnvelope,
  faHome,
  faLink,
  faSpinner,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

import { Button } from '../ui/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormInput } from '../ui/form/FormInput'
import { WaitlistFormData } from '@/types/waitlistFormData.type'

interface Errors {
  company?: string
  website?: string
  firstname?: string
  email?: string
}

const WaitlistForm: React.FC = () => {
  const [formData, setFormData] = useState<WaitlistFormData>({
    company: '',
    website: '',
    firstname: '',
    email: '',
  })

  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    const errors: Errors = {}

    if (!formData.company || formData.company.trim() === '') {
      errors.company = 'Company is required'
    }

    if (!formData.website || formData.website.trim() === '') {
      errors.website = 'Website is required'
    }

    if (!formData.firstname || formData.firstname.trim() === '') {
      errors.firstname = 'Firstname is required'
    }

    if (!formData.email || formData.email.trim() === '') {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is not valid'
    }

    return errors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }

    setSubmitting(true)
    try {
      await fetch('/api/join-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
        }),
      }).then((res) => res.json())

      setSubmitting(false)
      setSubmitted(true)
    } catch (error: any) {
      setErrors(error.response.data)
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <div className="mb-4 text-lg">
        <div className="relative w-full">
          <div className="flex items-center">
            <span className="mr-2 pb-1">
              <FontAwesomeIcon icon={faHome} />
            </span>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Community name"
              className="w-full rounded-none border-none border-transparent bg-transparent px-0 py-2 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-0"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full border-b border-gray-400 " />
        </div>
        {errors.company && (
          <p className="text-xs text-red-500">{errors.company}</p>
        )}
      </div>
      <div className="mb-4">
        <div className="relative w-full">
          <div className="flex items-center">
            <span className="mr-2 pb-1">
              <FontAwesomeIcon icon={faLink} />
            </span>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Link to your community"
              className="w-full rounded-none border-none border-transparent bg-transparent px-0 py-2 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-0"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full border-b border-gray-400 " />
        </div>
        {errors.website && (
          <p className="text-xs text-red-500">{errors.website}</p>
        )}
      </div>
      <div className="mb-4">
        <div className="relative w-full">
          <div className="flex items-center">
            <span className="mr-2 pb-1">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Contact name"
              className="w-full rounded-none border-none border-transparent bg-transparent px-0 py-2 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-0"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full border-b border-gray-400 " />
        </div>
        {errors.firstname && (
          <p className="text-xs text-red-500">{errors.firstname}</p>
        )}
      </div>
      <div className="mb-4">
        <div className="relative w-full">
          <div className="flex items-center">
            <span className="mr-2 pb-1">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Contact email"
              className="w-full rounded-none border-none border-transparent bg-transparent px-0 py-2 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-0"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full border-b border-gray-400 " />
        </div>
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={submitting}
          className="button button--secondary button--lg mt-5">
          {submitting ? (
            <>
              Submitting <FontAwesomeIcon icon={faSpinner} spin />
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </div>
      {typeof errors === 'string' && (
        <div className="mt-5 flex justify-center">
          <div className="text-xs text-red-500">{errors}</div>
        </div>
      )}
      {submitted && (
        <div className="mt-5 flex justify-center">
          <div className="">✅ Thanks for submitting your community!</div>
        </div>
      )}
    </form>
  )
}

export default WaitlistForm
