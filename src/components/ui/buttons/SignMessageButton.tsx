import { useSignMessage } from 'wagmi'
import { LoaderSpinner } from '../LoaderSpinner'

interface Props {
  text: string
  message: string
  onSignSuccess(signature: string): void
  onSignError(): void
}

const SignMessageButton = ({
  text,
  message,
  onSignSuccess,
  onSignError,
}: Props): JSX.Element | null => {
  const { isLoading, isSuccess, signMessage } = useSignMessage({
    message,
    onError() {
      onSignError()
    },
    onSuccess(data) {
      onSignSuccess(data)
    },
  })

  return isLoading || isSuccess ? (
    <LoaderSpinner />
  ) : (
    <button onClick={(): void => signMessage()}>{text}</button>
  )
}

export { SignMessageButton }
