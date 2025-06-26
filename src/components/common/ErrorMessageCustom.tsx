export default function ErrorMessageCustom(errors: any) {
  return errors.error ? (
    <small className="p-error validate-error">{errors.error.message}</small>
  ) : (
    <small className="p-error">&nbsp;</small>
  );
}
