import {
  FaCheckCircle,
  FaDiscord,
  FaEnvelope,
  FaUser,
  FaUsers,
} from 'react-icons/fa'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formDataState, guildOptionsState } from '@/services/form'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { Button } from '../Button'
import { EthAccount } from '../account/EthAccount'
import { FormData } from '@/types/formData.type'
import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'
import { communityState } from '@/services/community'
import { toast } from 'react-hot-toast'
import { useAccount } from 'wagmi'
import { useRecoilState } from 'recoil'
import { DISCORD_MANAGE_GUILDS_PERMISSION } from '@/utils/config'
import { LoaderSpinner } from '../LoaderSpinner'
import useDebounce from '@/utils/debounce'

interface SaveCommunityErrors {
  name?: { message: string } | null
  email?: { message: string } | null
  owners?: { message: string } | null
  discordGuildId?: { message: string } | null
}

const Form = () => {
  const { data: session } = useSession()
  const { address, isConnected } = useAccount()

  const [formData, setFormData] = useRecoilState(formDataState)
  const [submitting, setSubmitting] = useState(false)
  const [guildOptions, setGuildOptions] = useRecoilState(guildOptionsState)
  const [community, setCommunity] = useRecoilState(communityState)
  const [formErrors, setFormErrors] = useState<SaveCommunityErrors>({
    name: null,
    email: null,
    owners: null,
    discordGuildId: null,
  })
  const [nameLoading, setNameLoading] = useState(false)
  const [nameAvailable, setNameAvailable] = useState(false)

  const debouncedName = useDebounce({
    value: formData.name,
    delay: 3000,
    setIsLoading: setNameLoading,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: formData,
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isConnected && address) {
      setSubmitting(true)
      setFormData(data)

      try {
        const response = await fetch('/api/save-community', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data,
            address,
          }),
        }).then((res) => res.json())

        if (response.statusCode && response.statusCode === 400) {
          setFormErrors(response.errors)
          setSubmitting(false)
          toast.error('There was an error submitting the form')
        } else if (response.error) {
          const errorMessage =
            response.message && Array.isArray(response.message)
              ? response.message.join(', ')
              : response.message
          toast.error(errorMessage)
          setSubmitting(false)
        } else {
          reset()
          setSubmitting(false)

          setCommunity({
            name: response.name,
            hostname: response.hostname,
            guildId: data.discordGuildId as any,
          })

          setFormData({
            name: '',
            email: '',
            owners: '',
            discordGuildId: '',
          })
        }
      } catch (error) {
        console.error(error)
        toast.error('There was an error submitting the form')
        setSubmitting(false)
      }
    } else {
      toast.error('Please connect your wallet before you submit the form')
    }
  }

  useEffect(() => {
    const fetchGuilds = async () => {
      if (!session?.accessToken) {
        return
      }

      try {
        const data = await fetch(
          `/api/fetch-discord-guilds?accessToken=${session.accessToken}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then((res) => res.json())

        if (data && data.length > 0) {
          const guildOptions = data
            .filter((guild: any) => {
              return guild.permissions === DISCORD_MANAGE_GUILDS_PERMISSION
            })
            .map((guild: any) => {
              return {
                value: guild.id,
                label: guild.name,
              }
            })

          setGuildOptions(guildOptions)

          toast.success('Discord guilds fetched successfully')
        } else if (data.message && data.message === '401: Unauthorized') {
          toast.error('Your Discord token has expired')
          await signOut()
        }
      } catch (error) {
        console.error(error)
        toast.error('There was an error fetching your Discord guilds')
        await signOut()
      }
    }

    if (guildOptions.length === 0 && session?.accessToken) {
      fetchGuilds()
    }
  }, [session, guildOptions, setGuildOptions])

  const handleSelectClick = () => {
    if (!session?.accessToken) {
      return signIn('discord')
    }
  }

  useEffect(() => {
    const isNameAvailable = async () => {
      try {
        const response = await fetch(
          `/api/community-name?name=${debouncedName}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const data = await response.json()

        if (response.status === 400) {
          toast.error(data.message)
        } else if (!data.available) {
          setFormErrors((formErrors) => ({
            ...formErrors,
            name: { message: 'Name not available' },
          }))
          setNameAvailable(false)
        } else {
          setFormErrors((formErrors) => ({
            ...formErrors,
            name: null,
          }))
          setNameAvailable(true)
        }
      } catch (error) {
        console.error(error)
        toast.error('There was an error fetching name availability')
      }
    }

    if (debouncedName.length > 3) {
      isNameAvailable()
    } else {
      setFormErrors((formErrors) => ({
        ...formErrors,
        name: {
          message: 'Name must be at least 4 characters long',
        },
      }))
    }
  }, [debouncedName, setFormErrors])

  return (
    <div className="black-section">
      <h2>Create Community</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 text-xl text-left">
          <FormInput
            name="name"
            type="text"
            placeholder="Community name (lowercase, numbers, dashes)"
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            register={register}
            validationRules={{
              required: 'This field is required',
              minLength: {
                value: 4,
                message: 'Name must be at least 4 characters long',
              },
              maxLength: {
                value: 30,
                message: 'Name must be at most 30 characters long',
              },
              pattern: {
                value: /^[a-z0-9][a-z0-9_.-]{1,28}[a-z0-9]$/,
                message:
                  'Name must only contain lowercase letters, numbers and dashes',
              },
            }}
            icon={<FaUser />}
            disabled={!isConnected}
          />
          {!nameLoading && formErrors['name'] && (
            <p className="mt-1 text-xs text-red-500">
              {formErrors['name']?.message}
            </p>
          )}
          {!nameLoading && errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
          {!nameLoading && formData.name.length > 3 && nameAvailable && (
            <p className="mt-1 text-xs text-green-600">
              <FaCheckCircle className="" />
              <span className="ml-2">Name available</span>
            </p>
          )}
          {nameLoading && (
            <div className="w-6 mt-3 text-xs">
              <LoaderSpinner />
            </div>
          )}
          <label className="block mt-8 mb-6 font-bold" htmlFor="name">
            Creator
          </label>
          {address ? (
            <div className="flex h-full text-left">
              <EthAccount className="w-36" />
            </div>
          ) : (
            <p>Connect your wallet to set community creator.</p>
          )}
        </div>
        <div className="mb-4 text-xl text-left">
          <label className="block mt-8 mb-6 font-bold text-left" htmlFor="name">
            Owners
          </label>
          <p>
            Owners have administrative access to this Praise instance. Enter one
            or more Ethereum addresses separated by commas.
          </p>

          <FormInput
            name="owners"
            type="text"
            placeholder="0x123, 0x123"
            onChange={(event) =>
              setFormData({ ...formData, owners: event.target.value })
            }
            register={register}
            validationRules={{
              required: 'This field is required',
              validate: {
                areValidEthAddresses: async (value: any) => {
                  const addresses = value.split(',')
                  const regex = /^0x([A-Fa-f0-9]{40})$/

                  for (const address of addresses) {
                    if (!regex.test(address.trim())) {
                      return 'Please enter valid Ethereum addresses'
                    }
                  }

                  return true
                },
                noDuplicates: (value: any) => {
                  const ownersArray = value
                    .split(',')
                    .map((element: string) => element.trim())

                  if (new Set(ownersArray).size !== ownersArray.length) {
                    return 'Owners ETH address should be unique'
                  }
                },
              },
            }}
            icon={<FaUsers />}
            disabled={!isConnected}
          />
          {formErrors['owners'] && (
            <p className="mt-1 text-xs text-red-500">
              {formErrors['owners']?.message}
            </p>
          )}
          {errors.owners && (
            <p className="mt-1 text-xs text-red-500">{errors.owners.message}</p>
          )}
        </div>
        <div className="mb-4 text-xl text-left">
          <label className="block mt-8 mb-6 font-bold" htmlFor="name">
            Email
          </label>
          <p>Where can we reach you for occasional updates?</p>

          <FormInput
            name="email"
            type="email"
            placeholder="Contact email"
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
            register={register}
            validationRules={{
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address',
              },
            }}
            icon={<FaEnvelope />}
            disabled={!isConnected}
          />
          {formErrors['email'] && (
            <p className="mt-1 text-xs text-red-500">
              {formErrors['email']?.message}
            </p>
          )}
        </div>
        <>
          <div className="mb-4 text-left">
            <label className="block mt-8 mb-6 font-bold" htmlFor="name">
              Discord
            </label>
            <p>
              Which Discord server do you want to use Praise in? Discord login
              required
            </p>

            <FormSelect
              name="discordGuildId"
              options={guildOptions}
              register={register}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  discordGuildId: event.target.value,
                })
              }
              onClick={handleSelectClick}
              icon={<FaDiscord />}
              disabled={!isConnected}
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="mt-12 button button--secondary button--lg"
              disabled={submitting || !isConnected}>
              {submitting ? (
                <div className="flex">
                  <LoaderSpinner /> <span className="ml-2">Creating</span>
                </div>
              ) : (
                'Create'
              )}
            </Button>
          </div>
        </>
      </form>
    </div>
  )
}

export default Form
