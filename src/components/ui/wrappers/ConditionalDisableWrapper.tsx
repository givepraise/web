export const ConditionalDisableWrapper = ({
  condition,
  children,
}: ConditionalDisableWrapperProps) =>
  condition ? children : <fieldset disabled={true}>{children}</fieldset>
