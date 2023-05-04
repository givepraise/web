import { useSignMessage } from 'wagmi'
import { LoaderSpinner } from '../LoaderSpinner'
import { Button } from '../Button'

interface Props {
  text: string
  message: string
  onSignSuccess(signature: string): void
  onSignError(): void
  disabled?: boolean
}

const SignMessageButton = ({
  text,
  message,
  onSignSuccess,
  onSignError,
  disabled,
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

  return isLoading ? (
    <LoaderSpinner />
  ) : (
    <Button onClick={(): void => signMessage()} disabled={disabled}>
      {text}
    </Button>
  )
}

export { SignMessageButton }
