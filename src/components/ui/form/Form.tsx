import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormSelect } from './FormSelect'
import { FormInput } from './FormInput'
import { signIn, signOut, useSession } from 'next-auth/react'
import { formDataState, guildOptionsState } from '@/services/form'
import { useRecoilState } from 'recoil'
import { FormData } from '@/types/formData.type'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { communityState } from '@/services/community'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FaDiscord, FaEnvelope, FaUser, FaUsers } from 'react-icons/fa'
import { EthAccount } from '../account/EthAccount'

const Form = () => {
  const { data: session } = useSession()
  const { address, isConnected } = useAccount()

  const [formData, setFormData] = useRecoilState(formDataState)
  const [submitting, setSubmitting] = useState(false)
  const [guildOptions, setGuildOptions] = useRecoilState(guildOptionsState)
  const [community, setCommunity] = useRecoilState(communityState)

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
        reset()
        toast.success('Form submitted successfully')
        setSubmitting(false)
        setFormData({
          name: '',
          email: '',
          owners: '',
          guild: '',
        })

        setCommunity({
          name: response.name,
          hostname: response.hostname,
        })
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
          setGuildOptions(
            data.map((guild: any) => ({
              value: guild.id,
              label: guild.name,
            }))
          )

          toast.success('Discord guilds fetched successfully')
        } else if (data.message && data.message === '401: Unauthorized') {
          toast.error('Your Discord token has expired')
        }

        await signOut()
      } catch (error) {
        console.error(error)
        toast.error('There was an error fetching your Discord guilds')
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

  return (
    <div className="black-section">
      <div className="justify-center mt-2 mb-12 text-center">
        <h1 className="text-4xl">Create Community</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 text-xl text-left">
          <FormInput
            name="name"
            type="text"
            placeholder="Name"
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
            register={register}
            validationRules={{
              required: 'This field is required',
            }}
            icon={<FaUser />}
            disabled={!isConnected}
          />
          {errors['name'] && (
            <p className="mt-1 text-xs text-red-500">
              {errors['name']?.message}
            </p>
          )}

          <label className="block mt-8 mb-6 font-bold" htmlFor="name">
            Creator
          </label>
          {!address ? (
            <p>
              Praise uses ETH for identification, connect a wallet to get
              started.
            </p>
          ) : (
            <></>
          )}
        </div>

        {address ? (
          <div className="flex h-full text-left">
            <EthAccount className="w-36" />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <ConnectButton
              accountStatus="address"
              showBalance={false}
              chainStatus={'none'}
            />
          </div>
        )}

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
              },
            }}
            icon={<FaUsers />}
            disabled={!isConnected}
          />
          {errors['owners'] && (
            <p className="mt-1 text-xs text-red-500">
              {errors['owners']?.message}
            </p>
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
            placeholder="spam.please@address.com"
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
          {errors['email'] && (
            <p className="mt-1 text-xs text-red-500">
              {errors['email']?.message}
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
            <button
              type="submit"
              className="mt-12 button button--secondary button--lg"
              disabled={submitting || !isConnected}>
              {submitting ? 'Submitting...' : 'Create'}
            </button>
          </div>
        </>
      </form>
    </div>
  )
}

export default Form
