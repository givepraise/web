import {
  FaCheckCircle,
  FaDiscord,
  FaEnvelope,
  FaSync,
  FaUser,
  FaUsers,
} from 'react-icons/fa'
import { SubmitHandler, set, useForm } from 'react-hook-form'
import { formDataState, guildOptionsState } from '@/services/form'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

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
import { clear } from 'console'

const Form = () => {
  const { data: session } = useSession()
  const { address, isConnected } = useAccount()

  const [formData, setFormData] = useRecoilState(formDataState)
  const [submitting, setSubmitting] = useState(false)
  const [guildOptions, setGuildOptions] = useRecoilState(guildOptionsState)
  const [community, setCommunity] = useRecoilState(communityState)
  const [nameLoading, setNameLoading] = useState(false)
  const [nameAvailable, setNameAvailable] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
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
          if (response.errors) {
            if (response.errors.name) {
              setError('name', {
                message: response.errors.name.message,
              })
            }
            if (response.errors.email) {
              setError('email', {
                message: response.errors.email.message,
              })
            }
            if (response.errors.owners) {
              setError('owners', {
                message: response.errors.owners.message,
              })
            }
            if (response.errors.discordGuildId) {
              setError('discordGuildId', {
                message: response.errors.discordGuildId.message,
              })
            }
          }

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

          setSubmitting(false)
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

  const isFirstRender = useRef(true)

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

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (guildOptions.length === 0 && session?.accessToken) {
      fetchGuilds()
    }
  }, [session, setGuildOptions, guildOptions.length])

  const handleSelectClick = () => {
    if (!session?.accessToken) {
      return signIn('discord')
    }
  }

  useEffect(() => {
    const nameLength = formData.name.length

    if (nameLength > 3) {
      setNameLoading(true)
    } else if (nameLength > 0) {
      setNameLoading(false)
      setError('name', {
        message: 'Name must be at least 4 characters long',
      })
    } else {
      clearErrors('name')
    }

    const timer = setTimeout(async () => {
      if (nameLength > 3) {
        const nameResponse = await isNameAvailable(formData.name)

        if (!nameResponse.available) {
          setError('name', {
            message: 'Name not available',
          })
          setNameAvailable(false)
        } else {
          clearErrors('name')
          setNameAvailable(true)
        }
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [formData.name, setError, clearErrors])

  const isNameAvailable = async (name: string) => {
    try {
      const response = await fetch(`/api/community-name?name=${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()

      if (response.status === 400) {
        toast.error(data.message)
        setNameAvailable(false)
        return
      }

      return data
    } catch (error) {
      console.error(error)
      toast.error('There was an error fetching name availability')
    } finally {
      setNameLoading(false)
    }
  }

  useEffect(() => {
    const wakeup = async () => {
      void fetch('/api/save-community', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wakeup:
            "This is lame, a quickfix for now. The serverless function takes too long to wake up, so we're calling it here.",
        }),
      })
    }
    wakeup()
  }, [])

  return (
    <div className="black-section">
      <h2>Create Community</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 text-left text-xl">
          <label className="mb-6 mt-8 block text-left font-bold" htmlFor="name">
            Name
          </label>
          <p>
            Once created, you can access your praise dashboard at{' '}
            {formData.name ? formData.name : '[name]'}.givepraise.xyz.
          </p>

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
          {!nameLoading && errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
          {!nameLoading && formData.name.length > 3 && nameAvailable && (
            <p className="mt-1 text-xs text-green-600">
              <FaCheckCircle className="mb-[2px] mr-1" />
              Name available
            </p>
          )}
          {nameLoading && (
            <p className="mt-1 w-4 text-xs">
              <LoaderSpinner />
            </p>
          )}
          <label className="mb-6 mt-8 block font-bold" htmlFor="name">
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
        <div className="mb-4 text-left text-xl">
          <label className="mb-6 mt-8 block text-left font-bold" htmlFor="name">
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
          {errors.owners && (
            <p className="mt-1 text-xs text-red-500">{errors.owners.message}</p>
          )}
        </div>
        <div className="mb-4 text-left text-xl">
          <label className="mb-6 mt-8 block font-bold" htmlFor="name">
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
        </div>
        <>
          <div className="mb-4 text-left">
            <label className="mb-6 mt-8 block font-bold" htmlFor="name">
              Discord
            </label>
            <p>
              Which Discord server do you want to use Praise in? Discord login
              required
            </p>
            <div className="flex">
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
              <div className="ml-4 flex items-center">
                <button
                  onClick={() => setGuildOptions([])}
                  className="hover:text-pink-600">
                  <FaSync />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="button button--secondary button--lg mt-12"
              disabled={
                submitting || !isConnected || guildOptions.length === 0
              }>
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
