import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register.schema";

export function useRegisterForm() {
  return useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      display_name: "",
    },
    mode: "onTouched",
  });
}
