import { Form, FormControlProps } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  styles?: string;
  defaultValue?: string;
} & FormControlProps;

export default function InputField({
  name,
  label,
  styles,
  defaultValue,
  ...formControlProps
}: Props) {
  const { register, formState } = useFormContext();
  const errors = formState.errors[name];

  return (
    <Form.Group controlId={name} className={styles}>
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control
        {...register(name)}
        defaultValue={defaultValue}
        isInvalid={!!errors?.message}
        {...formControlProps}
      />

      

      <Form.Control.Feedback type="invalid">
        {errors?.message?.toString()}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
