import { Form, FormControlProps } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  styles?: string;
} & FormControlProps;

export default function InputField({
  name,
  label,
  styles,
  ...formControlProps
}: Props) {
  const { register, formState } = useFormContext();
  const errors = formState.errors[name];

  return (
    <Form.Group controlId={name} className={styles}>
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control {...formControlProps} {...register(name)} />

      {errors && (
        <Form.Text className="text-danger">
          {errors?.message?.toString()}
        </Form.Text>
      )}
    </Form.Group>
  );
}